import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container-fluid clearfix">
        <span
          class="text-muted d-block text-center text-sm-left d-sm-inline-block"
          >Derechos reservados © 20XX
          <a href="" target="_blank"> Samuel Antonio Santana </a>
        </span>
        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"
          >Creado a mano con
          <i class="fa fa-heart text-danger"></i>
        </span>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {}
