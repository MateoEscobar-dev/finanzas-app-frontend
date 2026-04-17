import { Injectable, inject } from '@angular/core'
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { PermissionService } from '@/app/core/service/permission.service'

/**
 * Guard para proteger rutas basado en permisos
 *
 * Uso en rutas:
 * {
 *   path: 'users',
 *   component: UsersComponent,
 *   canActivate: [hasPermissionGuard],
 *   data: { permission: 'users' }
 * }
 */
export const hasPermissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const permissionService = inject(PermissionService)
  const router = inject(Router)

  const requiredPermission = route.data['permission'] as string

  if (!requiredPermission) {
    console.warn('Guard: No permission specified in route data')
    return true
  }

  if (permissionService.hasPermission(requiredPermission)) {
    return true
  }

  console.warn(
    `🚫 Acceso denegado. Permiso requerido: ${requiredPermission}`,
    `Permisos del usuario: ${permissionService.getAllPermissions().join(', ')}`
  )

  router.navigate(['/unauthorized'])
  return false
}

/**
 * Guard para proteger rutas basado en roles
 *
 * Uso en rutas:
 * {
 *   path: 'admin',
 *   component: AdminComponent,
 *   canActivate: [hasRoleGuard],
 *   data: { role: 'Administrator' }
 * }
 */
export const hasRoleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const permissionService = inject(PermissionService)
  const router = inject(Router)

  const requiredRole = route.data['role'] as string

  if (!requiredRole) {
    console.warn('Guard: No role specified in route data')
    return true
  }

  if (permissionService.hasRole(requiredRole)) {
    return true
  }

  console.warn(
    `🚫 Acceso denegado. Rol requerido: ${requiredRole}`,
    `Roles del usuario: ${permissionService.getAllRoles().join(', ')}`
  )

  router.navigate(['/unauthorized'])
  return false
}

/**
 * Guard para proteger rutas cuando se requieren múltiples permisos
 *
 * Uso en rutas:
 * {
 *   path: 'special',
 *   component: SpecialComponent,
 *   canActivate: [hasAllPermissionsGuard],
 *   data: { permissions: ['users.edit', 'users.destroy'] }
 * }
 */
export const hasAllPermissionsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const permissionService = inject(PermissionService)
  const router = inject(Router)

  const requiredPermissions = route.data['permissions'] as string[]

  if (!requiredPermissions || requiredPermissions.length === 0) {
    console.warn('Guard: No permissions specified in route data')
    return true
  }

  if (permissionService.hasAllPermissions(requiredPermissions)) {
    return true
  }

  console.warn(
    `🚫 Acceso denegado. Permisos requeridos: ${requiredPermissions.join(', ')}`,
    `Permisos del usuario: ${permissionService.getAllPermissions().join(', ')}`
  )

  router.navigate(['/unauthorized'])
  return false
}

/**
 * Guard para proteger rutas cuando se requiere AL MENOS UN permiso de una lista
 *
 * Uso en rutas:
 * {
 *   path: 'content',
 *   component: ContentComponent,
 *   canActivate: [hasAnyPermissionGuard],
 *   data: { permissions: ['users.edit', 'roles.edit'] }
 * }
 */
export const hasAnyPermissionGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const permissionService = inject(PermissionService)
  const router = inject(Router)

  const requiredPermissions = route.data['permissions'] as string[]

  if (!requiredPermissions || requiredPermissions.length === 0) {
    console.warn('Guard: No permissions specified in route data')
    return true
  }

  if (permissionService.hasAnyPermission(requiredPermissions)) {
    return true
  }

  console.warn(
    `🚫 Acceso denegado. Se requiere AL MENOS uno de estos permisos: ${requiredPermissions.join(', ')}`,
    `Permisos del usuario: ${permissionService.getAllPermissions().join(', ')}`
  )

  router.navigate(['/unauthorized'])
  return false
}
