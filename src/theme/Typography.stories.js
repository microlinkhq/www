import React from 'react'
import { Caps, Text, Label } from 'components/elements'
import { Headline, SubHeadline, Legend } from 'components/patterns'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

const codeHeadline = `
import { Headline } from 'components/patterns'

export default () => (
  <Headline title='Turn websites into data' caption='Microlink makes easy to build an API on top of any website.' />
)`

const codeSubHeadline = `
import { SubHeadline } from 'components/patterns'

export default () => (
  <SubHeadline title='Turn websites into data' caption='enter URL, receive data' />
)`

const codeLegend = `
import { Legend } from 'components/patterns'

export default () => (
  <Legend sup='screenshot' title='Turn websites into screenshots' />
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
    <Text fontSize={[0, 2]} color='black60' children='June 30, 2018 (9 months ago)' />
  </Fragment>
)`

storiesOf('Theme', module).add('Typography', () => (
  <>
    <Story name='Headline' code={codeHeadline}>
      <Headline
        pb={0}
        title='Turn websites into data'
        caption='Microlink makes easy to build an API on top of any website.'
      />
    </Story>
    <Story name='SubHeadline' code={codeSubHeadline}>
      <SubHeadline
        pb={0}
        title='Turn websites into data'
        caption='enter URL, receive data'
      />
    </Story>
    <Story name='Legend' code={codeLegend}>
      <Legend sup='screenshot' title='Turn websites into screenshots' />
    </Story>
    <Story name='Text' code={codeText}>
      <Text children='Make your content attractive, engaging better your links.' />
      <Text
        fontSize={[0, 2]}
        color='black60'
        children='June 30, 2018 (9 months ago)'
      />
    </Story>
    <Story name='Label' code={codeLabel}>
      <Label display='inline' children='reqs' suffix='/day' />
    </Story>
    <Story name='Caps' code={codeCaps}>
      <Caps fontSize={0}>See More</Caps>
    </Story>
  </>
))
