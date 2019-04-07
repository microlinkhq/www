import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import {
  Heading,
  ButtonSecondary,
  Caps,
  Box,
  Text,
  Label,
  Subhead
} from 'components/elements'
import { fontWeights, fontSizes } from 'theme'
import { Story } from 'story'

storiesOf('Elements', module).add('Typography', () => (
  <Fragment>
    <Story name='Heading'>
      <Heading children='Turn websites into data' />
    </Story>
    <Story name='Subhead'>
      <Subhead children='From $0. Pay as you Grow.' />
    </Story>
    <Story name='Label'>
      <Label display='inline' children='reqs' suffix='/day' />
    </Story>
    <Story name='Caps'>
      <ButtonSecondary href='https://google.com'>
        <Caps fontSize={0}>See More</Caps>
      </ButtonSecondary>
    </Story>
    <Story name={'Text'}>
      {fontSizes.map((fontSize, fontSizeIndex) => (
        <Box mb={5}>
          {Object.keys(fontWeights).map(fontWeight => {
            return (
              <Box mb={1}>
                <Text
                  color='gray'
                  fontSize={'10px'}
                >{`${fontSize}px — ${fontWeight}`}</Text>
                <Text
                  key={`${fontSize}__${fontWeight}`}
                  fontWeight={fontWeight}
                  fontSize={fontSizeIndex}
                  children={'Turn web into data'}
                />
              </Box>
            )
          })}
        </Box>
      ))}
    </Story>
  </Fragment>
))
