import styled from 'styled-components';

import palette from 'app/palette';

export const Wrapper = styled.div`
  text-align: center;
`;

export const Header = styled.header`
  background-color: ${palette.WHITE};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  color: ${palette.BLACK};
`;
