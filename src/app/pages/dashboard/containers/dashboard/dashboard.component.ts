import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, filter, takeUntil } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoHttpService } from 'src/app/pages/ingreso-egreso/core/services/ingreso-egreso-http.service';

@Component({
  selector: 'dashboard',
  template: `
    <app-navbar></app-navbar>
    <div class="page-body-wrapper">
      <app-sidebar></app-sidebar>
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

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoHttp: IngresoEgresoHttpService
  ) {}

  ngOnInit(): void {
    this.ingresoEgresoHttp.ingresoEgresoList$.subscribe();
  }

  ngOnDestroy(): void {
    this.clearSubscriptions?.unsubscribe();
  }
}
