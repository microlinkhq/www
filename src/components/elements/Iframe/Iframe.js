import React, { useEffect, useRef, useState } from 'react'
import Box from '../Box'
import Placeholder from '../Placeholder/Placeholder'
import { theme } from 'theme'

export const Iframe = ({ src, width, height }) => {
  const iframeRef = useRef(null)
  const [isMounted, setMounted] = useState(false)

  // Reset when src changes
  useEffect(() => {
    setMounted(false)
  }, [src])

  // Consider "ready to show" as soon as iframe exists in the DOM
  useEffect(() => {
    if (iframeRef.current) {
      setMounted(true)
    }
  }, [])

  return (
    <Box position='relative' css={theme({ width, height })}>
      {!isMounted && (
        <Box position='absolute' inset={0} zIndex={1}>
          <Placeholder width={width} height={height} />
        </Box>
      )}

      <Box
        as='iframe'
        ref={iframeRef}
        src={src}
        frameBorder='0'
        target='_parent'
        css={theme({ width, height })}
        style={{
          opacity: isMounted ? 1 : 0,
          pointerEvents: isMounted ? 'auto' : 'none',
          aspectRatio: '16 / 9'
        }}
      />
    </Box>
  )
}
