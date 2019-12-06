import { useState, createElement, useEffect } from 'react'
import { aspectRatio, template } from 'helpers'
import noop from 'lodash/noop'

import ImagePlaceholder from './ImagePlaceholder'
import Image from './Image'

const LazyImage = ({ lazy, loading, src: rawSrc, onError, ...props }) => {
  const src = template(rawSrc)

  if (!lazy) return createElement(Image, { src, ...props })
  const [isLoading, setLoading] = useState(loading)

  useEffect(() => {
    const img = document.createElement('img')
    img.onerror = onError
    img.onload = () => {
      console.log('loaded!')
      img.onload = null
      img.onerror = null
      setLoading(false)
    }
    img.src = src
  }, [])

  const Component = isLoading ? ImagePlaceholder : Image
  return createElement(Component, { src, ...props })
}

LazyImage.defaultProps = {
  onError: noop,
  lazy: true,
  loading: true,
  width: aspectRatio.width
  // height: aspectRatio.height
  // height: '100%'
}

export default LazyImage
