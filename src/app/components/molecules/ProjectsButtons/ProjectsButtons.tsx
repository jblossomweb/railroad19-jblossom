import React from 'react';
import moment from 'moment';
import { Button } from 'semantic-ui-react';
import DownloadCSV from 'react-csv-downloader';
import ExternalLink from 'app/components/atoms/ExternalLink';

import * as AppTypes from 'app/types';
import * as Style from './ProjectsButtons.style';

export interface Props {
  projects: AppTypes.IndexedProjects,
};

const ProjectButtons: React.FC<Props> = ({
  projects,
}) => (
  <Style.Wrapper>
    <Button.Group>
      <DownloadCSV
        datas={projects.map((
          project: AppTypes.IndexedProject,
        ) => ({
          ...project,
          created: moment(project.created).format('YYYY-MM-DD'),
          modified: moment(project.modified).format('YYYY-MM-DD'),
        }))}
        filename={`projects-${moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss')}.csv`}
      >
        <Button
          content={`Download CSV`}
          icon={`download`}
        />
      </DownloadCSV>
      <ExternalLink
        href={`https://react-pdf.org/`}
      >
        <Button
          content={`Download PDF`}
          icon={`file pdf`}
        />
      </ExternalLink>
    </Button.Group>
  </Style.Wrapper>
)

export default ProjectButtons;
