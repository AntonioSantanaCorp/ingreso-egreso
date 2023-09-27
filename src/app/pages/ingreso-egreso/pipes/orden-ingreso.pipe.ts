import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../core/models/main.model';
import { List } from 'immutable';

@Pipe({
  name: 'ordenIngreso',
})
export class OrdenIngresoPipe implements PipeTransform {
  transform(items: List<IngresoEgreso> | null): List<IngresoEgreso> | null {
    if (!items) return items;
    return items.sortBy((s) => (s.tipo === 'ingreso' ? -1 : 1));
  }
}
