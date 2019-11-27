import React, { useState, createElement } from 'react'
import noop from 'lodash/noop'

import ImagePlaceholder from './ImagePlaceholder'
import { template } from 'helpers'
import Image from './Image'

const LazyImage = ({
  lazy,
  lazyWidth,
  lazyHeight,
  onLoad,
  loading,
  ...props
}) => {
  const [isLoaded, setLoaded] = useState(false)
  props.src = template(props.src)

  if (!lazy) return createElement(Image, props)
  if (loading != null ? !loading : isLoaded) return createElement(Image, props)

  const handleLoad = event => {
    setLoaded(true)
    setTimeout(onLoad, 0, event)
  }

  const handleError = err => console.error('LazyImage:', err.message)

  return (
    <ImagePlaceholder
      width={isLoaded ? undefined : lazyWidth}
      height={isLoaded ? undefined : lazyHeight}
      {...props}
    >
      <Image
        {...props}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: !isLoaded && 'none' }}
      />
    </ImagePlaceholder>
  )
}

LazyImage.defaultProps = {
  onLoad: noop,
  lazy: true,
  lazyWidth: '100%',
  lazyHeight: '100%'
}

export default LazyImage
