import moment from 'moment';
import * as AppTypes from 'app/types';

export const formatDataDisplay = (
  column: keyof AppTypes.Project,
  value: any,
) => {
  switch(column) {
    case 'budget':
      return value.toLocaleString(
        'en-US',
        { style: 'currency', currency: 'USD' }
      );
    case 'created':
    case 'modified':
      return value ? moment(value).format('MM/DD/YYYY') : null;
    default:
      return value;
  }
};

export const formatFilterDisplay = (
  { column, value, search, min, max }: AppTypes.ProjectFilter,
) => {
  if (
    typeof value !== 'undefined'
  ) {
    return `${column} = '${formatDataDisplay(column, value)}'`;
  }
  if (
    typeof search !== 'undefined'
  ) {
    return `${column} CONTAINS '${formatDataDisplay(column, search)}'`;
  }
  if (
    typeof min !== 'undefined' &&
    typeof max !== 'undefined'
  ) {
    return `${column} FROM ${formatDataDisplay(column, min)} TO ${formatDataDisplay(column, max)}`;
  }
  if (
    typeof min !== 'undefined'
  ) {
    return `${column} >= ${formatDataDisplay(column, min)}`;
  }
  if (
    typeof max !== 'undefined'
  ) {
    return `${column} <= ${formatDataDisplay(column, max)}`;
  }
};
