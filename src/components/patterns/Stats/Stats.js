import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { theme } from 'theme'
import React from 'react'

export const Stat = ({ label, value }) => (
  <Box css={theme({ textAlign: 'center' })}>
    <Box
      as='span'
      css={theme({
        display: 'block',
        fontFamily: 'mono',
        fontSize: 3,
        fontWeight: 'bold',
        color: 'black',
        letterSpacing: '-.02em'
      })}
    >
      {value}
    </Box>
    <Box
      as='span'
      css={theme({
        fontFamily: 'sans',
        fontSize: '11px',
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: 'gray7'
      })}
    >
      {label}
    </Box>
  </Box>
)

export const StatRow = ({ mb, children }) => (
  <Flex
    css={theme({
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: 3,
      mb
    })}
  >
    {children}
  </Flex>
)
