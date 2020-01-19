import React from 'react';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import isArray from 'lodash/isArray';
import { Card, Icon, Form, Label } from 'semantic-ui-react';
import Datepicker from 'react-semantic-ui-datepickers';

import { formatFilterDisplay } from 'app/utils';
import * as AppTypes from 'app/types';
import * as Style from './ProjectsFilter.style';

export interface Props {
  divisions: string[],
  projectOwners: string[],
  statuses: string[],
  appliedFilters: AppTypes.ProjectFilters,
  applyFilter: (filter: AppTypes.ProjectFilter) => void,
  removeFilter: (key: number) => void,
};

const ProjectsFilter: React.FC<Props> = ({
  divisions,
  projectOwners,
  statuses,
  appliedFilters,
  applyFilter,
  removeFilter,
}) => {

  const removeExistingFilter = (
    column: AppTypes.ProjectFilter['column'],
    field?: 'min' | 'max',
  ) => {
    let query: any = { column };
    if (field) {
      query = (filter: Partial<AppTypes.ProjectFilter>) => (
        filter.column === column &&
        typeof filter[field] !== 'undefined'
      );
    }
    const existingIndex = findIndex(appliedFilters, query);
    if (existingIndex > -1) {
      removeFilter(existingIndex);
    }
  };

  const renderExistingFilterValue = (
    column: AppTypes.ProjectFilter['column'],
    field: 'value' | 'search' | 'min' | 'max'
  ) => {
    let query: any = { column };
    if (['min', 'max'].includes(field)) {
      query = (filter: Partial<AppTypes.ProjectFilter>) => (
        filter.column === column &&
        typeof filter[field] !== 'undefined'
      );
    }
    const existing = find(appliedFilters, query);
    if (existing) {
      return existing[field];
    }
    return undefined;
  };

  const renderExistingDateFilterValue = (
    column: AppTypes.ProjectFilter['column'],
  ) => {
    const query = (filter: Partial<AppTypes.ProjectFilter>) => (
      filter.column === column &&
      typeof filter.min !== 'undefined' &&
      typeof filter.max !== 'undefined'
    );
    const existing = find(appliedFilters, query);
    if (existing) {
      return [new Date(existing.min!), new Date(existing.max!)];
    }
    return null;
  };

  return (
    <Style.Wrapper>
      <Card fluid>
        <Card.Content>
          <Card.Description>
            <Form>
              <Form.Group widths={`equal`}>
                <Form.Input
                  fluid
                  icon={`search`}
                  label='Title'
                  placeholder='Search...'
                  value={renderExistingFilterValue('title', 'search') || ''}
                  onChange={(event, { value }) => {
                    removeExistingFilter('title');
                    if (String(value).length) {
                      const filter: AppTypes.ProjectFilter = {
                        column: 'title',
                        search: String(value),
                      };
                      applyFilter(filter);
                    }
                  }}
                />
                <Form.Select
                  fluid
                  value={String(renderExistingFilterValue('division', 'value'))}
                  label='Division'
                  placeholder='Select...'
                  options={divisions.map((
                    division: string,
                  ) => ({
                    key: division,
                    text: division,
                    value: division,
                  }))}
                  onChange={(event, { value }) => {
                    removeExistingFilter('division');
                    if (String(value).length) {
                      const filter: AppTypes.ProjectFilter = {
                        column: 'division',
                        value: String(value),
                      };
                      applyFilter(filter);
                    }
                  }}
                />
                <Form.Select
                  fluid
                  value={String(renderExistingFilterValue('project_owner', 'value'))}
                  label='Project Owner'
                  placeholder='Select...'
                  options={projectOwners.map((
                    projectOwner: string,
                  ) => ({
                    key: projectOwner,
                    text: projectOwner,
                    value: projectOwner,
                  }))}
                  onChange={(event, { value }) => {
                    removeExistingFilter('project_owner');
                    if (String(value).length) {
                      const filter: AppTypes.ProjectFilter = {
                        column: 'project_owner',
                        value: String(value),
                      };
                      applyFilter(filter);
                    }
                  }}
                />
              </Form.Group>
              <Form.Group widths={`equal`}>
                <Form.Input
                  fluid
                  value={(() => {
                    const value = renderExistingFilterValue('budget', 'min');
                    return value ? Number(value) : ''
                  })()}
                  type={`number`}
                  min={0}
                  step={1000}
                  icon={`dollar`}
                  iconPosition={`left`}
                  label='Min Budget'
                  placeholder='min'
                  onChange={(event, { value }) => {
                    removeExistingFilter('budget', 'min');
                    if (String(value).length) {
                      const filter: AppTypes.ProjectFilter = {
                        column: 'budget',
                        min: Number(value),
                      };
                      applyFilter(filter);
                    }
                  }}
                />
                <Form.Input
                  fluid
                  value={(() => {
                    const value = renderExistingFilterValue('budget', 'max');
                    return value ? Number(value) : ''
                  })()}
                  type={`number`}
                  min={0}
                  step={1000}
                  icon={`dollar`}
                  iconPosition={`left`}
                  label='Max Budget'
                  placeholder='max'
                  onChange={(event, { value }) => {
                    removeExistingFilter('budget', 'max');
                    if (String(value).length) {
                      const filter: AppTypes.ProjectFilter = {
                        column: 'budget',
                        max: Number(value),
                      };
                      applyFilter(filter);
                    }
                  }}
                />
                <Form.Select
                  fluid
                  value={String(renderExistingFilterValue('status', 'value'))}
                  label='Status'
                  placeholder='Select...'
                  options={statuses.map((
                    status: string,
                  ) => ({
                    key: status,
                    text: status,
                    value: status,
                  }))}
                  onChange={(event, { value }) => {
                    removeExistingFilter('status');
                    if (String(value).length) {
                      const filter: AppTypes.ProjectFilter = {
                        column: 'status',
                        value: String(value),
                      };
                      applyFilter(filter);
                    }
                  }}
                />
              </Form.Group>
              <Form.Group widths={`equal`}>
                <Datepicker
                  format={`MM/DD/YYYY`}
                  placeholder={`MM/DD/YYYY`}
                  type={`range`}
                  label={`Created`}
                  clearable={false}
                  value={renderExistingDateFilterValue('created')}
                  onChange={(event, { value }) => {
                    if (isArray(value) && value.length === 2) {
                      removeExistingFilter('created');
                      if (String(value).length) {
                        const from = value[0];
                        const to = value[1];
                        const filter: AppTypes.ProjectFilter = {
                          column: 'created',
                          min: from.getTime(),
                          max: to.getTime(),
                        };
                        applyFilter(filter);
                      }
                    }
                  }}
                />
                <Datepicker
                  format={`MM/DD/YYYY`}
                  placeholder={`MM/DD/YYYY`}
                  type={`range`}
                  label={`Modified`}
                  clearable={false}
                  value={renderExistingDateFilterValue('modified')}
                  onChange={(event, { value }) => {
                    if (isArray(value) && value.length === 2) {
                      removeExistingFilter('modified');
                      if (String(value).length) {
                        const from = value[0];
                        const to = value[1];
                        const filter: AppTypes.ProjectFilter = {
                          column: 'modified',
                          min: from.getTime(),
                          max: to.getTime(),
                        };
                        applyFilter(filter);
                      }
                    }
                  }}
                />
              </Form.Group>
            </Form>
          </Card.Description>
        </Card.Content>
        <Card.Content>
          {appliedFilters && appliedFilters.map((
            filter: AppTypes.ProjectFilter,
            key: number,
          ) => (
            <Label
              key={key}
              as={`a`}
              color='blue'
            >
              {formatFilterDisplay(filter)}
              <Icon
                name={`delete`}
                onClick={() => removeFilter(key)}
              />
            </Label>
          ))}
        </Card.Content>
      </Card>
    </Style.Wrapper>
  );
};

export default ProjectsFilter;
