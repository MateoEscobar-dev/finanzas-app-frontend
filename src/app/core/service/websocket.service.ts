import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { filter, takeUntil } from 'rxjs/operators'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

// Hacer Pusher disponible globalmente para Laravel Echo
;(window as any).Pusher = Pusher

export interface IWebSocketMessage {
  type: 'log' | 'progress' | 'error' | 'complete'
  operationId: string
  message: string
  timestamp: Date
  data?: any
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private echo?: Echo<any>
  private channels = new Map<string, any>()
  private destroy$ = new Subject<void>()

  // Subject para mensajes entrantes
  private messages$ = new Subject<IWebSocketMessage>()

  constructor() {
    this.connect()
  }

  /**
   * Conecta al WebSocket usando Laravel Reverb
   */
  private connect(): void {
    // console.log('🔌 Iniciando conexión Laravel Reverb...')

    if (this.echo) {
      this.echo.disconnect()
    }

    this.echo = new Echo({
      broadcaster: 'reverb',
      key: 'e2f77098de874a4890557afd5b068b65040b8f7ccc30280beec56d361749d346',
      wsHost: 'paneladmin.local',
      wsPort: 6001,
      wssPort: 6001,
      forceTLS: false,
      enabledTransports: ['ws', 'wss'],
      disableStats: true,
    })

    // Escuchar eventos de conexión de Pusher (que usa Echo internamente)
    const pusherInstance = (this.echo as any).connector.pusher

    pusherInstance.connection.bind('connected', () => {
      //console.log('✅ Laravel Reverb CONECTADO correctamente')
      /*console.log('📊 Estado:', {
        socketId: pusherInstance.connection.socket_id,
        state: pusherInstance.connection.state,
      })*/
    })

    pusherInstance.connection.bind('disconnected', () => {
      // console.log('❌ Laravel Reverb DESCONECTADO')
    })

    pusherInstance.connection.bind('error', (_error: any) => {
      // console.error('⚠️ ERROR en Laravel Reverb:', _error)
    })

    pusherInstance.connection.bind('state_change', (_states: any) => {
      // console.log(`🔄 Estado cambió: ${_states.previous} -> ${_states.current}`)
    })
  }

  /**
   * Maneja mensajes entrantes del WebSocket
   */
  private handleMessage(message: any): void {
    // console.log('📥 Procesando mensaje:', message)

    if (message && message.type && message.operationId) {
      const wsMessage: IWebSocketMessage = {
        type: message.type,
        operationId: message.operationId,
        message: message.message || '',
        timestamp: message.timestamp ? new Date(message.timestamp) : new Date(),
        data: message.data,
      }
      // console.log('✔️ Mensaje validado y enviado:', wsMessage)
      this.messages$.next(wsMessage)
    } else {
      // console.warn('⚠️ Mensaje inválido (falta type o operationId):', message)
    }
  }

  /**
   * Suscribe a una operación (se suscribe a un canal de Laravel Reverb)
   */
  subscribeToOperation(
    operationId: string,
    _eventName: string = 'update'
  ): void {
    // console.log(`📌 Suscribiendo a canal: server-actions.${operationId}`)

    if (!this.echo) {
      // console.warn('⚠️ Laravel Reverb no está conectado')
      return
    }

    // Suscribe al canal (usar prefijo 'server-actions.')
    const channelName = `server-actions.${operationId}`
    if (!this.channels.has(channelName)) {
      const channel = this.echo.channel(channelName)

      // console.log(`🎯 Escuchando eventos en canal: ${channelName}`)

      // Escuchar eventos de progreso
      channel.listen('.progress', (data: any) => {
        // console.log(`📨 Progress recibido en canal ${channelName}:`, data)
        this.handleMessage({
          type: 'progress',
          operationId,
          message: data.message || '',
          timestamp: new Date(data.timestamp || new Date()),
          data: { progress: data.progress || 0, severity: data.severity },
        })
      })

      // Escuchar eventos de completado
      channel.listen('.complete', (data: any) => {
        // console.log(`✅ Complete recibido en canal ${channelName}:`, data)
        this.handleMessage({
          type: 'complete',
          operationId,
          message: data.message || 'Operación completada',
          timestamp: new Date(data.timestamp || new Date()),
          data: data.data,
        })
      })

      // Escuchar eventos de error
      channel.listen('.error', (data: any) => {
        // console.log(`❌ Error recibido en canal ${channelName}:`, data)
        this.handleMessage({
          type: 'error',
          operationId,
          message: data.message || 'Error en la operación',
          timestamp: new Date(data.timestamp || new Date()),
          data: { errorCode: data.errorCode },
        })
      })

      this.channels.set(channelName, channel)
      // console.log(`✅ Canal ${channelName} suscrito correctamente`)
    } else {
      // console.log(`ℹ️ Ya estás suscrito al canal ${channelName}`)
    }
  }

  /**
   * Cancela suscripción a una operación
   */
  unsubscribeFromOperation(operationId: string): void {
    // console.log(`📌 Desuscribiendo de operación: ${operationId}`)

    if (this.echo && this.channels.has(operationId)) {
      this.echo.leaveChannel(operationId)
      this.channels.delete(operationId)
      // console.log(`✅ Desuscrito de canal ${operationId}`)
    }
  }

  /**
   * Envía un mensaje al WebSocket (Laravel Reverb usa eventos del servidor)
   * Para enviar datos, usa una API REST o broadcasting desde el servidor
   */
  send(_message: any): void {
    // console.warn(
    //   '⚠️ Laravel Reverb recibe eventos del servidor, no envía mensajes directos desde el cliente'
    // )
    // console.log('💡 Si necesitas enviar datos, usa una API REST en Laravel')
  }

  /**
   * Suscribe a mensajes de una operación específica
   */
  listenToOperation(operationId: string): Observable<IWebSocketMessage> {
    //console.log(`👂 Escuchando operación: ${operationId}`)
    return this.messages$.pipe(
      takeUntil(this.destroy$),
      filter((msg) => {
        const match = msg.operationId === operationId
        // console.log(
        //   `🔍 Filtrando mensaje: ${msg.operationId} === ${operationId}? ${match}`
        // )
        return match
      })
    )
  }

  /**
   * Verifica si está conectado
   */
  isConnected(): boolean {
    const pusherInstance = this.echo
      ? (this.echo as any).connector?.pusher
      : null
    const connected = pusherInstance?.connection.state === 'connected'
    /*console.log('🔍 Estado conexión Laravel Reverb:', {
      connected,
      state: pusherInstance?.connection.state,
      socketId: pusherInstance?.connection.socket_id,
    })*/
    return connected
  }

  /**
   * Desconecta manualmente
   */
  disconnect(): void {
    // console.log('🔌 Desconectando Laravel Reverb...')
    this.destroy$.next()
    this.destroy$.complete()

    // Desuscribir todos los canales
    this.channels.forEach((_, channelName) => {
      this.echo?.leaveChannel(channelName)
    })
    this.channels.clear()

    if (this.echo) {
      this.echo.disconnect()
    }
  }
}
