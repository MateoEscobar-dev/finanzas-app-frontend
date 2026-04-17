import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'card-title',
    imports: [CommonModule, NgbDropdownModule],
    template: `
    <div [ngClass]="classname">
      <h4 class="header-title">{{ title }}</h4>
      <div ngbDropdown class="dropdown">
        <a ngbDropdownToggle class="dropdown-toggle arrow-none card-drop">
          <i [ngClass]="icon ? icon : 'mdi mdi-dots-vertical'"></i>
        </a>
        <div ngbDropdownMenu class="dropdown-menu dropdown-menu-end">
          <!-- item-->
          @for (item of menuItems; track $index) {
            <a
              ngbDropdownItem
              href="javascript:void(0);"
              class="dropdown-item"
              >{{ item.label }}</a
            >
          }
        </div>
      </div>
    </div>
  `,
    styles: ``
})
export class CardTitleComponent {
  @Input() title: string = ''
  @Input() classname: string = ''
  @Input() icon: string = ''
  @Input() menuItems: { label: string }[] = []
}
