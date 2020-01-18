import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import { AppState } from 'core/store';

// import * as storeActions from 'app/store/<store>/action/creators';
// import * as storeSelectors from 'app/store/<store>/selectors';
import mockProjects from 'app/__mocks__/projects.json';

import HomePage from './HomePage';

export const mapStateToProps = (
  state: AppState,
) => ({
  // fetching: storeSelectors.getFetching(state),
  projects: mockProjects,
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
) => ({
  // shorten: (longUrl: string) => dispatch(
  //   storeActions.requestShorten(longUrl)
  // ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withImmutablePropsToJS(
  HomePage,
) as any);
