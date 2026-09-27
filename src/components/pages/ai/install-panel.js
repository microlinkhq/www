import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

import { AgentNames } from './agent-names'
import { INSTALL_PROMPT } from './shared'

export const InstallPanel = () => (
  <Box
    css={theme({
      fontFamily: 'sans',
      px: [3, 4],
      py: [3, 4],
      textAlign: 'left',
      whiteSpace: 'normal'
    })}
  >
    <Text
      css={theme({
        color: 'black',
        fontSize: 1,
        fontWeight: 'regular',
        lineHeight: 2
      })}
    >
      Paste this into your agent.
    </Text>
    <Text
      css={theme({
        mt: 1,
        color: 'black60',
        fontSize: 0,
        lineHeight: 2
      })}
    >
      <AgentNames />, or any agent that loads skills.
    </Text>
    <Box
      css={theme({
        mt: 3,
        px: 3,
        py: 3,
        bg: 'gray1',
        border: 1,
        borderColor: 'black10',
        borderRadius: 2,
        overflow: 'auto'
      })}
    >
      <Text
        as='pre'
        css={theme({
          color: 'black80',
          fontFamily: 'mono',
          fontSize: 0,
          lineHeight: 2,
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap'
        })}
      >
        {INSTALL_PROMPT}
      </Text>
    </Box>
    <Text
      css={theme({
        mt: 3,
        color: 'black60',
        fontSize: 0,
        hyphens: 'none'
      })}
    >
      One skill. It covers every Microlink product.
    </Text>
  </Box>
)
