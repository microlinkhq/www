import {
  borders,
  layout,
  colors,
  theme,
  transition,
  fontSizes,
  radii,
  space
} from 'theme'
import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

import { cdnUrl } from 'helpers/cdn-url'
import { trackEvent } from 'helpers/plausible'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import LineBreak from 'components/elements/LineBreak'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { Check as CheckIcon, Star as StarIcon } from 'react-feather'

import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import FetchProvider from 'components/patterns/FetchProvider'
import Layout from 'components/patterns/Layout'
import Block from 'components/patterns/Block/Block'
import LinkPreviewRaw from '@microlink/react'
import { FeaturedToolCard } from 'components/patterns/Tools/ToolCards'
import { TOOLS as TOOL_CATALOG } from 'components/patterns/Tools/toolCatalog'
import {
  InteractiveExample,
  PreviewVariantsShowcase,
  STRIPE_DEMO_DATA
} from 'components/pages/embed'
import Plans, {
  CurrencyContext,
  useCurrency
} from 'components/patterns/Plans/Plans'

import {
  siBandcamp,
  siBehance,
  siCodesandbox,
  siDailymotion,
  siDeviantart,
  siFigma,
  siFlickr,
  siGiphy,
  siGithub,
  siImgur,
  siInstagram,
  siKickstarter,
  siLoom,
  siMedium,
  siMixcloud,
  siObservable,
  siPinterest,
  siReddit,
  siReplit,
  siSketchfab,
  siSlideshare,
  siSoundcloud,
  siSpotify,
  siTed,
  siTiktok,
  siTwitch,
  siVimeo,
  siWistia,
  siYoutube
} from 'simple-icons'

import { useMounted } from 'components/hook/use-mounted'
import { useSiteMetadata } from 'components/hook/use-site-meta'

import { withTitle } from 'helpers/hoc/with-title'

import analyticsData from '../../data/analytics.json'
import ossData from '../../data/oss.json'

const ACCENT = '#3e55ff'
const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const DEMO_LINK = { data: STRIPE_DEMO_DATA }

const HERO_LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [3, 3, 4, 5]
}

const INITIAL_PLACEHOLDER_URL = 'https://stripe.com'
const PLACEHOLDER_CYCLE = ['https://vercel.com', 'https://unavatar.io']
const TYPING_SPEED_MS = 80
const INITIAL_DELAY_MS = 4000
const HOLD_AFTER_TYPING_MS = 300
const VIEW_PREVIEW_MS = 4000

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
})
const formatCompactCount = number =>
  COMPACT_NUMBER_FORMATTER.format(number).toLowerCase()
const OSS_STARS_BY_NAME = new Map(
  ossData.map(({ name, stars }) => [name, stars])
)
const getRepoStarsLabel = (repo, asNumber = false) => {
  const liveStars = OSS_STARS_BY_NAME.get(repo.name)
  if (asNumber) return liveStars
  return typeof liveStars === 'number' && !asNumber
    ? formatCompactCount(liveStars)
    : repo.stars
}

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HeroPreviewShell = styled(Box)`
  ${theme({
    width: '100%',
    maxWidth: layout.large,
    mx: 'auto',
    bg: 'white',
    borderRadius: 3,
    overflow: 'hidden'
  })};
  box-shadow: 0 8px 32px ${colors.black10};
`

const HeroInputBar = styled('form')`
  ${theme({
    width: '100%',
    px: [2, 3, 3, 3],
    py: '10px',
    bg: 'white'
  })};
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: ${borders[1]} ${colors.black05};
`

const HeroInput = styled('input')`
  ${theme({
    fontSize: ['13px', '13px', '14px', '14px'],
    fontFamily: 'mono',
    px: 2,
    py: '8px',
    color: 'black',
    bg: 'white',
    borderRadius: 4
  })};
  flex: 1;
  min-width: 0;
  border: ${borders[1]} ${colors.black10};
  letter-spacing: 0;
  outline: none;
  transition: border-color ${transition.short};

  &::placeholder {
    color: ${colors.black40};
  }

  &:hover {
    border-color: ${colors.black20};
  }

  &:focus-visible {
    border-color: ${colors.black40};
  }
`

const HeroPreviewButton = styled('button')`
  ${theme({
    px: 3,
    py: '8px',
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    bg: 'black',
    color: 'white',
    borderRadius: 4
  })};
  border: ${borders[1]} ${colors.black};
  cursor: pointer;
  letter-spacing: 0;
  flex-shrink: 0;
  transition: opacity ${transition.short};
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[1]};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const HeroPreviewBody = styled(Box)`
  ${theme({
    width: '100%',
    bg: 'white',
    p: [3, 3, 4, 4]
  })};
  display: flex;
  align-items: center;
  justify-content: center;

  .microlink_card,
  .microlink_card__iframe,
  .microlink_card__iframe iframe {
    width: 100%;
    max-width: 100%;
  }
`

const LinkPreview = styled(LinkPreviewRaw)`
  --microlink-max-width: 100%;
  --microlink-hover-background-color: white;
  width: 100%;
  max-width: 100%;
`

const HERO_PREVIEW_MEDIA = ['video', 'audio', 'image', 'logo']

const HeroPreview = React.memo(
  function HeroPreview ({ url, data }) {
    return (
      <LinkPreview
        key={url}
        size='large'
        url={url}
        fetchData={false}
        setData={() => data}
        media={HERO_PREVIEW_MEDIA}
      />
    )
  },
  (prev, next) => prev.url === next.url
)

const HeroApiBar = styled(Flex)`
  ${theme({
    width: '100%',
    bg: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    px: [2, 3, 3, 3],
    py: '10px',
    minWidth: 0
  })};
  border-top: ${borders[1]} ${colors.black05};
`

const HeroApiUrl = styled('span')`
  ${theme({
    fontSize: ['13px', '13px', '14px', '14px'],
    fontFamily: 'mono',
    letterSpacing: 0,
    flex: 1,
    minWidth: 0,
    color: 'black70'
  })};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  strong {
    color: ${colors.black};
    font-weight: bold;
  }
`

const HeroCopyButton = styled('button')`
  ${theme({
    bg: 'transparent',
    p: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'black60'
  })};
  border: none;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short}, transform ${transition.short};

  &:hover {
    color: ${colors.black};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[2]};
    border-radius: ${radii[2]};
  }

  svg.icon-check {
    color: ${colors.green5};
  }
