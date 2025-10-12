import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import IframeInline from './IframeInline'

const __html =
  '<iframe width="480" height="270" src="https://www.youtube.com/embed/9P6rdqiybaw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

const code = `
import IframeInline from './IframeInline'

const __html =
  '<iframe width="480" height="270" src="https://www.youtube.com/embed/9P6rdqiybaw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

export default () => (
  <IframeInline dangerouslySetInnerHTML={{ __html }} />
)
`

storiesOf('Elements', module).add('IframeInline', () => (
  <Story name='IframeInline' code={code}>
    <IframeInline dangerouslySetInnerHTML={{ __html }} />
  </Story>
))
