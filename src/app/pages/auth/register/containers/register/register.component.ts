import { Component } from '@angular/core';
import { setRegisterForm } from '../../core/utils/auth-form.util';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as uiActions from 'src/app/core/store/ui.actions';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'register',
  template: `
    <div class="page-body-wrapper full-page-wrapper auth-page">
      <div
        class="content-wrapper d-flex align-items-center auth register-bg-1 theme-one"
      >
        <div class="row w-100">
          <div class="col-lg-4 mx-auto">
            <h2 class="text-center mb-4">Registro</h2>
            <div class="auto-form-wrapper">
              <form [formGroup]="form" (ngSubmit)="onSubmit()">
                <div class="form-group">
                  <label class="label">Nombre</label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nombre"
                      formControlName="nombre"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text">
                        <i
                          *ngIf="isInputValid('nombre')"
                          class="fa fa-check-circle"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>

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

                <button
                  type="submit"
                  class="btn btn-primary submit-btn btn-block"
                  [disabled]="form.invalid"
                  *ngIf="!cargando"
                >
                  Crear cuenta
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
                <div class="text-block text-center my-3">
                  <span class="text-small font-weight-semibold">
                    ya tienes una cuenta?
                  </span>
                  <br />
                  <a routerLink="/login" class="text-black text-small">
                    Login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private uiSubscription!: Subscription;

  protected readonly form = setRegisterForm();

  protected cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  isInputValid(control: string) {
    return this.form.get(control)?.valid;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { nombre, email, password } = this.form.value;

    this.store.dispatch(uiActions.isLoading());

    this.authService
      .crearUsuario(nombre!, email!, password!)
      .then((credenciales) => {
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
