import React, { useRef, useEffect, useState } from 'react'
import Placeholder from '../Placeholder/Placeholder'
import { noop } from 'helpers/noop'
import { theme } from 'theme'
import Box from '../Box'

import { TERMINAL_WIDTH, TERMINAL_HEIGHT } from '../Terminal/Terminal'

export const Iframe = ({
  width = TERMINAL_WIDTH,
  height = TERMINAL_HEIGHT,
  onLoad = noop,
  ...props
}) => {
  const { src } = props

  const iframeRef = useRef(null)
  const [isVisible, setVisible] = useState(false)

  // Reset when src changes
  useEffect(() => {
    setVisible(false)
  }, [src])

  // Toggle as soon as iframe is mounted
  useEffect(() => {
    if (iframeRef.current) {
      setVisible(true)
    }
  }, [])

  // Optional telemetry only
  const handleLoad = e => {
    onLoad(e.currentTarget)
  }

  return (
    <Box position='relative' css={theme({ width, height })}>
      {!isVisible && (
        <Box position='absolute' inset={0} zIndex={1}>
          <Placeholder width={width} height={height} />
        </Box>
      )}

      <Box
        as='iframe'
        ref={iframeRef}
        onLoad={handleLoad} // best-effort only
        frameBorder='0'
        target='_parent'
        css={theme({ width, height })}
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
          aspectRatio: '16 / 9'
        }}
        {...props}
      />
    </Box>
  )
}
