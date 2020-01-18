import React, { useState } from 'react';
import sortBy from 'lodash/sortBy';
import {
  Table,
  StrictTableHeaderCellProps,
  SemanticICONS,
} from 'semantic-ui-react';

import { upperCaseFirstLetter } from 'core/string';
import {
  Projects,
  Project,
} from 'app/types';

import * as Style from './ProjectsTable.style';

export interface Props {
  projects: Projects,
  displayColumns?: Array<keyof Project>,
};

export interface State {
  sortedData: Projects,
  sortColumn?: keyof Project,
  sortDirection?: StrictTableHeaderCellProps['sorted'],
};

const ProjectsTable: React.FC<Props> = ({
  projects,
  displayColumns = [
    'title',
    'division',
    'project_owner',
    'budget',
    'status',
    'created',
    'modified',
  ],
}) => {
  const [{
    sortedData,
    sortColumn,
    sortDirection,
  }, setState] = useState<State>({
    sortedData: projects,
  });

  const sortByColumn = (
    column: keyof Project,
  ) => {
    if (sortColumn !== column) {
      setState({
        sortColumn: column,
        sortDirection: 'ascending',
        sortedData: sortBy(sortedData, column),
      });
    } else {
      setState({
        sortColumn,
        sortDirection:
          sortDirection === 'ascending' ?
          'descending' :
          'ascending'
        ,
        sortedData: sortedData.reverse(),
      });
    }
  };

  const renderHeaderCell = (
    column: keyof Project,
  ) => (
    <Style.TableHeaderCell>
      {
        column === 'project_owner' ?
        'Project Owner' :
        upperCaseFirstLetter(column)
      }
      <Style.SortIcon
        sorting={sortColumn === column}
        name={(
          sortColumn === column ?
          `sort ${sortDirection}` :
          'sort'
        ) as SemanticICONS}
        onClick={() => sortByColumn(column)}
      />
    </Style.TableHeaderCell>
  );

  return (
    <Table celled fixed>
      <Table.Header>
        <Table.Row>
          {displayColumns.map(renderHeaderCell)}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedData.map((
          row: Project,
          index: number,
        ) => (
          <Table.Row key={index}>
            {displayColumns.map((column: keyof Project) => (
              <Style.TableCell
                key={column}
                sorting={sortColumn === column}
              >
                {row[column]}
              </Style.TableCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ProjectsTable;
