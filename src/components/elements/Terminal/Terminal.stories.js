import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Terminal } from 'components/elements'
import { Story } from 'story'

const cmd = 'curl https://api.microlink.io?url=https://kikobeats.com'

const code = `
import { Terminal } from 'components/elements'

export default () => (
  <Terminal title='microlink-api' children='${cmd}' theme='light' blinkCursor shellSymbol />
)
`

storiesOf('Elements', module).add('Terminal', () => (
  <Story name='Terminal' code={code}>
    <Terminal mb={4} children={cmd} />
    <Terminal mb={4} title='microlink-api' children={cmd} />
    <Terminal title='microlink-api' children={cmd} theme='dark' />
  </Story>
))
