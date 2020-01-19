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
  allProjects: AppTypes.Projects,
  filteredRows: AppTypes.Projects,
  appliedFilters: AppTypes.ProjectFilters,
  visibleColumns: Array<keyof AppTypes.Project>,
  divisions: string[],
  projectOwners: string[],
  statuses: string[],
  applyFilter: (filter: AppTypes.ProjectFilter) => void,
  removeFilter: (key: number) => void,
};

const HomePage: React.FC<Props> = ({
  // allProjects,
  appliedFilters,
  applyFilter,
  removeFilter,
  filteredRows,
  visibleColumns,
  divisions,
  projectOwners,
  statuses,
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
        />
      </Container>
    </Style.Wrapper>
  </Template>
);

export default HomePage;
