import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { List, ListItem } from './List'

const code = `
import { List } from 'components/patterns'

export default () => (
  <List px={[3, 0]} mt={4} mb={3}>
    <ListItem children='Add it to an existing website or app.' />
    <ListItem children='Auto detection (image, video, audio) with media controls support.' />
    <ListItem children='Lightweight build size.' />
  </List>
)
`

storiesOf('Patterns', module).add('List', () => (
  <Story name='List' code={code} style={{ width: '100%' }}>
    <List px={[3, 0]} mt={4} mb={3}>
      <ListItem children='Add it to an existing website or app.' />
      <ListItem children='Auto detection (image, video, audio) with media controls support.' />
      <ListItem children='Lightweight build size.' />
    </List>
  </Story>
))
