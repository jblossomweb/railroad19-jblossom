import styled from 'styled-components';
import { rem } from 'polished';
import { Table, Icon } from 'semantic-ui-react';
import palette from 'app/palette';

export const TableHeaderCell = styled(Table.HeaderCell)`
  cursor: default;
  position: relative;
`;

export const EditCellIcon = styled(Icon)`
  cursor: pointer;
  position: absolute;
  top: 1.5em;
  right: .25em;
`;

export const TableCell = styled(Table.Cell)`
  position: relative;
  background: ${
    props => props['data-sorting'] ? palette.COLUMBIA : palette.WHITE
  };
  ${EditCellIcon} {
    display: none;
  }
  :hover ${EditCellIcon} {
    display: inline;
  }
  input::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

export const SortIcon = styled(Icon)`
  color: ${
    props => props['data-sorting'] ? palette.YELLOW : palette.WHITE
  };
  cursor: pointer;
  position: absolute;
  top: 1em;
  right: ${rem(8)};
`;
