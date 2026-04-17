# 📋 baseComponent - Referencia Completa

## Estructura y Métodos

Aquí está el contenido **completo** del `baseComponent` actualizado en 2025:

### Ubicación
`src/app/shared/base-component/base-component.ts`

### Imports
```typescript
import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { PermissionService } from '@/app/core/service/permission.service'
import Swal from 'sweetalert2'
import { Column } from '@/app/components/table/table.model'
import { ITableConfig } from '@/app/components/table/table-crud.component'
import { CrudController, ICrudConfig } from '@/app/core/service/crud-controller.service'
```

### Interfaz IFormField

Definida en el mismo archivo:

```typescript
export interface IFormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox'
  required?: boolean
  placeholder?: string
  colSize?: string // 'col-2', 'col-4', 'col-6', 'col-12'
  options?: { label: string; value: any }[]
  validators?: any[]
}
```

---

## Clase baseComponent

### Decorador y Herencia

```typescript
@Component({
  template: '',
})
export abstract class baseComponent implements OnInit, OnDestroy {
```

### Sección 1: Inyecciones

```typescript
protected destroy$ = new Subject<void>()
protected translateService = inject(TranslateService)
protected permissionService = inject(PermissionService)
```

### Sección 2: Propiedades Configurables (Override en subclases)

```typescript
protected modulePermission = ''           // 'users', 'roles', 'products'
protected pageSize = 10
protected crud!: CrudController<any>
protected tableConfig!: ITableConfig<any>
protected currentPage = 1
protected totalRecords = 0
protected isLoading = false
```

### Sección 3: Propiedades de Formulario Modal

```typescript
protected formFields: IFormField[] = []
protected modalTitle = ''
protected modalMode: 'create' | 'edit' | 'view' = 'create'
protected selectedItem: any = null
```

### Sección 4: Ciclo de Vida

```typescript
ngOnInit() {
  this.initializeCrud()
  this.configureTable()
  this.loadItems()
}

ngOnDestroy() {
  this.destroy$.next()
  this.destroy$.complete()
}
```

### Sección 5: Métodos Abstractos

```typescript
/**
 * Retorna la instancia del servicio
 * @example return this.userService
 */
protected abstract getService(): any

/**
 * Define las columnas de la tabla
 */
protected abstract defineColumns(): Column<any>[]

/**
 * Define los campos del formulario modal
 */
protected abstract defineFormFields(): IFormField[]

/**
 * Retorna la configuración del CRUD
 */
protected abstract getCrudConfig(): ICrudConfig<any>
```

### Sección 6: Inicialización CRUD

```typescript
protected initializeCrud(): void {
  if (!this.modulePermission) {
    console.warn(`⚠️ modulePermission no está definido en ${this.constructor.name}`)
    return
  }

  const crudConfig = this.getCrudConfig()
  this.crud = new CrudController<any>(crudConfig)

  this.crud.state$
    .pipe(takeUntil(this.destroy$))
    .subscribe((state) => {
      this.handleCrudStateChange(state)
    })
}

protected configureTable(): void {
  const columns = this.defineColumns()
  this.formFields = this.defineFormFields()

  this.tableConfig = {
    columns,
    data: [],
    pageSize: this.pageSize,
    enablePagination: true,
    searchable: true,
    enableCreate: this.permissionService.hasPermission(`${this.modulePermission}.add`),
    enableEdit: this.permissionService.hasPermission(`${this.modulePermission}.edit`),
    enableDelete: this.permissionService.hasPermission(`${this.modulePermission}.destroy`),
    enableView: this.permissionService.hasPermission(`${this.modulePermission}.view`),
    enableHistory: this.permissionService.hasPermission(`${this.modulePermission}.historial`),
    permissionModule: this.modulePermission,
    tableClass: 'table-striped dt-responsive nowrap w-100',
    onCreateClick: () => this.onCreateClick(),
    onEditClick: (row) => this.onEditClick(row),
    onDeleteClick: (row) => this.onDeleteClick(row),
    onViewClick: (row) => this.onViewClick(row),
    onHistoryClick: (row) => this.onHistoryClick(row),
  }
}
```

### Sección 7: Carga de Datos

```typescript
protected loadItems(page: number = 1): void {
  if (!this.crud) return

  this.isLoading = true

  this.crud.loadItems(page, this.pageSize).subscribe({
    next: () => {
      this.isLoading = false
      this.currentPage = page
      this.totalRecords = this.crud.total
      if (this.tableConfig) {
        this.tableConfig.data = this.crud.items
      }
    },
    error: (err) => {
      this.isLoading = false
      this.showError(this.translateService.instant('errors.load'), err?.message)
    },
  })
}

protected handleCrudStateChange(state: any): void {
  this.isLoading = state.isLoading
  this.currentPage = state.currentPage
  this.pageSize = state.pageSize
  this.totalRecords = state.total

  if (this.tableConfig) {
    this.tableConfig.data = state.items
  }

  if (state.error) {
    this.showError(this.translateService.instant('errors.error'), state.error)
  }
}
```

### Sección 8: Acciones CRUD

