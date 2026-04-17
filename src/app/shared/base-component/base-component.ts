import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { PermissionService } from '@/app/core/service/permission.service'
import Swal from 'sweetalert2'
import { Column } from '@/app/components/table/table.model'
import { ITableConfig } from '@/app/components/table/table-crud.component'
import {
  CrudController,
  ICrudConfig,
} from '@/app/core/service/crud-controller.service'

export interface IFormField {
  name: string
  label: string
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'date'
    | 'select'
    | 'textarea'
    | 'checkbox'
  required?: boolean
  placeholder?: string
  colSize?: string // 'col-2', 'col-4', 'col-6', 'col-12'
  options?: { label: string; value: any }[]
  validators?: any[]
  hidden?: boolean // Campo para ocultar el field en el modal
  disabled?: boolean // Campo para deshabilitar la edición (solo lectura)
}

@Component({
  template: '',
})
export abstract class baseComponent implements OnInit, OnDestroy {
  // =========================================
  // INYECCIONES
  // =========================================
  protected destroy$ = new Subject<void>()
  protected translateService = inject(TranslateService)
  protected permissionService = inject(PermissionService)

  // =========================================
  // PROPIEDADES CONFIGURABLES (override en subclases)
  // =========================================
  protected modulePermission = '' // Ej: 'users', 'roles', 'products'
  protected pageSize = 10
  protected crud!: CrudController<any>
  protected tableConfig!: ITableConfig<any>
  protected currentPage = 1
  protected totalRecords = 0
  protected isLoading = false

  // =========================================
  // PROPIEDADES DE FORMULARIO MODAL
  // =========================================
  protected formFields: IFormField[] = []
  protected modalTitle = ''
  protected modalMode: 'create' | 'edit' | 'view' = 'create'
  protected selectedItem: any = null
  protected isModalVisible = false
  protected isModalSubmitting = false

  // =========================================
  // PROPIEDADES DE HISTORIAL
  // =========================================
  protected isHistoryModalVisible = false
  protected historyLogs: any[] = []
  protected selectedHistoryItem: any = null

