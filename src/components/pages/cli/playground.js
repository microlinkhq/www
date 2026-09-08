import React, { useRef } from 'react'

import Terminal from 'components/elements/Terminal/Terminal'

import { theme, toPx } from 'theme'

import { XTERM_SURFACE_CSS } from './shared'
import { PLAYGROUND_HEIGHT, useCliTerminal } from './use-cli-terminal'

import '@xterm/xterm/css/xterm.css'

const Playground = () => {
  const surfaceRef = useRef(null)
  useCliTerminal(surfaceRef)

  return (
    <Terminal
      title='microlink'
      autoHeight
      showFade={false}
      showAction={false}
      blinkCursor={false}
      css={theme({
        width: '100%',
        maxWidth: '100%',
        bg: 'black',
        borderColor: 'gray8',
        color: 'white90',
        '& > div:first-of-type': {
          bg: 'black'
        },
        '& > div:first-of-type *': {
          color: 'white70'
        }
      })}
      aria-label='Interactive Microlink CLI'
    >
      <div
        ref={surfaceRef}
        css={theme({
          width: '100%',
          height: toPx(PLAYGROUND_HEIGHT),
          minHeight: toPx(PLAYGROUND_HEIGHT),
          overflow: 'hidden',
          bg: 'black',
          ...XTERM_SURFACE_CSS
        })}
      />
    </Terminal>
  )
}

export default Playground
