import React from 'react'
import { Story } from 'story'
import Toolbar from './Toolbar'

const code = `
import Toolbar from 'components/patterns/Toolbar/Toolbar'

export default () => (
  <Toolbar/>
)
`

export default { title: 'Patterns/Toolbar' }

export const Default = () => (
  <Story name='Toolbar' code={code}>
    <Toolbar />
  </Story>
)
