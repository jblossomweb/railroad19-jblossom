import React from 'react';
import {
  Container,
} from 'semantic-ui-react';

import * as AppTypes from 'app/types';
import Template from 'app/templates/LightCentered';

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
  applyFilter: (filter: AppTypes.ProjectFilter) => void,
  removeFilter: (key: number) => void,
  updateProject: (key: number, update: Partial<AppTypes.Project>) => void,
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
}) => (
  <Template>
    <Style.Wrapper>
      <Container>
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
        />
      </Container>
    </Style.Wrapper>
  </Template>
);

export default HomePage;
