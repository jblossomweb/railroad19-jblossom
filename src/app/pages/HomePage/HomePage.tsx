import React from 'react';
import {
  Container,
  SemanticICONS,
} from 'semantic-ui-react';

import * as AppTypes from 'app/types';
import Template from 'app/templates/LightCentered';

import StatCards from 'app/components/molecules/StatCards';

import Notifications from 'app/components/organisms/Notifications';
import ProjectsTable from 'app/components/organisms/ProjectsTable';
import ProjectsFilter from 'app/components/organisms/ProjectsFilter';

import * as Style from './HomePage.style';

export interface Props {
  filteredRows: AppTypes.IndexedProjects,
  appliedFilters: AppTypes.ProjectFilters,
  visibleColumns: Array<keyof AppTypes.Project>,
  divisions: Array<AppTypes.Project['division']>,
  projectOwners: Array<AppTypes.Project['project_owner']>,
  statuses: Array<AppTypes.Project['status']>,
  notifications: AppTypes.Notifications,
  stats: AppTypes.Statistics,
  applyFilter: (filter: AppTypes.ProjectFilter) => void,
  removeFilter: (key: number) => void,
  updateProject: (key: number, update: Partial<AppTypes.Project>) => void,
  addNotification: (message: string, icon: SemanticICONS) => void,
  removeNotification: (key: number) => void,
};

const HomePage: React.FC<Props> = ({
  appliedFilters,
  applyFilter,
  removeFilter,
  filteredRows,
  visibleColumns,
  divisions,
  projectOwners,
  statuses,
  updateProject,
  notifications,
  stats,
  addNotification,
  removeNotification,
}) => (
  <Template>
    <Style.Wrapper>
      <Container>
        <StatCards
          stats={stats}
        />
        <Notifications
          notifications={notifications}
          removeNotification={removeNotification}
        />
        <ProjectsFilter
          appliedFilters={appliedFilters}
          applyFilter={applyFilter}
          removeFilter={removeFilter}
          divisions={divisions}
          projectOwners={projectOwners}
          statuses={statuses}
        />
        <ProjectsTable
          projects={filteredRows}
          visibleColumns={visibleColumns}
          updateProject={updateProject}
          projectOwners={projectOwners}
          statuses={statuses}
          addNotification={addNotification}
        />
      </Container>
    </Style.Wrapper>
  </Template>
);

export default HomePage;
