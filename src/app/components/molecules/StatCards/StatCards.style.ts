import styled from 'styled-components';
import { rem } from 'polished';

export const Wrapper = styled.div`
  padding: ${rem(42)} 0;
  .ui.card .description {
    font-size: ${rem(42)};
    font-weight: bold;
    padding-bottom: ${rem(24)};
  }
`;
