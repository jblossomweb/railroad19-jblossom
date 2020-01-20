import { SemanticICONS } from 'semantic-ui-react';
import * as actionTypes from './types';
import * as actionCreators from './creators';

describe('store/Auth/action/creators', () => {

  describe('addNotification', () => {
    const message: string = 'Test Message';
    const icon: SemanticICONS = 'check';
    const action: actionTypes.Interface['NOTIFICATIONS_ADD'] = actionCreators
      .addNotification(
        message,
        icon,
      )
    ;
    const expectedAction: actionTypes.Interface['NOTIFICATIONS_ADD'] = {
      type: actionTypes.NOTIFICATIONS_ADD,
      payload: {
        message,
        icon,
      }
    };

    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });

    it(`should return 'message' in action payload`, () => {
      expect(action.payload.message).toEqual(expectedAction.payload.message);
    });

    it(`should return 'icon' in action payload`, () => {
      expect(action.payload.icon).toEqual(expectedAction.payload.icon);
    });
  });


  describe('removeNotification', () => {
    const key: number = 1234567;
    const action: actionTypes.Interface['NOTIFICATIONS_REMOVE'] = actionCreators
      .removeNotification(
        key,
      )
    ;
    const expectedAction: actionTypes.Interface['NOTIFICATIONS_REMOVE'] = {
      type: actionTypes.NOTIFICATIONS_REMOVE,
      payload: {
        key,
      }
    };

    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });

    it(`should return 'key' in action payload`, () => {
      expect(action.payload.key).toEqual(expectedAction.payload.key);
    });
  });

});
