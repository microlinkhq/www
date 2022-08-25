import React from 'react'
import { Image } from 'components/elements'
import styled from 'styled-components'

const StyledImage = styled(Image.Component)`
  max-width: inherit;
`

const Unavatar = ({ query, ...props }) => (
  <StyledImage
    borderRadius={2}
    src={`https://unavatar.io/${query}`}
    height='100%'
    {...props}
  />
)

export default Unavatar
