import Image from 'components/elements/Image/Image'
import React from 'react'
import styled from 'styled-components'

import logoUri from '../../../static/logo.svg'

const StyledMicrolink = styled(Image.Component).withConfig({
  shouldForwardProp: prop =>
    !['isMobile', 'actively', 'event-location', 'event-name'].some(p =>
      prop.includes(p)
    )
})`
  width: inherit;
  height: inherit;
`

const Microlink = props => {
  return <StyledMicrolink alt='microlink logo' src={logoUri} {...props} />
}

Microlink.logoUri = logoUri

export default Microlink
