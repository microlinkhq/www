import React from 'react'
import Heading from 'components/elements/Heading'
import Caps from 'components/elements/Caps'
import Text from 'components/elements/Text'
import Label from 'components/elements/Label'
import Caption from 'components/patterns/Caption/Caption'
import Legend from 'components/patterns/Legend/Legend'
import { Story } from 'story'
import { theme } from 'theme'

const codeHeading = `
import Heading from 'components/elements/Heading'

export default () => (
  <Heading children='Browser as API' />
)`

const codeCaption = `
import Caption from 'components/patterns/Caption/Caption'

export default () => (
  <Caption>
    Fast, scalable, and reliable browser automation built for businesses and
    developers.
  </Caption>
)`

const codeLegend = `
import Legend from 'components/patterns/Legend/Legend'

export default () => (
  <Legend sup='screenshot' title='Turn websites into screenshots' />
)`

const codeLabel = `
import Label from 'components/elements/Label'

export default () => (
  <Label display='inline' children='reqs' suffix='/day' />
)
`

const codeCaps = `
import Caps from 'components/elements/Caps'

export default () => <Caps fontSize={0}>See More</Caps>
`

const codeText = `
import Text from 'components/elements/Text'

export default () => (
  <Fragment>
    <Text children='Make your content attractive, engaging better your links.' />
    <Text fontSize={[0, 2]} color='black60' children='June 30, 2018 (9 months ago)' />
  </Fragment>
)`

export default { title: 'Theme/Typography' }

export const Default = () => (
  <>
    <Story name='Heading' code={codeHeading}>
      <Heading>Browser as API</Heading>
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
      <Label css={theme({ display: 'inline' })} suffix='/day'>
        reqs
      </Label>
    </Story>
    <Story name='Caps' code={codeCaps}>
      <Caps css={theme({ fontSize: 0 })}>See More</Caps>
    </Story>
  </>
)
