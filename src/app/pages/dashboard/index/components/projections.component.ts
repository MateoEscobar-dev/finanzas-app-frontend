import { Component } from '@angular/core'
import { ChartType, NgApexchartsModule } from 'ng-apexcharts'
import { CardTitleComponent } from '@component/card-title.component'
import { ChartOptions } from '@core/model/apexchart.model'

@Component({
    selector: 'app-projection',
    imports: [NgApexchartsModule, CardTitleComponent],
    template: `
    <div class="card card-h-100">
      <card-title
        classname="d-flex card-header justify-content-between align-items-center"
        title="Projections Vs Actuals"
        [menuItems]="[
          { label: 'Sales Report' },
          { label: 'Export Report' },
          { label: 'Profit' },
          { label: 'Action' }
        ]"
      ></card-title>
      <div class="card-body pt-0">
        <div dir="ltr">
          <div
            id="high-performing-product"
            class="apex-charts"
            data-colors="#727cf5,#91a6bd40"
          >
            <apx-chart
              [chart]="highperformingproduct.chart!"
              [plotOptions]="highperformingproduct.plotOptions!"
              [dataLabels]="highperformingproduct.dataLabels!"
              [stroke]="highperformingproduct.stroke!"
              [series]="highperformingproduct.series!"
              [legend]="highperformingproduct.legend!"
              [xaxis]="highperformingproduct.xaxis!"
              [yaxis]="highperformingproduct.yaxis!"
              [fill]="highperformingproduct.fill!"
              [tooltip]="highperformingproduct.tooltip!"
              [colors]="highperformingproduct.colors!"
            ></apx-chart>
          </div>
        </div>
      </div>
      <!-- end card-body-->
    </div>
    <!-- end card-->
  `,
    styles: ``
})
export class ProjectionsComponent {
  ngOnInit(): void {}

  highperformingproduct: Partial<ChartOptions> = {
    chart: {
      height: 256,
      type: 'bar' as ChartType,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    series: [
      {
        name: 'Actual',
        data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81],
      },
      {
        name: 'Projection',
        data: [89, 40, 32, 65, 59, 80, 81, 56, 89, 40, 65, 59],
      },
    ],
    legend: {
      show: false,
    },
    colors: ['#727cf5', '#91a6bd40'],
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + 'k'
        },
        offsetX: -15,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return '$' + val + 'k'
        },
      },
    },
  }
}
