import React from 'react'
import { Story } from 'story'
import Chat from './Chat'

const code = `
import Chat from 'components/patterns/Chat/Chat'

export default () => (
  <Chat />
)
`

export default { title: 'Patterns/Chat' }

export const Default = () => (
  <Story name='Chat' code={code}>
    <Chat />
  </Story>
)
