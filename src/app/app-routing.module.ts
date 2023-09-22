import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { INGRESO_EGRESO_ROUTES } from './pages/ingreso-egreso/ingreso-egreso.module';

const routes: Routes = [
  {
    path: '',   
    component: DashboardComponent,
    children: INGRESO_EGRESO_ROUTES,
  },
  // { path: '**', pathMatch:'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
