import {
  borders,
  layout,
  colors,
  theme,
  transition,
  fontSizes,
  radii
} from 'theme'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { cdnUrl } from 'helpers/cdn-url'
import { trackEvent } from 'helpers/plausible'
import { mqlCode } from 'helpers/mql-code'
import { findDemoLinkById } from 'helpers/demo-links'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Card from 'components/elements/Card/Card'
import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Hide from 'components/elements/Hide'
import Input from 'components/elements/Input/Input'
import InputIcon from 'components/elements/Input/InputIcon'
import LineBreak from 'components/elements/LineBreak'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { Check as CheckIcon, Star as StarIcon } from 'react-feather'
import { JavaScript } from 'components/icons/JavaScript'
import { _React as ReactIcon } from 'components/icons/React'
import { Vue } from 'components/icons/Vue'

import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import FetchProvider from 'components/patterns/FetchProvider'
import Layout from 'components/patterns/Layout'
import Microlink from 'components/patterns/Microlink/Microlink'
import MultiCodeEditor from 'components/patterns/MultiCodeEditor/MultiCodeEditor'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import Plans, {
  CurrencyContext,
  useCurrency
} from 'components/patterns/Plans/Plans'

import { useMounted } from 'components/hook/use-mounted'
import { useQueryState } from 'components/hook/use-query-state'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import { useUrlInput } from 'components/hook/use-url-input'

import { withTitle } from 'helpers/hoc/with-title'

import analyticsData from '../../data/analytics.json'
import ossData from '../../data/oss.json'

const ACCENT = colors.teal7
const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const INITIAL_SUGGESTION = 'youtube'
const DEMO_LINK = findDemoLinkById(INITIAL_SUGGESTION)

const SUGGESTIONS = [
  'instagram',
  'soundcloud',
  'spotify',
  'youtube',
  'theverge',
  'github',
  'medium'
]
  .map(id => findDemoLinkById(id))
  .filter(Boolean)
  .map(({ data }) => ({ value: data.url }))

const MODES = ['preview', 'iframe']
const TYPES = ['render', 'code']

const HERO_LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [3, 3, 4, 5]
}

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

const HeroCard = styled(Card)`
  width: 100%;
  max-width: 100%;

  .microlink_card,
  .microlink_card__iframe,
  .microlink_card__iframe iframe {
    width: 100%;
    max-width: 100%;
  }
`

const LinkPreview = styled(Microlink)`
  --microlink-max-width: 100%;
  --microlink-border-style: transparent;
  --microlink-hover-background-color: white;
`

