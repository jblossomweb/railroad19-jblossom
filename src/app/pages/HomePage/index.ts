import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import { AppState } from 'core/store';

import * as projectsActions from 'app/store/projects/action/creators';
import * as projectsSelectors from 'app/store/projects/selectors';

import { ProjectFilter } from 'app/types';

import HomePage from './HomePage';

export const mapStateToProps = (
  state: AppState,
) => ({
  allProjects: projectsSelectors.getProjects(state),
  appliedFilters: projectsSelectors.getAppliedFilters(state),
  filteredRows: projectsSelectors.getFilteredRows(state),
  divisions: projectsSelectors.getDivisions(state),
  projectOwners: projectsSelectors.getProjectOwners(state),
  statuses: projectsSelectors.getStatuses(state),
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
) => ({
  applyFilter: (filter: ProjectFilter) => dispatch(
    projectsActions.applyFilter(filter),
  ),
  removeFilter: (key: number) => dispatch(
    projectsActions.removeFilter(key),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withImmutablePropsToJS(
  HomePage,
) as any);
