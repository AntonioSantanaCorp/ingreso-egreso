import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'ingreso-egreso-grafica',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="row m-5">
      <div class="col-12">
        <div class="card card-statistics">
          <div class="card-body">
            <div class="clearfix">
              <div class="float-left">
                <i class="fa fa-building text-info icon-lg"></i>
              </div>
              <div class="float-right">
                <p class="mb-0 text-right">Diferencia</p>
                <div class="fluid-container">
                  <h3
                    class="font-weight-medium text-right mb-0"
                    [class.text-success]="totalIngresos - totalEgresos > 0"
                    [class.text-danger]="totalIngresos - totalEgresos < 0"
                  >
                    {{ totalIngresos - totalEgresos | currency }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 p-5" *ngIf="totalIngresos > 0 || totalEgresos > 0">
        <div class="card card-statistics">
          <div class="card-body">
            <h1 class="card-title">Grafica</h1>
            <canvas
              baseChart
              class="chart"
              type="doughnut"
              [data]="doughnutChartData"
            >
            </canvas>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class IngresoEgresoGraficaComponent implements OnChanges {
  @Input({ transform: (value: number | null) => value ?? 0 })
  public totalIngresos: number = 0;

  @Input({ transform: (value: number | null) => value ?? 0 })
  public totalEgresos: number = 0;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [this.totalIngresos, this.totalEgresos] }],
  };

  ngOnChanges(_: SimpleChanges): void {
    this.doughnutChartData.datasets = [
      { data: [this.totalIngresos, this.totalEgresos] },
    ];
  }
}
