import { MultiCodeEditor, Box, Text } from 'components/elements'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React from 'react'
import { mqlCode } from 'helpers'

const languages = mqlCode('https://example.com', {
  data: {
    audio: true,
    video: true,
    meta: true,
    pdf: {
      format: 'A4',
      margin: '0.35cm',
      scale: 0.6
    }
  }
})

storiesOf('Elements', module).add('MultiCodeEditor', () => (
  <Story name='MultiCodeEditor'>
    <Box mb={4} width={650}>
      <Text color='gray6' mb={2} fontSize={0}>
        {'<MultiCodeEditor />'}
      </Text>
      <MultiCodeEditor languages={languages} />
      <Box py={3} />
      <Text color='gray6' mb={2} fontSize={0}>
        {"<MultiCodeEditor theme='dark' />"}
      </Text>
      <MultiCodeEditor languages={languages} theme='dark' />
    </Box>
  </Story>
))
