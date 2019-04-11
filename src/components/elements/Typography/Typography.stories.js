import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import {
  Heading,
  ButtonSecondary,
  Caps,
  Text,
  Label,
  Subhead
} from 'components/elements'
import { lineHeights, fontSizes } from 'theme'
import { Story } from 'story'
import { isNil, castArray, last } from 'lodash'

const Info = ({ children }) => {
  const fontSize = fontSizes[last(castArray(children.defaultProps.fontSize))]
  const fontWeight = last(castArray(children.defaultProps.fontWeight))
  const lineHeight =
    lineHeights[last(castArray(children.defaultProps.lineHeight))]

  return (
    <Text
      color='black30'
      children={`${fontSize}px ${
        isNil(fontWeight) ? '' : fontWeight
      } – ${lineHeight}`}
    />
  )
}

const createCode = str => `
import { Terminal } from 'components/elements'

export default () => (${str})
`

const codeHeading = createCode(`
  <Heading children='Turn websites into data' />
`)

const codeSubhead = createCode(`
  <Subhead
    color='black50'
    children='Microlink makes easy build an API on top of any website.'
  />
`)

const codeCaps = createCode(`
  <Caps fontSize={0}>See More</Caps>
`)

const codeLabel = createCode(`
  <Label display='inline' children='reqs' suffix='/day' />
`)

const codeText = createCode(`
  <Text
    children='Make your content attractive, engaging better your links.'
  />
`)

storiesOf('Elements', module).add('Typography', () => (
  <Fragment>
    <Story name='Heading' code={codeHeading}>
      <Info>{Heading}</Info>
      <Heading children='Turn websites into data' />
    </Story>
    <Story name='Subhead' code={codeSubhead}>
      <Info>{Subhead}</Info>
      <Subhead
        color='gray'
        children={'Microlink makes easy build an API on top of any website.'}
      />
    </Story>
    <Story name='Label' code={codeLabel}>
      <Info>{Label}</Info>
      <Label display='inline' children='reqs' suffix='/day' />
    </Story>
    <Story name='Caps' code={codeCaps}>
      <Info>{Caps}</Info>
      <Caps fontSize={0}>See More</Caps>
    </Story>
    <Story name='Text' code={codeText}>
      <Info>{Text}</Info>
      <Text
        children={'Make your content attractive, engaging better your links.'}
      />
      <Text
        fontSize={[0, 2]}
        color='gray'
        children={'June 30, 2018 (9 months ago)'}
      />
    </Story>
  </Fragment>
))
