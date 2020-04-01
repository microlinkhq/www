import React, { useRef, useEffect, useState } from 'react'
import noop from 'lodash/noop'

import Flex from '../Flex'
import CodeEditor from '../CodeEditor/CodeEditor'
import ImagePlaceholder from '../Image/ImagePlaceholder'

export default ({
  width = CodeEditor.width,
  height = CodeEditor.height,
  onLoading = noop,
  onLoaded = noop,
  ...props
}) => {
  const inputEl = useRef(null)
  const [isLoading, setLoading] = useState(true)

  const setLoaded = () => {
    setLoading(false)
    onLoaded()
  }

  useEffect(() => {
    if (inputEl.current) {
      const iframe = inputEl.current
      if (iframe) {
        onLoading()
        iframe.addEventListener('load', setLoaded)
        return () => iframe.removeEventListener('load', setLoaded)
      }
    }
  }, [])

  if (isLoading) {
    return <ImagePlaceholder width={width} height={height} {...props} />
  }

  return (
    <Flex
      as='iframe'
      ref={inputEl}
      css={`
        display: ${isLoading ? 'none' : 'inherit'};
      `}
      mx='auto'
      frameBorder='0'
      target='_parent'
      height={height}
      width={width}
      {...props}
    />
  )
}
