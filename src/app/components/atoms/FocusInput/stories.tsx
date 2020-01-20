import React from 'react';

import { KnobsInterface, storyBuilder } from 'core/stories';
import Template from 'app/templates/LightCentered';

import FocusInput, { Props } from '.';

export const mockProps: Props = {
  value: 'some text',
};

export const renderScene = (
  knobProps: Props,
) => (
  knobs: KnobsInterface,
  props: Props = knobProps,
) => (
  <FocusInput
    value={knobs.text('value', props.value)}
  />
);

export const scenes = {
  'sample': renderScene({
    ...mockProps,
  }),
};

storyBuilder(
  scenes,
  'atoms/FocusInput',
  Template,
);