`

const fallbackCopy = text => {
  try {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0'
    document.body.appendChild(el)
    el.focus()
    el.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(el)
    return ok
  } catch {
    return false
  }
}

const Hero = function Hero ({
  data,
  isLoading,
  onSubmit,
  heroLayout = HERO_LAYOUT
}) {
  const isMounted = useMounted()
  const [isCopied, setIsCopied] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [placeholderText, setPlaceholderText] = useState(
    INITIAL_PLACEHOLDER_URL
  )
  const copyTimerRef = useRef(null)
  const userInteractedRef = useRef(false)
  const onSubmitRef = useRef(onSubmit)
  onSubmitRef.current = onSubmit

  const handleInputChange = e => {
    if (!userInteractedRef.current) {
      userInteractedRef.current = true
      setPlaceholderText(data.url)
    }
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if (userInteractedRef.current) return
    // fetch the initial URL so the preview card matches the placeholder
    onSubmitRef.current(INITIAL_PLACEHOLDER_URL, {
      queryUrl: INITIAL_PLACEHOLDER_URL,
      syncQuery: false
    })
    const timers = []
    let previousUrl = INITIAL_PLACEHOLDER_URL
    let timeOffset = INITIAL_DELAY_MS

    PLACEHOLDER_CYCLE.forEach(nextUrl => {
      // capture per-iteration so timer closures don't read the mutated outer var
      const fromUrl = previousUrl
      const toUrl = nextUrl

      // erase the previous URL, char by char
      const eraseStart = timeOffset
      for (let i = 1; i <= fromUrl.length; i++) {
        timers.push(
          setTimeout(() => {
            if (userInteractedRef.current) return
            setPlaceholderText(fromUrl.slice(0, fromUrl.length - i))
          }, eraseStart + i * TYPING_SPEED_MS)
        )
      }
      timeOffset = eraseStart + fromUrl.length * TYPING_SPEED_MS

      // type the next URL, char by char
      const typeStart = timeOffset
      for (let i = 1; i <= toUrl.length; i++) {
        timers.push(
          setTimeout(() => {
            if (userInteractedRef.current) return
            setPlaceholderText(toUrl.slice(0, i))
          }, typeStart + i * TYPING_SPEED_MS)
        )
      }
      timeOffset = typeStart + toUrl.length * TYPING_SPEED_MS

      // fetch after a brief hold so the typed URL is readable
      timers.push(
        setTimeout(() => {
          if (userInteractedRef.current) return
          onSubmitRef.current(toUrl, { queryUrl: toUrl, syncQuery: false })
        }, timeOffset + HOLD_AFTER_TYPING_MS)
      )

      timeOffset += HOLD_AFTER_TYPING_MS + VIEW_PREVIEW_MS
      previousUrl = toUrl
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  const normalizeInputUrl = raw => {
    const trimmed = (raw || '').trim()
    if (!trimmed) return null
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`
    try {
      const parsed = new URL(withProtocol)
      if (!parsed.hostname.includes('.')) return null
      return parsed.href
    } catch {
      return null
    }
  }

  const handleInputSubmit = e => {
    e.preventDefault()
    if (isLoading) return
    const normalized = normalizeInputUrl(inputValue)
    if (!normalized || normalized === data.url) return
    trackEvent('demo submit', { product: 'embed' })
    onSubmit(normalized, { queryUrl: normalized, syncQuery: false })
  }

  const apiUrl = `https://api.microlink.io?url=${data.url}`

  const handleCopy = () => {
    const markCopied = () => {
      setIsCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setIsCopied(false), 1500)
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(apiUrl)
        .then(markCopied)
        .catch(() => {
          if (fallbackCopy(apiUrl)) markCopied()
        })
    } else if (fallbackCopy(apiUrl)) {
      markCopied()
    }
  }

  return (
    <Container
      id='hero'
      as='section'
      css={theme({
        alignItems: 'center',
        maxWidth: '100%',
        px: [3, 3, 4, 5],
        py: SECTION_VERTICAL_SPACING
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: heroLayout.maxWidth,
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: [4, 4, 5, heroLayout.gap[3]]
        })}
      >
        <Flex
          css={theme({
            flexDirection: 'column',
            width: ['100%', '100%', '100%', '50%'],
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <Heading
            titleize={false}
            css={theme({
              px: [2, 3, 4, 0],
              fontSize: [4, 4, 5, 5],
              maxWidth: ['100%', '100%', '100%', '640px'],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Embed API <span style={{ whiteSpace: 'nowrap' }}>for any URL</span>
          </Heading>
          <Caption
            forwardedAs='h2'
            titleize={false}
            css={theme({
              pt: [3, 3, 4, 4],
              px: [1, 2, 4, 0],
              maxWidth: ['100%', layout.small, layout.small, '640px'],
              fontSize: [2, 2, 3, 3],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            One API call turns any URL into a ready-to-paste iframe — YouTube
            players, Spotify tracks, Tweet widgets, Figma boards, and 280+ more
            oEmbed providers. No scraping, edge-cached globally — built for
            developers.
          </Caption>

          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              width: '100%',
              fontSize: [2, 2, 3, 3],
              flexDirection: ['column', 'row', 'row', 'row'],
              alignItems: 'center',
              justifyContent: ['center', 'center', 'center', 'flex-start'],
              gap: [3, 4, 4, 4]
            })}
          >
            <ArrowLink href='/docs/guides/embed'>Get Started</ArrowLink>
          </Flex>
        </Flex>

        <Flex
          css={theme({
            width: ['100%', '100%', '100%', '50%'],
            minWidth: 0,
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: [3, 3, 4, 4]
          })}
        >
          <Box
            css={theme({
              width: '100%',
              minWidth: 0
            })}
          >
            <HeroPreviewShell>
              <HeroInputBar onSubmit={handleInputSubmit}>
                <HeroInput
                  type='text'
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={placeholderText}
                  aria-label='URL to preview'
                  spellCheck={false}
                  autoComplete='off'
                  autoCorrect='off'
                  autoCapitalize='off'
                />
                <HeroPreviewButton
                  type='submit'
                  disabled={isLoading}
                  aria-label={isLoading ? 'Loading preview' : 'Preview URL'}
                  aria-busy={isLoading}
                >
                  {isLoading ? 'Loading…' : 'Preview'}
                </HeroPreviewButton>
              </HeroInputBar>

              <HeroPreviewBody>
                <Box css={theme({ width: '100%' })}>
                  <HeroPreview url={data.url} data={data} />
                </Box>
              </HeroPreviewBody>

              <HeroApiBar>
                <HeroApiUrl>
                  https://api.microlink.io?
                  <strong>url={data.url}</strong>
                </HeroApiUrl>
                <HeroCopyButton
                  type='button'
                  onClick={handleCopy}
                  aria-label={isCopied ? 'Copied!' : 'Copy API URL'}
                >
                  {isCopied ? (
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
                  ) : (
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
                </HeroCopyButton>
              </HeroApiBar>
            </HeroPreviewShell>
          </Box>
        </Flex>
      </Flex>
      {!isMounted && null}
    </Container>
  )
}

// ─── Providers Showcase ───────────────────────────────────────────────────────

const FEATURED_PROVIDERS = [
  { name: 'YouTube', icon: siYoutube },
  { name: 'Spotify', icon: siSpotify },
  { name: 'Instagram', icon: siInstagram },
  { name: 'TikTok', icon: siTiktok },
  { name: 'GitHub', icon: siGithub },
  { name: 'CodeSandbox', icon: siCodesandbox },
  { name: 'Vimeo', icon: siVimeo },
  { name: 'SoundCloud', icon: siSoundcloud },
  { name: 'Figma', icon: siFigma },
  { name: 'Reddit', icon: siReddit },
  { name: 'Pinterest', icon: siPinterest },
  { name: 'Flickr', icon: siFlickr },
  { name: 'Behance', icon: siBehance },
  { name: 'Medium', icon: siMedium },
  { name: 'Sketchfab', icon: siSketchfab },
  { name: 'Replit', icon: siReplit },
  { name: 'TED', icon: siTed },
  { name: 'Dailymotion', icon: siDailymotion },
  { name: 'Twitch', icon: siTwitch },
  { name: 'Mixcloud', icon: siMixcloud },
  { name: 'Giphy', icon: siGiphy },
  { name: 'Observable', icon: siObservable },
  { name: 'Wistia', icon: siWistia },
  { name: 'Loom', icon: siLoom },
  { name: 'SlideShare', icon: siSlideshare },
  { name: 'Kickstarter', icon: siKickstarter },
  { name: 'DeviantArt', icon: siDeviantart },
  { name: 'Imgur', icon: siImgur },
  { name: 'Bandcamp', icon: siBandcamp }
]

const MARQUEE_DURATION = '60s'

const marqueeScroll = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
`

const ProvidersMarquee = styled(Box)`
  ${theme({ width: '100%', overflow: 'hidden' })};
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 8%,
    #000 92%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 8%,
    #000 92%,
    transparent 100%
  );
`

const ProvidersTrack = styled(Flex)`
  ${theme({ alignItems: 'center', gap: 2 })};
  width: max-content;
  flex-wrap: nowrap;
  animation: ${marqueeScroll} ${MARQUEE_DURATION} linear infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }
`

const ProviderChip = styled(Flex)`
  ${theme({
    px: 3,
    py: 2,
    borderRadius: 5,
    bg: 'white',
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    color: 'black80',
    alignItems: 'center',
    gap: 2
  })};
  border: ${borders[1]} ${colors.black10};
  white-space: nowrap;
  flex: 0 0 auto;
  letter-spacing: 0;
  line-height: 1;
`

const ProviderIcon = ({ icon }) => (
  <svg
    aria-hidden='true'
    viewBox='0 0 24 24'
    width='14'
    height='14'
    fill={`#${icon.hex}`}
    style={{ flexShrink: 0 }}
  >
    <path d={icon.path} />
  </svg>
)

const Providers = () => {
  const blockOne = (
    <Flex
      css={theme({
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      })}
    >
      <Subhead
        css={theme({ fontSize: [2, 3, 3, '44px'], color: 'white', mb: 3 })}
      >
        280+ embed providers{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          One API call for every URL
        </span>
      </Subhead>
    </Flex>
  )

  const blockTwo = (
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      })}
    >
      <Box
        as='p'
        css={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0
        }}
      >
        Microlink supports embed for 280+ providers including YouTube, Spotify,
        Twitter / X, Instagram, TikTok, GitHub, CodePen, CodeSandbox, Vimeo,
        SoundCloud, Figma, Reddit, Pinterest, Flickr, Behance, Medium,
        Sketchfab, Replit, Canva, TED, Dailymotion, Twitch, Mixcloud, Giphy,
        Observable, Streamable, Wistia, Loom, SlideShare, Kickstarter,
        DeviantArt, Imgur, Bandcamp, and more.
      </Box>
      <ProvidersMarquee aria-hidden='true'>
        <ProvidersTrack>
          {[...FEATURED_PROVIDERS, ...FEATURED_PROVIDERS].map(
            ({ name, icon }, index) => (
              <ProviderChip key={`${name}-${index}`}>
                <ProviderIcon icon={icon} />
                {name}
              </ProviderChip>
            )
          )}
        </ProvidersTrack>
      </ProvidersMarquee>
    </Flex>
  )

  return (
    <Block
      forwardedAs='section'
      id='providers'
      flexDirection='column'
      width='100%'
      css={theme({
        px: 4,
        py: SECTION_VERTICAL_SPACING,
        mt: 4,
        width: '100%',
        maxWidth: '100%',
        backgroundImage: `radial-gradient(
          circle at center right,
          ${colors.blue9} 0%,
          ${colors.blue9} 48%,
          ${colors.blue8} 48%,
          ${colors.blue8} 52%,
          ${colors.blue7} 52%,
          ${colors.blue7} 65%,
          ${colors.blue6} 65%,
          ${colors.blue6} 79%,
          ${ACCENT} 79%,
          ${ACCENT} 100%
        )`,
        borderTop: `${borders[1]} ${colors.white20}`,
        borderBottom: `${borders[1]} ${colors.white20}`
      })}
      blockOne={blockOne}
      blockTwo={blockTwo}
    />
  )
}

// ─── Capabilities ─────────────────────────────────────────────────────────────

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
        <polyline points='16 18 22 12 16 6' />
        <polyline points='8 6 2 12 8 18' />
      </svg>
    ),
    title: 'Iframe attribute from the response',
    description:
      "The API response includes a ready-to-paste HTML snippet — the provider's real player. Drop it straight into your markup. Works across 280+ supported webpages: YouTube, Spotify, Vimeo, X, TikTok, Canva, Figma...",
    links: [{ label: 'Iframe guide', href: '/docs/guides/embed/iframe' }]
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
        <path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' />
        <polyline points='3.27 6.96 12 12.01 20.73 6.96' />
        <line x1='12' y1='22.08' x2='12' y2='12' />
      </svg>
    ),
    title: 'Microlink SDK component',
    description:
      'Drop in <Microlink /> for React, Vue, or vanilla JS — under 10KB, lazy-loaded by default. Pass any URL and let the SDK fetch, theme, and render it. Customizable through props, CSS variables, and stable BEM class hooks.',
    links: [{ label: 'Explore the SDK', href: '/sdk' }]
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

