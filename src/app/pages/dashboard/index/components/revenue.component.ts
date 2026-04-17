import { Component } from '@angular/core'
import { CardTitleComponent } from '@component/card-title.component'
import { ChartOptions } from '@core/model/apexchart.model'
import { ChartType, NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-revenue',
    imports: [CardTitleComponent, NgApexchartsModule],
    template: ` <div class="card">
      <card-title
        classname="d-flex card-header justify-content-between align-items-center"
        title="Revenue"
        [menuItems]="[
          { label: 'Sales Report' },
          { label: 'Export Report' },
          { label: 'Profit' },
          { label: 'Action' }
        ]"
      ></card-title>

      <div class="card-body pt-0">
        <div class="chart-content-bg">
          <div class="row text-center">
            <div class="col-sm-6">
              <p class="text-muted mb-0 mt-3">Current Week</p>
              <h2 class="fw-normal mb-3">
                <small
                  class="mdi mdi-checkbox-blank-circle text-primary align-middle me-1"
                ></small>
                <span class="ms-0.5">$58,254</span>
              </h2>
            </div>
            <div class="col-sm-6">
              <p class="text-muted mb-0 mt-3">Previous Week</p>
              <h2 class="fw-normal mb-3">
                <small
                  class="mdi mdi-checkbox-blank-circle text-success align-middle me-1"
                ></small>
                <span class="ms-0.5">$69,524</span>
              </h2>
            </div>
          </div>
        </div>

        <div class="dash-item-overlay d-none d-md-block" dir="ltr">
          <h5>Today's Earning: $2,562.30</h5>
          <p class="text-muted font-13 mb-3 mt-2">
            Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies
            nisi. Nam eget dui. Etiam rhoncus...
          </p>
          <a href="javascript: void(0);" class="btn btn-outline-primary"
            >View Statements
            <i class="mdi mdi-arrow-right ms-2"></i>
          </a>
        </div>
        <div dir="ltr">
          <div
            id="revenue-chart"
            class="apex-charts mt-3"
            data-colors="#727cf5,#0acf97"
          >
            <apx-chart
              [chart]="revenuechart.chart!"
              [dataLabels]="revenuechart.dataLabels!"
              [stroke]="revenuechart.stroke!"
              [series]="revenuechart.series!"
              [colors]="revenuechart.colors!"
              [legend]="revenuechart.legend!"
              [xaxis]="revenuechart.xaxis!"
              [grid]="revenuechart.grid!"
              [yaxis]="revenuechart.yaxis!"
            ></apx-chart>
          </div>
        </div>
      </div>
      <!-- end card-body-->
    </div>
    <!-- end card-->`,
    styles: ``
})
export class RevenueComponent {
  revenuechart: Partial<ChartOptions> = {
    chart: {
      height: 370,
      type: 'line' as ChartType,
      dropShadow: {
        enabled: true,
        opacity: 0.2,
        blur: 7,
        left: -7,
        top: 7,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as 'smooth',
      width: 4,
    },
    series: [
      {
        name: 'Current Week',
        data: [10, 20, 15, 25, 20, 30, 20],
      },
      {
        name: 'Previous Week',
        data: [0, 15, 10, 30, 15, 35, 25],
      },
    ],
    colors: ['#727cf5', '#0acf97'],
    legend: {
      show: false,
    },
    xaxis: {
      type: 'string' as 'category',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
    },
    grid: {
      strokeDashArray: 7,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val + 'k'
        },
        offsetX: -15,
      },
    },
  }
}
