import { Component } from '@angular/core';
import { AuthUser } from '../../core/models/main.model';

@Component({
  selector: 'login',
  template: `
    <div class="page-body-wrapper full-page-wrapper auth-page">
      <div
        class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one"
      >
        <div class="row w-100">
          <div class="col-lg-4 mx-auto">
            <auth-form (submitted)="onSubmit($event)">
              <span style="color: white;">Ingresar</span>

              <button
                type="submit"
                class="btn btn-primary submit-btn btn-block"
              >
                Login
              </button>

              <div data-link class="text-block text-center my-3">
                <span class="text-small font-weight-semibold">
                  No estas registrado?
                </span>
                <br />
                <a routerLink="../register" class="text-black text-small">
                  Crear una cuenta
                </a>
              </div>
            </auth-form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  onSubmit(authUser: AuthUser) {
    console.log(authUser);
  }
}
