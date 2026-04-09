import React, { useEffect, useMemo, useState } from 'react'
import Image from '../Image/Image'
import Box from '../Box'
import styled from 'styled-components'
import { theme } from 'theme'
import { Globe } from 'react-feather'
import FeatherIcon from '../../icons/Feather'
import { getApiUrl } from 'helpers/get-api-url'

const StyledImage = styled(Image)`
  max-width: inherit;
  height: 100%;
  ${theme({ borderRadius: 2 })};
`

const FallbackIcon = ({ style }) => (
  <Box
    aria-hidden='true'
    style={style}
    css={theme({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bg: 'gray0',
      color: 'black50',
      borderRadius: 2,
      border: 1,
      borderColor: 'black10',
      overflow: 'hidden'
    })}
  >
    <FeatherIcon icon={Globe} size={[1, 1, 1, 1]} />
  </Box>
)

const Unavatar = ({ query, ...props }) => {
  return (
    <StyledImage
      alt={`Logo for ${query}`}
      src={`https://unavatar.io/${query}?fallback=data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==`}
      {...props}
    />
  )
}

Unavatar.Microlink = ({ url, ...props }) => (
  <MicrolinkLogo url={url} {...props} />
)

const MicrolinkLogo = ({ url, src, style, ...props }) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false)
  }, [src, url])

  const logoSrc = useMemo(() => {
    if (src) return src
    if (!url) return ''

    try {
      return getApiUrl(url, { embed: 'logo.url' })[0]
    } catch (error) {
      return ''
    }
  }, [src, url])

  if (!logoSrc || hasError) {
    return <FallbackIcon style={style} />
  }

  return (
    <StyledImage
      alt={`Logo for ${url}`}
      src={logoSrc}
      style={style}
      onError={() => setHasError(true)}
      {...props}
    />
  )
}

export default Unavatar