const Capabilities = () => (
  <Container
    id='capabilities'
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'pinky',
      px: [3, 3, 4, 5],
      py: [5, 5, 6, 6]
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
          width: ['100%', '100%', '100%', '50%'],
          minWidth: 0,
          pt: [4, 4, 5, 0],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <InteractiveExample />
      </Flex>
      <Flex
        css={theme({
          flexDirection: 'column',
          width: ['100%', '100%', '100%', '50%'],
          justifyContent: 'center',
          alignItems: ['center', 'center', 'center', 'flex-start'],
          gap: [3, 3, 4, 4]
        })}
      >
        <Subhead
          css={theme({
            fontSize: [3, 4, 4, 4],
            textAlign: ['center', 'center', 'center', 'left'],
            width: '100%'
          })}
        >
          Two ways to embed any URL
          <LineBreak />
          <span css={{ color: ACCENT }}>on your website</span>
        </Subhead>
        <Text
          css={theme({
            fontSize: [1, 1, 2, 2],
            color: 'black80',
            lineHeight: 1.5,
            textAlign: ['center', 'center', 'center', 'left'],
            width: '100%'
          })}
        >
          Same API, two rendering paths. Drop in the SDK component, or paste the
          iframe attribute the response already returns — pick whichever fits
          your stack.
        </Text>
        <Flex
          css={[
            theme({ gap: [3, 3, 3, 4], width: '100%' }),
            { flexDirection: 'column' }
          ]}
        >
          {CAPABILITIES.map(({ icon, title, description, links }) => (
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
                <Text css={theme({ fontSize: [0, 0, 1, 1] })}>
                  {description}
                </Text>
                {links && (
                  <Flex
                    css={theme({
                      pt: 1,
                      gap: 3,
                      flexWrap: 'wrap',
                      fontSize: [1, 1, 2, 2]
                    })}
                  >
                    {links.map(({ label, href }) => (
                      <Link key={href} href={href}>
                        {label}
                      </Link>
                    ))}
                  </Flex>
                )}
              </Flex>
            </CapabilityItem>
          ))}
        </Flex>
        <Text
          css={theme({
            fontSize: [0, 0, 1, 1],
            color: 'black60',
            lineHeight: 1.5,
            textAlign: ['center', 'center', 'center', 'left'],
            width: '100%'
          })}
        >
          Need raw metadata to build your own card instead? See the{' '}
          <Link href='/link-preview'>Link Preview API</Link>.
        </Text>
      </Flex>
    </Flex>
  </Container>
)

