import React from 'react'
import { Caps, Text, Label } from 'components/elements'
import { storiesOf } from '@storybook/react'
import { Header } from 'components/patterns'
import { Story } from 'story'

const codeHeader = `
import { Header } from 'components/patterns'

export default () => (
  <Header title='Turn websites into data' />
)`

const codeHeaderWithCaption = `
import { Header } from 'components/patterns'

export default () => (
  <Header title='Turn websites into data' caption='Microlink makes easy to build an API on top of any website.' />
)`

const codeHeaderWithSubtitle = `
import { Header } from 'components/patterns'

export default () => (
  <Header subtitle='Turn websites into data' />
)`

const codeHeaderWithSubtitleWithCaption = `
import { Header } from 'components/patterns'

export default () => (
  <Header subtitle='Turn websites into data' caption='enter URL, receive data' />
)`

const codeLabel = `
import { Label } from 'components/elements'

export default () => (
  <Label display='inline' children='reqs' suffix='/day' />
)
`

const codeCaps = `
import { Caps } from 'components/elements'

export default () => <Caps fontSize={0}>See More</Caps>
`

const codeText = `
import { Text } from 'components/elements'

export default () => (
  <Fragment>
    <Text children='Make your content attractive, engaging better your links.' />
    <Text fontSize={[0, 2]} color='gray' children='June 30, 2018 (9 months ago)' />
  </Fragment>
)`

storiesOf('Theme', module).add('Typography', () => (
  <>
    <Story name='Header title' code={codeHeader}>
      <Header pb={0} title='Turn websites into data' />
    </Story>
    <Story name='Header title caption' code={codeHeaderWithCaption}>
      <Header
        pb={0}
        title='Turn websites into data'
        caption='Microlink makes easy to build an API on top of any website.'
      />
    </Story>
    <Story name='Header subtitle' code={codeHeaderWithSubtitle}>
      <Header pb={0} subtitle='Turn websites into data' />
    </Story>
    <Story
      name='Header subtitle caption'
      code={codeHeaderWithSubtitleWithCaption}
    >
      <Header
        pb={0}
        subtitle='Turn websites into data'
        caption='enter URL, receive data'
      />
    </Story>
    <Story name='Label' code={codeLabel}>
      <Label display='inline' children='reqs' suffix='/day' />
    </Story>
    <Story name='Caps' code={codeCaps}>
      <Caps fontSize={0}>See More</Caps>
    </Story>
    <Story name='Text' code={codeText}>
      <Text children='Make your content attractive, engaging better your links.' />
      <Text
        fontSize={[0, 2]}
        color='gray'
        children='June 30, 2018 (9 months ago)'
      />
    </Story>
  </>
))