const Hero = function Hero ({
  data,
  isLoading,
  onSubmit,
  query,
  heroLayout = HERO_LAYOUT
}) {
  const isMounted = useMounted()
  const [mode, setMode] = useState(MODES[0])
  const [type, setType] = useState(TYPES[0])

  const queryUrl = query?.url || ''
  const { iconQuery, inputUrl, setInputUrl, validInputUrl } =
    useUrlInput(queryUrl)

  const media = [
    mode === 'iframe' && 'iframe',
    'video',
    'audio',
    'image',
    'logo'
  ].filter(Boolean)

  return (
    <Flex
      id='hero'
      as='section'
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pt: [3, 3, 1, 0],
        pb: [4, 4, 5, 5],
        px: [2, 3, 4, 5]
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: heroLayout.maxWidth,
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: heroLayout.gap
        })}
      >
        <Flex
          css={theme({
            flexDirection: 'column',
            width: ['100%', '100%', '100%', heroLayout.secondaryWidth],
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <Heading
            titleize={false}
            css={theme({
              px: [2, 3, 4, 0],
              fontSize: [3, 3, 4, 4],
              maxWidth: ['100%', '100%', '100%', '640px'],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Embed any URL,{' '}
            <span style={{ whiteSpace: 'nowrap' }}>anywhere on the web</span>
          </Heading>
          <Caption
            forwardedAs='h2'
            titleize={false}
            css={theme({
              pt: [3, 3, 4, 4],
              px: [1, 2, 4, 0],
              maxWidth: ['100%', layout.small, layout.small, '640px'],
              fontSize: [2, 2, 2, 2],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Turn any link into a rich card or interactive embed — one SDK,{' '}
            <Text as='span' css={{ color: ACCENT, fontWeight: 'bold' }}>
              280+ providers
            </Text>
            , under 10KB.
          </Caption>

          <Flex
            as='form'
            css={theme({
              pt: [3, 3, 4, 4],
              width: '100%',
              justifyContent: ['center', 'center', 'center', 'flex-start'],
              flexDirection: ['column', 'row', 'row', 'row'],
              alignItems: 'center',
              gap: [3, 2]
            })}
            onSubmit={event => {
              event.preventDefault()
              trackEvent('demo submit', { product: 'embed' })
              const rawUrl = inputUrl.trim()
              onSubmit(validInputUrl, { queryUrl: rawUrl })
            }}
          >
            <Input
              id='embed-demo-url'
              css={theme({
                fontSize: 2,
                width: ['100%', 220, 220, 240]
              })}
              iconComponent={<InputIcon query={iconQuery} />}
              placeholder='Paste any URL'
              type='text'
              suggestions={SUGGESTIONS}
              value={inputUrl}
              onChange={event => setInputUrl(event.target.value)}
            />
            <Button loading={isLoading}>
              <Caps css={theme({ fontSize: 1 })}>Embed it</Caps>
            </Button>
          </Flex>

          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              width: '100%',
              fontSize: [2, 2, 3, 3],
              gap: [3, 4],
              flexDirection: ['column', 'row', 'row', 'row'],
              alignItems: 'center',
              justifyContent: ['center', 'center', 'center', 'flex-start']
            })}
          >
            <ArrowLink href='/docs/sdk/getting-started/overview/'>
              Get Started
            </ArrowLink>
            <ArrowLink href='https://github.com/microlinkhq/sdk'>
              View on GitHub
            </ArrowLink>
          </Flex>
        </Flex>

        <Flex
          css={theme({
            width: ['100%', '100%', '100%', heroLayout.mainWidth],
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <Box
            css={theme({
              display: 'inline-flex',
              flexDirection: 'column',
              maxWidth: ['100%', '95%', '85%', '100%'],
              width: ['100%', '95%', '85%', '100%'],
              position: 'relative'
            })}
          >
            <HeroCard
              css={theme({
                border: type === 'code' ? 'inherit' : undefined
              })}
            >
              <Choose>
                <Choose.When condition={type === 'render'}>
                  <LinkPreview
                    key={`${data.url}_${media.join('_')}`}
                    loading={isLoading ? true : undefined}
                    size='large'
                    url={data.url}
                    fetchData={false}
                    setData={() => data}
                    media={media}
                  />
                </Choose.When>
                <Choose.When condition={type === 'code'}>
                  <MultiCodeEditor
                    css={{ width: '100%' }}
                    languages={mqlCode(
                      data.url,
                      {
                        audio: true,
                        video: true,
                        iframe: mode === 'iframe',
                        meta: true
                      },
                      `audio: true,
    video: true,
    iframe: ${mode === 'iframe'},
    meta: true`
                    )}
                  />
                </Choose.When>
              </Choose>
            </HeroCard>
            <Flex
              css={theme({
                width: '100%',
                pt: 3,
                px: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row'
              })}
            >
              <Box>
                {MODES.map(children => (
                  <Card.Option
                    key={children}
                    value={mode}
                    onClick={() => setMode(children)}
                  >
                    {children}
                  </Card.Option>
                ))}
              </Box>
              <Box>
                {TYPES.map(children => (
                  <Card.Option
                    key={children}
                    value={type}
                    onClick={() => setType(children)}
                  >
                    {children}
                  </Card.Option>
                ))}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      {!isMounted && null}
    </Flex>
  )
}

// ─── Integrations (compact) ───────────────────────────────────────────────────

const INTEGRATIONS = [
  {
    Icon: ReactIcon,
    name: 'React',
    href: '/docs/sdk/integrations/react/',
    install: '@microlink/react'
  },
  {
    Icon: Vue,
    name: 'Vue',
    href: '/docs/sdk/integrations/vue/',
    install: '@microlink/vue'
  },
  {
    Icon: JavaScript,
    name: 'Vanilla JS',
    href: '/docs/sdk/integrations/vanilla/',
    install: '@microlink/vanilla'
  }
]

const IntegrationCard = styled(Link)`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    p: 3,
    borderRadius: 4,
    bg: 'white'
  })};
  border: ${borders[1]} ${colors.black10};
  text-decoration: none;
  color: inherit;
  width: 180px;
  transition: border-color ${transition.short}, box-shadow ${transition.short};

  &:hover {
    border-color: ${colors.black};
    box-shadow: 0 8px 24px ${colors.black10};
  }
`

const Integrations = () => (
  <Container
    as='section'
    id='integrations'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 4, 5, 5]
    })}
  >
    <Subhead
      css={theme({
        fontSize: [3, 3, 4, 4],
        textAlign: 'center'
      })}
    >
      Built for every stack
    </Subhead>
    <Caption
      forwardedAs='div'
      css={theme({
        pt: [2, 2, 3, 3],
        px: [3, 4, 4, 0],
        maxWidth: layout.normal,
        fontSize: [1, 1, 2, 2]
      })}
    >
      One consistent API across React, Vue, and vanilla JavaScript. Same props,
      same CSS hooks, same {'<10KB'} bundle.
    </Caption>

    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 3
      })}
    >
      {INTEGRATIONS.map(({ name, href, Icon, install }) => (
        <IntegrationCard key={name} href={href}>
          <Icon width='32px' />
          <Text
            css={theme({ color: 'black', fontWeight: 'bold', fontSize: 1 })}
          >
            {name}
          </Text>
          <Text
            css={theme({
              fontSize: 0,
              fontFamily: 'mono',
              color: 'black60',
              textAlign: 'center'
            })}
          >
            {install}
          </Text>
        </IntegrationCard>
      ))}
    </Flex>
  </Container>
)

