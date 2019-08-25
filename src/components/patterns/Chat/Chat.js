import React from 'react'

import { Flex } from 'components/elements'

export default ({ large }) => {
  const iframeUrl = large
    ? 'https://chat.microlink.io/iframe/dialog?large=true'
    : 'https://chat.microlink.io/iframe/dialog'

  const style = large
    ? { width: '350px', height: '350px' }
    : { width: '250px', height: '250px' }

  return (
    <Flex justifyContent='center' mr='auto' ml='auto'>
      <iframe
        title='Chat'
        frameBorder='0'
        target='_parent'
        src={iframeUrl}
        style={style}
      />
    </Flex>
  )
}
