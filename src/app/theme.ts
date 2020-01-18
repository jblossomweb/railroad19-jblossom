import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';

import palette from 'app/palette';

const Theme = styled.div`
  * {
    color: ${palette.BLACK};
  }

  a,
  .anchor {
    cursor: pointer;
    color: ${palette.NAVY};
    text-decoration: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: inline;
    margin: 0;
    padding: 0;
  }

  a:hover,
  .anchor:hover {
    color: ${palette.COLUMBIA};
  }
`;

export default Theme;
