import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import { PRODUCTS } from 'components/pages/home/catalog'
import { trackEvent } from 'helpers/plausible'
import { theme, transition, fonts, colors } from 'theme'
import Heading from 'components/elements/Heading'
import Caption from 'components/patterns/Caption/Caption'
import styled, { css } from 'styled-components'
import React from 'react'

const MONO = fonts.mono
const GAP = 4

const tone = {
  ink: colors.black,
  ink900: '#111',
  muted: '#8b8f9a',
  faint: '#9aa0ab',
  white: colors.white,
  surface: colors.white,
  surfaceSoft: '#F7F7FB',
  surfaceDark: '#161821',
  neutral: '#f2f2f4',
  border: '#eef0f4',
  borderSoft: '#f0f0f2',
  arrow: '#c4c8cf',
  dotIdle: '#dcdce1',
  dotActive: '#b06fe0'
}

const syntax = {
  key: '#c026d3',
  str: '#16a34a',
  mdH1: '#4f5bd5',
  mdH2: '#0284c7',
  body: '#334155',
  punc: '#7d8590',
  tag: '#f472b6',
  darkText: '#e6edf3',
  darkStr: '#7ee787',
  muted: '#64748b'
}

const radius = {
  card: '22px',
  panel: '14px',
  inner: '12px',
  sm: '8px'
}

const SHADOW_INK = '16, 24, 40'
const shadow = {
  card: `0 6px 20px rgba(${SHADOW_INK}, 0.04)`,
  cardHover: `0 22px 46px -28px rgba(${SHADOW_INK}, 0.35)`,
  panel: `0 4px 14px rgba(${SHADOW_INK}, 0.05)`,
  soft: `0 3px 10px rgba(${SHADOW_INK}, 0.06)`,
  softer: `0 3px 10px rgba(${SHADOW_INK}, 0.04)`,
  window: `0 8px 22px rgba(${SHADOW_INK}, 0.06)`,
  windowMid: `0 8px 22px rgba(${SHADOW_INK}, 0.07)`,
  windowTop: `0 14px 34px rgba(${SHADOW_INK}, 0.13)`,
  float: `0 8px 24px rgba(${SHADOW_INK}, 0.08)`,
  rec: `0 8px 22px rgba(${SHADOW_INK}, 0.16)`
}

const TILE = {
  metadata: { bg: '#efe9fe', color: '#7c3aed' },
  screenshot: { bg: '#fde7f1', color: '#ec4899' },
  markdown: { bg: '#e8ebfd', color: '#4f5bd5' },
  html: { bg: '#efe9fe', color: '#7c3aed' },
  embed: { bg: '#e6f0fd', color: '#2f7ff0' },
  preview: { bg: 'linear-gradient(135deg,#f0e9fb,#fbe9f3)', color: '#7c3aed' },
  pdf: { bg: '#fde8ea', color: '#ef4b57' },
  logo: { bg: '#fdf4d6', color: '#e0a90c' },
  search: { bg: '#e6f0fd', color: '#2f7ff0' },
  technologies: { bg: '#efe9fe', color: '#7c3aed' },
  function: { bg: '#e3f6ea', color: '#16a34a' },
  text: { bg: '#fdeede', color: '#f08a3c' },
  lighthouse: { bg: '#e0f5ec', color: '#10b981' },
  video: { bg: '#efe9fe', color: '#7c3aed' },
  audio: { bg: '#fde7f1', color: '#ec4899' },
  animated: { bg: '#e8ebfd', color: '#4f5bd5' },
  automation: { bg: '#fde7f1', color: '#ec4899' },
  sdk: { bg: '#e6f0fd', color: '#2f7ff0' },
  conversion: { bg: '#fde8e1', color: '#f2542d' }
}

const EXTRA = {
  automation: {
    label: 'Browser Automations',
    description: 'Automate actions in the browser and extract results',
    href: '/recipes'
  },
  sdk: {
    label: 'Microlink SDK',
    description: 'The official SDK to integrate Microlink in your app',
    href: '/docs/sdk/getting-started/overview'
  },
  conversion: {
    label: 'File conversion',
    description: 'Convert any file into HTML, Markdown, or clean text',
    href: '/docs/api/parameters/data'
  }
}

const CATALOG = { ...PRODUCTS, ...EXTRA }

const Sparkle = styled.svg(theme({ mb: 3 }))

const GridArea = styled.div(
  theme({ bg: 'white', mt: 5, pt: 4, pb: 5 }),
  css`
    padding-left: clamp(16px, 4vw, 28px);
    padding-right: clamp(16px, 4vw, 28px);
  `
)

const Grid = styled.div(
  theme({ gap: GAP }),
  css`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  `
)

const Row = styled.div(
  theme({ gap: GAP }),
  css`
    display: grid;
    grid-template-columns: ${props => props.$template};

    @media (max-width: 980px) {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }
    @media (max-width: 600px) {
      grid-template-columns: minmax(0, 1fr);
    }
  `
)

const Arrow = styled.svg`
  width: 19px;
  height: 19px;
  flex-shrink: 0;
  color: ${tone.arrow};
  transition: color ${transition.medium}, transform ${transition.medium};
`

const Card = styled(Link)(
  theme({ p: 4 }),
  css`
    position: relative;
    display: flex;
    flex-direction: column;
    background: ${tone.surface};
    border: 1px solid ${tone.border};
    border-radius: ${radius.card};
    overflow: hidden;
    color: ${tone.ink};
    text-decoration: none;
    box-shadow: ${shadow.card};
    transition: border-color ${transition.medium},
      box-shadow ${transition.medium}, transform ${transition.medium};

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: ${props => props.$accent};
        transform: translateY(-3px);
        box-shadow: ${shadow.cardHover};
      }
      &:hover ${Arrow} {
        color: ${tone.ink};
        transform: translate(2px, -2px);
      }
    }
  `
)

const IconTile = styled(Flex)(
  theme({ borderRadius: 5 }),
  css`
    width: 52px;
    height: 52px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `
)

const Title = styled(Text).attrs({ as: 'h3' })(
  theme({ fontSize: 2, fontWeight: 'bold', lineHeight: 0, color: 'black' })
)

const Desc = styled(Text).attrs({ as: 'p' })(
  theme({ fontSize: 0, lineHeight: 1, mt: 2, color: 'black70' })
)

const arrowPaths = (
  <>
    <path d='M14 4h6v6M20 4l-8.5 8.5' />
    <path d='M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5' />
  </>
)

