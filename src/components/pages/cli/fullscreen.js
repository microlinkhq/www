import React, { useRef } from 'react'

import { Link } from 'components/elements/Link'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'

import { theme } from 'theme'

import { CLI_VERSION, XTERM_SURFACE_CSS } from './shared'
import { useCliTerminal } from './use-cli-terminal'

import '@xterm/xterm/css/xterm.css'

const DOCS_HREF = '/docs/sdk/getting-started/cli'

const Fullscreen = () => {
  const surfaceRef = useRef(null)
  useCliTerminal(surfaceRef, { attract: false })

  return (
    <Flex
      css={theme({
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flexDirection: 'column',
        overflow: 'hidden',
        bg: 'black'
      })}
    >
      <Text
        as='p'
        css={theme({
          flexShrink: 0,
          py: 3,
          px: [3, 3, 4, 4],
          fontSize: 1,
          lineHeight: 0,
          color: 'white60',
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'white10'
        })}
      >
        <Text as='span' css={theme({ fontSize: 'inherit', color: 'white' })}>
          Microlink CLI v{CLI_VERSION}
        </Text>{' '}
        in your browser. Type{' '}
        <span css={theme({ color: 'white' })}>--help</span> for commands.
        <LineBreak />
        Commands hit the live API. See products and flags in the{' '}
        <Link href={DOCS_HREF}>docs</Link>.
      </Text>
      <Box
        ref={surfaceRef}
        role='application'
        aria-label='Interactive Microlink CLI'
        css={theme({
          flex: 1,
          minHeight: 0,
          width: '100%',
          overflow: 'hidden',
          bg: 'black',
          p: [3, 3, 4, 4],
          ...XTERM_SURFACE_CSS
        })}
      />
    </Flex>
  )
}

export default Fullscreen
