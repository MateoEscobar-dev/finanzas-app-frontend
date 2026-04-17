# Feature: Activar/Desactivar Registros

## Descripción
Esta feature permite activar y desactivar registros en cualquier módulo CRUD de la aplicación. Los botones se muestran de forma condicional basándose en el estado actual del registro:
- Si el registro está **desactivado** → se muestra el botón **Activar**
- Si el registro está **activado** → se muestra el botón **Desactivar**

## Cambios Realizados

### 1. **CommonService** (`src/app/core/service/common.service.ts`)
Se agregaron dos nuevos métodos HTTP:

```typescript
// POST /api/{entity}/{id}/activate
activate(id: TKey): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/${id}/activate`, {}, {
    headers: this.getHeaders(),
  }).pipe(catchError((error) => this.handleError(error)))
}

// POST /api/{entity}/{id}/deactivate
deactivate(id: TKey): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/${id}/deactivate`, {}, {
    headers: this.getHeaders(),
  }).pipe(catchError((error) => this.handleError(error)))
}
```

### 2. **ITableConfig Interface** (`src/app/components/table/table-crud.component.ts`)
Se extendió la interfaz con 4 nuevas propiedades:

```typescript
export interface ITableConfig<T> {
  // ... existing properties ...
  
  // Activar/Desactivar
  enableActivate?: boolean                    // Toggle para mostrar feature
  activeFieldName?: string                    // Nombre del campo que indica estado (ej: 'active')
  onActivateClick?: (row: T) => void         // Callback personalizado para activar
  onDeactivateClick?: (row: T) => void       // Callback personalizado para desactivar
}
```

### 3. **baseComponent** (`src/app/shared/base-component/base-component.ts`)

#### A. Métodos de Activación
Se agregaron dos métodos protegidos con lógica completa:

```typescript
protected onActivateClick(item: any): void {
  // Muestra confirmación con SweetAlert
  // Llama a CommonService.activate(id)
  // Recarga los datos después de la operación
  // Maneja errores con notificaciones
}

protected onDeactivateClick(item: any): void {
  // Similar a onActivateClick pero para desactivar
}
```

#### B. Configuración de Tabla
Se actualizó `configureTable()` para incluir:
- `enableActivate`: obtiene permiso de `${modulePermission}.activate`
- `activeFieldName`: establece por defecto a 'active'
- `onActivateClick` y `onDeactivateClick`: callbacks apuntando a los métodos base

```typescript
protected configureTable(): void {
  // ... existing code ...
  this.tableConfig = {
    // ... existing config ...
    enableActivate: this.permissionService.hasPermission(`${this.modulePermission}.activate`),
    activeFieldName: 'active',
    onActivateClick: (row) => this.onActivateClick(row),
    onDeactivateClick: (row) => this.onDeactivateClick(row),
  }
}
```

#### C. Event Handler
Se actualizó `onTableAction()` para manejar los nuevos eventos:

```typescript
public onTableAction(event: any): void {
  const { action, data } = event
  switch (action) {
    // ... existing cases ...
    case 'activate':
      this.onActivateClick(data)
      break
    case 'deactivate':
      this.onDeactivateClick(data)
      break
  }
}
```

### 4. **TableComponent** (`src/app/components/table/table-crud.component.ts`)

#### A. Propiedad de Permisos
Se agregó la propiedad de permiso:
```typescript
canActivate = false
```

#### B. Métodos de Inicialización
Se actualizó `initializePermissions()` para:
- Verificar permisos de `${module}.activate`
- Escuchar cambios de permisos para actualizar `canActivate`

#### C. Métodos de Eventos
Se agregaron dos métodos que deleguen a callbacks o emitan eventos:

```typescript
onActivateClick(row: T): void {
  if (this.config.onActivateClick) {
    this.config.onActivateClick(row)
  } else {
    this.rowAction.emit({ action: 'activate', data: row })
  }
}

onDeactivateClick(row: T): void {
  if (this.config.onDeactivateClick) {
    this.config.onDeactivateClick(row)
  } else {
    this.rowAction.emit({ action: 'deactivate', data: row })
  }
}
```

#### D. Métodos Helper
Se agregaron dos métodos para verificar el estado del registro:

```typescript
isActive(row: T): boolean {
  if (!this.config.activeFieldName) return false
  return (row as any)[this.config.activeFieldName] === true
}

isInactive(row: T): boolean {
  if (!this.config.activeFieldName) return false
  return (row as any)[this.config.activeFieldName] !== true
}
```

### 5. **TableComponent Template** (`src/app/components/table/table-crud.component.html`)

Se agregaron dos botones nuevos en la columna de acciones:

```html
<!-- Botón Activar (solo si registro está inactivo) -->
@if (config.enableActivate && isInactive(row) && canActivate) {
  <button
    type="button"
    class="btn btn-success"
    [title]="'actions.activate' | translate"
    (click)="onActivateClick(row)"
    [disabled]="isLoading"
  >
    <i class="mdi mdi-check-circle"></i>
  </button>
}

<!-- Botón Desactivar (solo si registro está activo) -->
@if (config.enableActivate && isActive(row) && canActivate) {
  <button
    type="button"
    class="btn btn-warning"
    [title]="'actions.deactivate' | translate"
    (click)="onDeactivateClick(row)"
    [disabled]="isLoading"
  >
    <i class="mdi mdi-close-circle"></i>
  </button>
}
```

## Cómo Usar en un Módulo

La feature se activa automáticamente en cualquier módulo que extienda `baseComponent`. No requiere configuración adicional:

1. **Backend** debe tener:
   - Campo `active` (o similar, configurable via `activeFieldName`) en la tabla de datos
   - Endpoints: `POST /api/{entity}/{id}/activate` y `POST /api/{entity}/{id}/deactivate`

2. **Permisos** deben incluir:
   - `{module}.activate` (ej: `users.activate`)

3. **En el componente**:
   - La feature se configura automáticamente en `configureTable()`
   - Se pueden sobrescribir métodos si se necesita lógica personalizada:
   ```typescript
   protected override onActivateClick(item: any): void {
     // Lógica personalizada
   }
   ```

## Flujo de Uso

1. **Usuario ve tabla** con registros que tienen estado activo/inactivo
2. **Usuario hace clic** en botón Activar o Desactivar
3. **Se muestra confirmación** con SweetAlert2
4. **Si confirma**:
   - Se envía POST a `/api/{entity}/{id}/activate` o `deactivate`
   - Se muestra notificación de éxito
   - Se recargan los datos
5. **Si hay error**:
   - Se muestra notificación de error

## Atajos de Iconos
- Activar: `mdi-check-circle` (verde) - Indica que será activado
- Desactivar: `mdi-close-circle` (naranja/warning) - Indica precaución

## Traduciones Necesarias
Las siguientes claves han sido agregadas a los archivos i18n en **todos los idiomas** (EN, ES, GR, IT, RU):
- `actions.activate` - "Activar"
- `actions.deactivate` - "Desactivar"  
- `actions.confirm` - "Confirmar"

**Ubicación**: `/src/assets/i18n/actions/{idioma}.json`

### Valores por Idioma:
| Clave | EN | ES | GR | IT | RU |
|-------|----|----|----|----|-----|
| activate | Activate | Activar | Ενεργοποίηση | Attivare | Активировать |
| deactivate | Deactivate | Desactivar | Απενεργοποίηση | Disattivare | Деактивировать |
| confirm | Confirm | Confirmar | Επιβεβαίωση | Confermare | Подтвердить |

## Atajos de Iconos
- Activar: `mdi-check-circle` (verde) - Indica que será activado
- Desactivar: `mdi-close-circle` (naranja/warning) - Indica precaución

## Testing
Para probar la feature:
1. Acceder a cualquier módulo (Users, Roles, etc.)
2. Verificar que los registros muestren estado activo/inactivo
3. Hacer clic en botones de Activar/Desactivar
4. Confirmar la acción
5. Verificar que los datos se recargen y el estado cambie

## Mejoras Realizadas

### 1. Métodos Helper Robustos
Los métodos `isActive()` e `isInactive()` ahora soportan múltiples formatos:
- **Boolean**: `true` / `false`
- **String**: `'1'` / `'0'`
- **Number**: `1` / `0`
- **Null/Undefined**: Tratado como inactivo

```typescript
isActive(row: T): boolean {
  if (!this.config.activeFieldName) return false
  const value = (row as any)[this.config.activeFieldName]
  return value === true || value === 1 || value === '1'
}
```

### 2. Renderizado Condicional de Columna
La columna de acciones ahora se renderiza si hay **cualquiera** de estas opciones habilitadas:
- `enableEdit`
- `enableDelete`
- `enableView`
- `enableHistory`
- **`enableActivate`** ✅ (Nueva)

Esto asegura que los botones de activar/desactivar sean visibles incluso si son los únicos botones.

### 3. Colspan Dinámico
El colspan para la fila "No data to display" también incluye la columna de acciones si `enableActivate` está habilitado.

## Estado de Compilación
✅ Build exitosa sin errores
✅ Todos los tipos TypeScript validados
✅ Componentes standalone listos para usar
✅ Traduciones completas en 5 idiomas