const Feature = ({ vertical, icon, children }) => {
  const { label, description, href } = CATALOG[vertical]
  const tile = TILE[vertical]
  return (
    <Card
      href={href}
      $accent={tile.color}
      onClick={() => trackEvent('home products grid', { product: label })}
    >
      <Flex css={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Flex css={theme({ gap: 3, alignItems: 'flex-start' })}>
          <IconTile css={{ background: tile.bg }}>{icon}</IconTile>
          <Box>
            <Title>{label}</Title>
            <Desc>{description}</Desc>
          </Box>
        </Flex>
        <Arrow
          aria-hidden='true'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.9'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          {arrowPaths}
        </Arrow>
      </Flex>
      {children}
    </Card>
  )
}

const CodeBox = styled(Box)(
  theme({
    borderRadius: 5,
    py: 3,
    px: 3,
    mt: 3,
    fontFamily: 'mono',
    fontSize: 0,
    lineHeight: 4
  }),
  css`
    flex: 1;
    background: ${tone.surfaceSoft};
    border: 1px solid ${tone.borderSoft};
    color: ${syntax.body};
  `
)

const DarkBox = styled(Box)(
  theme({
    borderRadius: 5,
    py: 3,
    px: 3,
    mt: 3,
    fontFamily: 'mono',
    fontSize: 0,
    lineHeight: 4
  }),
  css`
    flex: 1;
    background: ${tone.surfaceDark};
  `
)

const K = styled.span`
  color: ${syntax.key};
`
const V = styled.span`
  color: ${syntax.str};
`
const Pn = styled.span`
  color: ${syntax.punc};
`
const Tg = styled.span`
  color: ${syntax.tag};
`
const Dt = styled.span`
  color: ${syntax.darkText};
`
const Gr = styled.span`
  color: ${syntax.darkStr};
`

const META_FIELDS = [
  ['title', 'Microlink | The universal API'],
  ['description', 'Turn any URL into data.'],
  ['url', 'https://microlink.io'],
  ['siteName', 'Microlink'],
  ['image', 'https://microlink.io/og.png'],
  ['author', 'Microlink'],
  ['publishedTime', '2024-01-15T10:00:00Z']
]

const MetadataPreview = () => (
  <CodeBox css={{ display: 'flex', gap: '18px', lineHeight: 1.95 }}>
    <Box
      as='span'
      css={{
        color: '#c4c4c8',
        textAlign: 'right',
        userSelect: 'none',
        whiteSpace: 'pre'
      }}
    >
      {'1\n2\n3\n4\n5\n6\n7\n8\n9'}
    </Box>
    <Box css={{ whiteSpace: 'pre', overflow: 'hidden' }}>
      {'{\n'}
      {META_FIELDS.map(([k, val], i) => (
        <React.Fragment key={k}>
          {'  '}
          <K>&quot;{k}&quot;</K>: <V>&quot;{val}&quot;</V>
          {i < META_FIELDS.length - 1 ? ',' : ''}
          {'\n'}
        </React.Fragment>
      ))}
      {'}'}
    </Box>
  </CodeBox>
)

const MarkdownPreview = () => (
  <CodeBox>
    <Box css={{ color: syntax.mdH1 }}># Microlink</Box>
    <Box css={{ height: '14px' }} />
    <Box>The universal API for web data.</Box>
    <Box css={{ height: '14px' }} />
    <Box css={{ color: syntax.mdH2 }}>## Features</Box>
    <Box>- Built for speed</Box>
    <Box>- Reliable interface</Box>
    <Box>- Structured output</Box>
    <Box>- AI-ready content</Box>
    <Box>- Clean formatting</Box>
  </CodeBox>
)

const HtmlTag = styled.span`
  color: ${syntax.key};
`

const HtmlText = styled.span`
  color: ${syntax.body};
`

const HtmlLi = ({ children }) => (
  <Box>
    &nbsp;&nbsp;<Pn>&lt;</Pn>
    <HtmlTag>li</HtmlTag>
    <Pn>&gt;</Pn>
    <HtmlText>{children}</HtmlText>
    <Pn>&lt;/</Pn>
    <HtmlTag>li</HtmlTag>
    <Pn>&gt;</Pn>
  </Box>
)

const HtmlPreview = () => (
  <CodeBox css={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
    <Box>
      <Pn>&lt;</Pn>
      <HtmlTag>h1</HtmlTag>
      <Pn>&gt;</Pn>
      <HtmlText>Microlink</HtmlText>
      <Pn>&lt;/</Pn>
      <HtmlTag>h1</HtmlTag>
      <Pn>&gt;</Pn>
    </Box>
    <Box css={{ height: '10px' }} />
    <Box>
      <Pn>&lt;</Pn>
      <HtmlTag>p</HtmlTag>
      <Pn>&gt;</Pn>
      <HtmlText>The universal API for</HtmlText>
    </Box>
    <HtmlText>&nbsp;&nbsp;web data.</HtmlText>
    <Box css={{ height: '10px' }} />
    <Box>
      <Pn>&lt;</Pn>
      <HtmlTag>h2</HtmlTag>
      <Pn>&gt;</Pn>
      <HtmlText>Features</HtmlText>
      <Pn>&lt;/</Pn>
      <HtmlTag>h2</HtmlTag>
      <Pn>&gt;</Pn>
    </Box>
    <Box>
      <Pn>&lt;</Pn>
      <HtmlTag>ul</HtmlTag>
      <Pn>&gt;</Pn>
    </Box>
    <HtmlLi>Built for speed</HtmlLi>
    <HtmlLi>Reliable interface</HtmlLi>
    <HtmlLi>Structured output</HtmlLi>
    <Box>
      <Pn>&lt;/</Pn>
      <HtmlTag>ul</HtmlTag>
      <Pn>&gt;</Pn>
    </Box>
  </CodeBox>
)

const NodeLabel = ({ children }) => (
  <Flex css={{ alignItems: 'center', gap: '7px', marginBottom: '12px' }}>
    <Box
      as='span'
      css={{
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: '#2f7ff0'
      }}
    />
    <Box
      as='span'
      css={{
        fontFamily: fonts.sans,
        fontWeight: 600,
        fontSize: '13px',
        color: tone.ink900
      }}
    >
      {children}
    </Box>
  </Flex>
)

const FunctionPreview = () => (
  <Flex
    css={theme({
      mt: 3,
      flex: 1,
      gap: '14px',
      flexDirection: ['column', 'column', 'row']
    })}
  >
    <DarkBox css={{ marginTop: 0, flex: 1.7, lineHeight: 1.9 }}>
      <Box>
        <Tg>export default async function</Tg>
      </Box>
      <Dt>
        ({'{ page, $ }'}) {'{'}
      </Dt>
      <Box>
        &nbsp;&nbsp;<Pn>const</Pn> <Dt>title = $(</Dt>
        <Gr>&apos;h1&apos;</Gr>
        <Dt>).text();</Dt>
      </Box>
      <Box>
        &nbsp;&nbsp;<Tg>return</Tg> <Dt>{'{ title };'}</Dt>
      </Box>
      <Dt>{'}'}</Dt>
    </DarkBox>
    <CodeBox
      css={{ marginTop: 0, flex: 1, whiteSpace: 'pre', overflow: 'hidden' }}
    >
      <NodeLabel>Result</NodeLabel>
      <Box>
        {'{\n'}
        {'  '}
        <K>&quot;title&quot;</K>: <V>&quot;Microlink&quot;</V>
        {'\n}'}
      </Box>
    </CodeBox>
  </Flex>
)

const TextPreview = () => (
  <CodeBox css={{ fontSize: '13.5px', lineHeight: 1.85 }}>
    Microlink makes it easy to extract clean, readable text from any web page.
    No noise, just content — ready for your AI pipeline.
  </CodeBox>
)

const ScreenshotPreview = () => (
  <Box css={{ position: 'relative', height: '260px', margin: '24px 8px 0' }}>
    <Box
      css={{
        position: 'absolute',
        left: '88px',
        top: '34px',
        right: '8px',
        bottom: '-8px',
        background: tone.surface,
        border: `1px solid ${tone.border}`,
        borderRadius: radius.panel,
        boxShadow: shadow.window,
        transform: 'rotate(2.5deg)'
      }}
    />
    <Box
      css={{
        position: 'absolute',
        left: '46px',
        top: '18px',
        right: '42px',
        bottom: '10px',
        background: tone.surface,
        border: `1px solid ${tone.border}`,
        borderRadius: radius.panel,
        boxShadow: shadow.windowMid,
        transform: 'rotate(1.2deg)'
      }}
    />
    <Box
      css={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: '84px',
        bottom: '22px',
        background: tone.surface,
        border: `1px solid ${tone.border}`,
        borderRadius: radius.panel,
        boxShadow: shadow.windowTop,
        overflow: 'hidden'
      }}
    >
      <Flex
        css={{
          padding: '11px 16px',
          gap: '7px',
          alignItems: 'center',
          borderBottom: `1px solid ${tone.neutral}`
        }}
      >
        <WindowDots />
      </Flex>
      <Box css={{ padding: '22px 26px 26px', textAlign: 'center' }}>
        <Flex
          css={{
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: tone.muted,
            marginBottom: '26px'
          }}
        >
          <Box as='span' css={{ fontWeight: 700, color: tone.ink900 }}>
            Microlink
          </Box>
          <span>Docs&nbsp;&nbsp;Guides&nbsp;&nbsp;Pricing</span>
        </Flex>
        <Box
          css={{
            fontSize: '26px',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}
        >
          The universal API
          <br />
          for web data.
        </Box>
        <Box
          css={{ fontSize: '12px', color: tone.muted, margin: '12px 0 18px' }}
        >
          One API to turn any URL into structured data.
        </Box>
        <Flex css={{ gap: '10px', justifyContent: 'center' }}>
          <MiniButton css={{ background: tone.ink900, color: tone.white }}>
            Get started
          </MiniButton>
          <MiniButton css={{ background: tone.neutral, color: tone.ink900 }}>
            See pricing
          </MiniButton>
        </Flex>
      </Box>
    </Box>
  </Box>
)

const TrafficDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${tone.dotIdle};
  flex-shrink: 0;
`

const WindowDots = () => (
  <>
    <TrafficDot css={{ background: tone.dotActive }} />
    <TrafficDot />
    <TrafficDot />
  </>
)

const MiniButton = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 9px 18px;
  border-radius: ${radius.sm};
`

const PreviewCard = styled(Box)(
  theme({ borderRadius: 5, p: 3, mt: 3 }),
  css`
    border: 1px solid ${tone.borderSoft};
    box-shadow: ${shadow.panel};
  `
)

const EmbedPreview = () => (
  <PreviewCard>
    <Flex css={{ alignItems: 'center', gap: '9px', marginBottom: '13px' }}>
      <svg width='22' height='22' viewBox='0 0 24 24'>
        <rect x='2' y='5' width='20' height='14' rx='4' fill='#ff0000' />
        <path d='M10 8.5l5 3.5-5 3.5z' fill='#fff' />
      </svg>
      <Box as='span' css={{ fontWeight: 700, fontSize: '15px' }}>
        YouTube
      </Box>
    </Flex>
    <Box
      css={{
        borderRadius: radius.inner,
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '16 / 9',
        background: '#0a0a0d'
      }}
    >
      <Box
        css={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 90% at 50% 120%, #1c3a6e 0%, #12213f 40%, #08080c 75%)'
        }}
      />
      <Box
        as='span'
        css={{
          position: 'absolute',
          top: '14px',
          left: 0,
          right: 0,
          textAlign: 'center',
          color: '#cfd8e6',
          fontSize: '15px',
          fontWeight: 500
        }}
      >
        Introducing Gemini 1.5
      </Box>
      <Flex
        css={{
          position: 'absolute',
          inset: 0,
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2f5fa8',
          fontSize: '72px',
          fontWeight: 800,
          letterSpacing: '-3px'
        }}
      >
        1.5
      </Flex>
      <Flex
        css={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '52px',
          height: '37px',
          borderRadius: '10px',
          background: '#ff0000',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,.4)'
        }}
      >
        <svg width='16' height='16' viewBox='0 0 24 24' fill='#fff'>
          <path d='M8 5v14l11-7z' />
        </svg>
      </Flex>
    </Box>
    <Box css={{ marginTop: '12px' }}>
      <Box css={{ fontSize: '15px', fontWeight: 700 }}>
        Introducing Gemini 1.5
      </Box>
      <Box css={{ fontSize: '13px', color: tone.faint, marginTop: '3px' }}>
        Google Developers&nbsp;&nbsp;·&nbsp;&nbsp;1.2M views
      </Box>
    </Box>
  </PreviewCard>
)

