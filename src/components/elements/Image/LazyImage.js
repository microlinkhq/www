import React, { useState, createElement } from 'react'
import { noop, isNil } from 'lodash'

import ImagePlaceholder from './ImagePlaceholder'
import Image from './Image'

const LazyImage = ({ lazy, loading, ...props }) => {
  const [isLoaded, setLoaded] = useState(false)

  if (!isNil(loading) ? !loading : isLoaded) return createElement(Image, props)

  const onLoad = event => {
    setLoaded(true)
    props.onLoad(event)
  }

  return (
    <ImagePlaceholder {...props}>
      <Image {...props} onLoad={onLoad} style={{ display: 'none' }} />
    </ImagePlaceholder>
  )
}

LazyImage.defaultProps = {
  onLoad: noop
}

export default LazyImage
