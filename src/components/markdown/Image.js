import styled from 'styled-components'
import { theme, layout } from 'theme'
import { withContainer } from 'helpers/hoc/with-container'
import ImageBase from 'components/elements/Image/Image'
import React, { useState } from 'react'

const _ImageBase = styled(ImageBase)(
  theme({
    borderRadius: '3px',
    textAlign: 'center',
    transition: 'opacity 0.2s ease'
  })
)

const ImageWithContainer = withContainer(_ImageBase, {
  css: {
    maxWidth: layout.small,
    display: 'flex',
    justifyContent: 'center'
  }
})

export const Image = ({ src, hoverSrc, ...props }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <ImageWithContainer
      src={isHovered && hoverSrc ? hoverSrc : src}
      onMouseEnter={hoverSrc ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverSrc ? () => setIsHovered(false) : undefined}
      {...props}
    />
  )
}
