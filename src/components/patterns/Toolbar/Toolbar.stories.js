import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Toolbar from './Toolbar'

const code = `
import Toolbar from 'components/patterns/Toolbar/Toolbar'

export default () => (
  <Toolbar/>
)
`

storiesOf('Patterns', module).add('Toolbar', () => (
  <Story name='Toolbar' code={code}>
    <Toolbar />
  </Story>
))
