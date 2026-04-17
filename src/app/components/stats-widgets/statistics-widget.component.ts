import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

interface dataType {
  label: string
  cardColor: string
  icon: string
  textClass: string
  prefix: string
  amount: string
  suffix: string
  badgeClass: string
  arricon: string
  percentage: string
}
@Component({
    selector: 'app-statistics-widget',
    imports: [CommonModule],
    template: `
    <div class="card widget-flat {{ stateData.cardColor }}">
      <div class="card-body">
        <div class="float-end">
          <i class="{{ stateData.icon }}"></i>
        </div>
        <h5
          class="fw-normal mt-0"
          [ngClass]="stateData.textClass ? stateData.textClass : 'text-muted'"
          title="Number of Customers"
        >
          {{ stateData.label }}
        </h5>
        <h3 class="mt-3 mb-3">
          @if (stateData.prefix) {
            {{ stateData.prefix }}
          }
          {{ stateData.amount }}
          @if (stateData.suffix) {
            {{ stateData.suffix }}
          }
        </h3>
        <p class="mb-0 " [ngClass]="{ 'text-muted': !stateData.cardColor }">
          <span
            [ngClass]="
              stateData.badgeClass ? stateData.badgeClass : 'text-success me-2'
            "
          >
            <i class="mdi {{ stateData.arricon }}"></i>
            {{ stateData.percentage }}%
          </span>
          <span class="text-nowrap">Since last month</span>
        </p>
      </div>
      <!-- end card-body-->
    </div>
    <!-- end card-->
  `,
    styles: ``
})
export class StatisticsWidgetComponent {
  @Input() stateData!: Partial<dataType>
}
