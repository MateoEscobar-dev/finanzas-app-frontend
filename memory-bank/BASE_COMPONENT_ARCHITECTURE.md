# 🏗️ Base Component Architecture - CRUD Refactor

## Resumen

Se ha refactorizado `baseComponent` para centralizar toda la lógica repetitiva de CRUD, eliminando código duplicado en componentes como `UsersComponent`. 

Ahora los componentes específicos solo definen:
- ✅ Configuración (modulePermission, pageSize)
- ✅ Columnas de tabla (defineColumns)
- ✅ Campos del formulario (defineFormFields)
- ✅ Configuración CRUD (getCrudConfig)

La lógica base se heredada de `baseComponent` y puede ser overrideada si es necesario.

---

## 📊 Antes vs Después

### ANTES (UsersComponent) - 250+ líneas
```typescript
export class UsersComponent extends baseComponent implements OnInit, OnDestroy {
  crud!: CrudController<IUser>
  tableConfig!: ITableConfig<IUser>
  currentPage = 1
  pageSize = 10
  totalRecords = 0
  isLoading = false

  ngOnInit() {
    this.initializeCrud()
    this.loadUsers()
  }

  private initializeCrud() { /* ... 20 líneas ... */ }
  private configureTable() { /* ... 30 líneas ... */ }
  private loadItems(page) { /* ... 15 líneas ... */ }
  private onCreateClick() { /* ... 10 líneas ... */ }
  private onEditClick(user) { /* ... 15 líneas ... */ }
  private onDeleteClick(user) { /* ... 20 líneas ... */ }
  // ... más métodos ...
}
```

### DESPUÉS (UsersComponent) - 100 líneas
```typescript
export class UsersComponent extends baseComponent {
  private userService = inject(UserService)
  protected override modulePermission = 'users'

  protected override getService() {
    return this.userService
  }

  protected override getCrudConfig(): ICrudConfig<any> {
    return {
      service: this.userService,
      modulePermission: this.modulePermission,
      pageSize: this.pageSize,
    }
  }

  protected override defineColumns(): Column<any>[] {
    return [ /* columnas */ ]
  }

  protected override defineFormFields(): IFormField[] {
    return [ /* campos */ ]
  }

  protected override getItemLabel(item: any): string {
    return item.email || `Usuario #${item.id}`
  }
}
```

---

## 🔧 Métodos Abstractos (deben implementarse)

### 1. `getService(): CommonService<T>`
Retorna la instancia del servicio (UserService, RoleService, etc.)

```typescript
protected override getService() {
  return this.userService
}
```

### 2. `getCrudConfig(): ICrudConfig<T>`
Define la configuración del controlador CRUD

```typescript
protected override getCrudConfig(): ICrudConfig<any> {
  return {
    service: this.userService,
    modulePermission: this.modulePermission,
    pageSize: this.pageSize,
  }
}
```

### 3. `defineColumns(): Column<T>[]`
Define las columnas de la tabla

```typescript
protected override defineColumns(): Column<any>[] {
  return [
    { header: 'columns.id', accessor: 'id', defaultCanSort: true },
    { header: 'columns.email', accessor: 'email', defaultCanSort: true },
  ]
}
```

### 4. `defineFormFields(): IFormField[]`
Define los campos del formulario modal

```typescript
protected override defineFormFields(): IFormField[] {
  return [
    {
      name: 'email',
      label: 'columns.email',
      type: 'email',
      required: true,
      colSize: 'col-12',
    },
  ]
}
```

### 5. `getItemLabel(item: T): string`
Retorna el label del item para mensajes (email, nombre, etc)

```typescript
protected override getItemLabel(item: any): string {
  return item.email || item.first_name || `Usuario #${item.id}`
}
```

---

## 📋 Configuración Base

### Propiedades Configurables

```typescript
// En la subclase
protected override modulePermission = 'users'  // 'roles', 'products', etc
protected pageSize = 10                         // 5, 20, 50, etc
```

### Propiedades Heredadas

```typescript
protected destroy$: Subject<void>
protected translateService: TranslateService
protected permissionService: PermissionService
protected crud: CrudController<any>
protected tableConfig: ITableConfig<any>
protected currentPage: number
protected totalRecords: number
protected isLoading: boolean
protected formFields: IFormField[]
protected modalTitle: string
protected modalMode: 'create' | 'edit' | 'view'
protected selectedItem: any
```

---

## 🎯 Métodos Base Implementados

### Ciclo de Vida
- ✅ `ngOnInit()` - Llama initializeCrud, configureTable, loadItems
- ✅ `ngOnDestroy()` - Cleanup de observables

### Inicialización
- ✅ `initializeCrud()` - Crea CrudController y subscripción
- ✅ `configureTable()` - Crea ITableConfig basado en columnas y permisos
- ✅ `loadItems(page)` - Carga datos desde el backend

### CRUD Completo
- ✅ `onCreateClick()` - Prepara modal para crear
- ✅ `onEditClick(item)` - Carga item y prepara modal para editar
- ✅ `onDeleteClick(item)` - Muestra confirmación y elimina
- ✅ `onViewClick(item)` - Prepara modal en modo view
- ✅ `onHistoryClick(item)` - Muestra historial

### Formulario
- ✅ `submitForm(formData)` - Crea o actualiza según modalMode
- ✅ `openModal()` - Abre el modal (placeholder por ahora)
- ✅ `closeModal()` - Limpia estado del modal

### Eventos de Tabla
- ✅ `onTableAction(event)` - Router de acciones (create, edit, delete, view, history)
- ✅ `onPageChange(page)` - Carga página específica
- ✅ `onSearch(query)` - Hook para búsqueda personalizada

### Utilidades
- ✅ `showSuccess(message)` - SweetAlert2 success
- ✅ `showError(title, message)` - SweetAlert2 error
- ✅ `showWarning(title, message)` - SweetAlert2 warning
- ✅ `showInfo(title, message)` - SweetAlert2 info

---

## 🔄 Override Ejemplos

### Ejemplo 1: Personalizar búsqueda
```typescript
export class ProductsComponent extends baseComponent {
  protected override onSearch(query: string): void {
    // Lógica personalizada
    console.log('Búsqueda en productos:', query)
    
    // Luego llamar a lógica base si lo necesitas
    super.onSearch(query)
  }
}
```

### Ejemplo 2: Validación antes de eliminar
```typescript
export class RolesComponent extends baseComponent {
  private roleService = inject(RoleService)

