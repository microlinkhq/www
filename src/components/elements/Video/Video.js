import Box from '../Box'
import styled from 'styled-components'
import React from 'react'

const StyledVideo = styled(Box)`
  @media (prefers-reduced-motion: reduce) {
    &[autoplay] {
      animation: none;
    }
  }
`

const Video = ({
  autoPlay = true,
  preload = 'metadata',
  'aria-label': ariaLabel,
  title,
  ...props
}) => (
  <StyledVideo
    as='video'
    controls
    autoPlay={autoPlay}
    muted
    loop
    playsInline
    preload={preload}
    aria-label={ariaLabel || title}
    title={title}
    {...props}
  />
)

export default Video
