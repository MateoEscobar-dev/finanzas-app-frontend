import { Component } from '@angular/core'
import { CardTitleComponent } from '@component/card-title.component'
import { ChartType, NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-sales',
    imports: [CardTitleComponent, NgApexchartsModule],
    template: ` <div class="card">
      <card-title
        classname="d-flex card-header justify-content-between align-items-center"
        title="Total Sales"
        [menuItems]="[
          { label: 'Sales Report' },
          { label: 'Export Report' },
          { label: 'Profit' },
          { label: 'Action' }
        ]"
      ></card-title>

      <div class="card-body pt-0">
        <div
          id="average-sales"
          class="apex-charts mb-4 mt-2"
          data-colors="#727cf5,#0acf97,#fa5c7c,#ffbc00"
        >
          <apx-chart
            [chart]="averagesalesChart.chart"
            [legend]="averagesalesChart.legend"
            [stroke]="averagesalesChart.stroke"
            [series]="averagesalesChart.series"
            [labels]="averagesalesChart.labels"
            [colors]="averagesalesChart.colors"
           
          ></apx-chart>
        </div>

        <div class="chart-widget-list">
          <p>
            <i class="mdi mdi-square text-primary"></i> Direct
            <span class="float-end">$300.56</span>
          </p>
          <p>
            <i class="mdi mdi-square text-danger"></i> Affilliate
            <span class="float-end">$135.18</span>
          </p>
          <p>
            <i class="mdi mdi-square text-success"></i> Sponsored
            <span class="float-end">$48.96</span>
          </p>
          <p class="mb-0">
            <i class="mdi mdi-square text-warning"></i> E-mail
            <span class="float-end">$154.02</span>
          </p>
        </div>
      </div>
      <!-- end card-body-->
    </div>
    <!-- end card-->`,
    styles: ``
})
export class SalesComponent {
  averagesalesChart = {
    chart: {
      height: 225,
      type: 'donut' as ChartType,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    series: [44, 55, 41, 17],
    labels: ['Direct', 'Affilliate', 'Sponsored', 'E-mail'],
    colors: ['#727cf5', '#0acf97', '#fa5c7c', '#ffbc00'],
  
  }
}