const CopyPasteEmbed = () => (
  <Container
    as='section'
    id='copy-paste-embed'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 4, 5, 5]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: HERO_LAYOUT.maxWidth,
        mx: 'auto',
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'center',
        justifyContent: 'center',
        gap: [4, 4, 5, HERO_LAYOUT.gap[3]]
      })}
    >
      <Flex
        css={theme({
          width: ['100%', '100%', '50%', '50%'],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: ['center', 'center', 'flex-start', 'flex-start']
        })}
      >
        <Subhead
          variant='gradient'
          css={theme({
            fontSize: [3, 4, 5, 5],
            textAlign: ['center', 'center', 'left', 'left'],
            width: '100%'
          })}
        >
          Copy. Paste. Embed.
        </Subhead>
        <Text
          as='h3'
          css={theme({
            fontSize: [1, 1, 2, 2],
            color: 'black60',
            fontWeight: 'bold',
            pt: 2,
            textAlign: ['center', 'center', 'left', 'left'],
            width: '100%'
          })}
        >
          Ready-to-paste iframe snippets for any URL
        </Text>
        <Caption
          forwardedAs='div'
          css={theme({
            pt: [3, 3, 4, 4],
            maxWidth: layout.normal,
            fontSize: [1, 1, 2, 2],
            textAlign: ['center', 'center', 'left', 'left']
          })}
        >
          One API call returns every piece of metadata you need — title,
          description, image, logo, palette. Render previews that feel native to
          your design system, or ask your AI assistant to generate them from the
          same data.
        </Caption>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            fontSize: [1, 1, 2, 2],
            flexDirection: ['column', 'row', 'row', 'row'],
            alignItems: 'center',
            justifyContent: ['center', 'center', 'flex-start', 'flex-start'],
            gap: [3, 4, 4, 4]
          })}
        >
          <ArrowLink href='/docs/guides/embed/custom-previews-with-ai#the-base-prompt'>
            Generate previews with a prompt
          </ArrowLink>
          <ArrowLink href='/docs/guides/embed/metadata-api'>
            Build the preview yourself
          </ArrowLink>
        </Flex>
      </Flex>
      <Flex
        css={theme({
          width: ['100%', '100%', '50%', '50%'],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <PreviewVariantsShowcase />
      </Flex>
    </Flex>
  </Container>
)

// ─── Clients ──────────────────────────────────────────────────────────────────

const [
  {
    reqs_pretty: reqsPretty,
    cached_reqs_percentage: cachedReqsPercentage,
    bytes_pretty: bytesPretty
  }
] = analyticsData

const analyticsBytes = (() => {
  const [value, unit] = bytesPretty.split(' ')
  return `${Number(value).toFixed(0)}${unit}`
})()

const STATS = [
  { value: reqsPretty, label: 'reqs per month' },
  { value: cachedReqsPercentage, label: 'cache hit rate' },
  { value: analyticsBytes, label: 'data served' }
]

const CLIENTS_STATS_VALUE_FONT_SIZE = [3, 3, '42px']
const CLIENTS_STATS_LABEL_FONT_SIZE = [0, 1, 1, 1]

const CLIENTS = [
  {
    name: 'Community',
    description: 'Fan engagement platform',
    url: 'https://community.com',
    logo: (
      <img
        src='/images/clients/community.com.png'
        alt='Community'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Impact',
    description: 'Partnership management',
    url: 'https://impact.com',
    logo: (
      <img
        src='/images/clients/impact.com.png'
        alt='Impact'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Mirror',
    description: 'Web3 publishing platform',
    url: 'https://mirror.xyz',
    logo: (
      <img
        src='/images/clients/mirror.xyz.png'
        alt='Mirror'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Padlet',
    description: 'Visual collaboration tool',
    url: 'https://padlet.com',
    logo: (
      <img
        src='/images/clients/padlet.com.png'
        alt='Padlet'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'SkedSocial',
    description: 'Marketing platform',
    url: 'https://skedsocial.com',
    logo: (
      <img
        src='/images/clients/skedsocial.com.png'
        alt='Sked Social'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  }
]

const ClientLogo = styled(Flex)`
  ${theme({ textDecoration: 'none' })};
  color: inherit;
  transition: transform ${transition.short};

  &:hover {
    transform: translateY(-${radii[1]}) scale(1.05);
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: ${radii[1]};
    border-radius: ${radii[3]};
  }
`

const StatSeparator = styled(Box)`
  ${theme({ width: '1px', alignSelf: 'stretch', bg: 'black10' })};
`

const Clients = () => (
  <Container
    id='clients'
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: layout.large,
      pt: [3, 3, 2, 2],
      pb: [5, 5, 6, 6]
    })}
  >
    <Caps
      css={theme({
        fontSize: [1, 1, 2, 2],
        fontWeight: 'bold',
        color: 'black60',
        letterSpacing: 3
      })}
    >
      Last month usage
    </Caps>
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        px: [3, 4, 0, 0],
        justifyContent: 'center',
        alignItems: 'center',
        gap: [3, 4, 5, 5],
        maxWidth: layout.large,
        width: '100%',
        fontVariantNumeric: 'tabular-nums',
        flexWrap: ['wrap', 'nowrap', 'nowrap', 'nowrap']
      })}
    >
      {STATS.map(({ value, label }, index) => (
        <React.Fragment key={label}>
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              px: [3, 2, 3, 3],
              mt: index === STATS.length - 1 ? [2, 0, 0, 0] : undefined
            })}
          >
            <Subhead
              forwardedAs='div'
              titleize={false}
              css={theme({
                fontSize: CLIENTS_STATS_VALUE_FONT_SIZE,
                fontWeight: 'bold',
                color: 'black'
              })}
            >
              {value}
            </Subhead>
            <Caps
              css={theme({
                pt: 1,
                fontSize: CLIENTS_STATS_LABEL_FONT_SIZE,
                fontWeight: 'bold',
                color: 'black80',
                whiteSpace: 'nowrap',
                lineHeight: 0
              })}
            >
              {label}
            </Caps>
          </Flex>
          {index < STATS.length - 1 && (
            <StatSeparator
              css={theme({
                display: ['none', 'none', 'block', 'block']
              })}
            />
          )}
        </React.Fragment>
      ))}
    </Flex>
    <Caps
      css={theme({
        pt: [4, 4, 5, 5],
        fontSize: [1, 1, 2, 2],
        fontWeight: 'bold',
        color: 'black60',
        letterSpacing: 3,
        pb: [3, 3, 0, 0]
      })}
    >
      some clients
    </Caps>
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        px: [3, 4, 4, 0],
        flexWrap: ['wrap', 'wrap', 'nowrap', 'nowrap'],
        justifyContent: 'center',
        alignItems: 'center',
        gap: [4, 4, 5, 5],
        maxWidth: layout.large
      })}
    >
      {CLIENTS.map(({ name, description, logo, url }) => (
        <ClientLogo
          as='a'
          key={name}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Visit ${name}`}
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          })}
        >
          <Box css={theme({ color: 'black' })}>{logo}</Box>
          <Text
            css={theme({
              fontWeight: 'bold',
              fontSize: 1,
              color: 'black'
            })}
          >
            {name}
          </Text>
          <Text
            css={theme({ fontSize: 0, color: 'black80', textAlign: 'center' })}
          >
            {description}
          </Text>
        </ClientLogo>
      ))}
    </Flex>
  </Container>
)

// ─── Pricing ──────────────────────────────────────────────────────────────────

const Pricing = () => {
  const { canonicalUrl, stripeKey } = useSiteMetadata()
  const currencyState = useCurrency()

  return (
    <CurrencyContext.Provider value={currencyState}>
      <Box as='section' id='pricing' css={theme({ bg: 'pinky' })}>
        <Container
          css={theme({
            alignItems: 'center',
            maxWidth: '100%',
            pt: SECTION_VERTICAL_SPACING
          })}
        >
          <Subhead
            variant='gradient'
            css={theme({ fontSize: ['34px', '42px', '54px', '62px'] })}
          >
            Start free, scale when ready
          </Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              maxWidth: layout.normal
            })}
          >
            No login. No credit card. Embed any URL on the free tier — upgrade
            when production traffic kicks in.
          </Caption>
        </Container>
        <Plans
          canonicalUrl={canonicalUrl}
          stripeKey={stripeKey}
          footer='compare'
        />
      </Box>
    </CurrencyContext.Provider>
  )
}

// ─── Open Source ──────────────────────────────────────────────────────────────

const REPOS = [
  {
    name: 'sdk',
    org: 'microlinkhq',
    description:
      'Make any URL embeddable. The official Microlink SDK family — React, Vue, and vanilla JS — under 10KB, framework-agnostic, MIT licensed.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '616',
    primary: true
  },
  {
    name: 'cards',
    org: 'microlinkhq',
    description:
      'The easiest way to create and share dynamic images at scale. Build social cards from any URL.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '402'
  },
  {
    name: 'metascraper',
    org: 'microlinkhq',
    description:
      'A library to scrape unified metadata from any URL. The engine that powers the embed payload.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '2.6k'
  }
]

const RepoCard = styled('a')`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 3,
    borderRadius: 4,
    bg: 'white'
  })};
  border: ${borders[1]} ${colors.black10};
  text-decoration: none;
  color: inherit;
  transition: border-color ${transition.short}, box-shadow ${transition.short},
    background ${transition.short};

  .repo-github-icon {
    transition: fill ${transition.short};
  }

  &:hover {
    border-color: ${colors.black};
    box-shadow: 0 8px 24px ${colors.black10};

    .repo-github-icon {
      fill: ${colors.black};
    }
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: ${radii[1]};
  }
`

const RepoCardPrimary = styled(RepoCard)`
  ${theme({ p: 3 })};
  border: ${borders[1]} ${colors.black10};

  &:hover {
    border-color: ${colors.black};
    box-shadow: 0 8px 24px ${colors.black10};
  }
`

const RepoMeta = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 3,
    fontSize: 0,
    fontFamily: 'sans',
    color: 'black60'
  })};
`

const LanguageDot = styled('span')`
  ${theme({ width: fontSizes[0], height: fontSizes[0] })};
  background: ${({ $color }) => $color};
  border-radius: 50%;
  flex-shrink: 0;
`

const GithubMarkPath = (
  <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z' />
)

