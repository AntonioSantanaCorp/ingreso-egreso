import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/containers/login/login.component';
import { RegisterComponent } from './register/containers/register/register.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { AuthService } from './core/services/auth.service';

// export const routes: Routes = [
//   {
//     path: 'login',
//     loadChildren: () =>
//       import('./login/login.module').then((m) => m.LoginModule),
//   },
//   {
//     path: 'register',
//     loadChildren: () =>
//       import('./register/register.module').then((m) => m.RegisterModule),
//   },
// ];

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,//.forChild(routes)
    LoginModule,
    RegisterModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
