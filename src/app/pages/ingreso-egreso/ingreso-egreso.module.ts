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

export const INGRESO_EGRESO_ROUTES: Routes = [
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
    IngresoEgresoGraficaComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgChartsModule],
})
export class IngresoEgresoModule {}
