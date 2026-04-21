import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { PagetitleComponent } from '@shared/page-title/page-title.component'
import { TableComponent, RowActionButton } from '@/app/components/table/table-crud.component'
import { GenericModalComponent } from '@/app/shared/generic-modal/generic-modal.component'
import { HistoryModalComponent } from '@/app/shared/history-modal/history-modal.component'
import { RolesService } from '@/app/services/permissions/roles.service'
import {
  baseComponent,
  IFormField,
} from '@/app/shared/base-component/base-component'
import { Column } from '@/app/components/table/table.model'
import { ICrudConfig } from '@/app/core/service/crud-controller.service'

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PagetitleComponent,
    TableComponent,
    GenericModalComponent,
    HistoryModalComponent,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent extends baseComponent {
  private rolesService = inject(RolesService)

  protected override modulePermission = 'roles'

  // =========================================
  // PANEL DE PERMISOS DEL ROL
  // =========================================
  protected isRolePermissionsVisible = false
  protected selectedRoleName = ''
  protected rolePermissionsByModule: Record<string, string[]> = {}

  // =========================================
  // MÉTODOS ABSTRACTOS
  // =========================================

  protected override getService() {
    return this.rolesService
  }

  protected override getCrudConfig(): ICrudConfig<any> {
    return {
      service: this.rolesService,
      modulePermission: this.modulePermission,
      pageSize: this.pageSize,
    }
  }

  protected override defineColumns(): Column<any>[] {
    return [
      { header: 'columns.name', accessor: 'name', defaultCanSort: true },
      {
        header: 'columns.description',
        accessor: 'description',
        defaultCanSort: false,
      },
      {
        header: 'columns.permissions_count',
        accessor: 'permissions_count',
        defaultCanSort: true,
        Cell: ({ row }) => {
          const count = (row as any).permissions_count ?? 0
          return `<span class="badge bg-info">${count}</span>`
        },
      },
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
        hidden: true,
        colSize: 'col-12',
      },
      {
        name: 'name',
        label: 'columns.name',
        type: 'text',
        required: true,
        placeholder: 'Administrator',
        colSize: 'col-12',
      },
      {
        name: 'description',
        label: 'columns.description',
        type: 'textarea',
        required: false,
        placeholder: this.translateService.instant('labels.role_description_placeholder'),
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
    return item.name || `Rol #${item.id}`
  }

  // Botón extra: Ver permisos del rol
  protected override defineRowActionButtons(): RowActionButton[] {
    return [
      {
        action: 'role_permissions',
        label: 'labels.role_permissions',
        icon: 'mdi mdi-shield-key',
        class: 'btn-primary',
        permission: `${this.modulePermission}.view`,
      },
    ]
  }

  protected override onCustomAction(action: string, data: any): void {
    if (action === 'role_permissions') {
      this.openRolePermissionsPanel(data)
    }
  }

  // =========================================
  // PANEL DE PERMISOS DEL ROL
  // =========================================

  openRolePermissionsPanel(item: any): void {
    if (!item.id) return

    this.rolesService.getById<any>(item.id).subscribe({
      next: (res: any) => {
        const data = res?.data || res
        this.selectedRoleName = data.name || item.name
        this.rolePermissionsByModule = data.permissions || {}
        this.isRolePermissionsVisible = true
      },
      error: () => {
        this.showError(
          this.translateService.instant('errors.error'),
          this.translateService.instant('errors.load_record')
        )
      },
    })
  }

  get rolePermissionsModuleKeys(): string[] {
    return Object.keys(this.rolePermissionsByModule)
  }

  closeRolePermissionsPanel(): void {
    this.isRolePermissionsVisible = false
    this.rolePermissionsByModule = {}
    this.selectedRoleName = ''
  }
}