  ngOnInit() {
    this.initializeCrud()
    this.configureTable()
    this.loadItems()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  // =========================================
  // MÉTODOS ABSTRACTOS (deben implementarse en subclases)
  // =========================================

  /**
   * Retorna la instancia del servicio (UserService, RoleService, etc.)
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

  // =========================================
  // INICIALIZACIÓN CRUD (Base Implementation)
  // =========================================

  protected initializeCrud(): void {
    if (!this.modulePermission) {
      console.warn(
        `⚠️ modulePermission no está definido en ${this.constructor.name}`
      )
      return
    }

    const crudConfig = this.getCrudConfig()
    this.crud = new CrudController<any>(crudConfig)

    // Escuchar cambios de estado
    this.crud.state$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
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
      enableCreate: this.permissionService.hasPermission(
        `${this.modulePermission}.add`
      ),
      enableEdit: this.permissionService.hasPermission(
        `${this.modulePermission}.edit`
      ),
      enableDelete: this.permissionService.hasPermission(
        `${this.modulePermission}.destroy`
      ),
      enableView: this.permissionService.hasPermission(
        `${this.modulePermission}.view`
      ),
      enableHistory: this.permissionService.hasPermission(
        `${this.modulePermission}.historial`
      ),
      enableActivate: this.permissionService.hasPermission(
        `${this.modulePermission}.activate`
      ),
      activeFieldName: 'active',
      permissionModule: this.modulePermission,
      tableClass: 'table-striped dt-responsive nowrap w-100',
      onCreateClick: () => this.onCreateClick(),
      onEditClick: (row) => this.onEditClick(row),
      onDeleteClick: (row) => this.onDeleteClick(row),
      onViewClick: (row) => this.onViewClick(row),
      onHistoryClick: (row) => this.onHistoryClick(row),
      onActivateClick: (row) => this.onActivateClick(row),
      onDeactivateClick: (row) => this.onDeactivateClick(row),
    }
  }

  // =========================================
  // CARGA DE DATOS (Base Implementation)
  // =========================================

  protected loadItems(page: number = 1): void {
    if (!this.crud) return

    this.isLoading = true

    this.crud.loadItems(page, this.pageSize).subscribe({
      next: () => {
        this.isLoading = false
        this.currentPage = page
        this.totalRecords = this.crud.total
        if (this.tableConfig) {
          // ✅ Crear nueva referencia para que Angular detecte el cambio
          this.tableConfig = {
            ...this.tableConfig,
            data: this.crud.items,
          }
        }
      },
      error: (err) => {
        this.isLoading = false
        this.showError(
          this.translateService.instant('errors.load'),
          err?.message
        )
      },
    })
  }

  protected handleCrudStateChange(state: any): void {
    this.isLoading = state.isLoading
    this.currentPage = state.currentPage
    this.pageSize = state.pageSize
    this.totalRecords = state.total

    if (this.tableConfig) {
      // ✅ Crear nueva referencia para que Angular detecte el cambio
      this.tableConfig = {
        ...this.tableConfig,
        data: state.items,
      }
    }

    if (state.error) {
      this.showError(this.translateService.instant('errors.error'), state.error)
    }
  }

  // =========================================
  // ACCIONES CRUD (Base Implementation - con override disponible)
  // =========================================

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
        error: (_err) =>
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
      text: this.translateService.instant('confirmations.delete_text', {
        item: itemLabel,
      }),
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
            this.showSuccess(
              this.translateService.instant('messages.deleted_success')
            )
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
    if (item.id) {
      const service = this.getService()

      // Llamar SOLO al endpoint de historial, sin getById
      service.getById(`${item.id}/history`).subscribe({
        next: (historyResponse: any) => {
          // Extraer logs de la respuesta
          if (
            historyResponse &&
            historyResponse.data &&
            historyResponse.data.logs
          ) {
            this.historyLogs = historyResponse.data.logs
          } else if (historyResponse && Array.isArray(historyResponse)) {
            this.historyLogs = historyResponse
          }

          // Pasar solo la información necesaria del item
          this.selectedHistoryItem = {
            id: item.id,
            label: this.getItemLabel(item),
          }

          this.isHistoryModalVisible = true
        },
        error: (err: any) => {
          this.showError(
            this.translateService.instant('errors.error'),
            err?.message || 'Error al cargar historial'
          )
        },
      })
    }
  } // =========================================
  // MODAL (Base Implementation)
  // =========================================

  protected openModal(): void {
    this.formFields = this.defineFormFields()
    this.isModalVisible = true
  }

  protected closeModal(): void {
    this.isModalVisible = false
    this.selectedItem = null
    this.isModalSubmitting = false
  }

  protected closeHistoryModal(): void {
    this.isHistoryModalVisible = false
    this.historyLogs = []
    this.selectedHistoryItem = null
  }

  // =========================================
  // SUBMIT FORMULARIO (Base - puede hacer override)
  // =========================================

  protected submitForm(formData: any): void {
    this.isModalSubmitting = true

    if (!formData.id && this.modalMode === 'create') {
      // Crear nuevo
      this.crud.create(formData).subscribe({
        next: () => {
          this.showSuccess(
            this.translateService.instant('messages.created_success')
          )
          this.closeModal()
          this.loadItems(1)
        },
        error: (err) => {
          this.isModalSubmitting = false
          this.showError(
            this.translateService.instant('errors.create'),
            err?.message
          )
        },
      })
    } else if (formData.id && this.modalMode === 'edit') {
      // Editar existente
      this.crud.update(formData.id, formData).subscribe({
        next: () => {
          this.showSuccess(
            this.translateService.instant('messages.updated_success')
          )
          this.closeModal()
          this.loadItems(this.currentPage)
        },
        error: (err) => {
          this.isModalSubmitting = false
          this.showError(
            this.translateService.instant('errors.update'),
            err?.message
          )
        },
      })
    }
  }

  // =========================================
  // ACTIVAR/DESACTIVAR (Base Implementation)
  // =========================================

  protected onActivateClick(item: any): void {
    if (!item.id) return

    const itemLabel = this.getItemLabel(item)
    const service = this.getService()

    Swal.fire({
      title: this.translateService.instant('actions.activate'),
      text: `¿Activar ${itemLabel}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: this.translateService.instant('actions.confirm'),
      cancelButtonText: this.translateService.instant('actions.cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        service.activate(item.id).subscribe({
          next: () => {
            this.showSuccess(`${itemLabel} activado`)
            this.loadItems(this.currentPage)
          },
          error: (err: any) =>
            this.showError(
              this.translateService.instant('errors.error'),
              err?.message || 'Error al activar'
            ),
        })
      }
    })
  }

  protected onDeactivateClick(item: any): void {
    if (!item.id) return

    const itemLabel = this.getItemLabel(item)
    const service = this.getService()

    Swal.fire({
      title: this.translateService.instant('actions.deactivate'),
      text: `¿Desactivar ${itemLabel}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: this.translateService.instant('actions.confirm'),
      cancelButtonText: this.translateService.instant('actions.cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        service.deactivate(item.id).subscribe({
          next: () => {
            this.showSuccess(`${itemLabel} desactivado`)
            this.loadItems(this.currentPage)
          },
          error: (err: any) =>
            this.showError(
              this.translateService.instant('errors.error'),
              err?.message || 'Error al desactivar'
            ),
        })
      }
    })
  }

  // =========================================
  // EVENT HANDLERS (Table Events)
  // =========================================

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
      case 'activate':
        this.onActivateClick(data)
        break
      case 'deactivate':
        this.onDeactivateClick(data)
        break
    }
  }

  public onPageChange(page: number): void {
    this.loadItems(page)
  }

  public onSearch(query: string): void {
    // Override en subclase si se necesita búsqueda personalizada
    console.log('Búsqueda:', query)
    // TODO: Implementar búsqueda desde el backend con Condicion[]
  }

  // =========================================
  // UTILIDADES (Helper Methods)
  // =========================================

  /**
   * Retorna label del item para mensajes (override si es necesario)
   */
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
}
