import { IRegistroUsuarioControl } from '@/app/interfaces/autenticacion/registro.interface'
import { IAuthResponse, ISessionData } from '@/app/interfaces/autenticacion/auth-response.interface'
import { environment } from '@/environments/environment'
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs'
import { CryptoService } from '../crypto/crypto.service'
import { ILogin } from '@/app/interfaces/autenticacion/login.interface'

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  private http = inject(HttpClient)
  private urlserver: string = environment.apiUrl
  private apiUrl: string = `${this.urlserver}/login`
  private apiUrlRegister: string = `${this.urlserver}/register`

  private secretKey: string = environment.encryptSecret

  // BehaviorSubject para mantener el estado actual del usuario
  private currentUserSubject = new BehaviorSubject<any>(null)

  // BehaviorSubject para los datos de sesión completos
  private sessionDataSubject = new BehaviorSubject<ISessionData | null>(null)

  // Observable público para componentes
  currentUser$ = this.currentUserSubject.asObservable()

  // Observable público para datos de sesión completos
  sessionData$ = this.sessionDataSubject.asObservable()

  // Método para obtener valor sincrónico (para guards)
  get currentUserValue(): any {
    return this.currentUserSubject.value
  }

  // Método para obtener datos de sesión completos
  get sessionDataValue(): ISessionData | null {
    return this.sessionDataSubject.value
  }

  // Métodos para acceder a propiedades específicas de la sesión
  get permissions(): string[] {
    return this.sessionDataValue?.permissions || []
  }

  get roles(): string[] {
    return this.sessionDataValue?.roles || []
  }

  get token(): string {
    return this.sessionDataValue?.token || ''
  }

  // Headers comunes
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + localStorage.getItem('token') // Si necesitas autenticación
    })
  }

  cryptoService = inject(CryptoService)

  constructor() {
    // Inicializar con usuario de localStorage si existe
    const storedUser = localStorage.getItem('currentUser')
    const storedSessionData = localStorage.getItem('sessionData')

    if (storedUser) {
      try {
        this.currentUserSubject.next(JSON.parse(storedUser))
      } catch (e) {
        console.error('Error parsing stored user', e)
        this.clearSession()
      }
    }

    if (storedSessionData) {
      try {
        this.sessionDataSubject.next(JSON.parse(storedSessionData))
      } catch (e) {
        console.error('Error parsing stored session data', e)
        this.clearSession()
      }
    }
  }

  inicioSesion<T>(login: ILogin): Observable<IAuthResponse> {
    const claveCifrada = this.cryptoService.encrypt(
      login.password,
      this.secretKey
    )

    let datosLoginEncrypt: ILogin = login
    //datosLoginEncrypt.password = claveCifrada
    datosLoginEncrypt.password = login.password
    return this.http
      .post<IAuthResponse>(this.apiUrl, datosLoginEncrypt, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((response: IAuthResponse) => {
          // Extraer datos del response
          const authData = response.data
          const user = authData.user

          // Crear objeto de datos de sesión
          const sessionData: ISessionData = {
            token: authData.token,
            token_type: authData.token_type,
            user: user,
            permissions: user.permissions,
            roles: user.roles,
            abilities: authData.abilities,
          }

          // Almacenar en localStorage
          localStorage.setItem('token', authData.token)
          localStorage.setItem('tokenType', authData.token_type)
          localStorage.setItem('currentUser', JSON.stringify(user))
          localStorage.setItem('sessionData', JSON.stringify(sessionData))
          localStorage.setItem('permissions', JSON.stringify(user.permissions))
          localStorage.setItem('roles', JSON.stringify(user.roles))
          localStorage.setItem('abilities', JSON.stringify(authData.abilities))

          // Guardar el idioma del usuario si viene en la respuesta
          if (user.lang) {
            localStorage.setItem('lang', user.lang)
          }

          // Actualizar BehaviorSubjects
          this.currentUserSubject.next(user)
          this.sessionDataSubject.next(sessionData)
        }),
        catchError(this.handleError)
      )
  }

  registrarUsuario<T>(
    datosUsuario: IRegistroUsuarioControl
  ): Observable<IRegistroUsuarioControl> {
    const claveCifrada = this.cryptoService.encrypt(
      datosUsuario.password,
      this.secretKey
    )

    let datosUsuarioEncrypt: IRegistroUsuarioControl = datosUsuario
    datosUsuarioEncrypt.password = claveCifrada

    return this.http
      .post<IRegistroUsuarioControl>(this.apiUrlRegister, datosUsuarioEncrypt, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError))
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/logout`, {})
      .pipe(tap(() => this.clearSession()))
  }

  public clearSession(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenType')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('sessionData')
    localStorage.removeItem('permissions')
    localStorage.removeItem('roles')
    localStorage.removeItem('abilities')
    this.currentUserSubject.next(null)
    this.sessionDataSubject.next(null)
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Algo salió mal'
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`
    } else {
      // Error del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.error.message}`
    }
    console.error(errorMessage)
    return throwError(() => new Error(errorMessage))
  }

  currentUserNick(defaultNick: string = 'Dev') {
    const user = this.currentUserValue
    return user?.first_name || user?.email || defaultNick
  }

  // funcion para obtener una key del usuario actual
  getCurrentUserKey(key: string): any {
    const user = this.currentUserValue
    return user ? user[key] : null
  }
}
