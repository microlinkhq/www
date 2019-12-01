import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Banner from './Banner'

const code = `
import { Banner } from 'components/elements'

export default () => (
  <Banner>PRO</Banner>
)
`

storiesOf('Elements', module).add('Banner', () => (
  <Story name='Banner' code={code}>
    <Banner
      data-event-category='Home'
      data-event-action='Announcement'
      href='/blog/product-brief-7/'
      children='Microlink SDK 4.0, Docs Portal & MQL'
    />
  </Story>
))
