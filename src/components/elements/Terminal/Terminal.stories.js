import React from 'react'
import { storiesOf } from '@storybook/react'
import { Image, Box, Text, Terminal } from 'components/elements'
import styled from 'styled-components'
import { cx, theme } from 'theme'
import { Story } from 'story'

const cmd = 'curl https://api.microlink.io?url=https://kikobeats.com'

const code = `
import { Terminal } from 'components/elements'

export default () => (
  <Terminal title='microlink' children='${cmd}' theme='light' blinkCursor shellSymbol />
)
`

const SpanKey = styled.span`
  color: ${cx('green5')};
`

const Span = styled.span`
  color: ${cx('gray8')};
`

const SpanLabel = styled.span`
  background: ${cx('green5')};
  color: white;
  padding: 0 8px;
  text-transform: uppercase;
`

storiesOf('Elements', module).add('Terminal', () => (
  <Story name='Terminal' code={code}>
    <Text css={theme({ color: 'gray6', mb: 2, fontSize: 0 })}>
      {'<Terminal />'}
    </Text>
    <Terminal css={theme({ mb: 4 })}>{cmd}</Terminal>

    <Text css={theme({ color: 'gray6', mb: 2, fontSize: 0 })}>
      {"<Terminal title='microlink' />"}
    </Text>
    <Terminal css={theme({ mb: 4 })} title='microlink'>
      {cmd}
    </Terminal>

    <Text css={theme({ color: 'gray6', mb: 2, fontSize: 0 })}>
      {'<Terminal isDark />'}
    </Text>
    <Terminal css={theme({ mb: 4 })} title='microlink' isDark>
      {cmd}
    </Terminal>

    <Text css={theme({ color: 'gray6', mb: 2, fontSize: 0 })}>
      {'<Terminal blinkCursor={false} />'}
    </Text>
    <Terminal blinkCursor={false}>
      <span>
        npx @microlink/cli
        https://kikobeats.com?&screenshot&embed=screenshot.url&border=false&force
      </span>
      <Image
        css={theme({ pt: 3, width: 300 })}
        alt='kikobeats.com screenshot'
        src='https://i.imgur.com/WikuSgo.png'
      />
      <Box css={theme({ pt: 3 })}>
        <SpanLabel>SUCCESS</SpanLabel> <Span>57.9 kB in 13830.018ms</Span>
      </Box>
      <Box css={theme({ pt: 3 })}>
        <Box>
          {'  '}
          <SpanKey>uri</SpanKey>
          <Span>
            https://api.microlink.io?url=https://kikobeats.com?&screenshot&embed=screenshot.url
          </Span>
        </Box>
        <Box>
          <SpanKey>cache</SpanKey>
          <Span>MISS</Span>
        </Box>
        <Box>
          {' '}
          <SpanKey>mode</SpanKey>
          <Span>prerender (4654.865ms)</Span>
        </Box>
      </Box>
    </Terminal>
  </Story>
))
