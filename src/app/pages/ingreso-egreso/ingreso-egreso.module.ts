import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './containers/detalle/detalle.component';
import { EstadisticaComponent } from './containers/estadistica/estadistica.component';
import { IngresoEgresoComponent } from './containers/ingreso-egreso/ingreso-egreso.component';
import { Routes } from '@angular/router';
import { FinanzaCardComponent } from './components/finanza-card/finanza-card.component';
import { IngresoEgresoFormComponent } from './components/ingreso-egreso-form/ingreso-egreso-form.component';
import { TypeIngresoEgresoComponent } from './components/type-ingreso-egreso/type-ingreso-egreso.component';

export const INGRESO_EGRESO_ROUTES: Routes = [
  { path: '', component: EstadisticaComponent },
  { path: 'ingreso-egreso', component: IngresoEgresoComponent },
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
  ],
  imports: [CommonModule],
})
export class IngresoEgresoModule {}
