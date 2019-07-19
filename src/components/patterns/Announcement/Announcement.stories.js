import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React from 'react'

import Announcement from './Announcement'

const storyName = 'Announcement'

const code = `
import { Notification } from 'components/elements'

export default () => (
  <Announcement
    data-event-category='Home'
    data-event-action='Announcement'
    href='/blog/product-brief-7/'
    children='Microlink SDK 4.0, Docs Portal & MQL'
  />
)`

storiesOf('Patterns', module).add('Announcement', () => (
  <Story name={storyName} code={code}>
    <Announcement
      data-event-category='Home'
      data-event-action='Announcement'
      href='/blog/product-brief-7/'
      children='Microlink SDK 4.0, Docs Portal & MQL'
    />
  </Story>
))
