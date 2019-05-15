import React from 'react'
import { storiesOf } from '@storybook/react'
import { SearchBox } from 'components/elements'
import { Story } from 'story'

const code = `
import { SearchBox } from 'components/elements'

export default () => (
  <SearchBox
    text='Enter'
    placeholder='type a value...'
    type='text'
    onChange={value => console.log('typed value is:', value)}
  />
)
`

storiesOf('Elements', module).add('SearchBox', () => (
  <Story name='SearchBox' code={code}>
    <SearchBox
      text='Enter'
      placeholder='type a value...'
      type='text'
      onChange={value => console.log('typed value is:', value)}
    />
  </Story>
))
