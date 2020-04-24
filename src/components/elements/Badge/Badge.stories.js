import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { Badge } from 'components/elements'

const code = `
import { Badge } from 'components/elements'

export default () => (
  <Badge>PRO</Badge>
)
`

storiesOf('Elements', module).add('Badge', () => (
  <Story name='Badge' code={code}>
    <Badge>PRO</Badge>
  </Story>
))