// ─── Providers Showcase ───────────────────────────────────────────────────────

const FEATURED_PROVIDERS = [
  'YouTube',
  'Spotify',
  'Twitter / X',
  'Instagram',
  'TikTok',
  'GitHub',
  'CodePen',
  'CodeSandbox',
  'Vimeo',
  'SoundCloud',
  'Figma',
  'Reddit',
  'Pinterest',
  'Flickr',
  'Behance',
  'Medium',
  'Sketchfab',
  'Replit',
  'Canva',
  'TED',
  'Dailymotion',
  'Twitch',
  'Mixcloud',
  'Giphy',
  'Observable',
  'Streamable',
  'Wistia',
  'Loom'
]

const ProviderChip = styled(Box)`
  ${theme({
    px: 3,
    py: 2,
    borderRadius: 5,
    bg: 'white',
    fontSize: [0, 1, 1, 1],
    fontWeight: 'bold',
    color: 'black80'
  })};
  border: ${borders[1]} ${colors.black10};
  white-space: nowrap;
`

const Providers = () => (
  <Container
    as='section'
    id='providers'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 4, 5, 5],
      bg: 'pinky'
    })}
  >
    <Subhead
      variant='gradient'
      css={theme({ fontSize: ['34px', '42px', '54px', '62px'] })}
    >
      280+ providers, one API
    </Subhead>
    <Caption
      forwardedAs='div'
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: layout.normal
      })}
    >
      Every URL that implements <Link href='https://oembed.com'>oEmbed</Link> is
      supported out of the box — from YouTube and Spotify to Figma and
      CodeSandbox. New providers ship automatically; no client update required.
    </Caption>

    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: layout.large,
        mx: 'auto'
      })}
    >
      {FEATURED_PROVIDERS.map(name => (
        <ProviderChip key={name}>{name}</ProviderChip>
      ))}
    </Flex>

    <Box css={theme({ pt: [4, 4, 5, 5], fontSize: [2, 2, 3, 3] })}>
      <ArrowLink href='/docs/api/parameters/iframe/#providers-supported'>
        See full provider list
      </ArrowLink>
    </Box>
  </Container>
)

