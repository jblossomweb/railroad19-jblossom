import { fromJS } from 'immutable';
import { AppState } from 'core/store';

import paths from '../paths';
import * as types from './types';

/*
 * NOTIFICATIONS_ADD
 */
export const addNotification = (
  state: AppState,
  { payload }: types.Interface['NOTIFICATIONS_ADD'],
) => {
  const updated = state.getIn(
    paths.notifications()
  ).push(fromJS(payload));

  return state
    .setIn(
      paths.notifications(),
      updated,
    )
  ;
};

/*
 * NOTIFICATIONS_REMOVE
 */
export const removeNotification = (
  state: AppState,
  { payload }: types.Interface['NOTIFICATIONS_REMOVE'],
) => state
  .setIn(
    paths.notifications(),
    state.getIn(
      paths.notifications()
    )
    .delete(payload.key)
  )
;

/*
 * default export
 */
export default {
  [types.NOTIFICATIONS_ADD as string]: addNotification,
  [types.NOTIFICATIONS_REMOVE as string]: removeNotification,
};
