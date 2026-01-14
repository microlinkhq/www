import React, { useEffect, useRef, useState } from 'react'
import Placeholder from '../Placeholder/Placeholder'
import { theme } from 'theme'
import Box from '../Box'

export const Iframe = ({ width, height, ...props }) => {
  const iframeRef = useRef(null)
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(false)
  }, [props.src])

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
        target='_parent'
        css={theme({ width, height })}
        style={{
          opacity: isMounted ? 1 : 0,
          pointerEvents: isMounted ? 'auto' : 'none',
          aspectRatio: '16 / 9',
          border: 'none'
        }}
        {...props}
      />
    </Box>
  )
}
