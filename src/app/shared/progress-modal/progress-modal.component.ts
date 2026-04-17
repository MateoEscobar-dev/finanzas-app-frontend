import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  WebSocketService,
  IWebSocketMessage,
} from '@/app/core/service/websocket.service'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-progress-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-modal.component.html',
  styleUrl: './progress-modal.component.scss',
})
export class ProgressModalComponent implements OnInit, OnDestroy, OnChanges {
  private wsService = inject(WebSocketService)
  private destroy$ = new Subject<void>()

  @Input() isVisible = false
  @Input() operationId = ''
  @Input() title = 'Procesando...'

  @Output() close = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()

  logs: IWebSocketMessage[] = []
  isCompleted = false
  hasError = false
  progress = 0
  private hasSubscribed = false

  ngOnInit(): void {
    // console.log('🎬 ProgressModal iniciado con operationId:', this.operationId)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambia isVisible
    if (changes['isVisible']) {
      if (!this.isVisible && changes['isVisible'].previousValue) {
        // Modal se cerró, resetear para la próxima vez
        this.hasSubscribed = false
        this.resetModalState()
      }
    }

    // Cuando cambia el operationId
    if (changes['operationId']) {
      // Si cambió a un nuevo operationId, limpiar logs y resetear estado
      if (
        this.operationId &&
        this.operationId !== changes['operationId'].previousValue
      ) {
        this.resetModalState()
        // console.log('🔄 OperationId cambió a:', this.operationId)

        if (!this.hasSubscribed || changes['operationId'].previousValue) {
          this.hasSubscribed = false
          this.subscribeToOperation()
          this.hasSubscribed = true
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
    // NO desuscribir aquí porque el componente padre puede seguir usando el canal
  }

  /**
   * Resetea el estado del modal
   */
  private resetModalState(): void {
    this.logs = []
    this.isCompleted = false
    this.hasError = false
    this.progress = 0
  }

  /**
   * Suscribe a los mensajes de la operación
   */
  private subscribeToOperation(): void {
    // console.log('👂 ProgressModal escuchando operación:', this.operationId)

    // NO suscribir de nuevo, solo escuchar
    this.wsService
      .listenToOperation(this.operationId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        //console.log('📬 ProgressModal recibió mensaje:', message)
        this.handleMessage(message)
      })
  }

  /**
   * Maneja mensajes del WebSocket
   */
  private handleMessage(message: IWebSocketMessage): void {
    this.logs.push(message)

    // Auto-scroll al final
    setTimeout(() => {
      this.scrollToBottom()
    }, 100)

    switch (message.type) {
      case 'progress':
        this.progress = message.data?.progress || 0
        break
      case 'complete':
        this.isCompleted = true
        this.progress = 100
        break
      case 'error':
        this.hasError = true
        break
    }
  }

  /**
   * Scroll automático al final de los logs
   */
  private scrollToBottom(): void {
    const logContainer = document.querySelector('.progress-logs')
    if (logContainer) {
      logContainer.scrollTop = logContainer.scrollHeight
    }
  }

  /**
   * Cierra el modal
   */
  closeModal(): void {
    this.close.emit()
  }

  /**
   * Cancela la operación
   */
  cancelOperation(): void {
    this.cancel.emit()
  }

  /**
   * Obtiene la clase CSS para un tipo de log
   */
  getLogClass(type: string): string {
    switch (type) {
      case 'error':
        return 'text-danger'
      case 'warning':
        return 'text-warning'
      case 'info':
        return 'text-info'
      case 'complete':
        return 'text-success'
      default:
        return 'text-muted'
    }
  }

  /**
   * Obtiene el icono para un tipo de log
   */
  getLogIcon(type: string): string {
    switch (type) {
      case 'error':
        return 'mdi-alert-circle'
      case 'warning':
        return 'mdi-alert'
      case 'info':
        return 'mdi-information'
      case 'complete':
        return 'mdi-check-circle'
      default:
        return 'mdi-console'
    }
  }
}
