import React, { useRef, useEffect, useState } from 'react'
import { aspectRatio } from 'helpers/aspect-ratio'
import { noop } from 'helpers/noop'
import { theme } from 'theme'

import Placeholder from '../Placeholder/Placeholder'
import Flex from '../Flex'

const Iframe = ({
  loading = true,
  maxWidth,
  width = aspectRatio.width,
  height = aspectRatio.height,
  onLoad = noop,
  onError = noop,
  children,
  ...props
}) => {
  const [isLoading, setLoading] = useState(loading)
  const inputEl = useRef(null)

  const onLoadRef = useRef(onLoad)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onLoadRef.current = onLoad
    onErrorRef.current = onError
  }, [onLoad, onError])

  useEffect(() => {
    const iframe = inputEl.current
    if (!iframe) return

    const handleLoad = () => {
      onLoadRef.current(iframe)
      setLoading(false)
    }

    const handleError = error => {
      console.error(`Iframe error for ${iframe.src}:`, error)
      onErrorRef.current(error)
      setLoading(false)
    }

    iframe.addEventListener('load', handleLoad)
    iframe.addEventListener('error', handleError)

    return () => {
      iframe.removeEventListener('load', handleLoad)
      iframe.removeEventListener('error', handleError)
    }
  }, [])

  const iframe = (
    <Flex
      as='iframe'
      ref={inputEl}
      style={
        isLoading
          ? {
              opacity: 0,
              visibility: 'hidden',
              position: 'absolute',
              pointerEvents: 'none'
            }
          : undefined
      }
      frameBorder='0'
      target='_parent'
      css={theme({ maxWidth, width, height })}
      {...props}
    />
  )

  return isLoading
    ? (
      <Placeholder width={width} height={height} maxWidth={maxWidth}>
        {iframe}
      </Placeholder>
      )
    : (
        iframe
      )
}

export default Iframe
