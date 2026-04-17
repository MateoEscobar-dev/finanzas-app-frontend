import { Injectable } from '@angular/core'
import { CommonService } from '@/app/core/service/common.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ServerService extends CommonService {
  constructor() {
    super('server')
  }

  // =========================================
  // ACCIONES PERSONALIZADAS CON WEBSOCKET
  // =========================================

  validateStatus(serverId: number, operationId: string): Observable<any> {
    const payload = { operationId }
    return this.http.post(
      `${this.apiUrl}/${serverId}/validate-status`,
      payload,
      {
        headers: this.getHeaders(),
      }
    )
  }

  install(
    serverId: number,
    domain: string,
    email: string,
    operationId: string,
    appConfig?: any
  ): Observable<any> {
    const payload = { domain, email, operationId, ...appConfig }
    return this.http.post(`${this.apiUrl}/${serverId}/install`, payload, {
      headers: this.getHeaders(),
    })
  }

  addProgram(
    serverId: number,
    programId: number,
    operationId: string,
    appConfig?: any
  ): Observable<any> {
    const payload = { programId, operationId, ...appConfig }
    return this.http.post(`${this.apiUrl}/${serverId}/add-program`, payload, {
      headers: this.getHeaders(),
    })
  }

  changeDomain(
    serverId: number,
    newDomain: string,
    operationId: string
  ): Observable<any> {
    const payload = { newDomain, operationId }
    return this.http.post(`${this.apiUrl}/${serverId}/change-domain`, payload, {
      headers: this.getHeaders(),
    })
  }

  deactivateService(serverId: number, operationId: string): Observable<any> {
    const payload = { operationId }
    return this.http.post(
      `${this.apiUrl}/${serverId}/deactivate-service`,
      payload,
      {
        headers: this.getHeaders(),
      }
    )
  }

  activateService(serverId: number, operationId: string): Observable<any> {
    const payload = { operationId }
    return this.http.post(
      `${this.apiUrl}/${serverId}/activate-service`,
      payload,
      {
        headers: this.getHeaders(),
      }
    )
  }

  automaticShutdown(serverId: number, operationId: string): Observable<any> {
    const payload = { operationId }
    return this.http.post(
      `${this.apiUrl}/${serverId}/automatic-shutdown`,
      payload,
      {
        headers: this.getHeaders(),
      }
    )
  }

  // Método para obtener programas disponibles
  getAvailablePrograms(): Observable<any> {
    return this.http.get<any>(`${this.urlserver}/server-available-programs`, {
      headers: this.getHeaders(),
    })
  }
}
