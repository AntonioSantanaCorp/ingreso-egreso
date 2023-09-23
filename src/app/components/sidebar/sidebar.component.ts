import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="sidebar sidebar-offcanvas">
      <ul class="nav">
        <li class="nav-item nav-profile">
          <div class="nav-link">
            <div class="user-wrapper">
              <div class="profile-image">
                <img src="assets/images/faces/face1.jpg" alt="profile image" />
              </div>

              <div class="text-wrapper">
                <p class="profile-name">Cristobal Colón</p>
                <div>
                  <small class="designation text-muted">Gerente</small>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item">
          <a routerLink="/" class="nav-link">
            <i class="menu-icon fa fa-tachometer-alt"></i>
            <span class="menu-title">Dashboard</span>
          </a>
        </li>

        <li class="nav-item">
          <a routerLink="/ingreso-egreso" class="nav-link">
            <i class="menu-icon fa fa-clipboard-list"></i>
            <span class="menu-title">Ingresos y Egresos</span>
          </a>
        </li>

        <li class="nav-item">
          <a routerLink="/detalle" class="nav-link">
            <i class="menu-icon fa fa-table"></i>
            <span class="menu-title">Detalle</span>
          </a>
        </li>

        <li class="nav-item">
          <a (click)="logOut()" class="nav-link cursor">
            <i class="menu-icon fa fa-sign-out-alt"></i>
            <span class="menu-title">Cerrar sesión</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: [],
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logOut() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }
}