```typescript
protected onCreateClick(): void {
  this.modalMode = 'create'
  this.selectedItem = null
  this.modalTitle = this.translateService.instant('actions.create')
  this.openModal()
}

protected onEditClick(item: any): void {
  this.modalMode = 'edit'
  this.selectedItem = item

  if (item.id) {
    this.crud.getById(item.id).subscribe({
      next: (data) => {
        this.selectedItem = data
        this.modalTitle = this.translateService.instant('actions.edit')
        this.openModal()
      },
      error: (err) =>
        this.showError(
          this.translateService.instant('errors.error'),
          this.translateService.instant('errors.load_record')
        ),
    })
  }
}

protected onViewClick(item: any): void {
  this.modalMode = 'view'
  this.selectedItem = item
  this.modalTitle = this.translateService.instant('actions.view')
  this.openModal()
}

protected onDeleteClick(item: any): void {
  if (!item.id) return

  const itemLabel = this.getItemLabel(item)

  Swal.fire({
    title: this.translateService.instant('confirmations.delete_title'),
    text: this.translateService.instant('confirmations.delete_text', { item: itemLabel }),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: this.translateService.instant('actions.delete'),
    cancelButtonText: this.translateService.instant('actions.cancel'),
  }).then((result) => {
    if (result.isConfirmed) {
      this.crud.delete(item.id).subscribe({
        next: () => {
          this.showSuccess(this.translateService.instant('messages.deleted_success'))
          this.loadItems(this.currentPage)
        },
        error: (err) =>
          this.showError(
            this.translateService.instant('errors.delete'),
            err?.message
          ),
      })
    }
  })
}

protected onHistoryClick(item: any): void {
  console.log('Ver historial:', item)
  Swal.fire({
    title: this.translateService.instant('actions.history'),
    html: `<p>${this.getItemLabel(item)}</p>`,
    icon: 'info',
  })
}
```

### Sección 9: Modal

```typescript
protected openModal(): void {
  // TODO: Será reemplazado por componente modal genérico
  Swal.fire({
    title: this.modalTitle,
    html: `<p>Modal genérica será implementada</p>`,
    icon: 'info',
  })
}

protected closeModal(): void {
  this.selectedItem = null
  this.formFields = []
}
```

### Sección 10: Submit Formulario

```typescript
protected submitForm(formData: any): void {
  if (!formData.id && this.modalMode === 'create') {
    this.crud.create(formData).subscribe({
      next: () => {
        this.showSuccess(this.translateService.instant('messages.created_success'))
        this.closeModal()
        this.loadItems(1)
      },
      error: (err) =>
        this.showError(
          this.translateService.instant('errors.create'),
          err?.message
        ),
    })
  } else if (formData.id && this.modalMode === 'edit') {
    this.crud.update(formData.id, formData).subscribe({
      next: () => {
        this.showSuccess(this.translateService.instant('messages.updated_success'))
        this.closeModal()
        this.loadItems(this.currentPage)
      },
      error: (err) =>
        this.showError(
          this.translateService.instant('errors.update'),
          err?.message
        ),
    })
  }
}
```

### Sección 11: Event Handlers (Eventos de Tabla)

```typescript
public onTableAction(event: any): void {
  const { action, data } = event

  switch (action) {
    case 'create':
      this.onCreateClick()
      break
    case 'edit':
      this.onEditClick(data)
      break
    case 'delete':
      this.onDeleteClick(data)
      break
    case 'view':
      this.onViewClick(data)
      break
    case 'history':
      this.onHistoryClick(data)
      break
  }
}

public onPageChange(page: number): void {
  this.loadItems(page)
}

public onSearch(query: string): void {
  console.log('Búsqueda:', query)
  // Override en subclase si se necesita búsqueda personalizada
}
```

### Sección 12: Utilidades

```typescript
protected getItemLabel(item: any): string {
  return item.name || item.email || item.title || `Item #${item.id}`
}

protected showSuccess(message: string): void {
  Swal.fire({
    title: this.translateService.instant('messages.success'),
    text: message,
    icon: 'success',
    timer: 2000,
  })
}

protected showError(title: string, message: string): void {
  Swal.fire({
    title,
    text: message,
    icon: 'error',
  })
}

protected showWarning(title: string, message: string): void {
  Swal.fire({
    title,
    text: message,
    icon: 'warning',
  })
}

protected showInfo(title: string, message: string): void {
  Swal.fire({
    title,
    text: message,
    icon: 'info',
  })
}
```

---

## 📊 Diagrama de Métodos

```
baseComponent
│
├─ Ciclo de Vida
│  ├─ ngOnInit()
│  └─ ngOnDestroy()
│
├─ Métodos Abstractos (implementar en subclase)
│  ├─ getService()
│  ├─ getCrudConfig()
│  ├─ defineColumns()
│  ├─ defineFormFields()
│  └─ getItemLabel()
│
├─ Inicialización
│  ├─ initializeCrud()
│  ├─ configureTable()
│  └─ loadItems()
│
├─ Datos
│  └─ handleCrudStateChange()
│
├─ CRUD Operations
│  ├─ onCreateClick()
│  ├─ onEditClick()
│  ├─ onDeleteClick()
│  ├─ onViewClick()
│  └─ onHistoryClick()
│
├─ Modal
│  ├─ openModal()
│  └─ closeModal()
│
├─ Formulario
│  └─ submitForm()
│
├─ Eventos de Tabla
│  ├─ onTableAction()
│  ├─ onPageChange()
│  └─ onSearch()
│
└─ Utilidades
   ├─ getItemLabel()
   ├─ showSuccess()
   ├─ showError()
   ├─ showWarning()
   └─ showInfo()
```

---

## 🔗 Relaciones de Dependencias

```
baseComponent
│
├─ CrudController     (manages state and API calls)
├─ ITableConfig       (configuration for table)
├─ Column[]           (table columns)
├─ IFormField[]       (form fields)
├─ TranslateService   (translations)
└─ PermissionService  (permission checks)
```

---

## 💾 Archivo Completo

El archivo completo está en:
`src/app/shared/base-component/base-component.ts`

**Tamaño**: ~450 líneas (incluyendo comentarios)
**Métodos**: 25+ métodos
**Interfases**: 1 (IFormField)
**Propiedades**: 15+ propiedades

