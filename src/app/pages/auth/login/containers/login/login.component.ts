import { Component, OnDestroy, OnInit } from '@angular/core';
import { setLoginForm } from '../../core/utils/login-form.util';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as uiActions from 'src/app/core/store/ui.actions';
import { Subscription, tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

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
                    *ngIf="!cargando"
                  >
                    Login
                  </button>

                  <button
                    type="button"
                    class="btn btn-primary submit-btn btn-block"
                    [disabled]="true"
                    *ngIf="cargando"
                  >
                    <i class="fa fa-spin fa-sync"></i>
                    Espere ...
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
export class LoginComponent implements OnInit, OnDestroy {
  private uiSubscription!: Subscription;

  protected readonly form = setLoginForm();

  protected cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      console.log('is loading', ui.isLoading);

      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  isInputValid(control: string) {
    return this.form.get(control)?.valid;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    this.store.dispatch(uiActions.isLoading());
    this.authService
      .loginUsuario(email!, password!)
      .then((credenciales) => {
        // Swal.close()

        this.store.dispatch(uiActions.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(({ message }) => {
        this.store.dispatch(uiActions.stopLoading());

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message,
        });
      });
  }

  private showLoading() {
    return Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
}
