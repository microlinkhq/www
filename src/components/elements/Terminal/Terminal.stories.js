import React from 'react'
import { storiesOf } from '@storybook/react'
import { Image, Box, Text, Terminal } from 'components/elements'
import styled from 'styled-components'
import { colors } from 'theme'
import { Story } from 'story'

const cmd = 'curl https://api.microlink.io?url=https://kikobeats.com'

const code = `
import { Terminal } from 'components/elements'

export default () => (
  <Terminal title='microlink' children='${cmd}' theme='light' blinkCursor shellSymbol />
)
`

const SpanKey = styled.span`
  color: ${colors.green5};
`

const Span = styled.span`
  color: ${colors.gray8};
`

const SpanLabel = styled.span`
  background: ${colors.green5};
  color: white;
  padding: 0 8px;
  text-transform: uppercase;
`

const cliCode = (
  <>
    <span>
      npx @microlink/cli
      https://kikobeats.com?&screenshot&embed=screenshot.url&border=false&force
    </span>
    <Image
      alt='kikobeats.com screenshot'
      pt={3}
      width={300}
      src='https://i.imgur.com/WikuSgo.png'
    />
    <Box pt={3}>
      <SpanLabel>SUCCESS</SpanLabel> <Span>57.9 kB in 13830.018ms</Span>
    </Box>
    <Box pt={3}>
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
  </>
)

storiesOf('Elements', module).add('Terminal', () => (
  <Story name='Terminal' code={code}>
    <Text color='gray6' mb={2} fontSize={0}>
      {'<Terminal />'}
    </Text>
    <Terminal mb={4}>{cmd}</Terminal>

    <Text color='gray6' mb={2} fontSize={0}>
      {"<Terminal title='microlink' />"}
    </Text>
    <Terminal mb={4} title='microlink'>
      {cmd}
    </Terminal>

    <Text color='gray6' mb={2} fontSize={0}>
      {"<Terminal theme='dark' />"}
    </Text>
    <Terminal mb={4} title='microlink' theme='dark'>
      {cmd}
    </Terminal>

    <Text color='gray6' mb={2} fontSize={0}>
      {'<Terminal blinkCursor={false} />'}
    </Text>
    <Terminal blinkCursor={false}>{cliCode}</Terminal>
  </Story>
))
