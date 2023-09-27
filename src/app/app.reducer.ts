import { ActionReducerMap } from '@ngrx/store';
import * as ui from './core/store/ui.reducer';
import * as auth from './pages/auth/core/store/auth.reducer';
import * as ingresoEgreso from './pages/ingreso-egreso/core/store/ingreso-egreso.reducer';

export interface AppState {
  ui: ui.UiState;
  auth: auth.AuthState;
  ingresosEgresos: ingresoEgreso.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  ingresosEgresos: ingresoEgreso.igresoEgresoReducer,
};
