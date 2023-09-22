import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ingreso-egreso-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form>
      <div class="form-group">
        <label>Descripción</label>
        <input
          type="text"
          class="form-control"
          placeholder="Descripción"
          name="descripcion"
        />
      </div>

      <div class="form-group">
        <label>Monto</label>
        <input
          type="number"
          class="form-control"
          placeholder="Monto"
          name="monto"
        />
        <p>Debe de ser un monto positivo</p>
      </div>

      <div class="form-group">
        <label>Tipo</label>
        <br />
        <type-ingreso-egreso></type-ingreso-egreso>
      </div>

      <hr />
      <button type="button" class="btn btn-success mr-2">
        <i class="fa fa-save"></i>
        Agregar
      </button>

      <!-- 
                <button disabled class="btn btn-success mr-2">
                  <i class="fa fa-spin fa-sync"></i>
                  Espere por favor...
                </button> 
              -->

      <button type="reset" class="btn btn-light">Cancelar</button>
    </form>
  `,
})
export class IngresoEgresoFormComponent {}
