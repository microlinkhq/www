import React, { createElement, useMemo } from 'react'
import { Image } from 'components/elements'
import styled from 'styled-components'
import { getDomain } from 'tldts'

import demoLinks from '../../../../data/demo-links'

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
      alt={`${query} logo`}
      src={`https://unavatar.io/microlink/${query}`}
      {...props}
    />
  )
}

Unavatar.Microlink = ({ embedUrl, url, ...props }) => {
  const domain = useMemo(() => getDomain(url), [url])
  const demoLink = demoLinks.find(({ data }) => getDomain(data.url) === domain)

  return (
    <StyledImage
      alt={`${domain} logo`}
      src={demoLink ? demoLink.data.logo.url : embedUrl}
      {...props}
    />
  )
}

const UnavatarBase = ({ provider, ...props }) =>
  createElement(provider === 'microlink' ? Unavatar.Microlink : Unavatar, props)

export default UnavatarBase
