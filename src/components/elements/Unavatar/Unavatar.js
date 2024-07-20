import React, { createElement } from 'react'
import { Image } from 'components/elements'
import styled from 'styled-components'
import { theme } from 'theme'

const StyledImage = styled(Image)`
  max-width: inherit;
  height: 100%;
  ${theme({ borderRadius: 2 })};
`

const Unavatar = ({ query, ...props }) => {
  return (
    <StyledImage
      alt={`Logo for ${query}`}
      src={`https://unavatar.io/${query}`}
      {...props}
    />
  )
}

const UnavatarMicrolink = ({ url, ...props }) => (
  <StyledImage alt={`Logo for ${url}`} {...props} />
)

Unavatar.Microlink = UnavatarMicrolink

const UnavatarBase = ({ provider, ...props }) =>
  createElement(provider === 'microlink' ? Unavatar.Microlink : Unavatar, props)

export default UnavatarBase
