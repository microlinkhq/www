import React from 'react'
import { Story } from 'story'
import Unavatar from './Unavatar'

const code = `
import Unavatar from './Unavatar'

export default () => (
  <Unavatar height='80px' width='80px' query='microlink.io' />
)
`

export default { title: 'Elements/Unavatar' }

export const Default = () => (
  <Story name='Unavatar' code={code}>
    <Unavatar height='80px' width='80px' query='microlink.io' />
  </Story>
)