  protected override onDeleteClick(item: any): void {
    // Verificar si el rol está en uso
    if (item.users_count > 0) {
      this.showWarning('No se puede eliminar', 'Este rol tiene usuarios asignados')
      return
    }

    // Continuar con lógica base
    super.onDeleteClick(item)
  }
}
```

### Ejemplo 3: Lógica personalizada después de crear
```typescript
export class CategoriesComponent extends baseComponent {
  protected override submitForm(formData: any): void {
    // Procesamiento previo
    formData.slug = this.generateSlug(formData.name)

    // Lógica base
    super.submitForm(formData)

    // Lógica post (en subscribe si es necesario)
    this.crud.create(formData).subscribe({
      next: () => {
        // Lógica específica después de crear
        this.loadRelatedData()
        super.submitForm(formData)
      }
    })
  }
}
```

---

## 📝 Interfaz IFormField

Define cómo se renderizará cada campo del formulario:

```typescript
interface IFormField {
  name: string                                           // 'email', 'first_name'
  label: string                                          // 'columns.email' (traducción)
  type: 'text' | 'email' | 'password' | 'number' | 
        'date' | 'select' | 'textarea' | 'checkbox'     // Tipo de input
  required?: boolean                                     // Requerido o no
  placeholder?: string                                   // Placeholder del input
  colSize?: string                                       // 'col-2', 'col-4', 'col-6', 'col-12'
  options?: { label: string; value: any }[]            // Para select
  validators?: any[]                                     // Validadores (futuro)
}
```

### Ejemplo de campos
```typescript
protected override defineFormFields(): IFormField[] {
  return [
    {
      name: 'email',
      label: 'columns.email',
      type: 'email',
      required: true,
      placeholder: 'usuario@ejemplo.com',
      colSize: 'col-12',
    },
    {
      name: 'role',
      label: 'labels.role',
      type: 'select',
      required: true,
      colSize: 'col-6',
      options: [
        { label: 'Administrator', value: 1 },
        { label: 'User', value: 2 },
      ],
    },
  ]
}
```

---

## 🌍 Traducciones Usadas

El baseComponent usa estas claves de traducción automáticamente:

```
actions.*              → create, edit, delete, view, history, save, cancel
columns.*              → id, email, first_name, last_name, phone, status
status.*               → active, inactive, pending, completed, etc
errors.*               → error, load, create, update, delete
confirmations.*        → delete_title, delete_text
messages.*             → success, created_success, updated_success, deleted_success
labels.*               → password, username, full_name, role, email_address, etc
```

Las columnas y campos pueden usar cualquier clave que tengas en i18n.

---

## 💡 Flujo Completo

```
1. Component extends baseComponent
   ↓
2. Define métodos abstractos (columnas, campos, config)
   ↓
3. ngOnInit() ejecuta:
   - initializeCrud()
   - configureTable()
   - loadItems()
   ↓
4. Tabla se renderiza con datos
   ↓
5. Usuario hace click en botón
   ↓
6. onTableAction() router a:
   - onCreateClick()
   - onEditClick()
   - onDeleteClick()
   - onViewClick()
   - onHistoryClick()
   ↓
7. openModal() abre formulario genérico
   ↓
8. submitForm() crea/actualiza/elimina
   ↓
9. loadItems() recarga tabla
```

---

## ✨ Beneficios

✅ **DRY (Don't Repeat Yourself)** - Lógica compartida en baseComponent
✅ **Mantenibilidad** - Cambios en un solo lugar benefician todos los módulos
✅ **Escalabilidad** - Fácil agregar nuevos módulos CRUD
✅ **Consistencia** - Todos los módulos usan mismo patrón
✅ **Flexibilidad** - Override de métodos cuando se necesita lógica especial
✅ **Menos código** - Componentes específicos muy simples

---

## 🚀 Próximos Pasos

1. **Crear componente modal genérico** para reemplazar SweetAlert
2. **Implementar componentes adicionales** (Roles, Productos, etc) siguiendo el patrón
3. **Agregar validación de formularios** con validadores
4. **Integrar búsqueda backend** con Condicion[]
5. **Agregar más utilidades** (exportar a Excel, imprimir, etc)

