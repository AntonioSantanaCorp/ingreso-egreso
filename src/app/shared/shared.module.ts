import {
  EnvironmentProviders,
  ModuleWithProviders,
  NgModule,
  Provider,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent, FooterComponent, NavbarComponent],
  imports: [CommonModule],
  exports: [SidebarComponent, FooterComponent, NavbarComponent],
})
export class SharedModule implements ModuleWithProviders<SharedModule> {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
