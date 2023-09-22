import { Component } from '@angular/core';
import { setLoginForm } from '../../core/utils/login-form.util';
import { AuthUser } from '../../../shared/models/main.model';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  template: `
    <div class="page-body-wrapper full-page-wrapper auth-page">
      <div
        class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one"
      >
        <div class="row w-100">
          <div class="col-lg-4 mx-auto">
            <h2 class="text-center mb-4" style="color: white;">Ingresar</h2>
            <div class="auto-form-wrapper">
              <form [formGroup]="form" (ngSubmit)="onSubmit()">
                <div class="form-group">
                  <label class="label">Usuario</label>
                  <div class="input-group">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      formControlName="email"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text">
                        <i
                          *ngIf="isInputValid('email')"
                          class="fa fa-check-circle"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="label">Contraseña</label>
                  <div class="input-group">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="*********"
                      formControlName="password"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text">
                        <i
                          *ngIf="isInputValid('password')"
                          class="fa fa-check-circle"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="btn btn-primary submit-btn btn-block"
                    [disabled]="form.invalid"
                  >
                    Login
                  </button>
                </div>

                <div class="text-block text-center my-3">
                  <span class="text-small font-weight-semibold">
                    No estas registrado?
                  </span>
                  <br />
                  <a routerLink="/register" class="text-black text-small">
                    Crear una cuenta
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
  `,
})
export class LoginComponent {
  protected readonly form = setLoginForm();

  constructor(private authService: AuthService, private router: Router) {}

  isInputValid(control: string) {
    return this.form.get(control)?.valid;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    this.authService
      .loginUsuario(email!, password!)
      .then((credenciales) => this.router.navigate(['/']))
      .catch((error) => console.error(error));
  }
}
