import { createSelector } from 'reselect';
import { AppState } from 'core/store';

import * as DataTypes from './dataTypes';
import paths from './paths';

/*
 * getNotifications
 */

const getNotificationsSelector = (
  state: AppState,
): DataTypes.Notifications => state.get('app').getIn(
  paths.notifications(),
  DataTypes.defaultNotifications,
);

export const getNotifications = createSelector([
  getNotificationsSelector,
], (notifications: DataTypes.Notifications) => notifications);
