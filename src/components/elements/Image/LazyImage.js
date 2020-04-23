import { useState, createElement, useEffect } from 'react'
import { template } from 'helpers'
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
      img.onload = null
      img.onerror = null
      setLoading(false)
    }
    img.src = src
  }, [])

  const Component = isLoading ? ImagePlaceholder : Image

  const height =
    typeof props.height === 'function' ? props.height(isLoading) : props.height

  const width =
    typeof props.width === 'function' ? props.width(isLoading) : props.width

  const style =
    typeof props.style === 'function' ? props.style(isLoading) : props.style

  return createElement(Component, { src, ...props, height, width, style })
}

LazyImage.defaultProps = {
  onError: noop,
  lazy: true,
  loading: true,
  width: '100%'
}

export default LazyImage
