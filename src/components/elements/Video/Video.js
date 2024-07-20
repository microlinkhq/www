import Box from '../Box'

import React from 'react'

const Video = props => (
  <Box as='video' controls autoPlay muted loop playsInline {...props} />
)

export default Video