const Skel = styled.span`
  height: 8px;
  border-radius: 4px;
  background: #eeeef1;
  display: block;
`

const CornerSvg = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
`

const LinkPreview = () => (
  <Box
    css={theme({
      pt: 3,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    })}
  >
    <Box
      css={theme({
        borderRadius: radius.panel,
        border: 1,
        borderColor: tone.borderSoft,
        boxShadow: shadow.panel,
        overflow: 'hidden'
      })}
    >
      <Box
        css={{
          position: 'relative',
          height: '168px',
          overflow: 'hidden',
          background: 'linear-gradient(180deg,#f6a5c0,#c98bb8 45%,#3a3a63)'
        }}
      >
        <Box
          css={{
            position: 'absolute',
            top: '22px',
            right: '26px',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.28)'
          }}
        />
        <CornerSvg
          viewBox='0 0 360 200'
          preserveAspectRatio='none'
          css={{ width: '100%', height: '68%' }}
        >
          <path
            d='M0 200 L120 74 L196 128 L256 84 L322 120 L360 96 L360 200 Z'
            fill='#4a4a72'
          />
          <path
            d='M0 200 L84 122 L158 156 L232 110 L300 146 L360 124 L360 200 Z'
            fill='#38385c'
          />
        </CornerSvg>
      </Box>
      <Box css={{ padding: '16px' }}>
        <Flex css={{ alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <Box
            css={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              flexShrink: 0,
              background: '#dcdce1'
            }}
          />
          <Skel css={{ width: '34%', height: '9px', background: '#e0e0e5' }} />
        </Flex>
        <Box css={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
          <Skel css={{ width: '100%' }} />
          <Skel css={{ width: '82%' }} />
          <Skel css={{ width: '48%' }} />
        </Box>
      </Box>
    </Box>
  </Box>
)

const PdfPreview = () => (
  <Box css={{ position: 'relative', margin: '22px -28px -28px 20px' }}>
    <Box
      css={{
        background: tone.surfaceSoft,
        border: `1px solid ${tone.border}`,
        borderRight: 'none',
        borderBottom: 'none',
        borderRadius: `${radius.inner} 0 0 0`,
        padding: '18px 18px 24px'
      }}
    >
      <Skel
        css={{
          width: '34%',
          height: '7px',
          background: '#e8e8ec',
          marginBottom: '8px'
        }}
      />
      <Skel
        css={{
          width: '50%',
          height: '7px',
          background: '#e8e8ec',
          marginBottom: '26px'
        }}
      />
      <Box css={{ fontSize: '16px', fontWeight: 800, lineHeight: 1.3 }}>
        Microlink
        <br />
        API Reference
      </Box>
      <Skel
        css={{
          width: '44%',
          height: '7px',
          background: '#e8e8ec',
          marginTop: '18px'
        }}
      />
    </Box>
    <Box
      as='span'
      css={{
        position: 'absolute',
        top: '12px',
        right: '28px',
        background: '#ef4444',
        color: tone.white,
        fontWeight: 800,
        fontSize: '12px',
        padding: '6px 11px',
        borderRadius: '7px',
        boxShadow: '0 6px 14px rgba(239,68,68,.35)'
      }}
    >
      PDF
    </Box>
  </Box>
)

const LOGO_URI = 'https://cdn.microlink.io/logo/logo.svg'
const LOGO_WIDTHS = ['56%', '38%', '20%']
const LOGO_PALETTE = [
  '#EC427C',
  '#780C31',
  '#F286AB',
  '#644CA4',
  '#8B0D38',
  '#3D0618',
  '#3A0618'
]

const LogoTile = styled(Flex)(
  theme({ borderRadius: 5, bg: 'white' }),
  css`
    aspect-ratio: 1;
    border: 1px solid ${tone.border};
    align-items: center;
    justify-content: center;
  `
)

const LogoImg = styled.img`
  display: block;
  height: auto;
