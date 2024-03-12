import React from 'react'
import { Heading, Caps, Text, Label } from 'components/elements'
import { Caption, Legend } from 'components/patterns'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { theme } from 'theme'

const codeHeading = `
import { Heading } from 'components/elements'

export default () => (
  <Heading children='Browser as API' />
)`

const codeCaption = `
import { Caption } from 'components/patterns'

export default () => (
  <Caption>
    Fast, scalable, and reliable browser automation built for businesses and
    developers.
  </Caption>
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
    <Story name='Heading' code={codeHeading}>
      <Heading titleize={false}>Browser as API</Heading>
    </Story>
    <Story name='Caption' code={codeCaption}>
      <Caption>
        Fast, scalable, and reliable browser automation built for businesses and
        developers.
      </Caption>
    </Story>
    <Story name='Legend' code={codeLegend}>
      <Legend sup='screenshot' title='Turn websites into screenshots' />
    </Story>
    <Story name='Text' code={codeText}>
      <Text>Make your content attractive, engaging better your links.</Text>
      <Text css={theme({ fontSize: [0, 2], color: 'black60' })}>
        June 30, 2018 (9 months ago)
      </Text>
    </Story>
    <Story name='Label' code={codeLabel}>
      <Label display='inline' suffix='/day'>
        reqs
      </Label>
    </Story>
    <Story name='Caps' code={codeCaps}>
      <Caps css={theme({ fontSize: 0 })}>See More</Caps>
    </Story>
  </>
))
