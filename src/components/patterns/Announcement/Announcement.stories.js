import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Announcement from './Announcement'

const code = `
import { Announcement } from 'components/patterns'

export default () => (
  <Announcement
    data-event-category='Home'
    data-event-action='Announcement'
    href='/blog/product-brief-7/'
    children={
      <>
        Speed, meet simplicity. Introducing <b>Microlink PDF</b>
      </>
    }
  />
)
`

storiesOf('Patterns', module).add('Announcement', () => (
  <Story name='Announcement' code={code}>
    <Announcement
      data-event-category='Home'
      data-event-action='Announcement'
      href='/blog/product-brief-7/'
    >
      Speed, meet simplicity. Introducing <b>Microlink PDF</b>
    </Announcement>
  </Story>
))