`

const Swatch = styled.span`
  flex: 1;
  height: 34px;
`

const LogoPreview = () => (
  <Box css={theme({ mt: 3 })}>
    <Box
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: '10px'
      }}
    >
      {LOGO_WIDTHS.map((width, i) => (
        <LogoTile key={i}>
          <LogoImg src={LOGO_URI} alt='Microlink logo' css={{ width }} />
        </LogoTile>
      ))}
    </Box>
    <Flex
      css={{
        marginTop: '12px',
        borderRadius: radius.sm,
        overflow: 'hidden',
        boxShadow: shadow.soft
      }}
    >
      {LOGO_PALETTE.map(c => (
        <Swatch key={c} css={{ background: c }} />
      ))}
    </Flex>
  </Box>
)

const SearchPreview = () => (
  <Flex
    css={theme({
      mt: 3,
      flex: 1,
      gap: '24px',
      flexDirection: ['column', 'column', 'row']
    })}
  >
    <Box css={{ flex: 1 }}>
      <Flex
        css={{
          border: `1px solid ${tone.border}`,
          borderRadius: '20px',
          padding: '9px 14px',
          alignItems: 'center',
          gap: '9px',
          boxShadow: shadow.softer
        }}
      >
        <svg
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='#9aa0ab'
          strokeWidth='2'
          strokeLinecap='round'
        >
          <circle cx='11' cy='11' r='7' />
          <path d='M21 21l-4.3-4.3' />
        </svg>
        <Box as='span' css={{ color: syntax.body, fontSize: '13px' }}>
          best api for web data
        </Box>
      </Flex>
      <Flex
        css={{
          gap: '16px',
          fontSize: '12px',
          color: tone.faint,
          margin: '14px 2px 12px',
          borderBottom: `1px solid ${tone.borderSoft}`,
          paddingBottom: '8px'
        }}
      >
        <Box
          as='span'
          css={{
            color: '#2f7ff0',
            fontWeight: 600,
            borderBottom: '2px solid #2f7ff0',
            paddingBottom: '9px',
            marginBottom: '-9px'
          }}
        >
          All
        </Box>
        <span>News</span>
        <span>Images</span>
      </Flex>
      <Flex css={{ alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <Flex
          css={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: tone.ink900,
            color: tone.white,
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '11px'
          }}
        >
          M
        </Flex>
        <Box css={{ lineHeight: 1.1 }}>
          <Box css={{ fontSize: '12px', fontWeight: 600 }}>Microlink</Box>
          <Box css={{ fontSize: '11px', color: tone.faint }}>microlink.io</Box>
        </Box>
      </Flex>
      <Box css={{ color: '#1a56db', fontSize: '15px', fontWeight: 600 }}>
        Microlink — The universal API
      </Box>
      <Box css={{ color: syntax.muted, fontSize: '12.5px', marginTop: '3px' }}>
        One API to turn any URL into structured data.
      </Box>
    </Box>
    <CodeBox
      css={{ marginTop: 0, flex: 1, whiteSpace: 'pre', overflow: 'hidden' }}
    >
      <NodeLabel>Structured data</NodeLabel>
      <Box>
        {'[\n  {\n'}
        {'    '}
        <K>&quot;title&quot;</K>: <V>&quot;Microlink&quot;</V>
        {',\n    '}
        <K>&quot;url&quot;</K>: <V>&quot;https://microlink.io&quot;</V>
        {',\n    '}
        <K>&quot;position&quot;</K>: <V>1</V>
        {'\n  }\n]'}
      </Box>
    </CodeBox>
  </Flex>
)

const Chip = styled(Flex)(
  theme({ gap: 2, borderRadius: 4, p: 2, fontSize: 0 }),
  css`
    align-items: center;
    border: 1px solid ${tone.border};
    font-weight: 600;
  `
)

const TechPreview = () => (
  <Flex css={{ flexWrap: 'wrap', gap: '9px', marginTop: '24px' }}>
    <Chip>
      <Flex
        css={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: '#000',
          color: tone.white,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '9px',
          fontStyle: 'italic'
        }}
      >
        N
      </Flex>
      Next.js
    </Chip>
    <Chip>
      <svg width='15' height='15' viewBox='-11.5 -10.23 23 20.46'>
        <circle r='2' fill='#61dafb' />
        <g stroke='#61dafb' strokeWidth='1' fill='none'>
          <ellipse rx='11' ry='4.2' />
          <ellipse rx='11' ry='4.2' transform='rotate(60)' />
          <ellipse rx='11' ry='4.2' transform='rotate(120)' />
        </g>
      </svg>
      React
    </Chip>
    <Chip>
      <svg width='15' height='15' viewBox='0 0 24 24' fill='#38bdf8'>
        <path d='M12 6c-2.7 0-4.4 1.3-5 4 .9-1.2 2-1.7 3.2-1.4.7.2 1.2.7 1.8 1.3.9 1 2 2.1 4.3 2.1 2.7 0 4.4-1.3 5-4-.9 1.2-2 1.7-3.2 1.4-.7-.2-1.2-.7-1.8-1.3C15.4 7.1 14.3 6 12 6zM7 12c-2.7 0-4.4 1.3-5 4 .9-1.2 2-1.7 3.2-1.4.7.2 1.2.7 1.8 1.3.9 1 2 2.1 4.3 2.1 2.7 0 4.4-1.3 5-4-.9 1.2-2 1.7-3.2 1.4-.7-.2-1.2-.7-1.8-1.3C10.4 13.1 9.3 12 7 12z' />
      </svg>
      Tailwind
    </Chip>
    <Chip>
      <svg width='14' height='14' viewBox='0 0 24 24' fill='#000'>
        <path d='M12 2L2 20h20z' />
      </svg>
      Vercel
    </Chip>
    <Chip>
      <Flex
        css={{
          width: '16px',
          height: '16px',
          borderRadius: '4px',
          background: '#3178c6',
          color: tone.white,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px',
          fontWeight: 800
        }}
      >
        TS
      </Flex>
      TypeScript
    </Chip>
    <Chip css={{ color: tone.muted }}>+12</Chip>
  </Flex>
)

const LIGHTHOUSE = [
  ['98', 'Performance'],
  ['100', 'Accessibility'],
  ['100', 'Best Practices'],
  ['92', 'SEO']
]

const LighthousePreview = () => (
  <Flex
    css={{ justifyContent: 'space-between', gap: '6px', marginTop: '26px' }}
  >
    {LIGHTHOUSE.map(([score, label]) => (
      <Box key={label} css={{ textAlign: 'center' }}>
        <Flex
          css={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#eaf7ee',
            border: '3px solid #34c759',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '18px',
            color: '#1c9e46'
          }}
        >
          {score}
        </Flex>
        <Box
          css={{ fontSize: '11.5px', color: syntax.muted, marginTop: '8px' }}
        >
          {label}
        </Box>
      </Box>
    ))}
  </Flex>
)

const VideoPreview = () => (
  <Box
    css={{
      ...theme({ mt: 3 }),
      borderRadius: radius.inner,
      overflow: 'hidden',
      position: 'relative',
      height: '160px',
      background: 'linear-gradient(150deg,#c9d6e8,#8ea4c4 55%,#3a4a63)'
    }}
  >
    <Box
      css={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: 'linear-gradient(0deg,#2b384d,transparent)'
      }}
    />
    <Flex
      css={{
        position: 'absolute',
        inset: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Flex
        css={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,.4)',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width='16' height='16' viewBox='0 0 24 24' fill='#fff'>
          <path d='M8 5v14l11-7z' />
        </svg>
      </Flex>
    </Flex>
    <Flex
      css={{
        position: 'absolute',
        bottom: '12px',
        left: '14px',
        right: '14px',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <svg width='12' height='12' viewBox='0 0 24 24' fill='#fff'>
        <path d='M8 5v14l11-7z' />
      </svg>
      <Box
        as='span'
        css={{ color: tone.white, fontSize: '11px', fontFamily: MONO }}
      >
        0:00
      </Box>
      <Box
        as='span'
        css={{
          flex: 1,
          height: '3px',
          background: 'rgba(255,255,255,.35)',
          borderRadius: '2px',
          position: 'relative'
        }}
      >
        <Box
          as='span'
          css={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '22%',
            background: tone.white,
            borderRadius: '2px'
          }}
        />
      </Box>
      <Box
        as='span'
        css={{ color: tone.white, fontSize: '11px', fontFamily: MONO }}
      >
        1:03
      </Box>
    </Flex>
  </Box>
)

const WAVE = [
  30, 55, 80, 45, 95, 60, 35, 70, 50, 85, 40, 65, 30, 55, 45, 72, 38, 58
]

const Bar = styled.span`
  flex: 1;
  border-radius: 2px;
