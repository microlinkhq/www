import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

import Box from '../Box'
import CodeEditor from '../CodeEditor/CodeEditor'
import Placeholder from '../Placeholder/Placeholder'

const IframeWrapper = styled(Box)`
  iframe {
    margin: auto;
  }
`

const IframeInline = ({
  width = CodeEditor.width,
  height = CodeEditor.height,
  ...props
}) => {
  const inputEl = useRef(null)
  const [isLoading, setLoading] = useState(true)
  const setLoaded = () => setLoading(false)

  useEffect(() => {
    if (inputEl.current) {
      const iframe = inputEl.current.querySelector('iframe')
      if (iframe) {
        iframe.addEventListener('load', setLoaded)
        return () => iframe.removeEventListener('load', setLoaded)
      }
    }
  }, [])

  return (
    <>
      {isLoading ? <Placeholder width={width} height={height} /> : null}
      <IframeWrapper
        ref={inputEl}
        style={{ display: isLoading && 'none' }}
        width={width}
        {...props}
      />
    </>
  )
}

export default IframeInline
