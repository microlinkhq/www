import React from 'react'
import { Story } from 'story'
import Toggle from './Toggle'

const code = `
import Toggle from './Toggle'

export default () => (
  <Toggle defaultValue={'MQL'}>
    {['SDK', 'MQL', 'API']}
  </Toggle>
)
`

const children = ['SDK', 'MQL', 'API']

export default { title: 'Elements/Toggle' }

export const Default = () => (
  <Story name='Toggle' code={code}>
    <Toggle defaultValue='MQL'>{children}</Toggle>
  </Story>
)
