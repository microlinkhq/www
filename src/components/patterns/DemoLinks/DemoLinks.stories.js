import React from 'react'
import { Story } from 'story'

import DemoLinks from './DemoLinks'
import demoLinks from '../../../../data/demo-links'

export default { title: 'Patterns/DemoLinks' }

export const Default = () => (
  <Story name='DemoLinks'>
    <DemoLinks onClick={console.log.bind(console)}>{demoLinks}</DemoLinks>
  </Story>
)
