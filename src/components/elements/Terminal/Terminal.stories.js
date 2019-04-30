import React from 'react'
import { storiesOf } from '@storybook/react'
import { Terminal } from 'components/elements'
import { Story } from 'story'

const cmd = `curl https://api.microlink.io?url=https://kikobeats.com`

const code = `
import { Terminal } from 'components/elements'

export default () => (
  <Terminal>${cmd}</Terminal>
)
`

storiesOf('Elements', module).add('Terminal', () => (
  <Story name='Terminal' code={code}>
    <Terminal children={cmd} />
  </Story>
))
