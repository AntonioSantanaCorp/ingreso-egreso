import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { setAuthForm } from '../../core/utils/auth-form.util';
import { AuthUser } from '../../core/models/main.model';

@Component({
  selector: 'auth-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="text-center mb-4"><ng-content select="span"></ng-content></h2>
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
                <i class="fa fa-check-circle"></i>
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
                <i class="fa fa-check-circle"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="form-group"></div>

        <ng-content select="button"> </ng-content>

        <ng-content select="[data-link]"></ng-content>
      </form>
    </div>
  `,
})
export class AuthFormComponent {
  protected readonly form = setAuthForm();

  @Output()
  public submitted = new EventEmitter<AuthUser>();

  onSubmit() {
    if (this.form.invalid) return;

    this.submitted.emit(this.form.value as AuthUser);
  }
}