const OpenSource = () => (
  <Container
    as='section'
    id='open-source'
    css={theme({
      alignItems: 'center',
      width: '100%',
      pt: 0,
      pb: [5, 5, 5, 6],
      px: [1, 1, 5, 5]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: HERO_LAYOUT.maxWidth,
        mx: 'auto',
        flexDirection: ['column', 'column', 'column', 'row'],
        alignItems: ['center', 'center', 'center', 'stretch'],
        gap: HERO_LAYOUT.gap
      })}
    >
      <Flex
        css={theme({
          width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
          pt: [4, 4, 5, 0],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <Flex
          css={theme({
            width: ['100%', '100%', '85%', '100%'],
            flexDirection: 'column',
            gap: [3, 3, 4, 4]
          })}
        >
          {REPOS.filter(r => r.primary).map(repo => (
            <RepoCardPrimary
              key={repo.name}
              href={`https://github.com/${repo.org}/${repo.name}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Flex css={theme({ alignItems: 'center', gap: '10px' })}>
                <svg
                  className='repo-github-icon'
                  width='20'
                  height='20'
                  viewBox='0 0 16 16'
                  fill={colors.black80}
                  aria-hidden='true'
                >
                  {GithubMarkPath}
                </svg>
                <Text
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: [2, 2, 3, 3],
                    color: 'black80'
                  })}
                >
                  {repo.name}
                </Text>
              </Flex>
              <Text
                css={theme({
                  fontSize: [1, 1, 2, 2],
                  color: 'black60',
                  lineHeight: 1.4
                })}
              >
                {repo.description}
              </Text>
              <RepoMeta css={theme({ fontSize: 1 })}>
                <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                  <LanguageDot $color={repo.languageColor} />
                  {repo.language}
                </Flex>
                <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                  <StarIcon size={16} aria-hidden='true' />
                  {getRepoStarsLabel(repo)}
                </Flex>
              </RepoMeta>
            </RepoCardPrimary>
          ))}

          <Flex
            css={theme({
              gap: [3, 3, 4, 4],
              flexDirection: ['column', 'column', 'row', 'row']
            })}
          >
            {REPOS.filter(r => !r.primary).map(repo => (
              <RepoCard
                key={repo.name}
                href={`https://github.com/${repo.org}/${repo.name}`}
                target='_blank'
                rel='noopener noreferrer'
                css={theme({ flex: 1 })}
              >
                <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                  <svg
                    className='repo-github-icon'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill={colors.black60}
                    aria-hidden='true'
                  >
                    {GithubMarkPath}
                  </svg>
                  <Text
                    css={theme({
                      fontWeight: 'bold',
                      fontSize: [2, 2, 2, 2],
                      color: 'black'
                    })}
                  >
                    {repo.name}
                  </Text>
                </Flex>
                <Text
                  css={theme({
                    color: 'black60',
                    fontSize: 1,
                    lineHeight: 1.4,
                    flex: 1
                  })}
                >
                  {repo.description}
                </Text>
                <RepoMeta>
                  <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                    <LanguageDot $color={repo.languageColor} />
                    {repo.language}
                  </Flex>
                  <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                    <StarIcon size={14} aria-hidden='true' />
                    {getRepoStarsLabel(repo)}
                  </Flex>
                </RepoMeta>
              </RepoCard>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        css={theme({
          flexDirection: 'column',
          width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
          justifyContent: 'center',
          alignItems: ['center', 'center', 'center', 'flex-start'],
          order: [-1, -1, -1, 0]
        })}
      >
        <Subhead
          css={theme({
            textAlign: ['center', 'center', 'center', 'left'],
            fontSize: [3, 3, 4, 4],
            width: '100%'
          })}
        >
          Built on <span css={{ color: ACCENT }}>open source</span>,
          <br />
          trusted by developers
        </Subhead>
        <Caption
          css={theme({
            pt: [3, 3, 4, 4],
            px: [4, 4, 4, 0],
            maxWidth: [
              layout.small,
              layout.small,
              layout.normal,
              layout.normal
            ],
            textAlign: ['center', 'center', 'center', 'left']
          })}
        >
          The Microlink embed API and SDK are powered by battle-tested open
          source libraries used by thousands of developers worldwide. Read the
          source, fork it, ship a PR.
        </Caption>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            width: '100%',
            justifyContent: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <ArrowLink
            href='https://github.com/microlinkhq'
            css={theme({ fontSize: ['20px', '20px', '24px', '24px'] })}
          >
            Explore on GitHub
          </ArrowLink>
        </Flex>
      </Flex>
    </Flex>
  </Container>
)

// ─── SDK ──────────────────────────────────────────────────────────────────────

const SDK_CODE_SNIPPET = `
import Microlink from '@microlink/react'

<Microlink
  url='https://www.youtube.com/watch?v=9P6rdqiybaw'
  apiKey='YOUR_API_KEY'
  size='large'
/>
`

const SdkCodeWrap = styled(Box)`
  ${theme({ width: '100%' })};
  & > div:first-child {
    width: 100%;
    box-shadow: 0 8px 32px ${colors.black10};
  }
`

const SdkSection = () => (
  <Container
    as='section'
    id='sdk'
    css={theme({
      alignItems: 'center',
      width: '100%',
      py: [5, 5, 5, 6],
      px: [1, 1, 5, 5]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: HERO_LAYOUT.maxWidth,
        mx: 'auto',
        flexDirection: ['column', 'column', 'column', 'row'],
        alignItems: ['center', 'center', 'center', 'stretch'],
        gap: HERO_LAYOUT.gap
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
          justifyContent: 'center',
          alignItems: ['center', 'center', 'center', 'flex-start']
        })}
      >
        <Subhead
          css={theme({
            textAlign: ['center', 'center', 'center', 'left'],
            fontSize: [3, 3, 4, 4],
            width: '100%'
          })}
        >
          For React, Vue, and Vanilla JS
          <br />
          <span css={{ color: ACCENT }}>Embed SDK</span>
        </Subhead>
        <Caption
          titleize={false}
          css={theme({
            pt: [3, 3, 4, 4],
            px: [4, 4, 4, 0],
            maxWidth: [
              layout.small,
              layout.small,
              layout.normal,
              layout.normal
            ],
            textAlign: ['center', 'center', 'center', 'left']
          })}
        >
          The Microlink Embed SDK is the optional zero-code path on top of the
          API. One component, 280+ providers, under 10KB — drop-in support for
          React, Vue, and Vanilla JavaScript.
        </Caption>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            width: '100%',
            flexDirection: ['column', 'row', 'row', 'row'],
            alignItems: 'center',
            justifyContent: ['center', 'center', 'center', 'flex-start'],
            gap: [3, 4, 4, 4]
          })}
        >
          <ArrowLink
            href='/sdk'
            css={theme({ fontSize: ['20px', '20px', '24px', '24px'] })}
          >
            Explore the SDK
          </ArrowLink>
          <ArrowLink
            href='/docs/guides/embed/sdk'
            css={theme({ fontSize: ['20px', '20px', '24px', '24px'] })}
          >
            Read the SDK guide
          </ArrowLink>
        </Flex>
      </Flex>
      <Flex
        css={theme({
          width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
          flexDirection: 'column',
          justifyContent: 'center'
        })}
      >
        <SdkCodeWrap>
          <CodeEditor language='jsx'>{SDK_CODE_SNIPPET}</CodeEditor>
        </SdkCodeWrap>
      </Flex>
    </Flex>
  </Container>
)

// ─── Features Grid ────────────────────────────────────────────────────────────

const EMBED_FEATURES = [
  {
    title: 'One Embed for Every URL',
    description:
      'oEmbed parity across 280+ verified providers. YouTube, Spotify, Twitter, GitHub, Figma, CodeSandbox — one API call, every provider normalized into the same response shape.'
  },
  {
    title: 'Plain HTTPS, No Library Required',
    description:
      'A simple GET request returns the metadata and iframe payload. Call it from any backend, edge runtime, browser, or static site — no SDK install needed.'
  },
  {
    title: 'Auto-Detection of Media',
    description:
      'Every response includes the best image, video, audio, logo, and iframe available. No manual provider routing, no broken embeds.'
  },
  {
    title: 'Global Edge Delivery',
    description:
      'Embed responses are cached and distributed across 240+ edge locations powered by Cloudflare, ensuring sub-second link previews worldwide.'
  },
  {
    title: 'Customize the Embed Appearance',
    description:
      "Theme the SDK component through `--microlink-*` CSS variables and BEM class hooks, or pass iframe attributes (width, height, theme) to control the provider's native player."
  },
  {
    title: 'Card or Iframe — Your Choice',
    description:
      "Pass `iframe=true` to get the provider's real player (YouTube, Spotify, Tweet) or use the metadata fields to render a static card. Same data, two presentations."
  },
  {
    title: 'Free to Start',
    description:
      'Embed any URL immediately. No setup fees, no credit card, and pay-as-you-grow pricing once you outgrow the 50 reqs/day free tier.'
  },
  {
    title: 'Optional Drop-in SDK',
    description:
      'Want zero-code rendering? The optional Microlink SDK ships a single lazy-loaded component for React, Vue, and vanilla JS — under 10KB.'
  },
  {
    title: 'Workflow-First Docs',
    description:
      'Step-by-step embed guide covering the API, the iframe parameter, custom HTML/CSS, and AI-generated previews — with runnable examples for every workflow.'
  }
]

// ─── Call to Action ───────────────────────────────────────────────────────────

const CTA_DURATION = 6.2
const CTA_SWEEP_PCT = (1.2 / CTA_DURATION) * 100
const CTA_LEAD_TEXT = 'Embed'
const CTA_LEAD_CHARS = CTA_LEAD_TEXT.split('')
const CTA_CHAR_PCT = CTA_SWEEP_PCT / CTA_LEAD_CHARS.length

const ctaCharAnim = index => {
  const on = index * CTA_CHAR_PCT
  const off = on + CTA_CHAR_PCT
  return keyframes`
    0%, ${on}%, ${off}%, 100% { color: inherit; }
    ${on + 0.01}%, ${off - 0.01}% { color: ${ACCENT}; }
  `
}

const ctaAnims = Array.from({ length: CTA_LEAD_CHARS.length }, (_, i) =>
  ctaCharAnim(i)
)

const CtaChar = styled('span')`
  animation: ${({ $i }) => ctaAnims[$i]} ${CTA_DURATION}s step-end infinite;
`

const ctaNowAnim = keyframes`
  0%, ${CTA_SWEEP_PCT}% { color: inherit; }
  ${CTA_SWEEP_PCT + 0.01}%, 100% { color: ${ACCENT}; }
`

const CtaNow = styled('span')`
  animation: ${ctaNowAnim} ${CTA_DURATION}s step-end infinite;
`

const CallToAction = () => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.normal,
        px: [4, 4, 4, 0],
        mx: 'auto'
      })}
    >
      <Subhead
        css={theme({
          fontSize: [4, 4, 5, 5],
          textAlign: 'center'
        })}
      >
        {CTA_LEAD_CHARS.map((char, i) => (
          <CtaChar key={i} $i={i}>
            {char}
          </CtaChar>
        ))}{' '}
        <CtaNow>any URL</CtaNow>
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal],
          textAlign: 'center',
          fontSize: [2, 2, 3, 3]
        })}
      >
        Call the API directly for a ready-to-paste iframe and oEmbed payload, or
        drop in the optional SDK for zero-code rendering. Free to start, no
        credit card, no commitment.
      </Caption>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center'
        })}
      >
        <ArrowLink
          href='/docs/guides/embed'
          css={theme({ fontSize: ['24px', '28px', '30px', '32px'] })}
        >
          Read the embed guide
        </ArrowLink>
        <ArrowLink
          href='/sdk'
          css={theme({ fontSize: ['24px', '28px', '30px', '32px'] })}
        >
          Use the SDK
        </ArrowLink>
      </Flex>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {['No login needed', '50 reqs/day free', 'No credit card'].map(
          label => (
            <Flex
              key={label}
              css={theme({
                alignItems: 'center',
                gap: 1,
                color: 'black80',
                fontSize: [0, 0, 1, 1]
              })}
            >
              <CheckIcon size={16} color={colors.close} />
              <Text as='span'>{label}</Text>
            </Flex>
          )
        )}
      </Flex>
    </Flex>
  </Container>
)

