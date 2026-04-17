import { Component } from '@angular/core'

@Component({
    selector: 'app-home',
    imports: [],
    template: `
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-5">
            <div class="mt-md-4">
              <div>
                <span class="badge bg-danger font-13 rounded-pill">New</span>
                <span class="text-white-50 ms-1">
                  Welcome to new landing page</span
                >
              </div>
              <h2 class="text-white fw-normal mb-4 mt-3 lh-base">
                SCMChannel Dashboard
              </h2>

              <p class="mb-4 font-16 text-white-50">
                Hyper is a fully featured dashboard and admin template comes
                with tones of well designed UI elements, components, widgets and
                pages.
              </p>

              <a
                href="javascript:void(0);"
                class="btn btn-lg font-16 btn-success me-1"
                >Get Free Trial <i class="mdi mdi-arrow-right ms-1"></i
              ></a>
              <a href="javascript:void(0);" class="btn btn-lg font-16 btn-info"
                >Check Demos</a
              >
            </div>
          </div>
          <div class="col-md-5 offset-md-2">
            <div class="text-md-end mt-3 mt-md-0">
              <img
                src="assets/images/svg/startup.svg"
                alt=""
                class="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
    styles: ``
})
export class HomeComponent {}
