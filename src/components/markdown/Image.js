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

export const Image = ({ containerCss, src, hoverSrc, ...props }) => {
  const [currentSrc, setCurrentSrc] = useState(src)

  const handleMouseEnter = () => {
    if (hoverSrc) setCurrentSrc(hoverSrc)
  }

  const handleMouseLeave = () => {
    if (hoverSrc) setCurrentSrc(src)
  }

  return (
    <ImageWithContainer
      containerProps={{ css: containerCss }}
      src={currentSrc}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  )
}
