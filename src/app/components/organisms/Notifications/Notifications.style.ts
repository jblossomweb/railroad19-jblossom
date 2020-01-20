import styled from 'styled-components';
import { rem } from 'polished';
import palette from 'app/palette';

export const Wrapper = styled.div`
  z-index: 2;
  position: fixed;
  top: ${rem(32)};
  right: ${rem(32)};
  min-width: ${rem(160)};
  .ui.message {
    transition: opacity .5s;
    opacity: 1;
    background: ${palette.LIGHT_GREEN};
  }
  .ui.icon.message>.icon.save {
    font-size: 1.5em;
  }
`;
