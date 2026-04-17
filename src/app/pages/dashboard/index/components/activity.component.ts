import { Component, Input } from '@angular/core'
import { CardTitleComponent } from '@component/card-title.component'
import { ChartType, NgApexchartsModule } from 'ng-apexcharts'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
    selector: 'app-activity',
    imports: [CardTitleComponent, NgApexchartsModule, SimplebarAngularModule],
    template: ` <div class="card">
      <card-title
        classname="d-flex card-header justify-content-between align-items-center"
        title="Recent Activity"
        [menuItems]="[
          { label: 'Sales Report' },
          { label: 'Export Report' },
          { label: 'Profit' },
          { label: 'Action' }
        ]"
      ></card-title>

      <ngx-simplebar
        class="card-body py-0 mb-3"
        data-simplebar
        style="max-height: {{ height }}px"
      >
        <div class="timeline-alt py-0">
          <div class="timeline-item">
            <i
              class="mdi mdi-upload bg-info-lighten text-info timeline-icon"
            ></i>
            <div class="timeline-item-info">
              <a
                href="javascript:void(0);"
                class="text-info fw-bold mb-1 d-block"
                >You sold an item</a
              >
              <small
                >Paul Burgess just purchased “Hyper - Admin Dashboard”!</small
              >
              <p class="mb-0 pb-2">
                <small class="text-muted">5 minutes ago</small>
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <i
              class="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"
            ></i>
            <div class="timeline-item-info">
              <a
                href="javascript:void(0);"
                class="text-primary fw-bold mb-1 d-block"
                >Product on the Bootstrap Market</a
              >
              <small
                >Dave Gamache added
                <span class="fw-bold">Admin Dashboard</span>
              </small>
              <p class="mb-0 pb-2">
                <small class="text-muted">30 minutes ago</small>
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <i
              class="mdi mdi-microphone bg-info-lighten text-info timeline-icon"
            ></i>
            <div class="timeline-item-info">
              <a
                href="javascript:void(0);"
                class="text-info fw-bold mb-1 d-block"
                >Robert Delaney</a
              >
              <small
                >Send you message
                <span class="fw-bold">"Are you there?"</span>
              </small>
              <p class="mb-0 pb-2">
                <small class="text-muted">2 hours ago</small>
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <i
              class="mdi mdi-upload bg-primary-lighten text-primary timeline-icon"
            ></i>
            <div class="timeline-item-info">
              <a
                href="javascript:void(0);"
                class="text-primary fw-bold mb-1 d-block"
                >Audrey Tobey</a
              >
              <small
                >Uploaded a photo
                <span class="fw-bold">"Error.jpg"</span>
              </small>
              <p class="mb-0 pb-2">
                <small class="text-muted">14 hours ago</small>
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <i
              class="mdi mdi-upload bg-info-lighten text-info timeline-icon"
            ></i>
            <div class="timeline-item-info">
              <a
                href="javascript:void(0);"
                class="text-info fw-bold mb-1 d-block"
                >You sold an item</a
              >
              <small
                >Paul Burgess just purchased “Hyper - Admin Dashboard”!</small
              >
              <p class="mb-0 pb-2">
                <small class="text-muted">16 hours ago</small>
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <i
              class="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"
            ></i>
            <div class="timeline-item-info">
              <a
                href="javascript:void(0);"
                class="text-primary fw-bold mb-1 d-block"
                >Product on the Bootstrap Market</a
              >
              <small
                >Dave Gamache added
                <span class="fw-bold">Admin Dashboard</span>
              </small>
              <p class="mb-0 pb-2">
                <small class="text-muted">22 hours ago</small>
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <i
              class="mdi mdi-microphone bg-info-lighten text-info timeline-icon"
            ></i>
            <div class="timeline-item-info">
              <a
                href="javascript:void(0);"
                class="text-info fw-bold mb-1 d-block"
                >Robert Delaney</a
              >
              <small
                >Send you message
                <span class="fw-bold">"Are you there?"</span>
              </small>
              <p class="mb-0 pb-2">
                <small class="text-muted">2 days ago</small>
              </p>
            </div>
          </div>
        </div>
        <!-- end timeline -->
      </ngx-simplebar>
      <!-- end slimscroll -->
    </div>
    <!-- end card-->`,
    styles: ``
})
export class ActivityComponent {
  @Input() height!: number

  averagesalesChart = {
    chart: {
      height: 202,
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
