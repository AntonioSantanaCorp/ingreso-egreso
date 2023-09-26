import { ChangeDetectionStrategy, Component } from '@angular/core';
import { setIngresoEgresoForm } from '../../core/utils/ingreso-form.util';

@Component({
  selector: 'ingreso-egreso-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="ingresoForm">
      <div class="form-group">
        <label>Descripción</label>
        <input
          type="text"
          class="form-control"
          placeholder="Descripción"
          name="descripcion"
          formControlName="descripcion"
        />
      </div>

      <div class="form-group">
        <label>Monto</label>
        <input
          type="number"
          class="form-control"
          placeholder="Monto"
          name="monto"
          formControlName="monto"
        />
        <p>Debe de ser un monto positivo</p>
      </div>

      <div class="form-group">
        <label>Tipo</label>
        <br />
        <type-ingreso-egreso></type-ingreso-egreso>
      </div>

      <hr />
      <button
        type="submit"
        class="btn btn-success mr-2"
        [disabled]="ingresoForm.invalid"
      >
        <i class="fa fa-save"></i>
        Agregar
      </button>

      <!-- 
                <button disabled class="btn btn-success mr-2">
                  <i class="fa fa-spin fa-sync"></i>
                  Espere por favor...
                </button> 
              -->

      <button type="button" class="btn btn-light" (click)="reset()">
        Cancelar
      </button>
    </form>
  `,
})
export class IngresoEgresoFormComponent {
  protected ingresoForm = setIngresoEgresoForm();

  reset() {
    this.ingresoForm.reset();
  }
}
