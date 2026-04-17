# 🔐 Sistema Centralizado de Permisos y Roles

## Resumen

Se ha creado un sistema completo y centralizado para gestionar permisos y roles que viene desde el login. Este sistema permite:

✅ Consultar permisos en cualquier componente  
✅ Usar directivas para mostrar/ocultar elementos  
✅ Proteger rutas con guards basados en permisos  
✅ Reactividad completa con Observables  
✅ Verificaciones simples de permisos y roles  

---

## 📁 Archivos Creados

1. **`src/app/core/service/permission.service.ts`** ⭐ Servicio principal
2. **`src/app/core/guards/has-permission.directive.ts`** - Directiva para permisos
3. **`src/app/core/guards/has-role.directive.ts`** - Directiva para roles
4. **`src/app/core/service/permission-demo.component.ts`** - Componente de demostración
5. **`src/app/core/service/PERMISSION_USAGE_GUIDE.ts`** - Guía de uso (ejemplos comentados)

---

## 🚀 Guía de Implementación

### Paso 1: Los servicios ya están listos
No necesitas hacer nada especial. El `PermissionService` se inicializa automáticamente cuando el usuario inicia sesión.

### Paso 2: Usar en componentes (TypeScript)

```typescript
import { Component, inject } from '@angular/core'
import { PermissionService } from '@/app/core/service/permission.service'

@Component({
  selector: 'app-my-component',
  template: `...`,
})
export class MyComponent {
  permissionService = inject(PermissionService)

  ngOnInit() {
    // Verificar un permiso específico
    if (this.permissionService.hasPermission('users.add')) {
      console.log('Puede agregar usuarios')
    }

    // Verificar si tiene cualquiera de estos permisos
    if (this.permissionService.hasAnyPermission(['users.edit', 'users.destroy'])) {
      console.log('Puede editar o eliminar')
    }
  }
}
```

### Paso 3: Usar en templates (HTML)

```html
<!-- Mostrar solo si tiene permiso -->
<button *appHasPermission="'users.add'" (click)="addUser()">
  Agregar Usuario
</button>

<!-- Mostrar si tiene ALGUNO de estos permisos -->
<button *appHasPermission="['users.edit', 'users.destroy']">
  Editar/Eliminar
</button>

<!-- Mostrar si tiene TODOS estos permisos -->
<div *appHasPermission="['users.add', 'users.edit']; appHasPermissionStrategy: 'all'">
  Puedes agregar Y editar
</div>

<!-- Usar directivas de roles -->
<nav *appHasRole="'Administrator'">
  Panel de administrador
</nav>
```

---

## 📚 API del PermissionService

### Métodos de Permisos

```typescript
// Verificar un permiso individual
hasPermission(permission: string): boolean

// Verificar si tiene TODOS los permisos listados
hasAllPermissions(permissions: string[]): boolean

// Verificar si tiene AL MENOS UN permiso listado
hasAnyPermission(permissions: string[]): boolean

// Verificar si puede realizar una acción específica
canPerformAction(action: string): boolean
// Ej: canPerformAction('users.add') devuelve true si:
//   - Tiene permiso 'users.add' exacto, O
//   - Tiene permiso 'users' (permiso base), O
//   - Tiene ability '*' (acceso total)

// Obtener todos los permisos del usuario
getAllPermissions(): string[]
```

### Métodos de Roles

```typescript
// Verificar un rol individual
hasRole(role: string): boolean

// Verificar si tiene TODOS los roles listados
hasAllRoles(roles: string[]): boolean

// Verificar si tiene AL MENOS UN rol listado
hasAnyRole(roles: string[]): boolean

// Obtener todos los roles del usuario
getAllRoles(): string[]
```

### Métodos de Usuario y Abilities

```typescript
// Obtener información completa del usuario actual
getCurrentUser(): IUser | null

// Obtener las abilities (permisos globales como '*')
getAbilities(): string[]
```

### Observables para Reactividad

```typescript
// Se actualizan automáticamente cuando cambian los permisos
permissionService.permissions$.subscribe(perms => {
  console.log('Permisos actualizados:', perms)
})

// Se actualizan cuando cambian los roles
permissionService.roles$.subscribe(roles => {
  console.log('Roles actualizados:', roles)
})

// Se actualiza cuando cambia el usuario
permissionService.user$.subscribe(user => {
  console.log('Usuario actual:', user)
})

// Se actualizan cuando cambian las abilities
permissionService.abilities$.subscribe(abilities => {
  console.log('Abilities actualizadas:', abilities)
})
```

---

## 🛡️ Proteger Rutas con Guards

Crea un guard personalizado:

```typescript
// src/app/core/guards/permission.guard.ts
import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { PermissionService } from '@/app/core/service/permission.service'

export const hasPermissionGuard: CanActivateFn = (route, state) => {
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
```

Usa el guard en tus rutas:

```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [hasPermissionGuard],
    data: { permission: 'users' },
  },
  {
    path: 'users/add',
    component: AddUserComponent,
    canActivate: [hasPermissionGuard],
    data: { permission: 'users.add' },
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [hasPermissionGuard],
    data: { permission: 'roles' },
  },
]
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Mostrar/Ocultar Botones

```html
<div class="actions">
  <!-- Botón agregar (solo para usuarios con permiso) -->
  <button 
    *appHasPermission="'users.add'"
    class="btn btn-success"
    (click)="openAddForm()">
    ➕ Agregar Usuario
  </button>

  <!-- Botón editar (solo si tienes permiso) -->
  <button 
    *appHasPermission="'users.edit'"
    class="btn btn-warning"
    [disabled]="!selectedUser">
    ✏️ Editar
  </button>

  <!-- Botón eliminar (solo si tienes permiso) -->
  <button 
    *appHasPermission="'users.destroy'"
    class="btn btn-danger"
    [disabled]="!selectedUser">
    🗑️ Eliminar
  </button>
</div>
```

### Ejemplo 2: Menú Dinámico Basado en Permisos

```html
<nav class="sidebar">
  <ul>
    <!-- Usuarios (visible si tienes permiso) -->
    <li *appHasPermission="'users'">
      <a routerLink="/users">👥 Usuarios</a>
    </li>

    <!-- Roles (solo administradores) -->
    <li *appHasRole="'Administrator'">
      <a routerLink="/roles">🔑 Roles</a>
    </li>

    <!-- Configuración (visible si tienes permiso) -->
    <li *appHasPermission="'configuration'">
      <a routerLink="/config">⚙️ Configuración</a>
    </li>
  </ul>
</nav>
```

### Ejemplo 3: Validar Antes de Ejecutar Acción

```typescript
export class UsersService {
  private permissionService = inject(PermissionService)
  private http = inject(HttpClient)

  addUser(userData: any) {
    // Validar permiso antes de hacer la petición
    if (!this.permissionService.canPerformAction('users.add')) {
      throw new Error('No tienes permiso para agregar usuarios')
    }

    return this.http.post('/api/users', userData)
  }

  deleteUser(userId: number) {
    if (!this.permissionService.hasPermission('users.destroy')) {
      throw new Error('No tienes permiso para eliminar usuarios')
    }

    return this.http.delete(`/api/users/${userId}`)
  }
}
```

---

## 🔄 Flujo de Datos

```
1. Usuario inicia sesión (login.component.ts)
                    ↓
2. AutenticacionService recibe los datos del backend
                    ↓
3. AutenticacionService guarda en sessionDataSubject
                    ↓
4. PermissionService escucha cambios en sessionData$
                    ↓
5. PermissionService actualiza sus BehaviorSubjects
                    ↓
6. Los componentes acceden a través de:
   - PermissionService.hasPermission()
   - Directivas (*appHasPermission)
   - Observables (permissions$, roles$)
```

---

## ✅ Checklist de Implementación

- [x] Crear `PermissionService` centralizado
- [x] Crear directivas (`HasPermissionDirective`, `HasRoleDirective`)
- [x] Crear componente de demo
- [x] Documentación completa

**Próximos pasos (opcionales):**
- [ ] Crear guards para proteger rutas
- [ ] Integrar en componentes existentes
- [ ] Crear interceptor para logging de acciones
- [ ] Agregar cache de permisos
- [ ] Agregar invalidación de caché al logout

---

## 🎯 Casos de Uso Típicos

| Caso | Método | Ejemplo |
|------|--------|---------|
| Mostrar botón si tienes permiso | Directiva | `*appHasPermission="'users.add'"` |
| Ejecutar acción solo si tienes permiso | Método | `if (this.perm.hasPermission('users.delete'))` |
| Proteger ruta | Guard | `canActivate: [hasPermissionGuard]` |
| Menú dinámico | Directiva | `*appHasRole="'Administrator'"` |
| Verificar múltiples permisos | Método | `hasAnyPermission(['users.edit', 'users.delete'])` |
| Escuchar cambios | Observable | `this.perm.permissions$.subscribe()` |

---

## 🐛 Troubleshooting

### Los permisos no se cargan
- Verifica que el `AutenticacionService` esté inicializando `sessionDataSubject` correctamente
- Revisa la consola para ver si hay errores

### Las directivas no funcionan
- Asegúrate de importar `HasPermissionDirective` o `HasRoleDirective` en el componente
- Verifica que uses la sintaxis correcta: `*appHasPermission="'permiso'"`

### Los permisos no se actualizan
- El `PermissionService` escucha automáticamente cambios, verifica que el `sessionData$` del `AutenticacionService` se esté actualizando

---

## 📞 Soporte

Para más información, revisa:
- `PERMISSION_USAGE_GUIDE.ts` - Ejemplos de código
- `permission-demo.component.ts` - Componente interactivo con ejemplos
