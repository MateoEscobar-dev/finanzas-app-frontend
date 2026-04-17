import { Component, inject, OnInit } from '@angular/core'
import { PagetitleComponent } from '@shared/page-title/page-title.component'
import { TableComponent } from '@/app/components/table/table-crud.component'
import { GenericModalComponent } from '@/app/shared/generic-modal/generic-modal.component'
import { HistoryModalComponent } from '@/app/shared/history-modal/history-modal.component'
import { UserService } from '@/app/services/system/configuration/users.service'
import { RolesService } from '@/app/services/permissions/roles.service'
import {
  baseComponent,
  IFormField,
} from '@/app/shared/base-component/base-component'
import { TranslateModule } from '@ngx-translate/core'
import { Column } from '@/app/components/table/table.model'
import { CommonModule } from '@angular/common'
import { IUser } from '@/app/interfaces/system/configuration/user.interface'
import { ICrudConfig } from '@/app/core/service/crud-controller.service'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    PagetitleComponent,
    TableComponent,
    GenericModalComponent,
    HistoryModalComponent,
    TranslateModule,
    CommonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent extends baseComponent implements OnInit {
  private userService = inject(UserService)
  private rolesService = inject(RolesService)

  // Lista de roles para el select
  protected roles: Array<{ value: string; label: string }> = []
  protected isLoadingRoles = false

  // =========================================
  // CONFIGURACIÓN DEL MÓDULO
  // =========================================
  protected override modulePermission = 'users'

  override ngOnInit() {
    this.loadRoles()
    super.ngOnInit()
  }

  // =========================================
  // CARGAR ROLES
  // =========================================

  protected loadRoles(): void {
    this.isLoadingRoles = true
    // Cargar roles - traer todos disponibles
    this.rolesService.getAll<any>({ take: 100 }).subscribe({
      next: (response: any) => {
        this.isLoadingRoles = false
        // Mapear los roles desde la respuesta de la API
        if (response && Array.isArray(response)) {
          // Si es array directo
          this.roles = response.map((role: any) => ({
            value: role.id,
            label: role.name,
          }))
        } else if (
          response?.data?.records &&
          Array.isArray(response.data.records)
        ) {
          // Si es estructura personalizada del backend
          this.roles = response.data.records.map((role: any) => ({
            value: role.id,
            label: role.name,
          }))
        }
      },
      error: (err: any) => {
        this.isLoadingRoles = false
        console.error('Error loading roles:', err)
      },
    })
  }

  // =========================================
  // IMPLEMENTACIÓN DE MÉTODOS ABSTRACTOS
  // =========================================

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
    return [
      { header: 'columns.id', accessor: 'id', defaultCanSort: true },
      { header: 'columns.email', accessor: 'email', defaultCanSort: true },
      {
        header: 'columns.first_name',
        accessor: 'first_name',
        defaultCanSort: true,
      },
      {
        header: 'columns.last_name',
        accessor: 'first_last_name',
        defaultCanSort: true,
        Cell: ({ row }) => {
          const firstName = (row as any).first_last_name || ''
          const secondName = (row as any).second_last_name || ''
          return `${firstName} ${secondName}`.trim()
        },
      },
      { header: 'columns.phone', accessor: 'phone', defaultCanSort: true },
      {
        header: 'columns.status',
        accessor: 'active',
        Cell: ({ row }) => {
          const active = (row as any).active
          const statusText = active
            ? this.translateService.instant('status.active')
            : this.translateService.instant('status.inactive')
          const statusClass = active ? 'bg-success' : 'bg-danger'
          return `<span class="badge ${statusClass}">${statusText}</span>`
        },
      },
    ]
  }

  protected override defineFormFields(): IFormField[] {
    return [
      {
        name: 'id',
        label: 'columns.id',
        type: 'text',
        required: false,
        hidden: true, // Campo oculto para el control interno
        colSize: 'col-12',
      },
      {
        name: 'email',
        label: 'columns.email',
        type: 'email',
        required: true,
        placeholder: 'usuario@ejemplo.com',
        colSize: 'col-12',
      },
      {
        name: 'first_name',
        label: 'columns.first_name',
        type: 'text',
        required: true,
        placeholder: 'Juan',
        colSize: 'col-6',
      },
      {
        name: 'second_name',
        label: 'columns.second_name',
        type: 'text',
        required: false,
        placeholder: 'Carlos',
        colSize: 'col-6',
      },
      {
        name: 'first_last_name',
        label: 'columns.first_last_name',
        type: 'text',
        required: true,
        placeholder: 'Pérez',
        colSize: 'col-6',
      },
      {
        name: 'second_last_name',
        label: 'columns.second_last_name',
        type: 'text',
        required: false,
        placeholder: 'García',
        colSize: 'col-6',
      },
      {
        name: 'document',
        label: 'columns.document',
        type: 'text',
        required: false,
        placeholder: '1234567890',
        colSize: 'col-6',
      },
      {
        name: 'phone',
        label: 'columns.phone',
        type: 'text',
        required: false,
        placeholder: '+34 123 456 789',
        colSize: 'col-6',
      },
      {
        name: 'phone_ext',
        label: 'columns.phone_ext',
        type: 'text',
        required: false,
        placeholder: '123',
        colSize: 'col-6',
      },
      {
        name: 'address',
        label: 'columns.address',
        type: 'textarea',
        required: false,
        placeholder: 'Calle 109 # 18b31',
        colSize: 'col-12',
      },
      {
        name: 'birth_day',
        label: 'columns.birth_day',
        type: 'date',
        required: false,
        colSize: 'col-6',
      },
      {
        name: 'lang',
        label: 'columns.language',
        type: 'select',
        required: true,
        colSize: 'col-6',
        options: [
          { label: 'Español', value: 'es' },
          { label: 'English', value: 'en' },
          { label: 'Ελληνικά', value: 'gr' },
          { label: 'Italiano', value: 'it' },
          { label: 'Русский', value: 'ru' },
        ],
      },
      {
        name: 'id_rol',
        label: 'columns.roles',
        type: 'select',
        required: true,
        colSize: 'col-12',
        options:
          this.roles.length > 0
            ? this.roles
            : [{ label: 'Cargando...', value: '' }],
      },
      {
        name: 'password',
        label: 'labels.password',
        type: 'password',
        required: this.modalMode === 'create',
        placeholder: '••••••••',
        colSize: 'col-12',
      },
      {
        name: 'active',
        label: 'columns.status',
        type: 'checkbox',
        required: false,
        colSize: 'col-12',
      },
    ]
  }

  protected override getItemLabel(item: any): string {
    return item.email || item.first_name || `Usuario #${item.id}`
  }

  // =========================================
  // MÉTODOS PERSONALIZADOS
  // =========================================

  protected override onEditClick(item: any): void {
    this.modalMode = 'edit'
    this.selectedItem = item

    if (item.id) {
      this.crud.getById(item.id).subscribe({
        next: (data: any) => {
          // Transformar el array de roles a ID del rol
          if (
            data.roles &&
            Array.isArray(data.roles) &&
            data.roles.length > 0
          ) {
            // Buscar el ID del primer rol asignado
            const roleName = data.roles[0]
            const roleId = this.roles.find((r) => r.label === roleName)?.value
            if (roleId) {
              data.id_rol = roleId // Usar id_rol para el select
            }
            // Eliminar el campo roles que viene del backend
            delete data.roles
          }

          this.selectedItem = data
          this.modalTitle = this.translateService.instant('actions.edit')
          this.openModal()
        },
        error: () =>
          this.showError(
            this.translateService.instant('errors.error'),
            this.translateService.instant('errors.load_record')
          ),
      })
    }
  }

  protected override submitForm(formData: any): void {
    // Transformar id_rol a roles antes de enviar
    if (formData.id_rol) {
      formData.roles = [formData.id_rol]
      delete formData.id_rol
    }

    // Llamar al método base
    super.submitForm(formData)
  }
}
