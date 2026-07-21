import React from 'react'
import styled from 'styled-components'
import { borders, colors, shadows, space, theme } from 'theme'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'

const PaletteChip = styled('span')`
  ${theme({ width: space[3], height: space[3], borderRadius: '50%' })};
  display: inline-block;
  background: ${({ $color }) => $color};
  border: ${borders[1]} ${colors.black10};
  box-shadow: ${shadows[1]};
`

const LogoThumb = styled('span')`
  ${theme({
    display: 'inline-block',
    width: space[4],
    height: space[4],
    borderRadius: '50%',
    bg: 'white'
  })};
  background-image: ${({ $src }) => `url(${$src})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: ${borders[1]} ${colors.black10};
  box-shadow: ${shadows[1]};
  flex-shrink: 0;
`

export const toColor = entry => {
  if (!entry) return null
  if (typeof entry === 'string') return entry
  if (Array.isArray(entry)) return `rgb(${entry.join(',')})`
  return entry.color || entry.rgb || null
}

export const extractPalette = data => {
  if (!data) return []
  const candidates = [
    data.palette,
    data.image?.palette,
    data.logo?.palette
  ].filter(Boolean)
  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length) return candidate
  }
  return []
}

export const extractLogoUrl = data => {
  if (!data) return null
  const logo = data.logo
  if (!logo) return null
  if (typeof logo === 'string') return logo
  return logo.url || null
}

export const BrandRow = ({ palette, logoUrl }) => (
  <Flex
    css={theme({
      pt: [3, 3, 4, 4],
      alignItems: 'center',
      gap: 2,
      flexWrap: 'wrap'
    })}
    aria-label='Detected brand logo and palette'
  >
    {logoUrl && (
      <>
        <Caps
          css={theme({
            fontSize: 0,
            fontWeight: 'bold',
            color: 'black60',
            letterSpacing: 2,
            pr: 2
          })}
        >
          Logo
        </Caps>
        <LogoThumb
          $src={logoUrl}
          role='img'
          aria-label='Detected logo'
          title={logoUrl}
        />
      </>
    )}
    {palette.length > 0 && (
      <>
        <Caps
          css={theme({
            fontSize: 0,
            fontWeight: 'bold',
            color: 'black60',
            letterSpacing: 2,
            pl: logoUrl ? 3 : 0,
            pr: 2
          })}
        >
          Palette
        </Caps>
        {palette.map(color => (
          <PaletteChip
            key={color}
            $color={color}
            aria-label={`Detected color ${color}`}
          />
        ))}
      </>
    )}
  </Flex>
)
