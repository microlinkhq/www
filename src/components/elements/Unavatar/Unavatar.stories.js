import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { Unavatar } from 'components/elements'

const code = `
import { Unavatar } from 'components/elements'

export default () => (
  <Unavatar height='80px' width='80px' query='microlink.io' />
)
`

storiesOf('Elements', module).add('Unavatar', () => (
  <Story name='Unavatar' code={code}>
    <Unavatar height='80px' width='80px' query='microlink.io' />
  </Story>
))
