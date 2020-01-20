import { fromJS } from 'immutable';
import { AppReducer, getInitialState } from 'core/store';
import * as AppTypes from 'app/types';

import rawMockProjects from 'app/__mocks__/projects.json';
import { convertRawProject } from '../utils';

import * as actionTypes from './types';
import actionReducers from './reducers';
import paths from '../paths';

const mockProjects: AppTypes.Projects = rawMockProjects.map(convertRawProject);
const mockFilter: AppTypes.ProjectFilter = { column: 'budget', min: 10000 };
const mockUpdate: Partial<AppTypes.Project> = { budget: 30000 };

describe('store/projects/action/reducers', () => {

  describe('PROJECTS_APPLY_FILTER', () => {
    const action: actionTypes.Interface['PROJECTS_APPLY_FILTER'] = {
      type: 'PROJECTS_APPLY_FILTER',
      payload: {
        filter: mockFilter,
      }
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should add filter to appliedFilters', () => {
      const path = paths.appliedFilters();
      const state = getInitialState().setIn(path, fromJS([]));
      expect(state.getIn(path)).toEqual(fromJS([]));
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(fromJS([ action.payload.filter ]));
    });
  });

  describe('PROJECTS_REMOVE_FILTER', () => {
    const action: actionTypes.Interface['PROJECTS_REMOVE_FILTER'] = {
      type: 'PROJECTS_REMOVE_FILTER',
      payload: {
        key: 1,
      }
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should remove filter to with specified key', () => {
      const path = paths.appliedFilters();
      const state = getInitialState().setIn(path, fromJS([mockFilter, mockFilter]));
      expect(state.getIn(path)).toEqual(fromJS([mockFilter, mockFilter]));
      expect(state.getIn(path).size).toBe(2);
      const newState = reducer(state, action);
      expect(newState.getIn(path)).toEqual(fromJS([ mockFilter ]));
      expect(newState.getIn(path).size).toBe(1);
    });
  });

  describe('PROJECTS_UPDATE_PROJECT', () => {
    const action: actionTypes.Interface['PROJECTS_UPDATE_PROJECT'] = {
      type: 'PROJECTS_UPDATE_PROJECT',
      payload: {
        key: 1,
        update: mockUpdate,
      }
    };
    const reducer = actionReducers[action.type] as AppReducer;

    it('should update all specified fields of project with specified key', () => {
      const path = paths.projects();
      const projectPath = paths.project(action.payload.key);
      const state = getInitialState().setIn(path, fromJS(mockProjects));
      expect(state.getIn(path)).toEqual(fromJS(mockProjects));
      expect(state.getIn(path).size).toBe(mockProjects.length);
      const newState = reducer(state, action);
      expect(newState.getIn(path).size).toBe(mockProjects.length);
      Object.keys(action.payload.update).forEach((field: string) => {
        expect(newState.getIn(projectPath).get(field)).toEqual(
          action.payload.update[field as keyof AppTypes.Project],
        );
      });
    });
  });

});
