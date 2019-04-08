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

console.log('Label', Label)

storiesOf('Elements', module).add('Typography', () => (
  <Fragment>
    <Story name='Heading'>
      <Info>{Heading}</Info>
      <Heading children='Turn websites into data' />
    </Story>
    <Story name='Subhead'>
      <Info>{Subhead}</Info>
      <Subhead
        color='black50'
        children={'Microlink makes easy build an API on top of any website.'}
      />
    </Story>
    <Story name='Label'>
      <Info>{Label}</Info>
      <Label display='inline' children='reqs' suffix='/day' />
    </Story>
    <Story name='Caps'>
      <Info>{Caps}</Info>
      <Caps fontSize={0}>See More</Caps>
    </Story>
    <Story name={'Text'}>
      <Info>{Text}</Info>
      <Text
        children={'Make your content attractive, engaging better your links.'}
      />
    </Story>
  </Fragment>
))
