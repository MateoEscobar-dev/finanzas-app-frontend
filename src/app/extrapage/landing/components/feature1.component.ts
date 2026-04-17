import { Component } from '@angular/core'
import { layouts } from '@core/data'

@Component({
    selector: 'app-feature1',
    imports: [],
    template: `
    <section
      class="py-5 bg-light-lighten border-top border-bottom border-light"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <h3>Flexible <span class="text-primary">Layouts</span></h3>
              <p class="text-muted mt-2">
                There are three different layout options available to cater need
                for any <br />
                modern web application.
              </p>
            </div>
          </div>
        </div>

        <div class="row mt-1">
          @for (layout of layoutData; track $index) {
            <div class="col-lg-4 col-md-6">
              <div class="demo-box text-center mt-3">
                <img
                  src="{{ layout.image }}"
                  alt="demo-img"
                  class="img-fluid shadow-sm rounded"
                />
                <h5 class="mt-3 f-17">{{ layout.layout }}</h5>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
    styles: ``
})
export class Feature1Component {
  layoutData = layouts
}
