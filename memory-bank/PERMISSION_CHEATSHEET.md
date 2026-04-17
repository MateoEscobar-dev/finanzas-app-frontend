# 🎯 Hoja de Trucos - Sistema de Permisos

## Inyectar el servicio
```typescript
import { inject } from '@angular/core'
import { PermissionService } from '@/app/core/service/permission.service'

export class MyComponent {
  perm = inject(PermissionService)
}
```

---

## Verificar Permisos (TypeScript)

| Caso | Código |
|------|--------|
| ¿Tiene un permiso? | `this.perm.hasPermission('users.add')` |
| ¿Tiene TODOS? | `this.perm.hasAllPermissions(['users.add', 'users.edit'])` |
| ¿Tiene ALGUNO? | `this.perm.hasAnyPermission(['users.add', 'users.edit'])` |
| ¿Puede hacer acción? | `this.perm.canPerformAction('users.add')` |
| Obtener todos | `this.perm.getAllPermissions()` |

---

## Verificar Roles (TypeScript)

| Caso | Código |
|------|--------|
| ¿Tiene un rol? | `this.perm.hasRole('Administrator')` |
| ¿Tiene TODOS? | `this.perm.hasAllRoles(['Admin', 'SuperAdmin'])` |
| ¿Tiene ALGUNO? | `this.perm.hasAnyRole(['Admin', 'Manager'])` |
| Obtener todos | `this.perm.getAllRoles()` |

---

## Mostrar/Ocultar en HTML

| Caso | Código |
|------|--------|
| Si tienes permiso | `<button *appHasPermission="'users.add'">Agregar</button>` |
| Si tienes alguno | `<button *appHasPermission="['edit', 'delete']">Editar</button>` |
| Si tienes TODOS | `<div *appHasPermission="['add', 'edit']; appHasPermissionStrategy: 'all'">` |
| Si tienes rol | `<nav *appHasRole="'Administrator'">Admin</nav>` |
| Si tienes algún rol | `<div *appHasRole="['Admin', 'Manager']">Staff</div>` |

---

## Guards para Rutas

```typescript
import { hasPermissionGuard, hasRoleGuard } from '@/app/core/guards/permission.guard'

// Proteger por permiso
{
  path: 'users',
  component: UsersComponent,
  canActivate: [hasPermissionGuard],
  data: { permission: 'users' }
}

// Proteger por rol
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [hasRoleGuard],
  data: { role: 'Administrator' }
}

// Requerir TODOS los permisos
{
  path: 'special',
  component: SpecialComponent,
  canActivate: [hasAllPermissionsGuard],
  data: { permissions: ['users.edit', 'users.destroy'] }
}

// Requerir AL MENOS UN permiso
{
  path: 'content',
  component: ContentComponent,
  canActivate: [hasAnyPermissionGuard],
  data: { permissions: ['edit', 'create'] }
}
```

---

## Observables (Reactividad)

```typescript
// Escuchar cambios en permisos
this.perm.permissions$.subscribe(perms => {
  console.log('Permisos actualizados:', perms)
})

// Escuchar cambios en roles
this.perm.roles$.subscribe(roles => {
  console.log('Roles:', roles)
})

// Escuchar cambios en usuario
this.perm.user$.subscribe(user => {
  console.log('Usuario:', user)
})

// Escuchar abilities
this.perm.abilities$.subscribe(abilities => {
  console.log('Abilities:', abilities)
})
```

---

## Información del Usuario

```typescript
// Usuario actual
const user = this.perm.getCurrentUser()
console.log(user.email)

// Abilities (permisos globales)
const abilities = this.perm.getAbilities()
```

---

## Validar Antes de Actuar

```typescript
deleteUser(userId: number) {
  // Opción 1: Usar canPerformAction
  if (!this.perm.canPerformAction('users.destroy')) {
    alert('No tienes permiso')
    return
  }

  // Opción 2: Usar hasPermission
  if (!this.perm.hasPermission('users.destroy')) {
    alert('No tienes permiso')
    return
  }

  // Proceder con la acción
  this.api.deleteUser(userId).subscribe()
}
```

