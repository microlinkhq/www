import React from 'react'
import { storiesOf } from '@storybook/react'

import DemoLinks from '.'

import demoLinks from '../../../../data/demo-links.json'

const children = demoLinks.filter(demoLink => demoLink.featured)

storiesOf('Patterns', module).add('DemoLinks', () => (
  <DemoLinks children={children} onClick={console.log.bind(console)} />
))
