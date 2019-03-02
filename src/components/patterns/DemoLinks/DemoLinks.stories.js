import React from 'react'
import { storiesOf } from '@storybook/react'
import DemoLinks from '.'

storiesOf('Patterns', module).add('DemoLinks', () => (
  <DemoLinks onClick={console.log.bind(console)} />
))
