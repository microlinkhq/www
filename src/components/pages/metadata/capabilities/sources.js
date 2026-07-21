import React from 'react'
import styled from 'styled-components'
import { borders, colors, theme } from 'theme'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'

const SOCIAL_PROVIDERS = [
  { key: 'opengraph', label: 'Open Graph' },
  { key: 'twitter', label: 'Twitter Cards' },
  { key: 'jsonld', label: 'JSON-LD' },
  { key: 'oembed', label: 'oEmbed' },
  { key: 'microdata', label: 'Microdata' },
  { key: 'html', label: 'HTML' }
]

const SourceBadge = styled('span')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    px: 2,
    py: 1,
    borderRadius: 4,
    bg: 'white',
    fontFamily: 'mono',
    fontSize: 0,
    color: 'black70',
    fontWeight: 'bold'
  })};
  border: ${borders[1]} ${colors.black10};
`

export const SourcesRow = () => (
  <Flex
    css={theme({
      pt: [3, 3, 4, 4],
      alignItems: 'center',
      gap: 2,
      flexWrap: 'wrap'
    })}
  >
    <Caps
      css={theme({
        fontSize: 0,
        fontWeight: 'bold',
        color: 'black60',
        letterSpacing: 2,
        pr: 2
      })}
    >
      Sources merged
    </Caps>
    {SOCIAL_PROVIDERS.map(({ key, label }) => (
      <SourceBadge key={key}>{label}</SourceBadge>
    ))}
  </Flex>
)
