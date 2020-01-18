import styled from 'styled-components';
import { rem } from 'polished';
import { Table, Icon } from 'semantic-ui-react';
import palette from 'app/palette';

export const TableHeaderCell = styled(Table.HeaderCell)`
  cursor: default;
  position: relative;
`;

export const TableCell = styled(Table.Cell)`
  background: ${
    ({ sorting }) => sorting ? palette.COLUMBIA : palette.WHITE
  }
`;

export const SortIcon = styled(Icon)`
  color: ${
    ({ sorting }) => sorting ? palette.YELLOW : palette.WHITE
  };
  cursor: pointer;
  position: absolute;
  top: 1em;
  right: ${rem(8)};
`;
