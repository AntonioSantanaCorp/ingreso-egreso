import { Component } from '@angular/core';

@Component({
  selector: 'ingreso-egreso',
  template: `
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Agregar Ingreso / Egreso</h4>
            <p class="card-description">Especifique el monto y el tipo</p>
            <ingreso-egreso-form></ingreso-egreso-form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class IngresoEgresoComponent {}
