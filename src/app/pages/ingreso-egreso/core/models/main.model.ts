import { Record } from 'immutable';
import { IngresoEgresoType } from '../types/main.type';

const ingresoEgresoDefault = { descripcion: '', monto: 0, tipo: '' };
export class IngresoEgreso extends Record<IngresoEgresoType>(
  ingresoEgresoDefault
) {
  constructor({ descripcion, monto, tipo, uid }: IngresoEgresoType) {
    super({ descripcion, monto, tipo, uid });
  }
}
