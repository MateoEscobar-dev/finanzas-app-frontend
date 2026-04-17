import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BgCirclesComponent } from '@component/bg-circles/bg-circles.component'

@Component({
    selector: 'app-404',
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
                  <h1 class="text-error">
                    4<i class="mdi mdi-emoticon-sad"></i>4
                  </h1>
                  <h4 class="text-uppercase text-danger mt-3">
                    Page Not Found
                  </h4>
                  <p class="text-muted mt-3">
                    It's looking like you may have taken a wrong turn. Don't
                    worry... it happens to the best of us. Here's a little tip
                    that might help you get back on track.
                  </p>

                  <a class="btn btn-info mt-3" routerLink="/"
                    ><i class="mdi mdi-reply"></i> Return Home</a
                  >
                </div>
              </div>
              <!-- end card-body-->
            </div>
            <!-- end card -->
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
export class Error404Component {
  year = new Date().getFullYear()
}