`

const AudioPreview = () => (
  <Box css={{ marginTop: '26px' }}>
    <Flex
      css={{
        alignItems: 'center',
        gap: '2px',
        height: '52px',
        marginBottom: '18px'
      }}
    >
      {WAVE.map((h, i) => (
        <Bar
          key={i}
          css={{ height: `${h}%`, background: h >= 80 ? '#ec4899' : '#e5b8d4' }}
        />
      ))}
    </Flex>
    <Flex css={{ alignItems: 'center', gap: '12px' }}>
      <Flex
        css={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: tone.ink900,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width='13' height='13' viewBox='0 0 24 24' fill='#fff'>
          <path d='M8 5v14l11-7z' />
        </svg>
      </Flex>
      <Box
        as='span'
        css={{ fontFamily: MONO, fontSize: '12px', color: syntax.muted }}
      >
        0:00 / 3:24
      </Box>
      <Box
        as='span'
        css={{
          flex: 1,
          height: '3px',
          background: '#ececef',
          borderRadius: '2px'
        }}
      />
    </Flex>
  </Box>
)

const AnimatedPreview = () => (
  <Box css={theme({ position: 'relative', mt: 3, pb: 3 })}>
    <Box
      css={{
        background: tone.surface,
        border: `1px solid ${tone.border}`,
        borderRadius: radius.inner,
        boxShadow: shadow.float,
        overflow: 'hidden'
      }}
    >
      <Flex
        css={{
          padding: '10px 14px',
          gap: '7px',
          borderBottom: '1px solid #f3f4f7'
        }}
      >
        <WindowDots />
      </Flex>
      <Flex>
        <Box
          css={{
            width: '62px',
            padding: '14px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            flexShrink: 0
          }}
        >
          {[80, 60, 72, 52, 66, 48, 60].map((w, i) => (
            <Skel
              key={i}
              css={{
                width: `${w}%`,
                height: '6px',
                background: i === 0 ? '#dfe3f5' : '#e9ecf7'
              }}
            />
          ))}
        </Box>
        <Box css={{ flex: 1, padding: '14px 14px 18px' }}>
          <Skel
            css={{ width: '52%', background: '#e7eaf1', marginBottom: '11px' }}
          />
          <Box
            css={{
              height: '18px',
              width: '100%',
              background: 'linear-gradient(90deg,#a9c1f0,#c7d0f7)',
              borderRadius: '5px',
              marginBottom: '14px'
            }}
          />
          <Box
            css={{
              height: '150px',
              borderRadius: radius.sm,
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(180deg,#eef1f6,#e4e9f0)'
            }}
          >
            <CornerSvg
              viewBox='0 0 360 150'
              preserveAspectRatio='none'
              width='100%'
              height='112'
            >
              <path
                d='M0 150 L110 52 L188 92 L262 42 L322 78 L360 58 L360 150 Z'
                fill='#9fb6cf'
              />
              <path
                d='M0 150 L84 92 L160 116 L236 80 L302 108 L360 90 L360 150 Z'
                fill='#6f93b0'
                opacity='0.9'
              />
              <path
                d='M0 150 L104 112 L192 132 L286 108 L360 128 L360 150 Z'
                fill='#40606f'
              />
            </CornerSvg>
          </Box>
        </Box>
      </Flex>
    </Box>
    <Flex
      css={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        background: tone.surface,
        borderRadius: '11px',
        boxShadow: shadow.rec,
        padding: '9px 18px',
        alignItems: 'center',
        gap: '10px',
        fontFamily: MONO
      }}
    >
      <Box
        as='span'
        css={{
          width: '11px',
          height: '11px',
          borderRadius: '50%',
          background: '#f0392b'
        }}
      />
      <Box
        as='span'
        css={{
          fontSize: '16px',
          fontWeight: 600,
          letterSpacing: '2px',
          color: '#1f2733'
        }}
      >
        REC 00:08
      </Box>
    </Flex>
  </Box>
)

const MetadataIcon = () => (
  <Box
    as='span'
    css={{
      fontFamily: MONO,
      fontWeight: 700,
      fontSize: '19px',
      color: TILE.metadata.color
    }}
  >
    {'{…}'}
  </Box>
)

const strokeIcon = {
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

const Glyph = ({ size = 24, sw = 1.8, children, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    strokeWidth={sw}
    {...props}
  >
    {children}
  </svg>
)

const ScreenshotIcon = () => (
  <Glyph size={26} stroke={TILE.screenshot.color} {...strokeIcon}>
    <rect x='3' y='7' width='18' height='13' rx='2.5' />
    <circle cx='12' cy='13.5' r='3.2' />
    <path d='M8.5 7l1.3-2.3h4.4L15.5 7' />
  </Glyph>
)

const MarkdownIcon = () => (
  <Glyph size={26} sw={1.7} stroke={TILE.markdown.color} {...strokeIcon}>
    <rect x='3' y='6' width='18' height='12' rx='2' />
    <path d='M6 15v-6l3 3 3-3v6M17 9v6M14.5 12.5 17 15l2.5-2.5' />
  </Glyph>
)

const CodeIcon = ({ stroke }) => (
  <Glyph sw={1.9} stroke={stroke} {...strokeIcon}>
    <path d='M8 8l-4 4 4 4M16 8l4 4-4 4' />
  </Glyph>
)

const EmbedIcon = () => (
  <Glyph size={25} stroke={TILE.embed.color} {...strokeIcon}>
    <rect x='3' y='5' width='18' height='14' rx='2.5' />
    <path d='M3 9.5h18' />
  </Glyph>
)

const PreviewIcon = () => (
  <Glyph size={25} sw={1.9} stroke='url(#mlLinkGrad)' {...strokeIcon}>
    <defs>
      <linearGradient id='mlLinkGrad' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stopColor='#7c3aed' />
        <stop offset='1' stopColor='#ec4899' />
      </linearGradient>
    </defs>
    <path d='M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1' />
    <path d='M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1' />
  </Glyph>
)

const PdfIcon = () => (
  <Glyph size={23} stroke={TILE.pdf.color} {...strokeIcon}>
    <path d='M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z' />
    <path d='M14 3v5h5' />
  </Glyph>
)

const LogoIcon = () => (
  <Glyph stroke={TILE.logo.color} {...strokeIcon}>
    <rect x='3' y='4' width='18' height='16' rx='3' />
    <circle cx='8.5' cy='9' r='1.5' />
    <path d='M4 17l5-5 4 4 3-3 4 4' />
  </Glyph>
)

const SearchIcon = () => (
  <Glyph size={23} sw={1.9} stroke={TILE.search.color} strokeLinecap='round'>
    <circle cx='11' cy='11' r='7' />
    <path d='M21 21l-4.3-4.3' />
  </Glyph>
)

const TechIcon = () => (
  <Glyph
    size={23}
    sw={1.7}
    stroke={TILE.technologies.color}
    strokeLinejoin='round'
  >
    <path d='M12 2l9 5-9 5-9-5z' />
    <path d='M3 12l9 5 9-5M3 17l9 5 9-5' />
  </Glyph>
)

const TextIcon = () => (
  <Glyph sw={2} stroke={TILE.text.color} {...strokeIcon}>
    <path d='M5 5h14M12 5v14M9 19h6' />
  </Glyph>
)

const LighthouseIcon = () => (
  <Glyph size={25} stroke={TILE.lighthouse.color} {...strokeIcon}>
    <path d='M4 18a8 8 0 0 1 16 0' />
    <path d='M12 18l4-5' />
  </Glyph>
)

const VideoIcon = () => (
  <Glyph stroke={TILE.video.color} strokeLinejoin='round'>
    <rect x='3' y='5' width='18' height='14' rx='3' />
    <path d='M10 9l5 3-5 3z' fill={TILE.video.color} stroke='none' />
  </Glyph>
)

const AudioIcon = () => (
  <Glyph size={23} stroke={TILE.audio.color} {...strokeIcon}>
    <path d='M9 18V5l10-2v13' />
    <circle cx='6' cy='18' r='3' />
    <circle cx='16' cy='16' r='3' />
  </Glyph>
)

const AnimatedIcon = () => (
  <Glyph sw={1.7} stroke={TILE.animated.color} strokeLinejoin='round'>
    <rect x='8' y='3' width='13' height='10' rx='2' />
    <rect x='3' y='8' width='13' height='13' rx='2' fill={TILE.animated.bg} />
  </Glyph>
)

const STEP_COLOR = '#94a3b8'

const stepIcon = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: STEP_COLOR,
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

const FLOW_STEPS = [
  {
    label: 'Go to URL',
    icon: (
      <svg {...stepIcon}>
        <path d='M22 2 11 13M22 2l-7 20-4-9-9-4z' />
      </svg>
    )
  },
  {
    label: 'Click',
    icon: (
      <svg {...stepIcon}>
        <path d='M4 4l7 16 2.3-6.7L20 11z' />
        <path d='M14 14l5 5' />
      </svg>
    )
  },
  {
    label: 'Wait',
    icon: (
      <svg {...stepIcon}>
        <circle cx='12' cy='12' r='9' />
        <path d='M12 7.5V12l3 2' />
      </svg>
    )
  },
  {
    label: 'Extract data',
    icon: (
      <svg {...stepIcon}>
        <ellipse cx='12' cy='5.5' rx='8' ry='3' />
        <path d='M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6' />
        <path d='M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6' />
      </svg>
    )
  }
]

const StepTile = styled(Flex)(
  theme({ borderRadius: 5, bg: 'white' }),
  css`
    width: 54px;
    height: 54px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid ${tone.border};
    box-shadow: ${shadow.softer};
  `
)

const Connector = () => (
  <Flex
    css={{ flex: 1, alignItems: 'center', minWidth: '12px', marginTop: '27px' }}
  >
    <Box css={{ flex: 1, borderTop: `1.5px dashed ${tone.dotIdle}` }} />
    <svg
      width='7'
      height='10'
      viewBox='0 0 7 10'
      fill='none'
      stroke={tone.arrow}
      strokeWidth='1.6'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M1 1l4 4-4 4' />
    </svg>
  </Flex>
)

const AutomationPreview = () => (
  <Flex
    css={{
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '4px',
      marginTop: '30px'
    }}
  >
    {FLOW_STEPS.map((step, i) => (
      <React.Fragment key={step.label}>
        <Box css={{ textAlign: 'center' }}>
          <StepTile>{step.icon}</StepTile>
          <Box
            css={{
              fontSize: '11.5px',
              color: syntax.muted,
              marginTop: '10px',
              whiteSpace: 'nowrap'
            }}
          >
            {step.label}
          </Box>
        </Box>
        {i < FLOW_STEPS.length - 1 && <Connector />}
      </React.Fragment>
    ))}
  </Flex>
)

const SDK_LANGS = [
  { name: 'TypeScript', abbr: 'TS', bg: '#3178c6', fg: tone.white },
  { name: 'JavaScript', abbr: 'JS', bg: '#f7df1e', fg: tone.ink900 },
  { name: 'Python', abbr: 'Py', bg: '#3776ab', fg: tone.white },
  { name: 'PHP', abbr: 'php', bg: '#777bb3', fg: tone.white },
  { name: 'Ruby', abbr: 'Rb', bg: '#cc342d', fg: tone.white },
  { name: 'Go', abbr: 'Go', bg: '#00add8', fg: tone.white }
]

const LangBadge = styled(Flex)`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: 800;
  flex-shrink: 0;
