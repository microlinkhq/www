import React, { useRef, useEffect, useState } from 'react'
import Placeholder from '../Placeholder/Placeholder'
import { noop } from 'helpers/noop'
import { theme } from 'theme'
import Box from '../Box'

import { TERMINAL_WIDTH, TERMINAL_HEIGHT } from '../Terminal/Terminal'

const isPdf = src => /\.pdf($|\?)/i.test(src)

const isYouTube = src => /youtube-nocookie\.com/.test(src)

export const Iframe = ({
  width = TERMINAL_WIDTH,
  height = TERMINAL_HEIGHT,
  onLoad = noop,
  ...props
}) => {
  const { src } = props
  const [isLoading, setLoading] = useState(true)
  const loadedRef = useRef(false)

  useEffect(() => {
    loadedRef.current = false
    setLoading(!isPdf(src) && !isYouTube(src))
  }, [src])

  const handleLoad = e => {
    if (loadedRef.current) return
    loadedRef.current = true
    onLoad(e.currentTarget)
    setLoading(false)
  }

  return (
    <Placeholder data-debug css={theme({ width, height })}>
      <Box
        as='iframe'
        onLoad={handleLoad}
        style={{
          opacity: isLoading ? 0 : 1,
          pointerEvents: isLoading ? 'none' : 'auto',
          aspectRatio: '16 / 9'
        }}
        frameBorder='0'
        target='_parent'
        css={theme({ width, height })}
        {...props}
      />
    </Placeholder>
  )
}
