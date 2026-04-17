import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { PricingCardComponent } from '@component/pricing-card/pricing-card.component'
import { landingPlan } from '@core/data'

@Component({
    selector: 'app-pricing',
    imports: [PricingCardComponent, CommonModule],
    template: `
    <section
      class="py-5 bg-light-lighten border-top border-bottom border-light"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <h1 class="mt-0"><i class="mdi mdi-tag-multiple"></i></h1>
              <h3>Choose Simple <span class="text-primary">Pricing</span></h3>
              <p class="text-muted mt-2">
                The clean and well commented code allows easy customization of
                the theme.It's designed for <br />describing your app, agency or
                business.
              </p>
            </div>
          </div>
        </div>

        <app-pricing-card [pricingList]="planData"></app-pricing-card>
      </div>
    </section>
  `,
    styles: ``
})
export class PricingComponent {
  planData = landingPlan
}
