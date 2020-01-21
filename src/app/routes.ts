import { RouteProps } from 'react-router-dom';
import { SemanticICONS } from 'semantic-ui-react';

import Page404 from 'app/pages/404';
import HomePage from 'app/pages/HomePage';
import ProjectPage from 'app/pages/ProjectPage';

export interface Route {
  path: string,
  page: RouteProps['component'],
  title?: string,
  icon?: SemanticICONS,
};

export interface Redirect {
  from?: string,
  to: string,
};

export const menu: Route[] = [
  /* put menu routes here so they can be looped separately */
];

export const routes: Route[] = [
  {
    path: `/home`,
    page: HomePage,
  },
  {
    path: `/project/:index`,
    page: ProjectPage,
  },
  ...menu,
  {
    path: `/404`,
    page: Page404,
  },
];

export const redirects: Redirect[] = [
  {
    from: `/`,
    to: `/home`,
  },
  {
    to: `/404`
  },
];

export default routes;
