import { Component, OnInit } from '@angular/core'
import { SimplebarAngularModule } from 'simplebar-angular'
import { StatisticsComponent } from './components/statistics.component'
import { ProjectionsComponent } from './components/projections.component'
import { RevenueComponent } from './components/revenue.component'
import { ProductComponent } from './components/product.component'
import { SalesComponent } from './components/sales.component'
import { ActivityComponent } from './components/activity.component'
import { RevenueByLocationComponent } from './components/revenueby-location.component'
import { NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-index',
    imports: [
        ProjectionsComponent,
        SimplebarAngularModule,
        StatisticsComponent,
        RevenueComponent,
        ProductComponent,
        SalesComponent,
        ActivityComponent,
        RevenueByLocationComponent,
        NgbDatepickerModule,
        FormsModule,
    ],
    template: ` <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <form class="d-flex">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control form-control-light"
                  id="dash-daterange"
                  name="dp"
                  [(ngModel)]="date"
                  ngbDatepicker
                  #d="ngbDatepicker"
                  (click)="d.toggle()"
                />
                <span
                  class="input-group-text bg-primary border-primary text-white"
                >
                  <i class="mdi mdi-calendar-range font-13"></i>
                </span>
              </div>
              <a href="javascript: void(0);" class="btn btn-primary ms-2">
                <i class="mdi mdi-autorenew"></i>
              </a>
              <a href="javascript: void(0);" class="btn btn-primary ms-1">
                <i class="mdi mdi-filter-variant"></i>
              </a>
            </form>
          </div>
          <h4 class="page-title">Dashboard</h4>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-5 col-lg-6">
        <app-statistics></app-statistics>
      </div>
      <!-- end col -->

      <div class="col-xl-7 col-lg-6">
        <app-projection></app-projection>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->

    <div class="row">
      <div class="col-lg-8">
        <app-revenue></app-revenue>
      </div>
      <!-- end col-->

      <div class="col-lg-4">
        <app-revenue-location></app-revenue-location>
      </div>
      <!-- end col-->
    </div>
    <!-- end row -->

    <div class="row">
      <div class="col-xl-6 col-lg-12 order-lg-2 order-xl-1">
        <app-product></app-product>
      </div>
      <!-- end col-->

      <div class="col-xl-3 col-lg-6 order-lg-1">
        <app-sales></app-sales>
      </div>
      <!-- end col-->

      <div class="col-xl-3 col-lg-6 order-lg-1">
        <app-activity [height]="403"></app-activity>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->`,
    styles: ``
})
export class IndexComponent implements OnInit {
  date: NgbDateStruct = {
    year: 2024,
    month: 3,
    day: 1,
  }

  ngOnInit(): void {}
}
