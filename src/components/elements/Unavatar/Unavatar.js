import React, { createElement } from 'react'
import { Image } from 'components/elements'
import styled from 'styled-components'

const StyledImage = styled(Image)`
  max-width: inherit;
`

StyledImage.defaultProps = {
  borderRadius: 2,
  height: '100%'
}

const Unavatar = ({ query, ...props }) => {
  return (
    <StyledImage
      alt={`Logo for ${query}`}
      src={`https://unavatar.io/${query}`}
      {...props}
    />
  )
}

const UnavatarMicrolink = props => (
  <StyledImage alt={`Logo for ${props.url}`} {...props} />
)

Unavatar.Microlink = UnavatarMicrolink

const UnavatarBase = ({ provider, ...props }) =>
  createElement(provider === 'microlink' ? Unavatar.Microlink : Unavatar, props)

export default UnavatarBase
