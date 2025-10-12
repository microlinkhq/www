import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import List from './List'

const code = `
import List from 'components/patterns/List/List'

export default () => (
  <List px={[3, 0]} mt={4} mb={3}>
    <List.Item children='Add it to an existing website or app.' />
    <List.Item children='Auto detection (image, video, audio) with media controls support.' />
    <List.Item children='Lightweight build size.' />
  </List>
)
`

storiesOf('Patterns', module).add('List', () => (
  <Story name='List' code={code} style={{ width: '100%' }}>
    <List px={[3, 0]} mt={4} mb={3}>
      <List.Item>Add it to an existing website or app.</List.Item>
      <List.Item>
        Auto detection (image, video, audio) with media controls support.
      </List.Item>
      <List.Item>Lightweight build size.</List.Item>
    </List>
  </Story>
))
