import React, { useState, createElement } from 'react'
import ImagePlaceholder from './ImagePlaceholder'
import Image from './Image'
import { isNil } from 'lodash'

const LazyImage = ({ lazy, loading, ...props }) => {
  const [isLoaded, setLoaded] = useState(false)

  if (!isNil(loading) ? !loading : isLoaded) return createElement(Image, props)

  const onLoad = () => setLoaded(true)

  return (
    <ImagePlaceholder {...props}>
      <Image {...props} onLoad={onLoad} style={{ display: 'none' }} />
    </ImagePlaceholder>
  )
}

export default LazyImage
