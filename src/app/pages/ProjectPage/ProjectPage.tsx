import React from 'react';
import {
  Container,
} from 'semantic-ui-react';

import * as AppTypes from 'app/types';
import Template from 'app/templates/LightCentered';

import * as Style from './ProjectPage.style';

export interface Props {
  project: AppTypes.IndexedProject,
};

const ProjectPage: React.FC<Props> = ({
  project,
}) => (
  <Template>
    <Style.Wrapper>
      <Container>
        <code>{JSON.stringify(project)}</code>
      </Container>
    </Style.Wrapper>
  </Template>
);

export default ProjectPage;
