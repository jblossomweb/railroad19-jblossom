import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import { SemanticICONS } from 'semantic-ui-react';

import { AppState } from 'core/store';

import * as projectsActions from 'app/store/projects/action/creators';
import * as projectsSelectors from 'app/store/projects/selectors';

import * as notificationsActions from 'app/store/notifications/action/creators';
import * as notificationsSelectors from 'app/store/notifications/selectors';

import { Project, ProjectFilter } from 'app/types';

import HomePage from './HomePage';

export const mapStateToProps = (
  state: AppState,
) => ({
  appliedFilters: projectsSelectors.getAppliedFilters(state),
  filteredRows: projectsSelectors.getFilteredRows(state),
  visibleColumns: projectsSelectors.getVisibleColumns(state),
  divisions: projectsSelectors.getDivisions(state),
  projectOwners: projectsSelectors.getProjectOwners(state),
  statuses: projectsSelectors.getStatuses(state),
  notifications: notificationsSelectors.getNotifications(state),
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
  updateProject: (
    key: number,
    update: Partial<Project>,
  ) => dispatch(
    projectsActions.updateProject(key, update),
  ),
  addNotification: (
    message: string,
    icon: SemanticICONS,
  ) => dispatch(
    notificationsActions.addNotification(message, icon),
  ),
  removeNotification: (
    key: number,
  ) => dispatch(
    notificationsActions.removeNotification(key),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withImmutablePropsToJS(
  HomePage,
) as any);