// ─── Code Example ─────────────────────────────────────────────────────────────

const CodeExample = () => (
  <Container
    as='section'
    id='code-example'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 4, 5, 5]
    })}
  >
    <Subhead
      variant='gradient'
      css={theme({ fontSize: ['34px', '42px', '54px', '62px'] })}
    >
      Copy. Paste. Embed.
    </Subhead>
    <Caption
      forwardedAs='div'
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: layout.normal
      })}
    >
      Same response shape from the API — pick your favorite client. From the
      command line to Go, every snippet returns a normalized embed payload you
      can render anywhere.
    </Caption>
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        width: '100%',
        maxWidth: layout.large,
        mx: 'auto',
        px: [3, 3, 0, 0]
      })}
    >
      <Box css={{ width: '100%' }}>
        <MultiCodeEditorInteractive
          height={320}
          mqlCode={{
            url: 'https://www.youtube.com/watch?v=9P6rdqiybaw',
            audio: true,
            video: true,
            iframe: true,
            meta: true
          }}
        />
      </Box>
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
      pb: [5, 5, 5, 5]
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
          The Microlink embed SDK is powered by battle-tested open source
          libraries used by thousands of developers worldwide. Read the source,
          fork it, ship a PR.
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

// ─── Features Grid ────────────────────────────────────────────────────────────

