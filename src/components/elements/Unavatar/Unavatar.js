import React from 'react'
import { UNAVATAR_TOKEN, UNAVATAR_FALLBACK } from 'helpers/unavatar'
import { MicrolinkLogo } from './MicrolinkLogo'
import { StyledImage } from './styles'

const Unavatar = ({ query, ...props }) => {
  return (
    <StyledImage
      alt={`Logo for ${query}`}
      src={`https://unavatar.io/${query}?token=${UNAVATAR_TOKEN}&fallback=${UNAVATAR_FALLBACK}`}
      {...props}
    />
  )
}

Unavatar.Microlink = MicrolinkLogo

export default Unavatar
