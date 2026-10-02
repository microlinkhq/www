import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

const MUTED = 'gray5'

const Mono = styled(Text).attrs({ as: 'span' })`
  ${theme({ fontFamily: 'mono' })};
`

const ServerTiming = ({ bars, maxHeight }) =>
  bars.length === 0
    ? (
      <Box css={theme({ p: 4 })}>
        <Mono css={theme({ fontSize: 0, color: MUTED })}>
          No server-timing header on this response.
        </Mono>
      </Box>
      )
    : (
      <Box
        css={theme({
          p: 3,
          ...(maxHeight ? { maxHeight, overflow: 'auto' } : {})
        })}
      >
        {bars.map((b, index) => (
          <Box key={`${b.name}-${index}`} css={theme({ mb: 3 })}>
            <Flex
              css={theme({
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2
              })}
            >
              <Mono css={theme({ fontSize: 0, color: 'black' })}>{b.name}</Mono>
              <Mono css={theme({ fontSize: 0, color: MUTED })}>
                {b.dur} ({b.share})
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
                  width: b.width,
                  bg: b.color
                })}
              />
            </Box>
          </Box>
        ))}
      </Box>
      )

export default ServerTiming
