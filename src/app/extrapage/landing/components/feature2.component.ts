import { Component } from '@angular/core'
import { features } from '@core/data'

@Component({
    selector: 'app-feature2',
    imports: [],
    template: `
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <h1 class="mt-0">
                <i class="mdi mdi-heart-multiple-outline"></i>
              </h1>
              <h3>Features you'll <span class="text-danger">love</span></h3>
              <p class="text-muted mt-2">
                Hyper comes with next generation ui design and have multiple
                benefits
              </p>
            </div>
          </div>
        </div>
        @for (data of featureData; track $index) {
          @if ($index % 2 == 0) {
            <div class="row mt-2 py-5 align-items-center">
              <div class="col-lg-5 col-md-6">
                <img src="{{ data.image }}" class="img-fluid" alt="" />
              </div>
              <div class="col-lg-6 offset-md-1 col-md-5">
                <h3 class="fw-normal">{{ data.title }}</h3>
                <p class="text-muted mt-3">
                  {{ data.desc }}
                </p>

                <div class="mt-4">
                  @for (feature of data.features; track $index) {
                    <p class="text-muted">
                      <i class="mdi mdi-circle-medium text-primary"></i>
                      {{ feature }}
                    </p>
                  }
                </div>

                <a
                  href="javascript:void(0);"
                  class="btn btn-primary rounded-pill mt-3"
                  >Read More <i class="mdi mdi-arrow-right ms-1"></i
                ></a>
              </div>
            </div>
          } @else {
            <div class="row pb-3 pt-5 align-items-center">
              <div class="col-lg-6 col-md-5">
                <h3 class="fw-normal">{{ data.title }}</h3>
                <p class="text-muted mt-3">
                  {{ data.desc }}
                </p>

                <div class="mt-4">
                  @for (feature of data.features; track $index) {
                    <p class="text-muted">
                      <i class="mdi mdi-circle-medium text-primary"></i>
                      {{ feature }}
                    </p>
                  }
                </div>

                <a
                  href="javascript:void(0);"
                  class="btn btn-success rounded-pill mt-3"
                  >Read More <i class="mdi mdi-arrow-right ms-1"></i
                ></a>
              </div>
              <div class="col-lg-5 col-md-6 offset-md-1">
                <img src="{{ data.image }}" class="img-fluid" alt="" />
              </div>
            </div>
          }
        }
      </div>
    </section>
  `,
    styles: ``
})
export class Feature2Component {
  featureData = features
}
