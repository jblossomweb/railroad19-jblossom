import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import { AppState } from 'core/store';
import * as projectsSelectors from 'app/store/projects/selectors';
import ProjectPage from './ProjectPage';

export const mapStateToProps = (
  state: AppState,
  { match: { params: { index } } }: { match: { params: { index: string } } },
) => ({
  project: projectsSelectors.getIndexedProject(state)(Number(index)),
});

export default connect(
  mapStateToProps,
)(withImmutablePropsToJS(
  ProjectPage,
) as any);
