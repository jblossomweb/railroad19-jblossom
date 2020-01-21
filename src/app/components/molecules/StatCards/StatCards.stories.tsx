import React from 'react';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import mockStats from 'app/__mocks__/statistics.json';

import StatCards, { Props } from '.';

export const mockProps: Props = {
  stats: mockStats,
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <StatCards
    stats={knobs.object('stats', props.stats)}
  />
);

export const scenes = {
  'sample': renderScene({
    ...mockProps,
  }),
};

storyBuilder(
  scenes,
  'molecules/StatCards',
  Template,
);
