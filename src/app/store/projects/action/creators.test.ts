import * as AppTypes from 'app/types';
import * as actionTypes from './types';
import * as actionCreators from './creators';

describe('store/Auth/action/creators', () => {

  describe('applyFilter', () => {
    const filter: AppTypes.ProjectFilter = {
      column: 'title',
      value: 'test',
    };
    const action: actionTypes.Interface['PROJECTS_APPLY_FILTER'] = actionCreators
      .applyFilter(
        filter,
      )
    ;
    const expectedAction: actionTypes.Interface['PROJECTS_APPLY_FILTER'] = {
      type: actionTypes.PROJECTS_APPLY_FILTER,
      payload: {
        filter,
      }
    };

    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });

    it(`should return 'filter' in action payload`, () => {
      expect(action.payload.filter).toEqual(expectedAction.payload.filter);
    });
  });

  describe('removeFilter', () => {
    const key: number = 0;
    const action: actionTypes.Interface['PROJECTS_REMOVE_FILTER'] = actionCreators
      .removeFilter(
        key,
      )
    ;
    const expectedAction: actionTypes.Interface['PROJECTS_REMOVE_FILTER'] = {
      type: actionTypes.PROJECTS_REMOVE_FILTER,
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

  describe('updateProject', () => {
    const key: number = 1;
    const update: Partial<AppTypes.Project> = {
      budget: 30000,
    };
    const action: actionTypes.Interface['PROJECTS_UPDATE_PROJECT'] = actionCreators
      .updateProject(
        key,
        update,
      )
    ;
    const expectedAction: actionTypes.Interface['PROJECTS_UPDATE_PROJECT'] = {
      type: actionTypes.PROJECTS_UPDATE_PROJECT,
      payload: {
        key,
        update,
      }
    };

    it(`should return ${expectedAction.type} action type`, () => {
      expect(action.type).toEqual(expectedAction.type);
    });

    it(`should return 'key' in action payload`, () => {
      expect(action.payload.key).toEqual(expectedAction.payload.key);
    });

    it(`should return 'update' in action payload`, () => {
      expect(action.payload.update).toEqual(expectedAction.payload.update);
    });
  });

});
