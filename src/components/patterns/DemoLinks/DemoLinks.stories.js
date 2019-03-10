import React from 'react'
import { storiesOf } from '@storybook/react'

import DemoLinks from '.'

import demoLinks from '../../../../data/demo-links.json'

storiesOf('Patterns', module).add('DemoLinks', () => (
  <DemoLinks children={demoLinks} onClick={console.log.bind(console)} />
))
