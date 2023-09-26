import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/main.model';

export const setUser = createAction('[Auth] setUser', props<Usuario>());
export const unSetUser = createAction('[Auth] unSetUser');
