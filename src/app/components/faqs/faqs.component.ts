import { Component, Input } from '@angular/core'
import { FAQItem } from '@core/model/faq.model'

@Component({
    selector: 'app-faqs',
    imports: [],
    template: `
    <div class="row pt-5">
      <!-- Question/Answer -->
      @for (faq of faqList; track $index) {
        @if ($index % 2 == 0) {
          <div class="col-lg-5 offset-lg-1">
            <div>
              <div class="faq-question-q-box">Q.</div>
              <h4 class="faq-question" data-wow-delay=".1s">
                {{ faq.question }}
              </h4>
              <p class="faq-answer mb-4">
                {{ faq.answer }}
              </p>
            </div>
          </div>
          <!--/col-md-5 -->
        } @else {
          <div class="col-lg-5">
            <div>
              <div class="faq-question-q-box">Q.</div>
              <h4 class="faq-question">{{ faq.question }}</h4>
              <p class="faq-answer mb-4">
                {{ faq.answer }}
              </p>
            </div>
          </div>
          <!--/col-md-5 -->
        }
      }
    </div>
    <!-- end row -->
  `,
    styles: ``
})
export class FaqsComponent {
  @Input() faqList!: FAQItem[]
}
