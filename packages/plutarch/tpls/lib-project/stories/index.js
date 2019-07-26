import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import Comp from 'lib/index.tsx'

storiesOf('demos', module)
  .add('lib', () => <Comp />);