import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';
import { Record } from 'immutable';

export class UiState extends Record({ isLoading: false }) {}

export const initialState: UiState = new UiState();

export const uiReducer = createReducer(
  initialState,
  on(isLoading, (state) => state.set('isLoading', true)),
  on(stopLoading, (state) => state.set('isLoading', true))
);
