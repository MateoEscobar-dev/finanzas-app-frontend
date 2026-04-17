import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BgCirclesComponent } from '@component/bg-circles/bg-circles.component'

@Component({
    selector: 'app-500',
    imports: [BgCirclesComponent, RouterModule],
    template: `
    <bg-circles></bg-circles>
    <div class="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xxl-4 col-lg-5">
            <div class="card">
              <!-- Logo -->
              <div class="card-header py-4 text-center bg-primary">
                <a routerLink="/">
                  <span
                    ><img src="assets/images/logo.png" alt="logo" height="22"
                  /></span>
                </a>
              </div>

              <div class="card-body p-4">
                <div class="text-center">
                  <img
                    src="assets/images/svg/startman.svg"
                    height="120"
                    alt="File not found Image"
                  />

                  <h1 class="text-error mt-4">500</h1>
                  <h4 class="text-uppercase text-danger mt-3">
                    Internal Server Error
                  </h4>
                  <p class="text-muted mt-3">
                    Why not try refreshing your page? or you can contact
                    <a href="javascript:void(0);" class="text-muted"
                      ><b>Support</b></a
                    >
                  </p>

                  <a class="btn btn-info mt-3" routerLink="/"
                    ><i class="mdi mdi-reply"></i> Return Home</a
                  >
                </div>
              </div>
              <!-- end card-body-->
            </div>
            <!-- end card-->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end page -->

    <footer class="footer footer-alt">
      2018 - {{ year }} © Hyper - Coderthemes.com
    </footer>
  `,
    styles: ``
})
export class Error500Component {
  year = new Date().getFullYear()
}
