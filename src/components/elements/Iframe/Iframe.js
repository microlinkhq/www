import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { aspectRatio } from 'helpers'

import Placeholder from '../Placeholder/Placeholder'
import Flex from '../Flex'

const AspectRatioPlaceHolder = styled(Placeholder)``

AspectRatioPlaceHolder.defaultProps = {
  width: aspectRatio.width,
  height: aspectRatio.height
}

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

  return (
    <Placeholder width={width} height={height} {...props}>
      <Flex
        as='iframe'
        ref={inputEl}
        style={{ display: isLoading ? 'none' : 'inherit' }}
        mx='auto'
        frameBorder='0'
        target='_parent'
        width={width}
        height={height}
        {...props}
      />
    </Placeholder>
  )
}
