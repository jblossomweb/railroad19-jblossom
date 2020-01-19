import { List } from 'immutable';
import { createSelector } from 'reselect';
import { AppState } from 'core/store';

import * as DataTypes from './dataTypes';
import paths from './paths';

/*
 * getProjects
 */

const getProjectsSelector = (
  state: AppState,
): DataTypes.Projects => state.get('app').getIn(
  paths.projects(),
  DataTypes.defaultProjects,
);

export const getProjects = createSelector([
  getProjectsSelector,
], (projects: DataTypes.Projects) => projects);

/*
 * getAppliedFilters
 */

const getAppliedFiltersSelector = (
  state: AppState,
): DataTypes.AppliedFilters => state.get('app').getIn(
  paths.appliedFilters(),
  DataTypes.defaultAppliedFilters,
);

export const getAppliedFilters = createSelector([
  getAppliedFiltersSelector,
], (appliedFilters: DataTypes.AppliedFilters) => appliedFilters);

/*
 * getVisibleColumns
 */

const getVisibleColumnsSelector = (
  state: AppState,
): DataTypes.VisibleColumns => state.get('app').getIn(
  paths.visibleColumns(),
  DataTypes.defaultVisibleColumns,
);

export const getVisibleColumns = createSelector([
  getVisibleColumnsSelector,
], (visibleColumns: DataTypes.VisibleColumns) => visibleColumns);

/*
 * getFilteredRows
 */

export const getFilteredRows = createSelector([
  getProjects,
  getAppliedFilters,
], (
  allProjects: DataTypes.Projects,
  appliedFilters: DataTypes.AppliedFilters,
) => {
  let filteredRows: DataTypes.Projects = allProjects;
  appliedFilters?.forEach((
    appliedFilter: DataTypes.AppliedFilter,
  ) => {
    filteredRows = filteredRows.filter((
      row: DataTypes.Project,
    ) => {
      const column = appliedFilter.get('column');
      const value = appliedFilter.get('value');
      const search = appliedFilter.get('search');
      const min = appliedFilter.get('min');
      const max = appliedFilter.get('max');

      if (value) {
        return row.get(column) === value;
      }
      if (search) {
        return String(row.get(column)).toLowerCase()
          .includes(String(search).toLowerCase())
        ;
      }
      if (
        typeof min !== 'undefined' &&
        typeof max !== 'undefined'
      ) {
        return (
          Number(min) <= Number(row.get(column)) &&
          Number(max) >= Number(row.get(column))
        );
      }
      if (typeof min !== 'undefined') {
        return Number(min) <= Number(row.get(column));
      }
      if (typeof max !== 'undefined') {
        return Number(max) >= Number(row.get(column));
      }
      return false;
    });
  });
  return filteredRows;
});

/*
 * getDivisions
 */

export const getDivisions = createSelector([
  getProjects,
], (projects: DataTypes.Projects) => {
  const divisions: List<string> = projects.map(
    (project: DataTypes.Project) => project.get('division')
  );
  return divisions.toSet();
});

/*
 * getProjectOwners
 */

export const getProjectOwners = createSelector([
  getProjects,
], (projects: DataTypes.Projects) => {
  const projectOwners: List<string> = projects.map(
    (project: DataTypes.Project) => project.get('project_owner')
  );
  return projectOwners.toSet();
});

/*
 * getStatuses
 */

export const getStatuses = createSelector([
  getProjects,
], (projects: DataTypes.Projects) => {
  const statuses: List<string> = projects.map(
    (project: DataTypes.Project) => project.get('status')
  );
  return statuses.toSet();
});
