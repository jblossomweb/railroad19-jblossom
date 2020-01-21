import React from 'react';
import { Card } from 'semantic-ui-react';

import * as AppTypes from 'app/types';
import * as Style from './StatCards.style';

export interface Props {
  stats: AppTypes.Statistics,
};

const StatCards: React.FC<Props> = ({
  stats,
}) => (
  <Style.Wrapper>
    <Card.Group
      centered
      items={stats}
    />
  </Style.Wrapper>
)

export default StatCards;
