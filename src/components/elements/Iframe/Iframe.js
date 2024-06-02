import React, { createElement, useRef, useEffect, useState } from 'react'
import { aspectRatio, noop } from 'helpers'
import { theme } from 'theme'

import Placeholder from '../Placeholder/Placeholder'
import Flex from '../Flex'

const Iframe = ({
  loading = true,
  width = aspectRatio.width,
  height = aspectRatio.height,
  onLoad = noop,
  children,
  ...props
}) => {
  const [isLoading, setLoading] = useState(loading)

  const inputEl = useRef(null)
  const setLoaded = () => setLoading(false)

  useEffect(() => {
    if (inputEl.current) {
      const iframe = inputEl.current
      if (iframe) {
        iframe.addEventListener('load', () => {
          onLoad(iframe)
          setLoaded()
        })
        return () => iframe.removeEventListener('load', setLoaded)
      }
    }
  }, [onLoad])

  const iframe = (
    <Flex
      as='iframe'
      ref={inputEl}
      style={isLoading ? { display: 'none' } : undefined}
      frameBorder='0'
      target='_parent'
      css={theme({ width, height })}
      {...props}
    />
  )

  return isLoading
    ? createElement(Placeholder, { width, height, ...props }, iframe)
    : iframe
}

export default Iframe
