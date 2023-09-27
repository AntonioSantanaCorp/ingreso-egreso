import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, shareReplay } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'estadistica',
  template: `
    <div class="row">
      <div class="col-6">
        <finanza-card
          [amount]="totalIngresos$ | async"
          [lowerPercentage]="ingresoCount$ | async"
        >
          <i class="fa fa-money-bill-alt text-success icon-lg"></i>
          <p class="mb-0 text-right">Ingresos</p>
        </finanza-card>
      </div>

      <div class="col-6">
        <finanza-card
          [amount]="totalEgresos$ | async"
          [lowerPercentage]="egresoCount$ | async"
        >
          <i class="fa fa-shipping-fast text-danger icon-lg"></i>
          <p class="mb-0 text-right">Egreso</p>
        </finanza-card>
      </div>
    </div>

    <ingreso-egreso-grafica
      [totalIngresos]="totalIngresos$ | async"
      [totalEgresos]="totalEgresos$ | async"
    >
    </ingreso-egreso-grafica>
  `,
})
export class EstadisticaComponent {
  private readonly _list$ = this.store
    .select('ingresosEgresos')
    .pipe(map(({ items }) => items));

  protected readonly ingresoCount$ = this._list$.pipe(
    map((items) => items.filter(({ tipo }) => tipo === 'ingreso')),
    map((items) => items.count())
  );

  protected readonly totalIngresos$ = this._list$.pipe(
    map((items) => items.filter(({ tipo }) => tipo === 'ingreso')),
    map((items) => items.reduce((acum, { monto }) => acum + monto, 0))
  );

  protected readonly egresoCount$ = this._list$.pipe(
    map((items) => items.filter(({ tipo }) => tipo === 'egreso')),
    map((items) => items.count())
  );

  protected readonly totalEgresos$ = this._list$.pipe(
    map((items) => items.filter(({ tipo }) => tipo === 'egreso')),
    map((items) => items.reduce((acum, { monto }) => acum + monto, 0))
  );

  constructor(private store: Store<AppState>) {}
}
