import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './containers/detalle/detalle.component';
import { EstadisticaComponent } from './containers/estadistica/estadistica.component';
import { IngresoEgresoComponent } from './containers/ingreso-egreso/ingreso-egreso.component';
import { RouterModule, Routes } from '@angular/router';
import { FinanzaCardComponent } from './components/finanza-card/finanza-card.component';
import { IngresoEgresoFormComponent } from './components/ingreso-egreso-form/ingreso-egreso-form.component';
import { TypeIngresoEgresoComponent } from './components/type-ingreso-egreso/type-ingreso-egreso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresoEgresoTableComponent } from './components/ingreso-egreso-table/ingreso-egreso-table.component';
import { OrdenIngresoPipe } from './pipes/orden-ingreso.pipe';
import { IngresoEgresoGraficaComponent } from './components/ingreso-egreso-grafica/ingreso-egreso-grafica.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './core/store/ingreso-egreso.reducer';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: EstadisticaComponent },
      {
        path: 'ingreso-egreso',
        component: IngresoEgresoComponent,
        data: { isEdit: false },
      },
      {
        path: 'ingreso-egreso/:id',
        component: IngresoEgresoComponent,
        data: { isEdit: true },
      },
      { path: 'detalle', component: DetalleComponent },
    ],
  },
];

@NgModule({
  declarations: [
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    FinanzaCardComponent,
    IngresoEgresoFormComponent,
    TypeIngresoEgresoComponent,
    IngresoEgresoTableComponent,
    OrdenIngresoPipe,
    DashboardComponent,
    IngresoEgresoGraficaComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    RouterModule,
    NgChartsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class IngresoEgresoModule {}