`

const SdkPreview = () => (
  <Flex css={{ flexWrap: 'wrap', gap: '9px', marginTop: '24px' }}>
    {SDK_LANGS.map(l => (
      <Chip key={l.name}>
        <LangBadge css={{ background: l.bg, color: l.fg }}>{l.abbr}</LangBadge>
        {l.name}
      </Chip>
    ))}
    <Chip css={{ color: tone.muted }}>+3</Chip>
  </Flex>
)

const AutomationIcon = () => (
  <Glyph size={24} sw={1.7} stroke={TILE.automation.color} {...strokeIcon}>
    <rect x='3' y='4.5' width='18' height='14' rx='2.5' />
    <path d='M3 8.5h18' />
    <path
      d='M9 11.5v7.2l2.1-2.1 1.2 2.8 1.5-.6-1.2-2.8h2.8z'
      fill={TILE.automation.color}
      stroke={TILE.automation.color}
      strokeWidth='0.6'
    />
  </Glyph>
)

const SdkIcon = () => (
  <Glyph size={23} sw={1.7} stroke={TILE.sdk.color} strokeLinejoin='round'>
    <path d='M21 7.5 12 12 3 7.5 12 3z' />
    <path d='M3 7.5v9L12 21l9-4.5v-9' />
    <path d='M12 12v9' />
  </Glyph>
)

const CONVERT_INPUTS = [
  { name: 'document.pdf', abbr: 'PDF', bg: '#f43f3f' },
  { name: 'report.xlsx', abbr: 'XLSX', bg: '#1d7145' },
  { name: 'guide.docx', abbr: 'DOCX', bg: '#2b579a' },
  { name: 'slides.pptx', abbr: 'PPTX', bg: '#c43e1c' }
]

const FileBadge = ({ abbr, bg }) => (
  <svg width='27' height='27' viewBox='0 0 24 24'>
    <rect x='2.5' y='1.5' width='19' height='21' rx='4.5' fill={bg} />
    <text
      x='12'
      y='14.7'
      textAnchor='middle'
      fontSize={abbr.length > 3 ? '4.7' : '6.6'}
      fontWeight='800'
      fill={tone.white}
      letterSpacing='0.2'
    >
      {abbr}
    </text>
  </svg>
)

const OUT_ICON = {
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

const CONVERT_OUTPUTS = [
  {
    label: 'HTML',
    tile: '#e0d6fb',
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        stroke='#6d3fe0'
        strokeWidth='1.9'
        {...OUT_ICON}
      >
        <path d='M8 8l-4 4 4 4M16 8l4 4-4 4' />
      </svg>
    )
  },
  {
    label: 'Markdown',
    tile: '#7c4dff',
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        stroke={tone.white}
        strokeWidth='1.7'
        {...OUT_ICON}
      >
        <rect x='3' y='6' width='18' height='12' rx='2' />
        <path d='M6 15v-6l3 3 3-3v6M17 9v6M14.5 12.5 17 15l2.5-2.5' />
      </svg>
    )
  },
  {
    label: 'Text',
    tile: '#e0d6fb',
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        stroke='#6d3fe0'
        strokeWidth='2'
        {...OUT_ICON}
      >
        <path d='M5 5h14M12 5v14M9 19h6' />
      </svg>
    )
  },
  {
    label: 'PDF',
    tile: '#e0d6fb',
    icon: (
      <svg
        width='21'
        height='21'
        viewBox='0 0 24 24'
        stroke='#6d3fe0'
        strokeWidth='1.8'
        {...OUT_ICON}
      >
        <path d='M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z' />
        <path d='M14 3v5h5' />
      </svg>
    )
  }
]

const CONV_DASH =
  'repeating-linear-gradient(to right,#cbcfda 0 6px,transparent 6px 13px)'
const CONV_LINE = '#cbcfda'

const ConvCard = styled(Flex)(
  theme({ bg: 'white' }),
  css`
    width: 282px;
    height: 68px;
    align-items: center;
    gap: 18px;
    padding: 0 20px;
    border: 1px solid ${tone.border};
    border-radius: 18px;
    box-shadow: 0 10px 24px rgba(${SHADOW_INK}, 0.06);
    font-size: 20px;
    font-weight: 600;
    color: #2b3040;
    white-space: nowrap;
    flex-shrink: 0;
  `
)

const ConvOut = styled(Flex)`
  width: 262px;
  height: 68px;
  align-items: center;
  gap: 18px;
  padding: 0 18px;
  border-radius: 18px;
  background: #efeafd;
  font-size: 20px;
  font-weight: 600;
  color: #2b3040;
  white-space: nowrap;
