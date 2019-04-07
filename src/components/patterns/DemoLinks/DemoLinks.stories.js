import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

import DemoLinks from '.'
import demoLinks from '../../../../data/demo-links.json'

storiesOf('Patterns', module).add('DemoLinks', () => (
  <Story name='DemoLinks'>
    <DemoLinks children={demoLinks} onClick={console.log.bind(console)} />
  </Story>
))
