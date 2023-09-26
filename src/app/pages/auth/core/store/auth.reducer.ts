import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser } from './auth.actions';
import { Usuario } from '../models/main.model';
import { Record } from 'immutable';

interface State {
  user: Usuario | null;
}

export class AuthState extends Record<State>({ user: null }) {}

export const initialState: AuthState = new AuthState();

export const authReducer = createReducer(
  initialState,

  on(setUser, (state, user) => state.set('user', user)),
  on(unSetUser, (state) => state.set('user', null))
);
