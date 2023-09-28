import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';

import { AuthModule, routes } from './pages/auth/auth.module';
import { IngresoEgresoModule } from './pages/ingreso-egreso/ingreso-egreso.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, authGuardMatch } from './pages/auth/core/guard/auth.guard';

import { NgChartsModule } from 'ng2-charts';
import { LoginComponent } from './pages/auth/login/containers/login/login.component';
import { RegisterComponent } from './pages/auth/register/containers/register/register.component';

export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canMatch: [authGuardMatch],
    loadChildren: () =>
      import('./pages/ingreso-egreso/ingreso-egreso.module').then(
        (m) => m.IngresoEgresoModule
      ),
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
