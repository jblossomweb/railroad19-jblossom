import { Map } from 'immutable';
import concat from 'lodash/concat';
import { getInitialState } from 'core/store';

import paths from './paths';
import * as selectors from './selectors';

describe('store/projects/selectors', () => {

  describe('getProjects', () => {
    const path = concat(['app'], paths.projects());
    const value = Map({ foo: 'bar'});
    const state = getInitialState().setIn(path, value);
    it('should select value from projects', () => {
      const selected = selectors.getProjects(state);
      expect(selected).toEqual(value);
    });
  });

  describe('getVisibleColumns', () => {
    const path = concat(['app'], paths.visibleColumns());
    const value = Map({ foo: 'bar'});
    const state = getInitialState().setIn(path, value);
    it('should select value from visibleColumns', () => {
      const selected = selectors.getVisibleColumns(state);
      expect(selected).toEqual(value);
    });
  });


  describe('getAppliedFilters', () => {
    const path = concat(['app'], paths.appliedFilters());
    const value = Map({ foo: 'bar'});
    const state = getInitialState().setIn(path, value);
    it('should select value from appliedFilters', () => {
      const selected = selectors.getAppliedFilters(state);
      expect(selected).toEqual(value);
    });
  });

});
