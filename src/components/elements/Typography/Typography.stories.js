import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Text } from 'components/elements'
import { fontWeights, fontSizes } from 'theme'
import { Story } from 'story'

storiesOf('Elements/Typography', module).add('Text', () => (
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
))
