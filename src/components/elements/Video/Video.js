import Box from '../Box'

import React from 'react'

const Video = props => (
  <Box as='video' controls autoPlay muted loop playsinline {...props} />
)

export default Video
