import React, { useRef, useEffect, useState } from 'react'
import { aspectRatio } from 'helpers'

import Placeholder from '../Placeholder/Placeholder'
import Flex from '../Flex'

export default ({
  width = aspectRatio.width,
  height = aspectRatio.height,
  loading = true,
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
        iframe.addEventListener('load', setLoaded)
        return () => iframe.removeEventListener('load', setLoaded)
      }
    }
  }, [])

  const iframe = (
    <Flex
      as='iframe'
      ref={inputEl}
      style={{ display: isLoading ? 'none' : 'inherit' }}
      frameBorder='0'
      target='_parent'
      width={width}
      height={height}
      {...props}
    />
  )

  return isLoading ? (
    <Placeholder width={width} height={height} {...props}>
      {iframe}
    </Placeholder>
  ) : (
    iframe
  )
}
