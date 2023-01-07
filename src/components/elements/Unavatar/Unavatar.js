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

const UnavatarMicrolink = ({ iconUrl, fallbackUrl, url, ...props }) => {
  const domain = useMemo(() => getDomain(url), [url])
  const src = useMemo(() => {
    if (iconUrl) return iconUrl
    const demoLink = demoLinks.find(
      ({ data }) => getDomain(data.url) === domain
    )
    return demoLink ? demoLink.data.logo.url : fallbackUrl
  }, [domain, iconUrl, fallbackUrl])

  return <StyledImage alt={`${domain} logo`} src={src} {...props} />
}

Unavatar.Microlink = UnavatarMicrolink

const UnavatarBase = ({ provider, ...props }) =>
  createElement(provider === 'microlink' ? Unavatar.Microlink : Unavatar, props)

export default UnavatarBase
