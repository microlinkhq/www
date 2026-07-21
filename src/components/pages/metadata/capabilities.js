import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import {
  SECTION_VERTICAL_SPACING,
  borders,
  colors,
  layout,
  shadows,
  space,
  theme
} from 'theme'
import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'
import Microlink from 'components/patterns/Microlink/Microlink'
import {
  ACCENT,
  Caption,
  CopyButton,
  FIRST_URL,
  HERO_LAYOUT,
  MetaApiBar,
  Subhead
} from './shared'

const HeroMicrolink = styled(Microlink)`
  --microlink-max-width: 100%;
  --microlink-hover-background-color: white;
  width: 100%;
  max-width: 100%;
`

const CAPABILITIES = [
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M9 4H8a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1' />
        <path d='M15 4h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1' />
      </svg>
    ),
    title: 'Every source merged, zero parsing',
    description: (
      <>
        Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, and HTML
        tags combined into <b>one unified schema</b>. Stop writing{' '}
        <b>per-site fallback logic</b> and ship consistent previews at scale.
      </>
    )
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <rect x='3' y='3' width='18' height='18' rx='2' />
        <circle cx='9' cy='9' r='2' />
        <path d='m21 15-5-5L5 21' />
      </svg>
    ),
    title: 'Brand-ready visuals out of the box',
    description: (
      <>
        Get high-resolution images, logos, favicons, and the{' '}
        <b>dominant color palette</b> for every URL — perfect for{' '}
        <b>rich link cards and theming</b> without manual art direction.
      </>
    )
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M13 2 3 14h9l-1 8 10-12h-9l1-8z' />
      </svg>
    ),
    title: 'Real browser, SPA-ready rendering',
    description: (
      <>
        Every request runs in a <b>real headless Chrome session</b> that
        executes JavaScript, hydrates SPAs, and waits for selectors — so you get
        accurate metadata from dynamic pages that <b>plain scrapers miss</b>.
      </>
    )
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <circle cx='12' cy='12' r='10' />
        <path d='M2 12h20' />
        <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
      </svg>
    ),
    title: 'Production-grade edge infrastructure',
    description: (
      <>
        Global CDN caching, automatic retries, and <b>99.9% uptime</b> handle
        the scraping complexity for you — with a{' '}
        <b>free tier of 25 requests per day</b> to get started.
      </>
    )
  }
]

const CapabilityItem = styled(Flex)`
  ${theme({ gap: 2, alignItems: 'flex-start' })};
`

const CapabilityIcon = styled(Flex)`
  ${theme({
    width: space[4],
    height: space[4],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })};
  color: ${ACCENT};
`

const PaletteChip = styled('span')`
  ${theme({ width: space[3], height: space[3], borderRadius: '50%' })};
  display: inline-block;
  background: ${({ $color }) => $color};
  border: ${borders[1]} ${colors.black10};
  box-shadow: ${shadows[1]};
`

const toColor = entry => {
  if (!entry) return null
  if (typeof entry === 'string') return entry
  if (Array.isArray(entry)) return `rgb(${entry.join(',')})`
  return entry.color || entry.rgb || null
}

const extractPalette = data => {
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

const extractLogoUrl = data => {
  if (!data) return null
  const logo = data.logo
  if (!logo) return null
  if (typeof logo === 'string') return logo
  return logo.url || null
}

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
        <Flex
          css={theme({
            width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: [3, 3, 4, 4]
          })}
        >
          <Box
            css={theme({
              width: ['100%', '100%', '80%', '100%'],
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: `${shadows[3]}`,
              bg: 'white'
            })}
          >
            <Box css={theme({ p: [3, 3, 4, 4], bg: 'white' })}>
              <HeroMicrolink
                key={currentUrl}
                size='large'
                url={(currentData && currentData.url) || currentUrl}
                fetchData={!currentData}
                setData={currentData ? () => currentData : undefined}
                media={['image', 'logo']}
              />
              {(palette.length > 0 || logoUrl) && (
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
              )}
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
            </Box>
            <MetaApiBar
              className='meta-api-bar'
              css={theme({
                alignItems: 'center',
                justifyContent: 'space-between',
                px: [2, 3, 3, 3],
                py: '10px',
                gap: 2,
                borderTop: 1,
                borderColor: 'black05'
              })}
            >
              <Text
                as='span'
                css={theme({
                  fontSize: ['13px', '13px', '14px', '14px'],
                  fontFamily: 'mono',
                  letterSpacing: 0,
                  flex: 1,
                  minWidth: '0',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: 'black70'
                })}
              >
                https://api.microlink.io?
                <strong css={theme({ color: 'black' })}>
                  palette&url={currentUrl || FIRST_URL}
                </strong>
              </Text>
              <CopyButton
                type='button'
                onClick={handleCapCopy}
                aria-label={capCopied ? 'Copied!' : 'Copy API URL'}
              >
                {capCopied
                  ? (
                    <svg
                      className='icon-check'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      aria-hidden='true'
                    >
                      <path
                        d='M3 8l3.5 3.5L13 4.5'
                        stroke='currentColor'
                        strokeWidth='1.8'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    )
                  : (
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z'
                      />
                    </svg>
                    )}
              </CopyButton>
            </MetaApiBar>
          </Box>
          <ArrowLink
            css={theme({ fontSize: [1, 1, 2, 2] })}
            href='/integrations/sdk'
          >
            Drop-in link previews in one line of code
          </ArrowLink>
        </Flex>
        <Flex
          css={theme({
            flexDirection: 'column',
            width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start'],
            gap: [3, 3, 4, 4]
          })}
        >
          <Subhead
            css={theme({
              textAlign: ['center', 'center', 'center', 'left'],
              width: '100%'
            })}
          >
            Build social previews
            <LineBreak />
            <span css={{ color: ACCENT }}>that actually render</span>
          </Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              maxWidth: layout.small,
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Microlink returns a unified JSON response — plus the brand color
            palette, logo, and favicon. Everything you need to render a
            pixel-perfect link preview or URL preview on the first try.
          </Caption>
          <Flex
            css={[
              theme({ gap: [3, 3, 3, 4], width: '100%' }),
              {
                flexDirection: 'column',
                '@media (min-width: 768px) and (max-width: 1199px)': {
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  '& > *': { width: 'calc(50% - 12px)' }
                }
              }
            ]}
          >
            {CAPABILITIES.map(({ icon, title, description }) => (
              <CapabilityItem key={title}>
                <CapabilityIcon>{icon}</CapabilityIcon>
                <Flex css={theme({ flexDirection: 'column', gap: 1 })}>
                  <Text
                    css={theme({
                      fontWeight: 'bold',
                      fontSize: [1, 1, 2, 2]
                    })}
                  >
                    {title}
                  </Text>
                  <Text
                    css={theme({
                      fontSize: [0, 0, 1, 1],
                      color: 'black70',
                      lineHeight: 2
                    })}
                  >
                    {description}
                  </Text>
                </Flex>
              </CapabilityItem>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
