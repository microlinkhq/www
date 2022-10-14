import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

import DemoLinks from './DemoLinks'
import demoLinks from '../../../../data/demo-links'

storiesOf('Patterns', module).add('DemoLinks', () => (
  <Story name='DemoLinks'>
    <DemoLinks onClick={console.log.bind(console)}>{demoLinks}</DemoLinks>
  </Story>
))
