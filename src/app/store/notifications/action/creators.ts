import { SemanticICONS } from 'semantic-ui-react';
import * as types from './types';

/*
 * NOTIFICATIONS_ADD
 */

export const addNotification: (
  message: string,
  icon: SemanticICONS,
) => types.Interface['NOTIFICATIONS_ADD'] = (
  message,
  icon,
) => ({
  type: types.NOTIFICATIONS_ADD,
  payload: {
    message,
    icon,
  },
});

/*
 * NOTIFICATIONS_REMOVE
 */

export const removeNotification: (
  key: number,
) => types.Interface['NOTIFICATIONS_REMOVE'] = (
  key,
) => ({
  type: types.NOTIFICATIONS_REMOVE,
  payload: {
    key,
  },
});
