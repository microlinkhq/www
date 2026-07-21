import React, { useState, useRef } from 'react'
import { SECTION_VERTICAL_SPACING, theme } from 'theme'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { FIRST_URL, HERO_LAYOUT } from '../shared'
import { toColor, extractPalette, extractLogoUrl } from './palette'
import { CapabilitiesIntro } from './intro'
import { CapabilitiesPreview } from './preview'

export const Capabilities = ({ currentUrl, currentData }) => {
  const [capCopied, setCapCopied] = useState(false)
  const capCopyTimerRef = useRef(null)

  const capApiUrl = `https://api.microlink.io?meta&palette&url=${
    currentUrl || FIRST_URL
  }`

  const handleCapCopy = () => {
    const markCopied = () => {
      setCapCopied(true)
      if (capCopyTimerRef.current) clearTimeout(capCopyTimerRef.current)
      capCopyTimerRef.current = setTimeout(() => setCapCopied(false), 1500)
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(capApiUrl)
        .then(markCopied)
        .catch(() => {})
    }
  }

  const palette = extractPalette(currentData)
    .flatMap(entry => {
      const color = toColor(entry)
      return color ? [color] : []
    })
    .slice(0, 6)
  const logoUrl = extractLogoUrl(currentData)

  return (
    <Container
      id='capabilities'
      as='section'
      css={theme({
        alignItems: 'center',
        maxWidth: '100%',
        bg: 'pinky',
        px: [3, 3, 4, 5],
        py: SECTION_VERTICAL_SPACING
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: HERO_LAYOUT.maxWidth,
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: [4, 4, 5, HERO_LAYOUT.gap[3]]
        })}
      >
        <CapabilitiesPreview
          currentUrl={currentUrl}
          currentData={currentData}
          palette={palette}
          logoUrl={logoUrl}
          capCopied={capCopied}
          handleCapCopy={handleCapCopy}
        />
        <CapabilitiesIntro />
      </Flex>
    </Container>
  )
}
