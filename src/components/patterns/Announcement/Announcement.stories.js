import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Announcement from './Announcement'

const code = `
import Announcement from 'components/patterns/Announcement/Announcement'

export default () => (
  <Announcement
    data-event-location='Home'
    data-event-name='Announcement'
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
      data-event-location='Home'
      data-event-name='Announcement'
      href='/blog/product-brief-7/'
    >
      Speed, meet simplicity. Introducing <b>Microlink PDF</b>
    </Announcement>
  </Story>
))
