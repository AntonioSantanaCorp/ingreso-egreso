import { createAction, props } from '@ngrx/store';
import { IngresoEgresoType } from '../types/main.type';

export const setItems = createAction(
  '[Ingreso Egreso] Set Items',
  props<{ items: IngresoEgresoType[] }>()
);
export const unSetItems = createAction('[Ingreso Egreso] Unset Items');
export const addItem = createAction(
  '[Ingreso Egreso] Add Item',
  props<{ item: IngresoEgresoType }>()
);
