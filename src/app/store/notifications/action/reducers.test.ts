import { fromJS } from 'immutable';
import { AppReducer, getInitialState } from 'core/store';
import * as AppTypes from 'app/types';

import rawMockNotifications from 'app/__mocks__/notifications.json';

import paths from '../paths';
import * as actionTypes from './types';
import actionReducers from './reducers';

const mockNotifications = rawMockNotifications as AppTypes.Notifications;
const mockNotification = mockNotifications[0];

describe('store/notifications/action/reducers', () => {

  describe('NOTIFICATIONS_ADD', () => {
    const action: actionTypes.Interface['NOTIFICATIONS_ADD'] = {
      type: 'NOTIFICATIONS_ADD',
      payload: mockNotification,
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should add payload to notifications', () => {
      const path = paths.notifications();
      const state = getInitialState().setIn(path, fromJS([]));
      expect(state.getIn(path)).toEqual(fromJS([]));
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(fromJS([ action.payload ]));
    });
  });

  describe('NOTIFICATIONS_REMOVE', () => {
    const action: actionTypes.Interface['NOTIFICATIONS_REMOVE'] = {
      type: 'NOTIFICATIONS_REMOVE',
      payload: {
        key: 1,
      }
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should remove notification', () => {
      const path = paths.notifications();
      const state = getInitialState().setIn(path, fromJS(mockNotifications));
      expect(state.getIn(path)).toEqual(fromJS(mockNotifications));
      expect(state.getIn(path).size).toBe(mockNotifications.length);
      const newState = reducer(state, action);
      expect(newState.getIn(path).size).toBe(mockNotifications.length - 1);
      expect(newState.getIn(path)).not.toEqual(fromJS(mockNotifications));
    });

    it('should remove notification to with specified key', () => {
      const first: AppTypes.Notification = mockNotification;
      const second: AppTypes.Notification = {
        ...mockNotification,
        message: 'something else',
      };
      const path = paths.notifications();
      const state = getInitialState().setIn(path, fromJS([first, second]));
      expect(state.getIn(path)).toEqual(fromJS([first, second]));
      expect(state.getIn(path).size).toBe(2);
      const newState = reducer(state, action);
      expect(newState.getIn(path).size).toBe(1);
      expect(newState.getIn(path)).not.toEqual([first]);
    });
  });

});
