import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { PagetitleComponent } from '@shared/page-title/page-title.component'
import { TableComponent } from '@/app/components/table/table-crud.component'
import { PermissionsService } from '@/app/services/permissions/permissions.service'
import { baseComponent, IFormField } from '@/app/shared/base-component/base-component'
import { Column } from '@/app/components/table/table.model'
import { ICrudConfig } from '@/app/core/service/crud-controller.service'

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, TranslateModule, PagetitleComponent, TableComponent],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss',
})
export class PermissionsComponent extends baseComponent {
  private permissionsService = inject(PermissionsService)

  protected override modulePermission = 'permissions'

  protected override getService() {
    return this.permissionsService
  }

  protected override getCrudConfig(): ICrudConfig<any> {
    return {
      service: this.permissionsService,
      modulePermission: this.modulePermission,
      pageSize: 50,
    }
  }

  protected override defineColumns(): Column<any>[] {
    return [
      { header: 'columns.name', accessor: 'name', defaultCanSort: true },
      { header: 'columns.module', accessor: 'module', defaultCanSort: true },
      {
        header: 'columns.guard_name',
        accessor: 'guard_name',
        defaultCanSort: true,
      },
    ]
  }

  // Solo lectura: no se usan campos de formulario
  protected override defineFormFields(): IFormField[] {
    return []
  }

  protected override getItemLabel(item: any): string {
    return item.name || `Permiso #${item.id}`
  }

  // Desactivar acciones de escritura sobreescribiendo configureTable
  protected override configureTable(): void {
    super.configureTable()
    // Solo lectura: deshabilitar create/edit/delete/activate
    this.tableConfig = {
      ...this.tableConfig,
      enableCreate: false,
      enableEdit: false,
      enableDelete: false,
      enableActivate: false,
      enableHistory: false,
      enableView: false,
    }
  }
}
