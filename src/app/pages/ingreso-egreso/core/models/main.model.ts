import { Record } from 'immutable';
import { IngresoEgresoType } from '../types/main.type';

export const ingresoEgresoDefault: IngresoEgresoType = {
  descripcion: '',
  monto: 0,
  tipo: 'ingreso',
  uid: '',
};
export class IngresoEgreso extends Record<IngresoEgresoType>(
  ingresoEgresoDefault
) {
  constructor({ descripcion, monto, tipo, uid }: IngresoEgresoType) {
    super({ descripcion, monto, tipo, uid });
  }
}