const EMBED_FEATURES = [
  {
    title: 'One Embed for Every URL',
    description:
      'oEmbed parity across 280+ verified providers. YouTube, Spotify, Twitter, GitHub, Figma, CodeSandbox — one call, every provider normalized into the same response shape.'
  },
  {
    title: 'Less Than 10KB',
    description:
      'Framework-agnostic and polyfill-free. The SDK ships the same surface for React, Vue, and vanilla JavaScript without ballooning your bundle.'
  },
  {
    title: 'Auto-Detection of Media',
    description:
      'A cascade fallback (iframe → video → audio → image → logo) picks the best media available per URL. No manual provider routing, no broken embeds.'
  },
  {
    title: 'Lazy by Default',
    description:
      'IntersectionObserver-driven loading defers the API call until the card enters the viewport. Pages with hundreds of embeds still load fast.'
  },
  {
    title: 'Customizable via CSS',
    description:
      'Theme cards through `--microlink-*` variables and BEM class hooks. No fork required, no styled-components contract to learn — just CSS.'
  },
  {
    title: 'Card or Iframe — Your Choice',
    description:
      'Toggle the `media` prop to render an interactive iframe (YouTube embed, Spotify player) or a static rich card. Same data, two presentations.'
  },
  {
    title: 'Free to Start',
    description:
      'Embed any URL immediately. No setup fees, no credit card, and pay-as-you-grow pricing once you outgrow the 50 reqs/day free tier.'
  },
  {
    title: 'Global Edge Delivery',
    description:
      'Embed responses are cached and distributed across 240+ edge locations powered by Cloudflare, ensuring sub-second link previews worldwide.'
  },
  {
    title: 'Zero-Config Integration',
    description:
      'Drop one component into your markup, pass a URL, and get a live preview. The SDK handles fetching, caching, and lazy-loading automatically.'
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
        Drop the SDK into your stack and turn any URL into a rich card or
        interactive iframe. Free to start, no credit card, no commitment.
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
          href='/docs/sdk/getting-started/overview/'
          css={theme({ fontSize: ['24px', '28px', '30px', '32px'] })}
        >
          Get started free
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
    text: 'An embed API takes any URL as input and returns ready-to-render HTML, an iframe payload, or rich card metadata. oEmbed is the open spec most providers (YouTube, Spotify, Twitter) implement to expose embed data; Microlink consumes oEmbed where available and falls back to Open Graph, JSON-LD, and headless rendering everywhere else — so every URL returns a usable embed, even when the source does not implement oEmbed.',
    answer: (
      <>
        <div>
          An <b>embed API</b> takes any URL as input and returns ready-to-render
          HTML, an iframe payload, or rich card metadata.{' '}
          <Link href='https://oembed.com'>oEmbed</Link> is the open spec that
          most providers (YouTube, Spotify, Twitter) implement to expose embed
          data.
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

const ProductInformation = () => (
  <Faq
    title='Product Information'
    titleSize={['40px', 4, 5, 5]}
    caption={
      <>
        Everything you need to know about <LineBreak /> the Microlink embed SDK.
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
    title='Embed Any URL — Rich Cards & oEmbed for 280+ Providers'
    noSuffix
    description='One SDK to embed any URL as a rich card or interactive iframe. Free tier, under 10KB, React + Vue + vanilla JS, 280+ oEmbed providers.'
    image={cdnUrl('banner/sdk.jpeg')}
    structured={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://microlink.io/embed',
          name: 'Microlink Embed SDK',
          alternateName: [
            'Embed API',
            'oEmbed API',
            'Link Embed SDK',
            'Rich Link Preview SDK'
          ],
          description:
            'Embed any URL as a rich card or interactive iframe. The Microlink SDK normalizes oEmbed across 280+ providers and ships under 10KB for React, Vue, and vanilla JavaScript.',
          url: 'https://microlink.io/embed',
          applicationCategory: ['DeveloperApplication', 'WebAPI'],
          operatingSystem: 'Web, Platform-Agnostic',
          provider: {
            '@type': 'Organization',
            '@id': 'https://microlink.io/about',
            name: 'Microlink',
            url: 'https://microlink.io'
          },
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
            'link embed',
            'url to embed',
            'rich link preview',
            'embed widget',
            'iframely alternative',
            'link unfurling',
            'microlink sdk'
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
  const [query] = useQueryState()
  const isMounted = useMounted()
  const hasQuery = isMounted && !!query?.url

  return (
    <Layout>
      <FetchProvider>
        {({ status, doFetch, data }) => {
          const isLoading =
            (hasQuery && status === 'initial') || status === 'fetching'
          const unifiedData = data || DEMO_LINK.data

          return (
            <>
              <Hero
                data={unifiedData}
                isLoading={isLoading}
                onSubmit={doFetch}
                query={isMounted ? query : {}}
              />
              <Integrations />
              <Providers />
              <CodeExample />
              <Clients />
              <Pricing />
              <OpenSource />
              <Hide breakpoints={[0]}>
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
                      The most complete embed SDK,{' '}
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
                      One SDK, every provider, under 10KB. Embed any URL with
                      easy integration via the{' '}
                      <Link href='/docs/sdk/getting-started/overview/'>
                        Microlink SDK documentation
                      </Link>
                      .
                    </>
                  }
                  features={EMBED_FEATURES}
                />
              </Hide>
              <Hide breakpoints={[1, 2, 3]}>
                <Features
                  css={theme({ px: 4, pb: 5, pt: [5, 5, 6, 6] })}
                  title={
                    <Subhead
                      css={theme({
                        width: '100%',
                        textAlign: 'left',
                        fontSize: 4
                      })}
                    >
                      The most complete embed SDK,{' '}
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
                      One SDK, every provider, under 10KB. Embed any URL with
                      easy integration via the{' '}
                      <Link href='/docs/sdk/getting-started/overview/'>
                        Microlink SDK documentation
                      </Link>
                      .
                    </>
                  }
                  features={EMBED_FEATURES}
                />
              </Hide>
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
