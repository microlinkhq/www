import styled from 'styled-components'
import { theme, layout } from 'theme'
import { withContainer } from 'helpers/hoc/with-container'
import ImageBase from 'components/elements/Image/Image'
import React, { useState } from 'react'

const StyledImage = styled(ImageBase)(
  theme({
    borderRadius: '3px'
  })
)

const SwapInPlace = styled('div')`
  --icon-swap-start-scale: 1;
`

const containerProps = {
  css: {
    maxWidth: layout.small,
    display: 'flex',
    justifyContent: 'center'
  }
}

const ImageWithContainer = withContainer(StyledImage, containerProps)

const HoverSwapImage = ({ src, hoverSrc, ...props }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <SwapInPlace
      className='t-icon-swap'
      data-state={isHovered ? 'b' : 'a'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledImage className='t-icon' data-icon='a' src={src} {...props} />
      <StyledImage className='t-icon' data-icon='b' src={hoverSrc} {...props} />
    </SwapInPlace>
  )
}

const HoverSwapImageWithContainer = withContainer(
  HoverSwapImage,
  containerProps
)

export const Image = props => {
  if (props.hoverSrc) return <HoverSwapImageWithContainer {...props} />
  return <ImageWithContainer {...props} />
}
