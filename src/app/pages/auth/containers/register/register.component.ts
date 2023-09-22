import { Component } from '@angular/core';
import { AuthUser } from '../../core/models/main.model';

@Component({
  selector: 'register',
  template: `
    <div class="page-body-wrapper full-page-wrapper auth-page">
      <div
        class="content-wrapper d-flex align-items-center auth register-bg-1 theme-one"
      >
        <div class="row w-100">
          <div class="col-lg-4 mx-auto">
            <auth-form (submitted)="onSubmit($event)">
              <span>Registro</span>
              <button
                type="submit"
                class="btn btn-primary submit-btn btn-block"
              >
                Crear cuenta
              </button>

              <div data-link class="text-block text-center my-3">
                <span class="text-small font-weight-semibold">
                  ya tienes una cuenta?
                </span>
                <br />
                <a routerLink="../login" class="text-black text-small">Login</a>
              </div>
            </auth-form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  onSubmit(authUser: AuthUser) {
    console.log(authUser);
  }
}
