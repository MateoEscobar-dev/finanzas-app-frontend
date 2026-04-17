import { Component } from '@angular/core'
import { StatisticsWidgetComponent } from '@component/stats-widgets/statistics-widget.component'

@Component({
    selector: 'app-statistics',
    imports: [StatisticsWidgetComponent],
    template: `
    <div class="row">
      @for (data of stateData; track $index) {
        <div class="col-sm-6">
          <app-statistics-widget [stateData]="data"></app-statistics-widget>
        </div>
        <!-- end col-->
      }
    </div>
    <!-- end row -->
  `,
    styles: ``
})
export class StatisticsComponent {
  stateData = [
    {
      label: 'Customers',
      amount: '36,254',
      icon: 'mdi mdi-account-multiple widget-icon',
      arricon: 'mdi-arrow-up-bold',
      percentage: '5.27',
      badgeClass: 'text-success me-2',
    },
    {
      label: 'Orders',
      amount: '5,543',
      icon: 'mdi mdi-cart-plus widget-icon',
      arricon: 'mdi-arrow-down-bold',
      percentage: '1.08',
      badgeClass: 'text-danger me-2',
    },
    {
      label: 'Revenue',
      amount: '6,254',
      prefix: '$',
      icon: 'mdi mdi-currency-usd widget-icon',
      arricon: 'mdi-arrow-down-bold',
      percentage: '7.00',
      badgeClass: 'text-danger me-2',
    },
    {
      label: 'Growth',
      amount: '30.56',
      prefix: '+',
      suffix: '%',
      icon: 'mdi mdi-pulse widget-icon',
      arricon: 'mdi-arrow-up-bold',
      percentage: '4.87',
      badgeClass: 'text-success me-2',
    },
  ]
}
