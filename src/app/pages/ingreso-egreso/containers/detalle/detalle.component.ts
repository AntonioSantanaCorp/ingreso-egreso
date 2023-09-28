import { Component } from '@angular/core';
import { IngresoEgreso } from '../../core/models/main.model';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoHttpService } from '../../core/services/ingreso-egreso-http.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppStateWithIngreso } from '../../core/store/ingreso-egreso.reducer';

@Component({
  selector: 'detalle',
  template: `
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Detalle de ingreso egreso</h4>
            <ingreso-egreso-table
              [ingresoEgresos]="ingresosEgresos$ | async | ordenIngreso"
              (delete)="borrar($event)"
            >
            </ingreso-egreso-table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DetalleComponent {
  protected ingresosEgresos$ = this.store
    .select('ingresosEgresos')
    .pipe(map(({ items }) => items));

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoHttp: IngresoEgresoHttpService,
    private router: Router
  ) {}

  borrar(uid: string) {
    this.ingresoEgresoHttp
      .borrarIngresoEgreso(uid)
      .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch(({ message }) => Swal.fire('Error', message, 'error'));
  }
}
