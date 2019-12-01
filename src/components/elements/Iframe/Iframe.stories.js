import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Iframe from './Iframe'

const code = `
import { Iframe } from 'components/elements'

export default () => (
  <Iframe
    width="480px"
    height="270px"
    src="https://www.youtube.com/embed/9P6rdqiybaw?feature=oembed"
    allowFullScreen
  />
)
`

storiesOf('Elements', module).add('Iframe', () => (
  <Story name='Iframe' code={code}>
    <Iframe
      width='480px'
      height='270px'
      src='https://www.youtube.com/embed/9P6rdqiybaw?feature=oembed'
      allowFullScreen
    />
  </Story>
))
