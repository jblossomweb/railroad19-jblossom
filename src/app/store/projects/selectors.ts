import { List } from 'immutable';
import { createSelector } from 'reselect';
import { AppState } from 'core/store';
import { formatDataDisplay } from 'app/utils';
import * as AppTypes from 'app/types';
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
 * getIndexedProjects
 */

export const getIndexedProjects = createSelector([
  getProjects,
], (projects: DataTypes.Projects) => projects.map(
  (
    project: DataTypes.Project,
    index: number,
  ) => {
    const indexedProject: DataTypes.IndexedProject = (
      project as any
    ).set(
      'index',
      index,
    );
    return indexedProject;
  }
));

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
  getIndexedProjects,
  getAppliedFilters,
], (
  indexedProjects: DataTypes.IndexedProjects,
  appliedFilters: DataTypes.AppliedFilters,
) => {
  let filteredRows: DataTypes.IndexedProjects = indexedProjects;
  appliedFilters?.forEach((
    appliedFilter: DataTypes.AppliedFilter,
  ) => {
    filteredRows = filteredRows.filter((
      row: DataTypes.IndexedProject,
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
  const statuses: List<AppTypes.Project['status']> = projects.map(
    (project: DataTypes.Project) => project.get('status')
  );
  return statuses.toSet();
});

/*
 * getNumberOfProjects
 */

export const getNumberOfProjects = createSelector([
  getProjects,
], (projects: DataTypes.Projects) => projects.size);

/*
 * getNumberOfNewProjects
 */

export const getNumberOfNewProjects = createSelector([
  getProjects,
], (projects: DataTypes.Projects) => {
  const newProjects: DataTypes.Projects = projects.filter(
    (project: DataTypes.Project) => project.get('status') === 'new'
  );
  return newProjects.size;
});

/*
 * getNumberOfWorkingProjects
 */

export const getNumberOfWorkingProjects = createSelector([
  getProjects,
], (projects: DataTypes.Projects) => {
  const newProjects: DataTypes.Projects = projects.filter(
    (project: DataTypes.Project) => project.get('status') === 'working'
  );
  return newProjects.size;
});

/*
 * getNumberOfDeliveredProjects
 */

export const getNumberOfDeliveredProjects = createSelector([
  getProjects,
], (projects: DataTypes.Projects) => {
  const newProjects: DataTypes.Projects = projects.filter(
    (project: DataTypes.Project) => project.get('status') === 'delivered'
  );
  return newProjects.size;
});

/*
 * getTotalBudget
 */

export const getTotalBudget = createSelector([
  getProjects,
], (projects: DataTypes.Projects) => projects.reduce(
  (
    total: number,
    project: DataTypes.Project
  ) => total + project.get('budget'),
  0,
));

/*
 * getLargestProject
 */

export const getLargestProject = createSelector([
  getProjects,
], (projects: DataTypes.Projects) => projects.reduce(
  (
    highest: { budget: number, title: string },
    project: DataTypes.Project
  ) => {
    const budget: number = project.get('budget');
    const title: string = project.get('title');
    if (budget > highest.budget) {
      return { budget, title };
    }
    return highest;
  },
  { budget: 0, title: '' },
));

/*
 * getTotalBudgetPerProjectOwner
 */

export const getTotalBudgetPerProjectOwner = createSelector([
  getProjects,
], (projects: DataTypes.Projects) => projects.reduce(
  (
    totals: { [name: string]: number },
    project: DataTypes.Project,
  ) => {
    const name: string = project.get('project_owner');
    const budget: number = project.get('budget');
    if (!totals[name]) {
      totals[name] = 0;
    }
    totals[name] += budget;
    return totals;
  },
  {},
));

/*
 * getTopProjectOwner
 */

export const getTopProjectOwner = createSelector([
  getTotalBudgetPerProjectOwner,
], (
  totalBudgets: { [name: string]: number },
) => Object.entries(
  totalBudgets,
).reduce((
  highest: { budget: number, project_owner: string },
  /* tslint:disable-next-line:variable-name */
  [project_owner, budget],
) => {
  if (budget > highest.budget) {
    return { project_owner, budget };
  }
  return highest;
}, {
  budget: 0,
  project_owner: '',
}));

/*
 * getHomePageStatistics
 */

export const getHomePageStatistics = createSelector([
  getNumberOfProjects,
  getNumberOfNewProjects,
  getNumberOfWorkingProjects,
  getNumberOfDeliveredProjects,
  getTotalBudget,
  getLargestProject,
  getTopProjectOwner,
], (
  numProjects: number,
  newProjects: number,
  workingProjects: number,
  deliveredProjects: number,
  totalBudget: number,
  largestProject: { budget: number, title: string },
  topProjectOwner: { budget: number, project_owner: string },
) => ([
  {
    header: `New`,
    description: `${newProjects}`,
    meta: `projects`,
  },
  {
    header: `Working`,
    description: `${workingProjects}`,
    meta: `projects`,
  },
  {
    header: `Delivered`,
    description: `${deliveredProjects}`,
    meta: `projects`,
  },
  {
    header: `Total Budget`,
    description: `${formatDataDisplay('budget', totalBudget)}`,
    meta: `${numProjects} projects`,
  },
  {
    header: `Largest Project`,
    description: `${formatDataDisplay('budget', largestProject.budget)}`,
    meta: `${largestProject.title}`,
  },
  {
    header: `Top Project Owner`,
    description: `${formatDataDisplay('budget', topProjectOwner.budget)}`,
    meta: `${topProjectOwner.project_owner}`,
  },
]));
