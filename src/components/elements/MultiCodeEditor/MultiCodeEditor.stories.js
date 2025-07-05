import MultiCodeEditorInteractive from './MultiCodeEditorInteractive'
import { Box, Text } from 'components/elements'
import { storiesOf } from '@storybook/react'
import { mqlCode } from 'helpers/mql-code'
import { theme } from 'theme'
import { Story } from 'story'
import React from 'react'

storiesOf('Elements', module).add('MultiCodeEditor', () => (
  <Story name='MultiCodeEditor'>
    <Box css={theme({ mb: 4, width: 650 })}>
      <Text css={theme({ color: 'gray6', mb: 2, fontSize: 0 })}>
        {'<MultiCodeEditor />'}
      </Text>
      <MultiCodeEditorInteractive
        mqlCode={mqlCode('https://github.com/microlinkhq')}
      />
      <Box css={theme({ py: 3 })} />
      <Text css={theme({ color: 'gray6', mb: 2, fontSize: 0 })}>
        {'<MultiCodeEditor /> (embed image)'}
      </Text>
      <MultiCodeEditorInteractive
        mqlCode={mqlCode('https://news.ycombinator.com/item?id=13713480', {
          screenshot: true,
          embed: 'screenshot.url'
        })}
      />
      <Box css={theme({ py: 3 })} />
      <Text css={theme({ color: 'gray6', mb: 2, fontSize: 0 })}>
        {'<MultiCodeEditor /> (embed text)'}
      </Text>
      <MultiCodeEditorInteractive
        mqlCode={mqlCode('https://news.ycombinator.com/item?id=13713480', {
          screenshot: true,
          embed: 'title'
        })}
      />
    </Box>
  </Story>
))
