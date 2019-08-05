import React, { useState, createElement } from 'react'
import { noop, isNil } from 'lodash'

import ImagePlaceholder from './ImagePlaceholder'
import Image from './Image'

const LazyImage = ({ lazyWidth, lazyHeight, onLoad, loading, ...props }) => {
  const [isLoaded, setLoaded] = useState(false)

  if (!isNil(loading) ? !loading : isLoaded) return createElement(Image, props)

  const _onLoad = event => {
    setLoaded(true)
    setTimeout(onLoad, 0)
  }

  return (
    <ImagePlaceholder
      width={isLoaded ? undefined : lazyWidth}
      height={isLoaded ? undefined : lazyHeight}
      {...props}
    >
      <Image {...props} onLoad={_onLoad} style={{ display: 'none' }} />
    </ImagePlaceholder>
  )
}

LazyImage.defaultProps = {
  onLoad: noop,
  lazyWidth: '100%',
  lazyHeight: '100%'
}

export default LazyImage
