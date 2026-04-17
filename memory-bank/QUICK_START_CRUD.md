# 🚀 Quick Start - Nuevo Módulo CRUD

## Crear un nuevo módulo en 3 pasos

### Paso 1: Extender baseComponent e implementar métodos abstractos

```typescript
import { Component, inject } from '@angular/core'
import { baseComponent, IFormField } from '@/app/shared/base-component/base-component'
import { RoleService } from '@/app/services/system/configuration/roles.service'
import { Column } from '@/app/components/table/table.model'
import { ICrudConfig } from '@/app/core/service/crud-controller.service'

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [/* ... imports ... */],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent extends baseComponent {
  private roleService = inject(RoleService)

  // 1️⃣ Definir módulo
  protected override modulePermission = 'roles'

  // 2️⃣ Implementar método abstracto: getService
  protected override getService() {
    return this.roleService
  }

  // 3️⃣ Implementar método abstracto: getCrudConfig
  protected override getCrudConfig(): ICrudConfig<any> {
    return {
      service: this.roleService,
      modulePermission: this.modulePermission,
      pageSize: this.pageSize,
    }
  }

  // 4️⃣ Implementar método abstracto: defineColumns
  protected override defineColumns(): Column<any>[] {
    return [
      { header: 'columns.id', accessor: 'id', defaultCanSort: true },
      { header: 'columns.name', accessor: 'name', defaultCanSort: true },
      { header: 'columns.description', accessor: 'description', defaultCanSort: true },
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

  // 5️⃣ Implementar método abstracto: defineFormFields
  protected override defineFormFields(): IFormField[] {
    return [
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
        placeholder: 'Descripción del rol...',
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

  // 6️⃣ Implementar método abstracto: getItemLabel (opcional)
  protected override getItemLabel(item: any): string {
    return item.name || `Rol #${item.id}`
  }

  // 7️⃣ OPCIONAL: Override de métodos específicos
  // override onDeleteClick(item: any): void {
  //   // Lógica personalizada antes
  //   console.log('Eliminando rol:', item.name)
  //   super.onDeleteClick(item) // Llama lógica base
  // }
}
```

### Paso 2: Template HTML muy simple

```html
<app-pagetitle
  [title]="'roles' | translate"
  [subtitle]="'configuration' | translate"
  [pagetitle]="'system' | translate"
></app-pagetitle>

<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-body">
        <!-- Tabla CRUD genérica -->
        <app-table
          *ngIf="tableConfig"
          [config]="tableConfig"
          (rowAction)="onTableAction($event)"
          (pageChange)="onPageChange($event)"
          (search)="onSearch($event)"
        ></app-table>

        <!-- Indicador de carga -->
        @if (isLoading) {
          <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
        }

        <!-- Info de paginación -->
        <div class="mt-3 text-muted small">
          {{ "actions.showing" | translate }} {{ currentPage }} 
          | {{ "actions.of" | translate }} {{ totalRecords }}
        </div>
      </div>
    </div>
  </div>
</div>
```

### Paso 3: Agregar traducciones necesarias

Solo necesitas agregar las columnas nuevas en i18n:

**src/assets/i18n/columns/en.json:**
```json
{
  "columns": {
    "name": "Name",
    "description": "Description"
  }
}
```

**src/assets/i18n/columns/es.json:**
```json
{
  "columns": {
    "name": "Nombre",
    "description": "Descripción"
  }
}
```

---

## ✅ Checklist para Nuevo Módulo

- [ ] Crear componente con `@Component`
- [ ] Extender `baseComponent`
- [ ] Inyectar servicio (RoleService, ProductService, etc)
- [ ] Definir `modulePermission` = 'roles'
- [ ] Implementar `getService()`
- [ ] Implementar `getCrudConfig()`
- [ ] Implementar `defineColumns()`
- [ ] Implementar `defineFormFields()`
- [ ] Implementar `getItemLabel()` (opcional)
- [ ] Crear template con `<app-table>`
- [ ] Agregar traducciones en i18n/columns/[idiomas].json
- [ ] Compilar: `ng build`

---

## 📚 Estructura de Carpetas Mínima

```
src/app/pages/system/configuration/[modulo]/
├── [modulo].component.ts      ← El archivo principal
├── [modulo].component.html    ← Template simple
├── [modulo].component.scss    ← Estilos (opcional)
└── [modulo].component.spec.ts ← Tests (opcional)
```

---

## 🎯 Lo que el baseComponent hace automáticamente

✅ Inicializa CRUD
✅ Carga datos con paginación
✅ Crea tabla con permisos
✅ Maneja click en crear/editar/eliminar
✅ Abre modal (placeholder)
✅ Envía datos al servidor
✅ Recarga tabla después de operación
✅ Muestra mensajes de éxito/error
✅ Limpia observables en destroy

---

## ⏱️ Tiempo aproximado

- **Escribir componente:** 10-15 minutos
- **Escribir template:** 2-3 minutos
- **Agregar traducciones:** 2-3 minutos
- **Total:** ~20 minutos por nuevo módulo ✨

---

## 🔗 Documentación completa

Ver: `BASE_COMPONENT_ARCHITECTURE.md`

