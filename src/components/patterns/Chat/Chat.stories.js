import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Chat from './Chat'

const code = `
import Chat from 'components/patterns/Chat/Chat'

export default () => (
  <Chat />
)
`

storiesOf('Patterns', module).add('Chat', () => (
  <Story name='Chat' code={code}>
    <Chat />
  </Story>
))