---

## Casos de Uso Rápidos

### 1️⃣ Mostrar botón solo para admins
```html
<button *appHasRole="'Administrator'" (click)="doAdmin()">
  Admin Panel
</button>
```

### 2️⃣ Menú dinámico
```html
<nav>
  <a *appHasPermission="'users'" routerLink="/users">Usuarios</a>
  <a *appHasPermission="'roles'" routerLink="/roles">Roles</a>
  <a *appHasPermission="'config'" routerLink="/config">Config</a>
</nav>
```

### 3️⃣ Validar en componente
```typescript
add() {
  if (this.perm.canPerformAction('users.add')) {
    this.service.addUser(...)
  }
}
```

### 4️⃣ Tabla con acciones condicionales
```html
<table>
  <tr *ngFor="let user of users">
    <td>{{ user.email }}</td>
    <td>
      <button *appHasPermission="'users.edit'">Editar</button>
      <button *appHasPermission="'users.destroy'">Eliminar</button>
    </td>
  </tr>
</table>
```

### 5️⃣ Proteger ruta
```typescript
{
  path: 'users/add',
  component: AddUserComponent,
  canActivate: [hasPermissionGuard],
  data: { permission: 'users.add' }
}
```

---

## Debugging en Consola

```javascript
// Obtener el servicio
const perm = ng.coreInjector().get(PermissionService)

// Ver permisos
perm.getAllPermissions()

// Ver roles
perm.getAllRoles()

// Ver usuario
perm.getCurrentUser()

// Probar permiso
perm.hasPermission('users.add')

// Probar rol
perm.hasRole('Administrator')

// Ver todo
console.log({
  permisos: perm.getAllPermissions(),
  roles: perm.getAllRoles(),
  usuario: perm.getCurrentUser(),
  abilities: perm.getAbilities()
})
```

---

## ✅ Checklist de Implementación

- [ ] Importar `PermissionService` donde lo necesites
- [ ] Usar directivas en templates con `*appHasPermission`
- [ ] Validar permisos antes de acciones sensibles
- [ ] Proteger rutas con guards
- [ ] Agregar ruta `/unauthorized` para acceso denegado
- [ ] Testear con diferentes roles/permisos

---

## 📌 Reglas de Oro

1. **Siempre validar en backend** - El frontend es solo decorativo
2. **Usar `canPerformAction`** para acciones específicas como 'users.add'
3. **Usar directivas** para UI (mostrar/ocultar botones)
4. **Usar guards** para proteger rutas
5. **Mantener localStorage sincronizado** - El servicio lo hace automáticamente

---

## 🔗 Archivos Relacionados

- `src/app/core/service/permission.service.ts` - Servicio principal
- `src/app/core/guards/permission.guard.ts` - Guards para rutas
- `src/app/core/guards/has-permission.directive.ts` - Directiva de permisos
- `src/app/core/guards/has-role.directive.ts` - Directiva de roles
- `PERMISSION_SYSTEM_README.md` - Documentación completa
- `QUICK_INTEGRATION_GUIDE.md` - Guía de integración

---

## 💬 Preguntas Frecuentes

**P: ¿Dónde verifico los permisos?**  
R: En `this.permissionService.getAllPermissions()` o en localStorage

**P: ¿Cómo agregar un permiso nuevo?**  
R: Solo viene del backend en el login, el frontend solo lo consulta

**P: ¿Se actualizan automáticamente?**  
R: Sí, el `PermissionService` escucha cambios en `AutenticacionService`

**P: ¿Funciona sin internet?**  
R: Sí, los permisos se guardan en localStorage

**P: ¿Puedo cambiar permisos sin recargar?**  
R: Sí, actualiza `sessionData$` en `AutenticacionService`
