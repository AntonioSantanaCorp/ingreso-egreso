import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'type-ingreso-egreso',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="btn btn-primary btn-block">Ingreso</button>
    <!-- <button type="button" class="btn btn-warning btn-block">Egreso</button> -->
  `,
  styles: [],
})
export class TypeIngresoEgresoComponent {}
