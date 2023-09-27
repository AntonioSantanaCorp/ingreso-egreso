import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { List } from 'immutable';
import { IngresoEgreso } from '../../core/models/main.model';

@Component({
  selector: 'ingreso-egreso-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table class="table">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Monto</th>
          <th>Tipo</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let item of ingresoEgresos">
          <td>{{ item.descripcion }}</td>
          <td>{{ item.monto | currency }}</td>
          <td
            [class.text-success]="item.tipo === 'ingreso'"
            [class.text-danger]="item.tipo === 'egreso'"
          >
            {{ item.tipo | titlecase }}
          </td>
          <td>
            <button class="btn btn-danger mr-3" (click)="onDelete(item.uid!)">
              <i class="fa fa-trash"></i>
              Borrar
            </button>

            <a
              class="btn btn-info"
              [routerLink]="['/ingreso-egreso', item.uid!]"
            >
              <i class="fa fa-edit"></i>
              Editar
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class IngresoEgresoTableComponent {
  @Input()
  public ingresoEgresos: List<IngresoEgreso> | null = List([]);

  @Output()
  public readonly delete = new EventEmitter<string>();

  protected onDelete(uid: string) {
    this.delete.emit(uid);
  }
}
