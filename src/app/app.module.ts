import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';

import { AuthModule, routes } from './pages/auth/auth.module';
import {
  INGRESO_EGRESO_ROUTES,
  IngresoEgresoModule,
} from './pages/ingreso-egreso/ingreso-egreso.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { DashboardComponent } from './pages/dashboard/containers/dashboard/dashboard.component';
import { authGuard } from './pages/auth/core/guard/auth.guard';

import { NgChartsModule } from 'ng2-charts';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: INGRESO_EGRESO_ROUTES,
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    IngresoEgresoModule,
    DashboardModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
