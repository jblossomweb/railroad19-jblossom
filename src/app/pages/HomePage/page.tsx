import React from 'react';
import Template from 'app/templates/LightCentered';
import * as Style from './style';

export interface Props {
  imgSrc: string,
};

const HomePage: React.FC<Props> = ({
  imgSrc,
}) => (
  <Template>
    <Style.Wrapper>
      <h1>RailRoad19</h1>
      <img src={imgSrc} alt={"RailRoad19"} />
      <p>
        UI/UX Code Challenge
      </p>
    </Style.Wrapper>
  </Template>
);

export default HomePage;
