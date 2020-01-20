import React, { useState } from 'react';
import sortBy from 'lodash/sortBy';
import {
  Table,
  Popup,
  Button,
  StrictTableHeaderCellProps,
  SemanticICONS,
} from 'semantic-ui-react';

import { upperCaseFirstLetter } from 'core/string';
import { formatDataDisplay } from 'app/utils';
import * as AppTypes from 'app/types';

import FocusInput from 'app/components/atoms/FocusInput';

import * as Style from './ProjectsTable.style';

export interface Props {
  projects: AppTypes.IndexedProjects,
  visibleColumns?: Array<keyof AppTypes.Project>,
  projectOwners: Array<AppTypes.Project['project_owner']>,
  statuses: Array<AppTypes.Project['status']>,
  updateProject: (key: number, update: Partial<AppTypes.Project>) => void,
};

export interface State {
  sortColumn?: keyof AppTypes.Project,
  sortDirection?: StrictTableHeaderCellProps['sorted'],
  editingIndex?: number,
  editingField?: keyof AppTypes.Project,
  editingValue?: string,
};

const ProjectsTable: React.FC<Props> = ({
  statuses,
  projectOwners,
  projects,
  updateProject,
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
  const [state, setState] = useState<State>({});
  const {
    sortColumn,
    sortDirection,
    editingIndex,
    editingField,
    editingValue,
  } = state;

  const editableColumns: Array<keyof AppTypes.Project> = [
    'status',
    'project_owner',
    'budget',
  ];

  const sortByColumn = (
    column: keyof AppTypes.Project,
  ) => {
    if (sortColumn !== column) {
      setState({
        ...state,
        sortColumn: column,
        sortDirection: 'ascending',
      });
    } else {
      setState({
        ...state,
        sortDirection:
          sortDirection === 'ascending' ?
          'descending' :
          'ascending'
        ,
      });
    }
  };

  const valueEdit = (
    editingValue: string,
  ) => {
    setState({
      ...state,
      editingValue,
    });
  };

  const clearEdit = () => {
    setState({
      ...state,
      editingField: undefined,
      editingIndex: undefined,
      editingValue: undefined,
    });
  };

  const saveEdit = () => {
    if (
      typeof editingIndex !== 'undefined' &&
      typeof editingField !== 'undefined' &&
      typeof editingValue !== 'undefined'
    ) {
      let updatedValue: string | number = editingValue;
      if (editingField === 'budget') {
        updatedValue = Number(editingValue);
      }
      const update: Partial<AppTypes.Project> = {
        [editingField]: updatedValue,
      };
      updateProject(editingIndex, update);
      // TODO: fire a toast notification action
      clearEdit();
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

  const renderEditField = (
    rowIndex: number,
    column: keyof AppTypes.Project,
    modified?: boolean,
  ) => (
    <>
      <FocusInput
        focus={true}
        size={`mini`}
        fluid
        value={editingValue}
        icon={`pencil`}
        type={column === 'budget' ? 'number': undefined}
        list={
          ['project_owner', 'status'].includes(column) ?
          `${rowIndex}-${column}-suggestions` :
          undefined
        }
        onClick={(e: React.SyntheticEvent) => {
          e.stopPropagation();
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          e.stopPropagation();
          if (e.key === 'Enter') {
            saveEdit();
          }
          if (e.key === 'Escape') {
            clearEdit();
          }
        }}
        onChange={(e, data) => {
          valueEdit(data.value);
        }}
        onBlur={() => {
          if (!modified) {
            clearEdit();
          }
        }}
      />
      {['project_owner', 'status'].includes(column) ? (
        <datalist id={`${rowIndex}-${column}-suggestions`}>
          {(column === 'project_owner' ? projectOwners : statuses).map((suggestion: string) => (
            <option key={`${rowIndex}-${column}-suggestions-${suggestion}`} value={suggestion} />
          ))}
        </datalist>
      ) : null}
    </>
  );

  const renderEditFieldWithPopup = (
    rowIndex: number,
    column: keyof AppTypes.Project,
    originalValue?: any,
  ) => {
    if (editingValue !== String(originalValue)) {
      return (
        <Popup
          inverted
          open
          position='top center'
          pinned
          trigger={(
            <div>
              {renderEditField(rowIndex, column, true)}
            </div>
          )}
          content={(
            <div>
              <Button
                size={`mini`}
                icon={`cancel`}
                onClick={clearEdit}
              />
              <Button
                positive
                size={`mini`}
                icon={`save`}
                onClick={saveEdit}
              />
            </div>
          )}
        />
      );
    }
    return renderEditField(rowIndex, column);
  };

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
          row: AppTypes.IndexedProject,
          // sortedIndex: number,
        ) => (
          <Table.Row key={row.index}>
            {visibleColumns.map((
              column: keyof AppTypes.Project,
            ) => (
              <Style.TableCell
                key={column}
                data-sorting={sortColumn === column}
                data-editable={editableColumns.includes(column)}
                data-editing={editingIndex !== row.index}
                onClick={() => {
                  if (
                    typeof editingIndex === 'undefined' &&
                    editableColumns.includes(column)
                  ) {
                    setState({
                      ...state,
                      editingIndex: row.index,
                      editingField: column,
                      editingValue: String(row[column]),
                    });
                  }
                }}
              >
                {(
                  editableColumns.includes(column) &&
                  editingIndex === row.index &&
                  editingField === column
                ) ? (
                  <>
                    {renderEditFieldWithPopup(row.index, column, row[column])}
                    {/* <Icon name={`save`} /> */}
                  </>
                ) : (
                  <>
                    {formatDataDisplay(column, row[column])}
                    {editableColumns.includes(column) ? (
                      <Style.EditCellIcon
                        size={`small`}
                        name={`pencil`}
                      />
                    ) : null}
                  </>
                )}
              </Style.TableCell>
            ))}
            
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ProjectsTable;
