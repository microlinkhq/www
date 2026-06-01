import React from 'react'
import { Story } from 'story'
import Badge from './Badge'

const code = `
import Badge from './Badge'

export default () => (
  <Badge>PRO</Badge>
)
`

export default { title: 'Elements/Badge' }

export const Default = () => (
  <Story name='Badge' code={code}>
    <Badge>PRO</Badge>
  </Story>
)
