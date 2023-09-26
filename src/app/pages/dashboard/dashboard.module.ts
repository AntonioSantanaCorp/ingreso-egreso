import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/core/guard/auth.guard';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { INGRESO_EGRESO_ROUTES } from '../ingreso-egreso/ingreso-egreso.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: INGRESO_EGRESO_ROUTES,
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
