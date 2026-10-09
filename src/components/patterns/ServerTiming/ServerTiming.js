import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { theme } from 'theme'
import React from 'react'

const MUTED = 'gray5'

const Mono = ({ color, children }) => (
  <Text as='span' css={theme({ fontFamily: 'mono', fontSize: 0, color })}>
    {children}
  </Text>
)

const TimingRow = ({ bar }) => (
  <Box css={theme({ mb: 3 })}>
    <Flex
      css={theme({
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2
      })}
    >
      <Mono color='black'>{bar.name}</Mono>
      <Mono color={MUTED}>
        {bar.dur} ({bar.share})
      </Mono>
    </Flex>
    <Box
      css={theme({
        height: '8px',
        borderRadius: '999px',
        bg: 'gray1',
        overflow: 'hidden'
      })}
    >
      <Box
        css={theme({
          height: '100%',
          borderRadius: '999px',
          width: bar.width,
          bg: bar.color
        })}
      />
    </Box>
  </Box>
)

const ServerTiming = ({ bars, maxHeight }) => {
  if (bars.length === 0) {
    return (
      <Box css={theme({ p: 4 })}>
        <Mono color={MUTED}>No server-timing header on this response.</Mono>
      </Box>
    )
  }

  return (
    <Box
      css={theme({
        p: 3,
        ...(maxHeight ? { maxHeight, overflow: 'auto' } : {})
      })}
    >
      {bars.map((bar, index) => (
        <TimingRow key={`${bar.name}-${index}`} bar={bar} />
      ))}
    </Box>
  )
}

export default ServerTiming
