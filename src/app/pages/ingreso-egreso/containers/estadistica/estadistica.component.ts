import { Component } from '@angular/core';

@Component({
  selector: 'estadistica',
  template: `
    <div class="row">
      <div class="col-6">
        <finanza-card
          [amount]="ingresoAmount"
          [lowerPercentage]="ingresoLowerPercentage"
        >
          <i class="fa fa-money-bill-alt text-success icon-lg"></i>
          <p class="mb-0 text-right">Ingresos</p>
        </finanza-card>
      </div>

      <div class="col-6">
        <finanza-card
          [amount]="egresoAmount"
          [lowerPercentage]="egresoLowerPercentage"
        >
          <i class="fa fa-shipping-fast text-danger icon-lg"></i>
          <p class="mb-0 text-right">Ingresos</p>
        </finanza-card>
      </div>
    </div>
  `,
})
export class EstadisticaComponent {
  ingresoAmount = '$65,650';
  ingresoLowerPercentage = '63%';

  egresoAmount = '$65,650';
  egresoLowerPercentage = '63%';

  ngOnInit() {}
}
