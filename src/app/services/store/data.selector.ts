import { createFeatureSelector, createSelector } from '@ngrx/store';
import { dataState } from './data.reducer';
import { AppState } from '../app.state';

const selectFeature = (state: AppState) => state.feature_state;

export const itemsSelector = createSelector(
  selectFeature,
  (state: dataState) => state.items
);
export const fieldSelector = createSelector(
  selectFeature,
  (state: dataState) => state.fields
);
export const statusSelector = createSelector(
  selectFeature,
  (state: dataState) => state.status
);
export const datasortSelector = createSelector(
  selectFeature,
  (state: dataState) => state.datasort
);
export const errorSelector = createSelector(
  selectFeature,
  (state: dataState) => state.error
);
