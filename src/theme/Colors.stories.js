import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import { withTitle } from 'helpers/hoc/with-title'
import { storiesOf } from '@storybook/react'
import contrast from 'contrast'
import range from 'lodash/range'
import { colors } from 'theme'
import { Story } from 'story'
import rgbHex from 'rgb-hex'
import React from 'react'

const Subhead = withTitle(SubheadBase)

const isHexColor = color => color.startsWith('#')

const isLight = color => contrast(color) === 'light'

const toHex = color =>
  (isHexColor(color) ? color : `#${rgbHex(color)}`).toLowerCase()

const contrastColor = color => {
  const hexColor = toHex(color)
  return isLight(hexColor) ? 'black' : 'white'
}

const Palette = ({ name, keywords }) => (
  <Box as='section' pt={5}>
    <Subhead textAlign='left' pb={3}>
      {name}
    </Subhead>
    <Flex flexDirection='column'>
      {keywords.map(keyword => (
        <Flex
          color={contrastColor(colors[keyword])}
          justifyContent='space-between'
          px={5}
          py={4}
          key={keyword}
          bg={keyword}
        >
          <Text fontSize={3}>{keyword}</Text>
          <Text fontSize={3}>{toHex(colors[keyword])}</Text>
        </Flex>
      ))}
    </Flex>
  </Box>
)

const PaletteRange = ({ name: keyword }) => (
  <Palette name={keyword} keywords={range(9).map(n => `${keyword}${n}`)} />
)

storiesOf('Theme', module).add('Colors', () => (
  <Story mt={0} name='Colors' width='100%'>
    <Palette
      name='others'
      keywords={['link', 'secondary', 'primary', 'pinky', 'pinkest']}
    />
    <Palette
      name='white'
      keywords={[
        'white',
        'white95',
        'white90',
        'white80',
        'white70',
        'white60',
        'white50',
        'white40',
        'white30',
        'white20',
        'white10',
        'white05',
        'white025',
        'white0125'
      ]}
    />
    <Palette
      name='black'
      keywords={[
        'black',
        'black95',
        'black90',
        'black80',
        'black70',
        'black60',
        'black50',
        'black40',
        'black30',
        'black20',
        'black10',
        'black05',
        'black025',
        'black0125'
      ]}
    />
    <PaletteRange name='gray' />
    <PaletteRange name='blue' />
    <PaletteRange name='cyan' />
    <PaletteRange name='indigo' />
    <PaletteRange name='violet' />
    <PaletteRange name='fuschia' />
    <PaletteRange name='pink' />
    <PaletteRange name='red' />
    <PaletteRange name='orange' />
    <PaletteRange name='yellow' />
    <PaletteRange name='lime' />
    <PaletteRange name='green' />
    <PaletteRange name='teal' />
  </Story>
))
