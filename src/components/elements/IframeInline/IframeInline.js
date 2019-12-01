import React, { useRef, useEffect, useState } from 'react'
import { Box, ImagePlaceholder } from 'components/elements'
import { toPx } from 'theme'

export const MAX_WIDTH_IFRAME = [380, 380, 500, 500].map(toPx)
export const MAX_HEIGHT_IFRAME = [382 * (7 / 9), 382 * (7 / 9), 382, 382].map(
  toPx
)

const IframeInline = ({
  lazyWidth = MAX_WIDTH_IFRAME,
  lazyHeight = MAX_HEIGHT_IFRAME,
  width = MAX_WIDTH_IFRAME,
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
      {isLoading ? (
        <ImagePlaceholder width={lazyWidth} height={lazyHeight} />
      ) : null}
      <Box
        ref={inputEl}
        style={{ display: isLoading && 'none' }}
        width={width}
        {...props}
      />
    </>
  )
}

IframeInline.MAX_WIDTH_IFRAME = MAX_WIDTH_IFRAME
IframeInline.MAX_HEIGHT_IFRAME = MAX_HEIGHT_IFRAME

export default IframeInline
