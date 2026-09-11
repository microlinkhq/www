import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'

export const Pane = ({ children, ...props }) => (
  <Flex
    css={theme({
      flexDirection: 'column',
      flex: 1,
      minWidth: 0,
      minHeight: 0,
      bg: 'white',
      border: 1,
      borderColor: 'black10',
      borderRadius: 5,
      boxShadow: 2,
      overflow: 'hidden'
    })}
    {...props}
  >
    {children}
  </Flex>
)

export const PaneBar = ({ children }) => (
  <Flex
    css={theme({
      flexShrink: 0,
      alignItems: 'center',
      gap: 2,
      px: 3,
      minHeight: '48px',
      borderBottom: 1,
      borderBottomColor: 'black05'
    })}
  >
    {children}
  </Flex>
)

export const PaneFooter = ({ children }) => (
  <Flex
    css={theme({
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 3,
      px: 3,
      minHeight: '44px',
      borderTop: 1,
      borderTopColor: 'black05',
      color: 'black60',
      fontSize: 0
    })}
  >
    {children}
  </Flex>
)

export const PaneBody = ({ children }) => (
  <Box
    css={theme({
      flex: 1,
      minHeight: 0,
      position: 'relative',
      overflow: 'hidden'
    })}
  >
    {children}
  </Box>
)
