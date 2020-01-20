import { StrictTableHeaderCellProps } from 'semantic-ui-react';
import * as AppTypes from 'app/types';

export const PROJECTS_SORT_BY_COLUMN = 'PROJECTS_SORT_BY_COLUMN';
export const PROJECTS_APPLY_FILTER = 'PROJECTS_APPLY_FILTER';
export const PROJECTS_REMOVE_FILTER = 'PROJECTS_REMOVE_FILTER';
export const PROJECTS_UPDATE_PROJECT = 'PROJECTS_UPDATE_PROJECT';

export interface Interface {

  [PROJECTS_SORT_BY_COLUMN]: {
    type: 'PROJECTS_SORT_BY_COLUMN',
    payload: {
      column: keyof AppTypes.Project,
      direction: StrictTableHeaderCellProps['sorted'],
    },
  },

  [PROJECTS_APPLY_FILTER]: {
    type: 'PROJECTS_APPLY_FILTER',
    payload: {
      filter: AppTypes.ProjectFilter,
    },
  },

  [PROJECTS_REMOVE_FILTER]: {
    type: 'PROJECTS_REMOVE_FILTER',
    payload: {
      key: number,
    },
  },

  [PROJECTS_UPDATE_PROJECT]: {
    type: 'PROJECTS_UPDATE_PROJECT',
    payload: {
      key: number,
      update: Partial<AppTypes.Project>,
    },
  },

};
