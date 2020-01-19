import React, { useState } from 'react';
import sortBy from 'lodash/sortBy';
import {
  Table,
  StrictTableHeaderCellProps,
  SemanticICONS,
} from 'semantic-ui-react';

import { upperCaseFirstLetter } from 'core/string';
import { formatDataDisplay } from 'app/utils';
import * as AppTypes from 'app/types';

import * as Style from './ProjectsTable.style';

export interface Props {
  projects: AppTypes.Projects,
  visibleColumns?: Array<keyof AppTypes.Project>,
};

export interface State {
  sortColumn?: keyof AppTypes.Project,
  sortDirection?: StrictTableHeaderCellProps['sorted'],
};

const ProjectsTable: React.FC<Props> = ({
  projects,
  visibleColumns = [
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
    sortColumn,
    sortDirection,
  }, setState] = useState<State>({});

  const sortByColumn = (
    column: keyof AppTypes.Project,
  ) => {
    if (sortColumn !== column) {
      setState({
        sortColumn: column,
        sortDirection: 'ascending',
      });
    } else {
      setState({
        sortColumn,
        sortDirection:
          sortDirection === 'ascending' ?
          'descending' :
          'ascending'
        ,
      });
    }
  };

  const renderHeaderCell = (
    column: keyof AppTypes.Project,
  ) => (
    <Style.TableHeaderCell key={column}>
      {
        column === 'project_owner' ?
        'Project Owner' :
        upperCaseFirstLetter(column)
      }
      <Style.SortIcon
        data-sorting={sortColumn === column}
        name={(
          sortColumn === column ?
          `sort ${sortDirection}` :
          'sort'
        ) as SemanticICONS}
        onClick={() => sortByColumn(column)}
      />
    </Style.TableHeaderCell>
  );

  const sortedData =
    sortColumn ?
    (
      sortDirection === 'ascending' ?
      sortBy(projects, sortColumn) :
      sortBy(projects, sortColumn).reverse()
    ) : projects
  ;

  return (
    <Table celled fixed>
      <Table.Header>
        <Table.Row>
          {visibleColumns.map(renderHeaderCell)}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedData && sortedData.map((
          row: AppTypes.Project,
          index: number,
        ) => (
          <Table.Row key={index}>
            {visibleColumns.map((
              column: keyof AppTypes.Project,
            ) => (
              <Style.TableCell
                key={column}
                data-sorting={sortColumn === column}
              >
                {formatDataDisplay(column, row[column])}
              </Style.TableCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ProjectsTable;
