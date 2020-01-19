import { AppReducers, combineAllReducers } from 'core/store';
import extend from 'lodash/extend';

/* import your reducers here. */
import projectsReducers from './projects/action/reducers';

const appReducers: AppReducers = extend({},
  /* register your reducers here. */
  projectsReducers,
) as AppReducers;

export default combineAllReducers(appReducers);
