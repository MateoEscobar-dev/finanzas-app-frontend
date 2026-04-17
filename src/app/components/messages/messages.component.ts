import { Component } from '@angular/core'
import { CardTitleComponent } from '@component/card-title.component'

@Component({
    selector: 'app-messages',
    imports: [CardTitleComponent],
    template: `
    <div class="card">
      <div class="card-body">
        <card-title
          classname="d-flex justify-content-between align-items-center mb-2"
          title="Messages"
          [menuItems]="[{ label: 'Settings' }, { label: 'Action' }]"
        ></card-title>

        <div class="inbox-widget">
          <div class="inbox-item">
            <div class="inbox-item-img">
              <img
                src="assets/images/users/avatar-2.jpg"
                class="rounded-circle"
                alt=""
              />
            </div>
            <p class="inbox-item-author">Tomaslau</p>
            <p class="inbox-item-text">I've finished it! See you so...</p>
            <p class="inbox-item-date">
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-link text-info font-13"
              >
                Reply
              </a>
            </p>
          </div>
          <div class="inbox-item">
            <div class="inbox-item-img">
              <img
                src="assets/images/users/avatar-3.jpg"
                class="rounded-circle"
                alt=""
              />
            </div>
            <p class="inbox-item-author">Stillnotdavid</p>
            <p class="inbox-item-text">This theme is awesome!</p>
            <p class="inbox-item-date">
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-link text-info font-13"
              >
                Reply
              </a>
            </p>
          </div>
          <div class="inbox-item">
            <div class="inbox-item-img">
              <img
                src="assets/images/users/avatar-4.jpg"
                class="rounded-circle"
                alt=""
              />
            </div>
            <p class="inbox-item-author">Kurafire</p>
            <p class="inbox-item-text">Nice to meet you</p>
            <p class="inbox-item-date">
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-link text-info font-13"
              >
                Reply
              </a>
            </p>
          </div>

          <div class="inbox-item">
            <div class="inbox-item-img">
              <img
                src="assets/images/users/avatar-5.jpg"
                class="rounded-circle"
                alt=""
              />
            </div>
            <p class="inbox-item-author">Shahedk</p>
            <p class="inbox-item-text">Hey! there I'm available...</p>
            <p class="inbox-item-date">
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-link text-info font-13"
              >
                Reply
              </a>
            </p>
          </div>
          <div class="inbox-item">
            <div class="inbox-item-img">
              <img
                src="assets/images/users/avatar-6.jpg"
                class="rounded-circle"
                alt=""
              />
            </div>
            <p class="inbox-item-author">Adhamdannaway</p>
            <p class="inbox-item-text">This theme is awesome!</p>
            <p class="inbox-item-date">
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-link text-info font-13"
              >
                Reply
              </a>
            </p>
          </div>
        </div>
        <!-- end inbox-widget -->
      </div>
      <!-- end card-body-->
    </div>
  `,
    styles: ``
})
export class MessagesComponent {}
