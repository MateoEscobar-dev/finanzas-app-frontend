/**
 * GUÍA DE USO: SISTEMA DE PERMISOS Y ROLES
 * ==========================================
 *
 * Este documento muestra cómo usar el sistema centralizado de permisos
 * en diferentes partes de tu aplicación.
 */

// ============================================
// 1. EN COMPONENTES (TS)
// ============================================

import { Component, inject } from '@angular/core'
import { PermissionService } from '@/app/core/service/permission.service'

@Component({
  selector: 'app-users-list',
  template: `...`,
})
export class UsersListComponent implements OnInit {
  permissionService = inject(PermissionService)

  ngOnInit() {
    // Verificar si puede agregar usuarios
    if (this.permissionService.hasPermission('users.add')) {
      console.log('Usuario puede agregar')
    }

    // Verificar si tiene cualquiera de estos permisos
    if (
      this.permissionService.hasAnyPermission([
        'users.edit',
        'users.destroy',
      ])
    ) {
      console.log('Usuario puede editar o eliminar')
    }

    // Verificar si tiene TODOS estos permisos
    if (
      this.permissionService.hasAllPermissions([
        'users.add',
        'users.edit',
      ])
    ) {
      console.log('Usuario puede agregar Y editar')
    }

    // Verificar acciones genéricas
    if (this.permissionService.canPerformAction('users.add')) {
      console.log('Puede hacer la acción users.add')
    }

    // Verificar roles
    if (this.permissionService.hasRole('Administrator')) {
      console.log('Es administrador')
    }

    // Obtener información del usuario actual
    const user = this.permissionService.getCurrentUser()
    console.log('Usuario actual:', user)

    // Obtener todos los permisos
    const allPerms = this.permissionService.getAllPermissions()
    console.log('Todos los permisos:', allPerms)
  }
}

// ============================================
// 2. EN TEMPLATES (HTML)
// ============================================

/*
  <!-- Mostrar botón solo si tiene permiso 'users.add' -->
  <button *appHasPermission="'users.add'" (click)="addUser()">
    Agregar Usuario
  </button>

  <!-- Mostrar si tiene ALGUNO de estos permisos -->
  <button *appHasPermission="['users.edit', 'users.destroy']">
    Editar/Eliminar
  </button>

  <!-- Mostrar si tiene TODOS estos permisos -->
  <button *appHasPermission="['users.add', 'users.edit'];
    appHasPermissionStrategy: 'all'">
    Agregar o Editar
  </button>

  <!-- Mostrar solo para administradores -->
  <section *appHasRole="'Administrator'">
    Panel administrativo
  </section>

  <!-- Mostrar si tiene ALGUNO de estos roles -->
  <nav *appHasRole="['Administrator', 'Manager']">
    Menú especial
  </nav>

  <!-- Mostrar si tiene TODOS estos roles -->
  <div *appHasRole="['Administrator', 'SuperAdmin']; appHasRoleStrategy: 'all'">
    Sección ultra confidencial
  </div>
*/

// ============================================
// 3. EN SERVICIOS
// ============================================

import { Injectable, inject } from '@angular/core'
import { PermissionService } from '@/app/core/service/permission.service'

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private permissionService = inject(PermissionService)

  addUser(_userData: any) {
    // Verificar permiso antes de hacer la petición
    if (!this.permissionService.hasPermission('users.add')) {
      throw new Error('No tiene permiso para agregar usuarios')
    }

    // Hacer petición al backend
    // return this.http.post('/api/users', userData)
  }

  deleteUser(_userId: number) {
    if (!this.permissionService.canPerformAction('users.destroy')) {
      throw new Error('No tiene permiso para eliminar usuarios')
    }

    // return this.http.delete(`/api/users/${userId}`)
  }
}

// ============================================
// 4. EN GUARDS (para proteger rutas)
// ============================================

import { Injectable, inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { PermissionService } from '@/app/core/service/permission.service'

export const hasPermissionGuard: CanActivateFn = (route, _state) => {
  const permissionService = inject(PermissionService)
  const router = inject(Router)

  const requiredPermission = route.data['permission'] as string

  if (permissionService.hasPermission(requiredPermission)) {
    return true
  }

  console.warn(`Acceso denegado. Permiso requerido: ${requiredPermission}`)
  router.navigate(['/unauthorized'])
  return false
}

// Uso en rutas:
/*
export const routes = [
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [hasPermissionGuard],
    data: { permission: 'users' }
  },
  {
    path: 'users/add',
    component: AddUserComponent,
    canActivate: [hasPermissionGuard],
    data: { permission: 'users.add' }
  }
]
*/

// ============================================
// 5. ESCUCHAR CAMBIOS DE PERMISOS (Reactive)
// ============================================

export class MyComponent {
  permissionService = inject(PermissionService)

  ngOnInit() {
    // Escuchar cambios en permisos
    this.permissionService.permissions$.subscribe((permissions) => {
      console.log('Permisos actualizados:', permissions)
    })

    // Escuchar cambios en roles
    this.permissionService.roles$.subscribe((roles) => {
      console.log('Roles actualizados:', roles)
    })

    // Escuchar cambios en el usuario
    this.permissionService.user$.subscribe((user) => {
      console.log('Usuario actual:', user)
    })
  }
}

// ============================================
// 6. EN INTERCEPTORES (para logging)
// ============================================

import { HttpInterceptorFn } from '@angular/common/http'
import { inject, OnInit } from '@angular/core'
import { PermissionService } from '@/app/core/service/permission.service'

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const permissionService = inject(PermissionService)

  const user = permissionService.getCurrentUser()
  console.log(`Request from user: ${user?.email}`)

  return next(req)
}

// ============================================
// RESUMEN DE MÉTODOS DISPONIBLES
// ============================================

/*
  PERMISOS:
  - hasPermission(permission: string): boolean
  - hasAllPermissions(permissions: string[]): boolean
  - hasAnyPermission(permissions: string[]): boolean
  - canPerformAction(action: string): boolean
  - getAllPermissions(): string[]

  ROLES:
  - hasRole(role: string): boolean
  - hasAllRoles(roles: string[]): boolean
  - hasAnyRole(roles: string[]): boolean
  - getAllRoles(): string[]

  USUARIO:
  - getCurrentUser(): IUser | null
  - getAbilities(): string[]

  OBSERVABLES (para reactividad):
  - permissions$: Observable<string[]>
  - roles$: Observable<string[]>
  - abilities$: Observable<string[]>
  - user$: Observable<IUser | null>
*/
