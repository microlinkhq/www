import { MultiCodeEditor, Box, Text } from 'components/elements'
import { storiesOf } from '@storybook/react'
import { mqlCode } from 'helpers/mql-code'
import { theme } from 'theme'
import { Story } from 'story'
import React from 'react'

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
    <Box css={theme({ mb: 4, width: 650 })}>
      <Text css={theme({ color: 'gray6', mb: 2, fontSize: 0 })}>
        {'<MultiCodeEditor />'}
      </Text>
      <MultiCodeEditor languages={languages} />
      <Box css={theme({ py: 3 })} />
      <Text css={theme({ color: 'gray6', mb: 2, fontSize: 0 })}>
        {'<MultiCodeEditor isDark />'}
      </Text>
      <MultiCodeEditor languages={languages} isDark />
    </Box>
  </Story>
))