`

const OutTile = styled(Flex)`
  width: 46px;
  height: 46px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const FlowColumn = styled(Box)`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`

const BusSvg = styled.svg`
  flex-shrink: 0;
`

const DashRun = styled.span`
  position: absolute;
  left: 0;
  height: 2px;
  background: ${CONV_DASH};
`

const LogoNode = () => (
  <Box
    css={{
      position: 'relative',
      flexShrink: 0,
      alignSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Box
      css={{
        position: 'absolute',
        width: '240px',
        height: '240px',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(236,72,153,0.20), rgba(124,77,255,0.16) 42%, rgba(255,255,255,0) 72%)',
        filter: 'blur(8px)'
      }}
    />
    <Flex
      css={{
        position: 'relative',
        width: '136px',
        height: '136px',
        borderRadius: '24px',
        background: tone.white,
        boxShadow:
          '0 18px 42px rgba(16,24,40,.16), 0 3px 8px rgba(16,24,40,.06)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '7px'
      }}
    >
      <img
        src={LOGO_URI}
        alt='Microlink'
        css={{ width: '60px', height: 'auto', display: 'block' }}
      />
      <Box
        as='span'
        css={{
          fontFamily: fonts.sans,
          fontSize: '21px',
          fontWeight: 700,
          color: '#111827',
          lineHeight: 1
        }}
      >
        microlink
      </Box>
    </Flex>
  </Box>
)

const INPUT_Y = [34, 122, 210, 298]
const OUTPUT_Y = [34, 122, 210, 298]

const FileConversionPreview = () => (
  <Box css={{ ...theme({ mt: 3 }), flex: 1 }}>
    <Box
      css={{
        border: '1px solid #e9ebf2',
        borderRadius: '24px',
        overflow: 'hidden'
      }}
    >
      <Box css={{ padding: '44px 34px 56px', overflowX: 'auto' }}>
        <Box css={{ minWidth: '1080px' }}>
          <Flex css={{ alignItems: 'stretch', height: '332px' }}>
            <FlowColumn css={{ gap: '20px' }}>
              {CONVERT_INPUTS.map(f => (
                <ConvCard key={f.name}>
                  <FileBadge abbr={f.abbr} bg={f.bg} />
                  {f.name}
                </ConvCard>
              ))}
            </FlowColumn>
            <Box css={{ position: 'relative', flex: 1, minWidth: '70px' }}>
              {INPUT_Y.map(y => (
                <DashRun key={y} css={{ right: 0, top: `${y - 1}px` }} />
              ))}
            </Box>
            <BusSvg width='126' height='332' viewBox='0 0 126 332'>
              <g
                fill='none'
                stroke={CONV_LINE}
                strokeWidth='2'
                strokeDasharray='6 7'
                strokeLinecap='round'
              >
                <path d='M0 34 C 82 34 72 149 126 149' />
                <path d='M0 122 C 78 122 72 149 126 149' />
                <path d='M0 210 C 78 210 72 183 126 183' />
                <path d='M0 298 C 82 298 72 183 126 183' />
              </g>
            </BusSvg>
            <LogoNode />
            <BusSvg width='126' height='332' viewBox='0 0 126 332'>
              <g
                fill='none'
                stroke={CONV_LINE}
                strokeWidth='2'
                strokeDasharray='6 7'
                strokeLinecap='round'
              >
                <path d='M0 149 C 54 149 44 34 126 34' />
                <path d='M0 149 C 54 149 48 122 126 122' />
                <path d='M0 183 C 54 183 48 210 126 210' />
                <path d='M0 183 C 54 183 44 298 126 298' />
              </g>
            </BusSvg>
            <Box css={{ position: 'relative', flex: 1, minWidth: '70px' }}>
              {OUTPUT_Y.map(y => (
                <React.Fragment key={y}>
                  <DashRun css={{ right: '12px', top: `${y - 1}px` }} />
                  <svg
                    width='12'
                    height='14'
                    viewBox='0 0 12 14'
                    fill='none'
                    stroke='#c3c7d2'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    css={{ position: 'absolute', right: 0, top: `${y - 7}px` }}
                  >
                    <path d='M2 1 L10 7 L2 13' />
                  </svg>
                </React.Fragment>
              ))}
            </Box>
            <FlowColumn css={{ justifyContent: 'center', gap: '20px' }}>
              {CONVERT_OUTPUTS.map(o => (
                <ConvOut key={o.label}>
                  <OutTile css={{ background: o.tile }}>{o.icon}</OutTile>
                  {o.label}
                </ConvOut>
              ))}
            </FlowColumn>
          </Flex>
        </Box>
      </Box>
      <Flex
        css={{
          alignItems: 'flex-start',
          gap: '24px',
          padding: '28px 42px 30px',
          borderTop: '1px solid #eeeef2'
        }}
      >
        <Flex
          css={{
            width: '62px',
            height: '62px',
            borderRadius: '16px',
            background: '#e9e3fb',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <svg width='34' height='34' viewBox='0 0 24 24' fill='#6d3fe0'>
            <path d='M11 2.5l1.5 5.2 5.2 1.5-5.2 1.5L11 15.9 9.5 10.7 4.3 9.2l5.2-1.5z' />
            <path d='M18.5 13.5l.7 2.4 2.4.7-2.4.7-.7 2.4-.7-2.4-2.4-.7 2.4-.7z' />
          </svg>
        </Flex>
        <Box>
          <Box css={{ fontWeight: 700, fontSize: '22px', color: tone.ink900 }}>
            Smart conversion
          </Box>
          <Box
            css={{
              fontSize: '17px',
              color: '#6b7180',
              fontWeight: 500,
              marginTop: '10px',
              lineHeight: 1.45
            }}
          >
            Automatically detects file type, extracts content, and delivers
            clean, structured output.
          </Box>
        </Box>
      </Flex>
    </Box>
  </Box>
)

const ConversionIcon = () => (
  <Glyph size={25} sw={1.7} stroke={TILE.conversion.color} {...strokeIcon}>
    <path d='M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z' />
    <path d='M13.5 3v5.5H19' />
    <path d='M9.2 13.4a3 3 0 0 1 5-1.1l.9.9' />
    <path d='M15.3 11.4v1.9h-1.9' />
    <path d='M14.8 16.1a3 3 0 0 1-5 1.1l-.9-.9' />
    <path d='M8.7 18.1v-1.9h1.9' />
  </Glyph>
)

const Products = () => (
  <Box>
    <Box
      css={theme({
        maxWidth: '1280px',
        mx: 'auto',
        textAlign: 'center',
        px: 4
      })}
    >
      <Sparkle width='44' height='44' viewBox='0 0 24 24' fill='none'>
        <defs>
          <linearGradient id='mlSparkGrad' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0' stopColor='#a855f7' />
            <stop offset='1' stopColor='#d946ef' />
          </linearGradient>
        </defs>
        <path
          d='M12 2 L13.6 9.2 L21 12 L13.6 14.8 L12 22 L10.4 14.8 L3 12 L10.4 9.2 Z'
          fill='url(#mlSparkGrad)'
        />
        <path
          d='M20 3 L20.7 5.3 L23 6 L20.7 6.7 L20 9 L19.3 6.7 L17 6 L19.3 5.3 Z'
          fill='url(#mlSparkGrad)'
          opacity='0.85'
        />
      </Sparkle>
      <Heading variant={null}>
        Everything <Heading as='span'>your software</Heading> needs
      </Heading>
      <Caption forwardedAs='p' css={theme({ mt: 3 })}>
        One simple API for all kinds of web data.
      </Caption>
    </Box>

    <GridArea>
      <Grid>
        <Row $template='1.1fr 1fr'>
          <Feature vertical='metadata' icon={<MetadataIcon />}>
            <MetadataPreview />
          </Feature>
          <Feature vertical='markdown' icon={<MarkdownIcon />}>
            <MarkdownPreview />
          </Feature>
        </Row>

        <Row $template='1fr 1.3fr'>
          <Feature vertical='pdf' icon={<PdfIcon />}>
            <PdfPreview />
          </Feature>
          <Feature vertical='screenshot' icon={<ScreenshotIcon />}>
            <ScreenshotPreview />
          </Feature>
        </Row>

        <Row $template='5fr 3fr 4fr'>
          <Feature vertical='html' icon={<CodeIcon stroke={TILE.html.color} />}>
            <HtmlPreview />
          </Feature>
          <Feature vertical='embed' icon={<EmbedIcon />}>
            <EmbedPreview />
          </Feature>
          <Feature vertical='preview' icon={<PreviewIcon />}>
            <LinkPreview />
          </Feature>
        </Row>

        <Feature vertical='conversion' icon={<ConversionIcon />}>
          <FileConversionPreview />
        </Feature>

        <Row $template='4fr 8fr'>
          <Feature vertical='technologies' icon={<TechIcon />}>
            <TechPreview />
          </Feature>
          <Feature
            vertical='function'
            icon={<CodeIcon stroke={TILE.function.color} />}
          >
            <FunctionPreview />
          </Feature>
        </Row>

        <Feature vertical='search' icon={<SearchIcon />}>
          <SearchPreview />
        </Feature>

        <Row $template='8fr 4fr'>
          <Feature vertical='automation' icon={<AutomationIcon />}>
            <AutomationPreview />
          </Feature>
          <Feature vertical='sdk' icon={<SdkIcon />}>
            <SdkPreview />
          </Feature>
        </Row>

        <Row $template='4fr 4fr 4fr'>
          <Feature vertical='lighthouse' icon={<LighthouseIcon />}>
            <LighthousePreview />
          </Feature>
          <Feature vertical='text' icon={<TextIcon />}>
            <TextPreview />
          </Feature>
          <Feature vertical='animated' icon={<AnimatedIcon />}>
            <AnimatedPreview />
          </Feature>
        </Row>

        <Row $template='1fr 1fr 1fr'>
          <Feature vertical='video' icon={<VideoIcon />}>
            <VideoPreview />
          </Feature>
          <Feature vertical='audio' icon={<AudioIcon />}>
            <AudioPreview />
          </Feature>
          <Feature vertical='logo' icon={<LogoIcon />}>
            <LogoPreview />
          </Feature>
        </Row>
      </Grid>
    </GridArea>
  </Box>
)

export default Products
