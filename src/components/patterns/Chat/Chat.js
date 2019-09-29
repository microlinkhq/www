import React from 'react'

import { Iframe } from 'components/elements'

export default ({ large }) => {
  const iframeUrl = large
    ? 'https://chat.microlink.io/iframe/dialog?large=true'
    : 'https://chat.microlink.io/iframe/dialog'

  const style = large
    ? { width: '350px', height: '350px' }
    : { width: '250px', height: '250px' }

  return (
    <Iframe
      justifyContent='center'
      mr='auto'
      ml='auto'
      title='Chat'
      src={iframeUrl}
      style={style}
    />
  )
}
