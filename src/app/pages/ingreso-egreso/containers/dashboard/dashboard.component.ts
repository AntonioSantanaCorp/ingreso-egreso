import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/pages/auth/core/services/auth.service';
import { IngresoEgresoHttpService } from 'src/app/pages/ingreso-egreso/core/services/ingreso-egreso-http.service';

@Component({
  selector: 'dashboard',
  template: `
    <app-navbar></app-navbar>
    <div class="page-body-wrapper">
      <app-sidebar
        [nombreUsuario]="nombreUsuario$ | async | titlecase"
        (logout)="onLogout()"
      ></app-sidebar>
      <div class="main-panel">
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private clearSubscriptions = new Subject<void>();

  protected nombreUsuario$ = this.store
    .select('auth')
    .pipe(map(({ user }) => user?.nombre ?? ''));

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoHttp: IngresoEgresoHttpService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ingresoEgresoHttp.ingresoEgresoList$
      .pipe(takeUntil(this.clearSubscriptions))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.clearSubscriptions?.unsubscribe();
  }

  onLogout() {
    this.auth.logout().then(() => this.router.navigate(['/login']));
  }
}
