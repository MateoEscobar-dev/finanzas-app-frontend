import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AccountWrapperComponent } from '@auth/account-wrapper.component'
import { Store } from '@ngrx/store'
import { register } from '@store/authentication/authentication.actions'

@Component({
    selector: 'app-register',
    imports: [
        CommonModule,
        AccountWrapperComponent,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    template: `
    <app-account-wrapper>
      <div class="text-center w-75 m-auto">
        <h4 class="text-dark-50 text-center mt-0 fw-bold">Free Sign Up</h4>
        <p class="text-muted mb-4">
          Don't have an account? Create your account, it takes less than a
          minute
        </p>
      </div>

      <form [formGroup]="signUpForm" (ngSubmit)="onSubmit()" action="#">
        <div class="mb-3">
          <label for="fullname" class="form-label">Full Name</label>
          <input
            class="form-control"
            type="text"
            id="fullname"
            formControlName="name"
            placeholder="Enter your name"
            required
            [ngClass]="{
              'is-invalid': formSubmitted && formValues['email'].invalid
            }"
          />
        </div>

        <div class="mb-3">
          <label for="emailaddress" class="form-label">Email address</label>
          <input
            class="form-control"
            type="email"
            id="emailaddress"
            required
            formControlName="email"
            placeholder="Enter your email"
            [ngClass]="{
              'is-invalid': formSubmitted && formValues['email'].invalid
            }"
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <div class="input-group input-group-merge">
            <input
              [type]="showPassword ? 'text' : 'password'"
              id="password"
              class="form-control"
              formControlName="password"
              placeholder="Enter your password"
              [ngClass]="{
                'is-invalid': formSubmitted && formValues['password'].invalid
              }"
            />
            <div
              class="input-group-text"
              [ngClass]="{ 'show-password': showPassword }"
              (click)="showPassword = !showPassword"
            >
              <span class="password-eye"></span>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="checkbox-signup"
            />
            <label class="form-check-label" for="checkbox-signup"
              >I accept
              <a href="javascript:void(0)" class="text-muted"
                >Terms and Conditions</a
              ></label
            >
          </div>
        </div>

        <div class="mb-3 text-center">
          <button class="btn btn-primary" type="submit">Sign Up</button>
        </div>
      </form>

      <ng-template #bottomLinks>
        <div class="row mt-3">
          <div class="col-12 text-center">
            <p class="text-muted">
              Already have account?
              <a routerLink="/pages-login" class="text-muted ms-1"
                ><b>Log In</b></a
              >
            </p>
          </div>
          <!-- end col-->
        </div>
        <!-- end row -->
      </ng-template>
    </app-account-wrapper>
  `,
    styles: ``
})
export class RegisterComponent implements OnInit {
  signUpForm!: FormGroup
  formSubmitted: boolean = false
  showPassword: boolean = false

  private store = inject(Store)

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formValues() {
    return this.signUpForm.controls
  }

  /**
   * On form submit
   */
  onSubmit(): void {
    this.formSubmitted = true

    const email = this.formValues['email'].value
    const name = this.formValues['name'].value
    const password = this.formValues['password'].value

    if (this.signUpForm.valid) {
      //Dispatch Action
      this.store.dispatch(
        register({ username: name, email: email, password: password })
      )
    }
  }
}
