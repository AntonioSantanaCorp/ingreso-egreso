import { createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/main.model';
import { addItem, setItems, unSetItems } from './ingreso-egreso.actions';
import { List, Record } from 'immutable';
import { AppState } from 'src/app/app.reducer';

export class IngresoEgresoState extends Record<{ items: List<IngresoEgreso> }>({
  items: List([]),
}) {}

export interface AppStateWithIngreso extends AppState {
  ingresosEgresos: IngresoEgresoState;
}

export const initialState = new IngresoEgresoState();

export const ingresoEgresoReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) =>
    state.set('items', List(items.map((e) => new IngresoEgreso({ ...e }))))
  ),
  on(unSetItems, (state) => state.set('items', List([]))),
  on(addItem, (state, { item }) =>
    state.update('items', (value) => value.push(new IngresoEgreso({ ...item })))
  )
);

/* Individual List
export type IngresoEgresoState = List<IngresoEgreso>;

export const initialState: IngresoEgresoState = List([]);

export const igresoEgresoReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) =>
    state.merge(items.map((e) => new IngresoEgreso({ ...e })))
  ),
  on(unSetItems, (state) => state.clear())
);
*/
