import { List } from 'immutable';
import concat from 'lodash/concat';
import { getInitialState } from 'core/store';
import mockNotifications from 'app/__mocks__/notifications.json';

import paths from './paths';
import * as selectors from './selectors';

describe('store/notifications/selectors', () => {

  describe('getNotifications', () => {
    const path = concat(['app'], paths.notifications());
    const value = List(mockNotifications);
    const state = getInitialState().setIn(path, value);
    it('should select value from notifications', () => {
      const selected = selectors.getNotifications(state);
      expect(selected).toEqual(value);
    });
  });

});