// ─── Product Information (FAQ) ────────────────────────────────────────────────

const TOP_FAQ_ITEMS = [
  {
    question: 'What is an embed API and how is it different from oEmbed?',
    text: "An embed API takes any URL as input and returns ready-to-paste embed HTML, typically an iframe with the provider's native player or widget. oEmbed is the open spec most providers (YouTube, Spotify, Twitter) implement to expose embed data; Microlink consumes oEmbed where available and falls back to Open Graph, JSON-LD, and headless rendering everywhere else — so every URL returns a usable embed, even when the source does not implement oEmbed.",
    answer: (
      <>
        <div>
          An <b>embed API</b> takes any URL as input and returns ready-to-paste
          embed HTML, typically an iframe with the provider's native player or
          widget. <Link href='https://oembed.com'>oEmbed</Link> is the open spec
          that most providers (YouTube, Spotify, Twitter) implement to expose
          embed data.
        </div>
        <div>
          Microlink consumes oEmbed where available and falls back to Open
          Graph, JSON-LD, and headless rendering everywhere else — so every URL
          returns a usable embed, even when the source does not implement
          oEmbed.
        </div>
      </>
    )
  },
  {
    question: 'Is there a free embed API?',
    text: 'Yes. The Microlink Embed API is free with 50 requests per day — no login, no credit card, no setup. Cached responses served from 240+ Cloudflare edge locations do not count against your daily limit. For production workloads above the free tier, Pro plans start at €39 per month.',
    answer: (
      <>
        <div>
          Yes. The Microlink <b>Embed API is free with 50 requests per day</b> —
          no login, no credit card, no setup. Cached responses served from 240+
          Cloudflare edge locations do not count against your daily limit.
        </div>
        <div>
          For production workloads above the free tier,{' '}
          <Link href='/pricing'>Pro plans</Link> start at €39 per month with
          higher rate limits, proxy rotation, and priority support.
        </div>
      </>
    )
  },
  {
    question: 'Which providers does Microlink support out of the box?',
    text: 'Microlink supports 280+ verified providers via oEmbed including YouTube, Spotify, Twitter / X, Instagram, TikTok, GitHub, CodePen, CodeSandbox, Vimeo, SoundCloud, Figma, Reddit, Pinterest, Flickr, Behance, Medium, Sketchfab, Replit, Canva, TED, Twitch, Mixcloud, Giphy, and more. The full list is available in the iframe parameter docs and grows automatically — you do not need to update the SDK when a new provider is added.',
    answer: (
      <>
        <div>
          Microlink supports <b>280+ verified providers</b> via oEmbed —
          YouTube, Spotify, Twitter / X, Instagram, TikTok, GitHub, CodePen,
          CodeSandbox, Vimeo, SoundCloud, Figma, Reddit, Pinterest, Behance,
          Medium, Sketchfab, Replit, Canva, TED, Twitch, Mixcloud, Giphy, and
          more.
        </div>
        <div>
          The{' '}
          <Link href='/docs/api/parameters/iframe/#providers-supported'>
            full provider list
          </Link>{' '}
          grows automatically — you do not need to update the SDK when a new
          provider is added.
        </div>
      </>
    )
  },
  {
    question: 'How do I embed a YouTube, Spotify, or Tweet on my site?',
    text: 'Drop the Microlink component into your markup and pass the URL. In React: import Microlink from "@microlink/react"; <Microlink url="https://www.youtube.com/watch?v=..." media="iframe" />. In vanilla JS, include the script and call microlink("a") to convert every link on the page. The SDK detects the provider, fetches the embed payload, and renders an interactive iframe (or a static card if you prefer).',
    answer: (
      <>
        <div>
          Drop the <Link href='/sdk'>Microlink component</Link> into your markup
          and pass the URL:
        </div>
        <Faq.List as='ul'>
          <li>
            <b>React</b>:{' '}
            <code>
              {'<Microlink url="https://youtube.com/..." media="iframe" />'}
            </code>
          </li>
          <li>
            <b>Vue</b>:{' '}
            <code>
              {'<Microlink url="https://spotify.com/..." media="iframe" />'}
            </code>
          </li>
          <li>
            <b>Vanilla JS</b>: <code>microlink('a')</code> to convert every link
            on the page
          </li>
        </Faq.List>
        <div>
          See the full <Link href='/docs/sdk/integrations/react/'>React</Link>,{' '}
          <Link href='/docs/sdk/integrations/vue/'>Vue</Link>, and{' '}
          <Link href='/docs/sdk/integrations/vanilla/'>vanilla</Link> guides for
          deeper integration.
        </div>
      </>
    )
  },
  {
    question: 'How do I embed a TikTok or Instagram post on my site?',
    text: 'Pass the TikTok or Instagram URL to the Microlink Embed API with iframe=true and the response includes the provider\'s native embed snippet — the same widget TikTok and Instagram ship via oEmbed. Drop the HTML into your page and the post renders inline, with native interactions preserved. The Microlink SDK does the same thing zero-code: <Microlink url="https://tiktok.com/..." media="iframe" />.',
    answer: (
      <>
        <div>
          Pass the TikTok or Instagram URL to the Microlink Embed API with{' '}
          <code>iframe=true</code> and the response includes the provider's
          native embed snippet — the same widget TikTok and Instagram ship via
          oEmbed. Drop the HTML into your page and the post renders inline, with
          native interactions preserved. See the{' '}
          <Link href='/docs/guides/embed/iframe'>iframe guide</Link> for the
          full request shape.
        </div>
        <div>
          The <Link href='/sdk'>Microlink SDK</Link> does the same thing
          zero-code:{' '}
          <code>
            {'<Microlink url="https://tiktok.com/..." media="iframe" />'}
          </code>{' '}
          — the component detects the provider, fetches the embed payload, and
          renders the native player.
        </div>
      </>
    )
  },
  {
    question:
      'Can Microlink preview URLs behind Cloudflare, antibot walls, or CAPTCHAs?',
    text: 'Yes. Microlink routes requests through a rotating residential proxy network and renders pages in a real headless browser, so it can fetch URLs protected by Cloudflare, DataDome, PerimeterX, hCaptcha, reCAPTCHA, and similar anti-bot systems. The response shape stays identical — title, description, image, logo, iframe — so URLs that would normally return 403 or block a scraper still come back with a usable preview. Proxy rotation is available on Pro plans.',
    answer: (
      <>
        <div>
          Yes. Microlink routes requests through a{' '}
          <b>rotating residential proxy network</b> and renders pages in a real
          headless browser. URLs gated by Cloudflare, DataDome, PerimeterX,
          hCaptcha, reCAPTCHA, or similar anti-bot systems are fetched and
          rendered the same way a real visitor sees them.
        </div>
        <div>
          The response shape stays identical — title, description, image, logo,
          iframe — so URLs that would normally return <code>403</code> or block
          a scraper still come back with a usable preview. Proxy rotation is
          part of <Link href='/pricing'>Pro plans</Link>; see the{' '}
          <Link href='/docs/api/parameters/proxy'>proxy parameter</Link> for
          configuration.
        </div>
      </>
    )
  },
  {
    question: 'Can I customize the look of the embed?',
    text: 'Yes. The SDK exposes CSS variables (--microlink-background-color, --microlink-border-style, --microlink-max-width, etc.) and stable BEM class names (microlink_card, microlink_card__media_video) so you can theme cards without forking. With styled-components or any CSS-in-JS library you can wrap the component to apply additional styles per instance.',
    answer: (
      <>
        <div>
          Yes. The SDK exposes <b>CSS variables</b> (
          <code>--microlink-background-color</code>,{' '}
          <code>--microlink-border-style</code>,{' '}
          <code>--microlink-max-width</code>) and stable <b>BEM class names</b>{' '}
          (<code>microlink_card</code>, <code>microlink_card__media_video</code>
          ) so you can theme cards without forking.
        </div>
        <div>
          With{' '}
          <Link href='https://styled-components.com'>styled-components</Link> or
          any CSS-in-JS library, you can wrap the component to apply additional
          styles per instance — see the{' '}
          <Link href='/docs/sdk/getting-started/styling/'>styling guide</Link>.
        </div>
      </>
    )
  },
  {
    question: 'What if a URL has no image to preview?',
    text: 'Microlink can capture a screenshot on demand by passing screenshot=true on the embed request. The response includes a screenshot field with the rendered capture, so you can use it as a fallback whenever the source page has no Open Graph image, low-quality artwork, or missing oEmbed media — every URL ends up with a usable visual.',
    answer: (
      <>
        <div>
          Pass <code>screenshot=true</code> on the embed request and Microlink
          renders the page in a real browser, returning the capture under{' '}
          <code>data.screenshot.url</code>. Use it as the fallback whenever{' '}
          <code>data.image</code> is missing or low quality — every URL ends up
          with a usable visual.
        </div>
        <div>
          See the <Link href='/screenshot'>screenshot API</Link> for full
          options — full page, dark mode, device emulation, viewport, and
          format.
        </div>
      </>
    )
  },
  {
    question: 'Does the SDK work with React, Vue, and vanilla JS?',
    text: 'Yes. The SDK ships three packages with a unified surface: @microlink/react, @microlink/vue, and @microlink/vanilla. They share the same props, the same CSS hooks, and the same <10KB bundle target. Pick the one that matches your stack — switching between them later is a near drop-in replacement.',
    answer: (
      <>
        <div>Yes. The SDK ships three packages with a unified surface:</div>
        <Faq.List as='ul'>
          <li>
            <Link href='/docs/sdk/integrations/react/'>@microlink/react</Link>
          </li>
          <li>
            <Link href='/docs/sdk/integrations/vue/'>@microlink/vue</Link>
          </li>
          <li>
            <Link href='/docs/sdk/integrations/vanilla/'>
              @microlink/vanilla
            </Link>
          </li>
        </Faq.List>
        <div>
          They share the same props, the same CSS hooks, and the same {'<10KB'}{' '}
          bundle target. Switching between them later is a near drop-in
          replacement.
        </div>
      </>
    )
  },
  {
    question: 'Is the SDK lazy-loaded?',
    text: 'Yes. By default the SDK uses IntersectionObserver to defer the API call until the embed enters the viewport. A page with hundreds of embeds only fetches the ones the visitor actually scrolls to, keeping the first paint fast. Lazy loading can be disabled via the lazy prop if you need eager rendering.',
    answer: (
      <>
        <div>
          Yes. By default the SDK uses <code>IntersectionObserver</code> to
          defer the API call until the embed enters the viewport. A page with
          hundreds of embeds only fetches the ones the visitor actually scrolls
          to, keeping the first paint fast.
        </div>
        <div>
          Lazy loading can be disabled via the{' '}
          <Link href='/docs/sdk/parameters/lazy/'>
            <code>lazy</code> prop
          </Link>{' '}
          if you need eager rendering.
        </div>
      </>
    )
  },
  {
    question: 'How do I switch between a card preview and a full iframe?',
    text: 'Toggle the media prop. media="iframe" renders the interactive embed (a YouTube player, a Spotify track, a Tweet widget) when the provider supports it. Without media="iframe", the SDK renders a static card with the provider logo, title, description, and image — cheaper to render and friendlier on long-scrolling pages. You can also pass an array like media={["iframe", "video", "image"]} to define a fallback cascade.',
    answer: (
      <>
        <div>
          Toggle the <code>media</code> prop. <code>media="iframe"</code>{' '}
          renders the interactive embed (a YouTube player, a Spotify track, a
          Tweet widget) when the provider supports it.
        </div>
        <div>
          Without <code>media="iframe"</code>, the SDK renders a static card
          with the provider logo, title, description, and image — cheaper to
          render and friendlier on long-scrolling pages. You can also pass an
          array like <code>{'media={["iframe", "video", "image"]}'}</code> to
          define a fallback cascade — see the{' '}
          <Link href='/docs/sdk/parameters/media/'>media parameter</Link> docs.
        </div>
      </>
    )
  },
  {
    question: 'Is there a free tier?',
    text: 'Yes. The embed API is free with 50 requests per day — no login, no credit card, no setup. Just call the SDK and embed any URL. For production workloads that need higher volume, automatic proxy rotation, and priority support, see Pro plans starting at €39/month.',
    answer: (
      <>
        <div>
          Yes. The embed API is <b>free to use with 50 requests per day</b> — no
          login, no credit card, no setup. Just call the SDK and embed any URL.
        </div>
        <div>
          For production workloads that need higher volume,{' '}
          <Link href='/docs/guides/common/proxy'>proxy rotation</Link>, and
          priority support, see our <Link href='/pricing'>Pro plans</Link>{' '}
          starting at €39/month.
        </div>
      </>
    )
  }
]

