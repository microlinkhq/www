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
  children,
  ...props
}) => {
  const { src } = props
  const [isLoading, setLoading] = useState(true)
  const inputEl = useRef(null)
  const onLoadRef = useRef(onLoad)
  const loadedRef = useRef(false)

  useEffect(() => {
    loadedRef.current = false
    setLoading(!isPdf(src) && !isYouTube(src))
  }, [src])

  useEffect(() => {
    onLoadRef.current = onLoad
  }, [onLoad])

  useEffect(() => {
    const iframe = inputEl.current
    if (!iframe) return
    if (loadedRef.current) return

    const handleLoad = () => {
      if (loadedRef.current) return
      loadedRef.current = true
      onLoadRef.current(iframe)
      setLoading(false)
    }

    iframe.addEventListener('load', handleLoad)
    return () => iframe.removeEventListener('load', handleLoad)
  }, [])

  const iframe = (
    <Box
      as='iframe'
      ref={inputEl}
      style={
        isLoading
          ? { display: 'none' }
          : {
            height: 'auto',
            aspectRatio: '16 / 9'
          }
      }
      frameBorder='0'
      target='_parent'
      css={theme({ width, height })}
      {...props}
    />
  )

  return isLoading ? (
    <Placeholder css={theme({ width, height })}>{iframe}</Placeholder>
  ) : (
    iframe
  )
}
