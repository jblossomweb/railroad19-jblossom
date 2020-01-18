import React from 'react';
import {
  Container,
} from 'semantic-ui-react';

import { Projects } from 'app/types';
import Template from 'app/templates/LightCentered';
import ProjectsTable from 'app/components/organisms/ProjectsTable';

import * as Style from './HomePage.style';

export interface Props {
  projects: Projects,
};

const HomePage: React.FC<Props> = ({
  projects,
}) => (
  <Template>
    <Style.Wrapper>
      <Container>
        <ProjectsTable
          projects={projects}
        />
      </Container>
    </Style.Wrapper>
  </Template>
);

export default HomePage;
