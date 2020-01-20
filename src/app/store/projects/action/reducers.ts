import { fromJS } from 'immutable';
import { AppState } from 'core/store';
import * as AppTypes from 'app/types';

import paths from '../paths';
import * as types from './types';

/*
 * PROJECTS_APPLY_FILTER
 */
export const applyFilter = (
  state: AppState,
  { payload }: types.Interface['PROJECTS_APPLY_FILTER'],
) => {
  const updated = state.getIn(
    paths.appliedFilters()
  ).push(fromJS(payload.filter));

  return state
    .setIn(
      paths.appliedFilters(),
      updated,
    )
  ;
};

/*
 * PROJECTS_REMOVE_FILTER
 */
export const removeFilter = (
  state: AppState,
  { payload }: types.Interface['PROJECTS_REMOVE_FILTER'],
) => state
  .setIn(
    paths.appliedFilters(),
    state.getIn(
      paths.appliedFilters()
    )
    .delete(payload.key)
  )
;

/*
 * PROJECTS_UPDATE_PROJECT
 */
export const updateProject = (
  state: AppState,
  { payload }: types.Interface['PROJECTS_UPDATE_PROJECT'],
) => {
  const { update } = payload;
  let newState: AppState = state;
  Object.keys(update).forEach((
    field: string,
  ) => {
    const value: any = update[field as keyof AppTypes.Project];
    newState = newState.setIn(
      paths.project(payload.key).concat([field]),
      value,
    );
  });
  return newState;
};

/*
 * default export
 */
export default {
  [types.PROJECTS_APPLY_FILTER as string]: applyFilter,
  [types.PROJECTS_REMOVE_FILTER as string]: removeFilter,
  [types.PROJECTS_UPDATE_PROJECT as string]: updateProject,
};
