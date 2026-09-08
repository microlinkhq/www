import React, { useRef } from 'react'

import Terminal from 'components/elements/Terminal/Terminal'

import { theme } from 'theme'

import { PLAYGROUND_HEIGHT, useCliTerminal } from './use-cli-terminal'

import '@xterm/xterm/css/xterm.css'

const Playground = () => {
  const surfaceRef = useRef(null)
  useCliTerminal(surfaceRef)
  const height = PLAYGROUND_HEIGHT

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
        },
        '& .xterm-rows > div > span': {
          padding: 0
        }
      })}
      aria-label='Interactive Microlink CLI'
    >
      <div
        ref={surfaceRef}
        css={theme({
          width: '100%',
          height: `${height}px`,
          minHeight: `${height}px`,
          overflow: 'hidden',
          bg: 'black',
          '& .xterm': { height: '100%' },
          '& .xterm span': {
            padding: 0
          },
          '& .xterm-viewport': {
            overflowY: 'auto',
            bg: 'black'
          }
        })}
      />
    </Terminal>
  )
}

export default Playground
