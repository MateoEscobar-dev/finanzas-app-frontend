import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { PricingPlan } from '@core/model/pricing.model'

@Component({
    selector: 'app-pricing-card',
    imports: [CommonModule],
    template: `
    <div class="row mt-sm-5 mt-3 mb-3">
      @for (plan of pricingList; track $index) {
        <div class="col-md-4">
          <div
            class="card card-pricing"
            [ngClass]="{ 'card-pricing-recommended': plan.isRecommended }"
          >
            <div class="card-body text-center">
              @if (plan.isRecommended) {
                <div class="card-pricing-plan-tag">Recommended</div>
              }
              <p class="card-pricing-plan-name fw-bold text-uppercase">
                {{ plan.name }}
              </p>
              <i class="card-pricing-icon {{ plan.icon }} text-primary"></i>
              <h2 class="card-pricing-price">
                {{ plan.price }} <span>/ {{ plan.duration }}</span>
              </h2>
              <ul class="card-pricing-features">
                @for (feature of plan.features; track $index) {
                  <li>{{ feature }}</li>
                }
              </ul>
              <button class="btn btn-primary mt-4 mb-2 rounded-pill">
                Choose Plan
              </button>
            </div>
          </div>
          <!-- end Pricing_card -->
        </div>
        <!-- end col -->
      }
    </div>
    <!-- end row -->
  `,
    styles: ``
})
export class PricingCardComponent {
  @Input() pricingList!: PricingPlan[]
}
