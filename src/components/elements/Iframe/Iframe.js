import React, { createElement, useRef, useEffect, useState } from 'react'
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

  useEffect(() => {
    const iframe = inputEl.current
    if (iframe) {
      const handleLoad = () => {
        onLoad(iframe)
        setLoading(false)
      }

      const handleError = error => {
        console.error(`Iframe error for ${iframe.src}:`, error)
        onError(error)
        setLoading(false)
      }

      iframe.addEventListener('load', handleLoad)
      iframe.addEventListener('error', handleError)

      return () => {
        iframe.removeEventListener('load', handleLoad)
        iframe.removeEventListener('error', handleError)
      }
    }
  }, [onLoad, onError])

  const iframe = (
    <Flex
      as='iframe'
      ref={inputEl}
      style={isLoading ? { display: 'none' } : undefined}
      frameBorder='0'
      target='_parent'
      css={theme({ maxWidth, width, height })}
      {...props}
    />
  )

  return isLoading
    ? createElement(Placeholder, { width, height, maxWidth, ...props }, iframe)
    : iframe
}

export default Iframe
