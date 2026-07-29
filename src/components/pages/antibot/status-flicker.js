import { theme } from 'theme'
import React from 'react'
import styled, { keyframes } from 'styled-components'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

const STATUSES = ['429 TOO_MANY_REQUESTS', '401 UNAUTHORIZED', '403 FORBIDDEN']

const flicker = keyframes`
  0%,
  32.9% {
    opacity: 1;
  }

  33%,
  100% {
    opacity: 0;
  }
`

const Flicker = styled.span`
  ${theme({ fontFamily: 'mono', fontWeight: 'bold', color: 'red7' })}
  display: inline-grid;
  font-variant-numeric: tabular-nums;
  min-width: 22ch;

  span {
    grid-area: 1 / 1;
    opacity: 0;
    animation: ${flicker} 3.6s steps(1, end) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    span {
      animation: none;
      opacity: 0;
    }

    span:first-child {
      opacity: 1;
    }
  }
`

const lineStyle = theme({
  fontFamily: 'sans',
  fontSize: [1, 1, 2, 2],
  lineHeight: 2,
  color: 'black80',
  m: 0
})

export const StatusFlicker = () => (
  <Box
    css={theme({
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      pb: [3, 3, 4, 4]
    })}
  >
    <Text as='p' css={lineStyle}>
      A request can experience{' '}
      <Flicker aria-label='429 Too Many Requests, 401 Unauthorized, or 403 Forbidden'>
        {STATUSES.map((status, index) => (
          <span
            key={status}
            aria-hidden='true'
            style={{ animationDelay: `${index * 1.2}s` }}
          >
            {status}
          </span>
        ))}
      </Flicker>
    </Text>
    <Text as='p' css={lineStyle}>
      Followed by a challenge page. A captcha. A JavaScript puzzle.
    </Text>
  </Box>
)
