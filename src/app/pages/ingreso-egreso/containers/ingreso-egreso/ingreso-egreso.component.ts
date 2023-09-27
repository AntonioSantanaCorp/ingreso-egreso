import { Component, ViewChild } from '@angular/core';
import { IngresoEgresoType } from '../../core/types/main.type';
import { IngresoEgresoHttpService } from '../../core/services/ingreso-egreso-http.service';
import Swal from 'sweetalert2';
import { IngresoEgresoFormComponent } from '../../components/ingreso-egreso-form/ingreso-egreso-form.component';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Observable, iif, map, of, tap } from 'rxjs';
import * as uiActions from 'src/app/core/store/ui.actions';
import { ActivatedRoute } from '@angular/router';
import {
  IngresoEgreso,
  ingresoEgresoDefault,
} from '../../core/models/main.model';

@Component({
  selector: 'ingreso-egreso',
  template: `
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Agregar Ingreso / Egreso</h4>
            <p class="card-description">Especifique el monto y el tipo</p>
            <ingreso-egreso-form
              [isLoading]="isLoading$ | async"
              [ingresoEgreso]="ingresoEgreso$ | async"
              [isEdit]="isEdit"
              (crear)="onCreate($event)"
              (guardarCambios)="onUpdate($event)"
            >
            </ingreso-egreso-form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class IngresoEgresoComponent {
  @ViewChild(IngresoEgresoFormComponent)
  private _ingresoEgresoForm!: IngresoEgresoFormComponent;

  protected isLoading$ = this.store
    .select('ui')
    .pipe(map(({ isLoading }) => isLoading));

  protected ingresoEgreso$ = iif(
    () => this.isEdit,
    this.ingresoEgresoHttp.obtenerIngresoEgreso(
      this.activatedRoute.snapshot.params['id']
    ),
    of({ ...ingresoEgresoDefault })
  );

  protected isEdit: boolean = this.activatedRoute.snapshot.params['id'];

  constructor(
    private ingresoEgresoHttp: IngresoEgresoHttpService,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  onCreate(ingresoEgreso: IngresoEgresoType) {
    const { descripcion } = ingresoEgreso;

    this.store.dispatch(uiActions.isLoading());
    this.ingresoEgresoHttp
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this._ingresoEgresoForm.reset();
        Swal.fire('Registro Creado', descripcion, 'success');
        this.store.dispatch(uiActions.stopLoading());
      })
      .catch(({ message }) => {
        Swal.fire('Error', message, 'error');
        this.store.dispatch(uiActions.stopLoading());
      });
  }

  onUpdate(ingresoEgreso: IngresoEgresoType) {
    const { descripcion } = ingresoEgreso;

    this.store.dispatch(uiActions.isLoading());
    this.ingresoEgresoHttp
      .actualizarIngresoEgreso(ingresoEgreso)
      .then(() => {
        this._ingresoEgresoForm.reset(ingresoEgreso);
        Swal.fire('Registro Creado', descripcion, 'success');
        this.store.dispatch(uiActions.stopLoading());
      })
      .catch(({ message }) => {
        Swal.fire('Error', message, 'error');
        this.store.dispatch(uiActions.stopLoading());
      });
  }
}