// ─── Playground (Try it live) ────────────────────────────────────────────────

const PLAYGROUND_TOOL_PATHS = ['/tools/embed-url']
const EMBEDDING_TOOLS =
  TOOL_CATALOG.find(section => section.category === 'Embedding')?.tools ?? []
const PLAYGROUND_TOOLS = PLAYGROUND_TOOL_PATHS.map(path =>
  EMBEDDING_TOOLS.find(tool => tool.href === path)
).filter(Boolean)

const livePulse = keyframes`
  0%, 62% { color: inherit; }
  70%, 90% { color: ${ACCENT}; }
  100% { color: inherit; }
`

const LiveText = styled('span')`
  animation: ${livePulse} 1.5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    color: ${ACCENT};
  }
`

const Playground = () => {
  return (
    <Container
      as='section'
      id='playground'
      css={theme({
        alignItems: 'center',
        width: '100%',
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.pinkest}`,
        borderBottom: `${borders[1]} ${colors.pinkest}`,
        pt: SECTION_VERTICAL_SPACING,
        pb: SECTION_VERTICAL_SPACING,
        px: [1, 1, 5, 5]
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        })}
      >
        <Subhead
          css={theme({
            fontSize: ['28px', '36px', '46px', '46px'],
            textAlign: 'center'
          })}
        >
          Try it <LiveText>live</LiveText>, right now
        </Subhead>
        <Caption
          css={theme({
            px: [4, 4, 4, 0],
            fontSize: ['20px', '20px', '24px', '24px'],
            maxWidth: layout.large,
            textAlign: 'center'
          })}
        >
          Skip the setup. Our interactive embed url tool lets you test the embed
          API instantly — paste any URL, configure options, and copy the ready
          to paste embed code.
        </Caption>

        <Flex
          css={theme({
            width: '100%',
            justifyContent: 'center',
            maxWidth: layout.large,
            pt: 4,
            gap: [4, 4, 4, 4],
            flexDirection: ['column', 'column', 'row', 'row'],
            alignItems: ['center', 'center', 'stretch', 'stretch']
          })}
        >
          {PLAYGROUND_TOOLS.map(tool => (
            <Box
              key={tool.href}
              css={theme({
                width: '100%',
                maxWidth: ['550px', '550px', '720px', '720px'],
                flex: [null, null, 1, 1]
              })}
            >
              <FeaturedToolCard
                {...tool}
                cardCss={{ height: '100%' }}
                titleCss={{ fontSize: [2, 2, 2, 2] }}
                descriptionCss={{ color: 'black60' }}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

const ProductInformation = () => (
  <Faq
    title='Product Information'
    titleSize={['40px', 4, 5, 5]}
    caption={
      <>
        Everything you need to know about <LineBreak /> the Microlink Embed API
        and SDK.
      </>
    }
    css={theme({
      pb: [5, 5, 6, 6],
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={[
      ...TOP_FAQ_ITEMS,
      {
        question: 'Other questions?',
        answer: (
          <>
            <div>
              We are always available at{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      }
    ]}
  />
)

// ─── Meta / SEO ───────────────────────────────────────────────────────────────

export const Head = () => (
  <Meta
    title='Embed API for Any URL — oEmbed for 280+ Providers'
    noSuffix
    description='Embed API for any URL — get a ready-to-paste iframe and oEmbed payload in one HTTPS call. 280+ providers including YouTube, Spotify, Twitter, TikTok, Figma. Free tier, optional React / Vue / Vanilla JS SDK.'
    image={cdnUrl('banner/sdk.jpeg')}
    structured={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://microlink.io/embed',
          name: 'Microlink Embed API',
          description:
            'Embed API for any URL — get a ready-to-paste iframe and oEmbed payload in one HTTPS call. 280+ providers including YouTube, Spotify, Twitter, TikTok, Figma. Free tier, optional React / Vue / Vanilla JS SDK.',
          url: 'https://microlink.io/embed',
          applicationCategory: ['DeveloperApplication', 'WebAPI'],
          operatingSystem: 'Web, Platform-Agnostic',
          provider: {
            '@type': 'Organization',
            '@id': 'https://microlink.io/about',
            name: 'Microlink',
            url: 'https://microlink.io'
          },
          audience: {
            '@type': 'Audience',
            audienceType: 'Developers, Software Engineers, Product Teams'
          },
          featureList: [
            'Embed any URL as iframe HTML or oEmbed payload',
            '280+ verified oEmbed providers',
            'Plain HTTPS API, no SDK install required',
            'Optional drop-in SDK for React, Vue, and Vanilla JavaScript',
            'Edge-cached across 240+ Cloudflare locations',
            'Screenshot fallback for URLs without oEmbed',
            'Free tier with 50 requests per day'
          ],
          isPartOf: {
            '@type': 'WebSite',
            '@id': 'https://microlink.io',
            url: 'https://microlink.io',
            name: 'Microlink'
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
            description:
              'Free tier available (50 requests/day). Pro plans start at €39/month for production workloads.',
            url: 'https://microlink.io/pricing'
          },
          keywords: [
            'embed api',
            'oembed api',
            'embed sdk',
            'url to embed',
            'url to iframe',
            'embed youtube api',
            'embed tweet api',
            'iframe generator api',
            'free embed api'
          ],
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'https://schema.org/LikeAction' },
            userInteractionCount: getRepoStarsLabel(REPOS[0], true),
            interactionService: {
              '@type': 'WebSite',
              name: 'GitHub',
              url: 'https://github.com/microlinkhq/sdk'
            }
          },
          about: [
            {
              '@type': 'Thing',
              name: 'oEmbed',
              sameAs: 'https://en.wikipedia.org/wiki/OEmbed'
            },
            {
              '@type': 'Thing',
              name: 'Software Development Kit',
              sameAs: 'https://en.wikipedia.org/wiki/Software_development_kit'
            },
            {
              '@type': 'Thing',
              name: 'Application Programming Interface',
              sameAs: 'https://en.wikipedia.org/wiki/API'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://microlink.io/embed#faq',
          url: 'https://microlink.io/embed',
          mainEntity: TOP_FAQ_ITEMS.map(({ question, text }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text
            }
          }))
        }
      ]
    }}
  />
)

// ─── Page Assembly ────────────────────────────────────────────────────────────

const EmbedPage = () => {
  return (
    <Layout>
      <FetchProvider>
        {({ status, doFetch, data }) => {
          const isLoading = status === 'fetching'
          const unifiedData = data || DEMO_LINK.data

          return (
            <>
              <Hero
                data={unifiedData}
                isLoading={isLoading}
                onSubmit={doFetch}
              />
              <Providers />
              <Capabilities />
              <CopyPasteEmbed />
              <Clients />
              <Pricing />
              <SdkSection />
              <OpenSource />
              <Playground />
              <Features
                css={theme({ px: 4, pb: 5, pt: [5, 5, 6, 6] })}
                title={
                  <Subhead
                    css={theme({
                      width: '100%',
                      textAlign: 'left',
                      fontSize: [
                        4,
                        4,
                        `calc(${fontSizes[6]} - 1px)`,
                        `calc(${fontSizes[6]} - 1px)`
                      ]
                    })}
                  >
                    The most complete embed API for developers,{' '}
                    <span
                      css={{
                        display: 'block',
                        color: ACCENT,
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      with no compromises.
                    </span>
                  </Subhead>
                }
                caption={
                  <>
                    One API, every provider, edge-cached worldwide. Step through
                    the workflow in the{' '}
                    <Link href='/docs/guides/embed'>embed guide</Link> — or skip
                    the markup with the <Link href='/sdk'>Microlink SDK</Link>.
                  </>
                }
                features={EMBED_FEATURES}
              />
              <CallToAction />
              <ProductInformation />
            </>
          )
        }}
      </FetchProvider>
    </Layout>
  )
}

export default EmbedPage
