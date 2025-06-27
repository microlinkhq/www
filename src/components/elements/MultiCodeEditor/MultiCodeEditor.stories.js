import MultiCodeEditorV2 from './MultiCodeEditorV2'
import { Box, Text } from 'components/elements'
import { storiesOf } from '@storybook/react'
import { mqlCode } from 'helpers/mql-code-v2'
import { theme } from 'theme'
import { Story } from 'story'
import React from 'react'

storiesOf('Elements', module).add('MultiCodeEditor', () => (
  <Story name='MultiCodeEditor'>
    <Box css={theme({ mb: 4, width: 650 })}>
      <Text css={theme({ color: 'gray6', mb: 2, fontSize: 0 })}>
        {'<MultiCodeEditor />'}
      </Text>
      <MultiCodeEditorV2 mqlCode={mqlCode('https://github.com/microlinkhq')} />
    </Box>
  </Story>
))
