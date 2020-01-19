import * as AppTypes from 'app/types';
import * as types from './types';

/*
 * PROJECTS_APPLY_FILTER
 */

export const applyFilter: (
  filter: AppTypes.ProjectFilter,
) => types.Interface['PROJECTS_APPLY_FILTER'] = filter => ({
  type: types.PROJECTS_APPLY_FILTER,
  payload: {
    filter,
  },
});

/*
 * PROJECTS_REMOVE_FILTER
 */

export const removeFilter: (
  key: number,
) => types.Interface['PROJECTS_REMOVE_FILTER'] = key => ({
  type: types.PROJECTS_REMOVE_FILTER,
  payload: {
    key,
  },
});
