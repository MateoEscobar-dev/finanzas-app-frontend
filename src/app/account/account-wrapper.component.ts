import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ContentChild,
  TemplateRef,
} from '@angular/core'
import { RouterModule } from '@angular/router'
import { BgCirclesComponent } from '@component/bg-circles/bg-circles.component'

@Component({
  selector: 'app-account-wrapper',
  imports: [CommonModule, BgCirclesComponent, RouterModule],
  template: `
    <bg-circles></bg-circles>
    <div class="account-pages pt-2 pt-sm-2 pb-2 pb-sm-2 position-relative">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xxl-4 col-lg-5">
            <div class="card">
              <!-- Logo -->
              <div class="card-header py-2 text-center bg-primary">
                <a routerLink="/">
                  <span
                    ><img src="assets/images/logo.png" alt="logo" height="22"
                  /></span>
                </a>
              </div>

              <div class="card-body p-4">
                <ng-content></ng-content>
              </div>
              <!-- end card-body -->
            </div>
            <!-- end card -->

            <ng-container
              *ngTemplateOutlet="bottomLinksTemplate"
            ></ng-container>
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <footer class="footer footer-alt">
      2018 -
      {{ year }}
      © SCMChannel - SCMChannel.com
    </footer>
  `,
  styles: ``,
})
export class AccountWrapperComponent {
  year = new Date().getFullYear()

  @ContentChild('bottomLinks') bottomLinksTemplate!: TemplateRef<
    HTMLElement | HTMLElement[]
  >
}
