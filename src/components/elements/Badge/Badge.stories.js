import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Badge from './Badge'

const code = `
import Badge from './Badge'

export default () => (
  <Badge>PRO</Badge>
)
`

storiesOf('Elements', module).add('Badge', () => (
  <Story name='Badge' code={code}>
    <Badge>PRO</Badge>
  </Story>
))
