import React, { useRef, useEffect, useState } from 'react'
import Placeholder from '../Placeholder/Placeholder'
import { noop } from 'helpers/noop'
import { theme } from 'theme'
import Box from '../Box'

import { TERMINAL_WIDTH, TERMINAL_HEIGHT } from '../Terminal/Terminal'

export const Iframe = ({
  loading = true,
  width = TERMINAL_WIDTH,
  height = TERMINAL_HEIGHT,
  onLoad = noop,
  children,
  ...props
}) => {
  const [isLoading, setLoading] = useState(loading)
  const inputEl = useRef(null)
  const onLoadRef = useRef(onLoad)

  useEffect(() => {
    onLoadRef.current = onLoad
  }, [onLoad])

  useEffect(() => {
    const iframe = inputEl.current
    if (!iframe) return

    const handleLoad = () => {
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

  return isLoading
    ? (
      <Placeholder css={theme({ width, height })}>{iframe}</Placeholder>
      )
    : (
        iframe
      )
}
