import { Injectable, inject } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { AutenticacionService } from '@/app/services/autenticacion/autenticacion.service'
import { IUser } from '@/app/interfaces/autenticacion/auth-response.interface'

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private autenticacionService = inject(AutenticacionService)

  // BehaviorSubjects para mantener reactividad
  private permissionsSubject = new BehaviorSubject<string[]>([])
  private rolesSubject = new BehaviorSubject<string[]>([])
  private abilitiesSubject = new BehaviorSubject<string[]>([])
  private userSubject = new BehaviorSubject<IUser | null>(null)

  // Observables públicos
  permissions$ = this.permissionsSubject.asObservable()
  roles$ = this.rolesSubject.asObservable()
  abilities$ = this.abilitiesSubject.asObservable()
  user$ = this.userSubject.asObservable()

  constructor() {
    // Inicializar con datos de sesión existente
    this.initializePermissions()

    // Escuchar cambios en el servicio de autenticación
    this.autenticacionService.sessionData$.subscribe((sessionData) => {
      if (sessionData) {
        this.permissionsSubject.next(sessionData.permissions || [])
        this.rolesSubject.next(sessionData.roles || [])
        this.abilitiesSubject.next(sessionData.abilities || [])
        this.userSubject.next(sessionData.user || null)
      } else {
        this.clearPermissions()
      }
    })
  }

  /**
   * Inicializa permisos desde localStorage o sesión
   */
  private initializePermissions(): void {
    const sessionData = this.autenticacionService.sessionDataValue
    if (sessionData) {
      this.permissionsSubject.next(sessionData.permissions || [])
      this.rolesSubject.next(sessionData.roles || [])
      this.abilitiesSubject.next(sessionData.abilities || [])
      this.userSubject.next(sessionData.user || null)
    }
  }

  /**
   * Verifica si el usuario tiene un permiso específico
   * @param permission Nombre del permiso a verificar
   * @returns true si tiene el permiso, false en caso contrario
   */
  hasPermission(permission: string): boolean {
    const permissions = this.permissionsSubject.value
    return permissions.includes(permission)
  }

  /**
   * Verifica si el usuario tiene TODOS los permisos de una lista
   * @param permissions Array de permisos a verificar
   * @returns true si tiene todos, false en caso contrario
   */
  hasAllPermissions(permissions: string[]): boolean {
    const userPermissions = this.permissionsSubject.value
    return permissions.every((permission) => userPermissions.includes(permission))
  }

  /**
   * Verifica si el usuario tiene AL MENOS UN permiso de una lista
   * @param permissions Array de permisos a verificar
   * @returns true si tiene al menos uno, false en caso contrario
   */
  hasAnyPermission(permissions: string[]): boolean {
    const userPermissions = this.permissionsSubject.value
    return permissions.some((permission) => userPermissions.includes(permission))
  }

  /**
   * Verifica si el usuario tiene un rol específico
   * @param role Nombre del rol a verificar
   * @returns true si tiene el rol, false en caso contrario
   */
  hasRole(role: string): boolean {
    const roles = this.rolesSubject.value
    return roles.includes(role)
  }

  /**
   * Verifica si el usuario tiene TODOS los roles de una lista
   * @param roles Array de roles a verificar
   * @returns true si tiene todos, false en caso contrario
   */
  hasAllRoles(roles: string[]): boolean {
    const userRoles = this.rolesSubject.value
    return roles.every((role) => userRoles.includes(role))
  }

  /**
   * Verifica si el usuario tiene AL MENOS UN rol de una lista
   * @param roles Array de roles a verificar
   * @returns true si tiene al menos uno, false en caso contrario
   */
  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.rolesSubject.value
    return roles.some((role) => userRoles.includes(role))
  }

  /**
   * Obtiene todos los permisos actuales
   * @returns Array de permisos del usuario
   */
  getAllPermissions(): string[] {
    return this.permissionsSubject.value
  }

  /**
   * Obtiene todos los roles actuales
   * @returns Array de roles del usuario
   */
  getAllRoles(): string[] {
    return this.rolesSubject.value
  }

  /**
   * Obtiene todas las habilidades (abilities)
   * @returns Array de abilities del usuario
   */
  getAbilities(): string[] {
    return this.abilitiesSubject.value
  }

  /**
   * Obtiene la información del usuario actual
   * @returns Objeto IUser o null
   */
  getCurrentUser(): IUser | null {
    return this.userSubject.value
  }

  /**
   * Verifica si el usuario tiene permiso para una acción específica
   * Soporta acciones como: 'users.add', 'users.edit', 'users.destroy', etc.
   * @param action Acción a verificar (ej: 'users.add')
   * @returns true si puede ejecutar la acción
   */
  canPerformAction(action: string): boolean {
    const permissions = this.permissionsSubject.value
    const abilities = this.abilitiesSubject.value

    // Si tiene "*" puede hacer todo
    if (abilities.includes('*')) {
      return true
    }

    // Verificar permiso exacto
    if (permissions.includes(action)) {
      return true
    }

    // Verificar si tiene permiso base (ej: si tiene 'users' puede hacer acciones en users)
    const basePermission = action.split('.')[0]
    return permissions.includes(basePermission)
  }

  /**
   * Limpia todos los permisos (usado en logout)
   */
  private clearPermissions(): void {
    this.permissionsSubject.next([])
    this.rolesSubject.next([])
    this.abilitiesSubject.next([])
    this.userSubject.next(null)
  }
}
