import React, { useMemo, useState } from 'react'
import { Globe } from 'react-feather'
import { theme } from 'theme'
import { getApiUrl } from 'helpers/get-api-url'
import Box from '../Box'
import FeatherIcon from '../../icons/Feather'
import { StyledImage } from './styles'

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

export const MicrolinkLogo = ({ url, src, style, ...props }) => {
  const [hasError, setHasError] = useState(false)
  const [prevSource, setPrevSource] = useState({ src, url })

  if (prevSource.src !== src || prevSource.url !== url) {
    setPrevSource({ src, url })
    setHasError(false)
  }

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
