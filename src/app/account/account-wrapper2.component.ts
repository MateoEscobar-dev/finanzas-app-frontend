import { CommonModule } from '@angular/common'
import { Component, ContentChild, TemplateRef } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-account-wrapper2',
    imports: [CommonModule, RouterModule],
    template: `
    <div class="auth-fluid">
      <!--Auth fluid left content -->
      <div class="auth-fluid-form-box">
        <div class="card-body d-flex flex-column h-100 gap-3">
          <!-- Logo -->
          <div class="auth-brand text-center text-lg-start">
            <a routerLink="/" class="logo-dark">
              <span
                ><img
                  src="assets/images/logo-dark.png"
                  alt="dark logo"
                  height="22"
              /></span>
            </a>
            <a routerLink="/" class="logo-light">
              <span
                ><img src="assets/images/logo.png" alt="logo" height="22"
              /></span>
            </a>
          </div>
          <ng-content></ng-content>
          <!-- Footer-->
          <ng-container *ngTemplateOutlet="bottomLinksTemplate"></ng-container>
        </div>
        <!-- end .card-body -->
      </div>
      <!-- end auth-fluid-form-box-->

      <!-- Auth fluid right content -->
      <div class="auth-fluid-right text-center">
        <div class="auth-user-testimonial">
          <h2 class="mb-3">I love the color!</h2>
          <p class="lead">
            <i class="mdi mdi-format-quote-open"></i> It's a elegent templete. I
            love it very much! . <i class="mdi mdi-format-quote-close"></i>
          </p>
          <p>- Hyper Admin User</p>
        </div>
        <!-- end auth-user-testimonial-->
      </div>
      <!-- end Auth fluid right content -->
    </div>
  `,
    styles: ``
})
export class AccountWrapper2Component {
  @ContentChild('bottomLinks') bottomLinksTemplate!: TemplateRef<
    HTMLElement | HTMLElement[]
  >
}
