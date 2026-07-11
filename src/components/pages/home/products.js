import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import { HOME_CONTENT_WIDTH, PRODUCTS } from 'components/pages/home/catalog'
import { Microlink } from 'components/logos'
import { IframePreviewsShowcase } from 'components/pages/embed/IframePreviewsShowcase'
import { FileType } from 'components/icons/FileType'
import { trackEvent } from 'helpers/plausible'
import {
  theme,
  transition,
  fonts,
  colors,
  radii,
  layout,
  shadows,
  shadowInk,
  SECTION_VERTICAL_SPACING
} from 'theme'
import Subhead from 'components/elements/Subhead'
import Caption from 'components/patterns/Caption/Caption'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import React from 'react'
import {
  MousePointer as MousePointerIcon,
  Package as PackageIcon,
  Repeat as RepeatIcon
} from 'react-feather'

const MONO = fonts.mono
const GAP = 4

const tone = {
  ink: colors.black,
  ink900: colors.gray9,
  muted: colors.gray6,
  faint: colors.gray5,
  white: colors.white,
  surface: colors.white,
  surfaceDark: colors.gray9,
  neutral: colors.gray1,
  border: colors.gray2,
  borderSoft: colors.gray1,
  arrow: colors.gray4,
  dotIdle: colors.gray3
}

const syntax = {
  key: colors.link,
  str: colors.gray9,
  heading: colors.link,
  body: colors.gray8,
  punc: colors.gray,
  tag: colors.secondary,
  darkText: colors.white80,
  darkStr: colors.green3,
  muted: colors.gray6
}

const radius = {
  panel: radii[4],
  sm: radii[3]
}

const CARD_HOVER_SHADOW = `0 22px 46px -28px rgba(${shadowInk}, 0.35)`

const TILE = {
  metadata: { bg: colors.violet0, color: colors.violet7 },
  screenshot: { bg: colors.pink0, color: colors.pink6 },
  markdown: { bg: colors.indigo0, color: colors.indigo7 },
  html: { bg: colors.violet0, color: colors.violet7 },
  embed: { bg: colors.blue0, color: colors.blue7 },
  preview: {
    bg: `linear-gradient(135deg, ${colors.violet0}, ${colors.pink0})`,
    color: colors.violet7
  },
  pdf: { bg: colors.red0, color: colors.red6 },
  logo: { bg: colors.yellow0, color: colors.yellow7 },
  search: { bg: colors.blue0, color: colors.blue7 },
  technologies: { bg: colors.violet0, color: colors.violet7 },
  function: { bg: colors.green0, color: colors.green8 },
  text: { bg: colors.orange0, color: colors.orange6 },
  lighthouse: { bg: colors.teal0, color: colors.teal7 },
  video: { bg: colors.violet0, color: colors.violet7 },
  audio: { bg: colors.pink0, color: colors.pink6 },
  animated: { bg: colors.indigo0, color: colors.indigo7 },
  automation: { bg: colors.pink0, color: colors.pink6 },
  sdk: { bg: colors.blue0, color: colors.blue7 },
  conversion: { bg: colors.orange0, color: colors.orange8 }
}

const EXTRA = {
  automation: {
    label: 'Browser Automations',
    description: 'Automate actions in the browser and extract results',
    icon: MousePointerIcon,
    href: '/docs/guides/function/browser-interaction'
  },
  sdk: {
    label: 'Microlink SDK',
    description: 'The official SDK to integrate Microlink in your app',
    icon: PackageIcon,
    href: '/integrations/sdk'
  },
  conversion: {
    label: 'File conversion',
    description: 'Convert any file into HTML, Markdown, or clean text',
    icon: RepeatIcon,
    href: '/docs/guides/content-conversion'
  }
}

const CATALOG = { ...PRODUCTS, ...EXTRA }

const Grid = styled.div(
  theme({
    maxWidth: HOME_CONTENT_WIDTH,
    mx: 'auto',
    mt: 5,
    px: [3, 3, 4],
    pb: 5,
    gap: GAP,
    display: 'flex',
    flexDirection: 'column'
  })
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
  theme({
    p: 4,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 5,
    overflow: 'hidden',
    color: 'black',
    textDecoration: 'none',
    boxShadow: shadows[2],
    _hover: { color: 'black' }
  }),
  css`
    transition: border-color ${transition.medium},
      box-shadow ${transition.medium}, transform ${transition.medium};

    > a {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: ${props => props.$accent};
        transform: translateY(-3px);
        box-shadow: ${CARD_HOVER_SHADOW};
      }
      &:hover ${Arrow} {
        color: ${tone.ink};
        transform: translate(2px, -2px);
      }
    }
  `
)

const IconTile = styled(Flex)(
  theme({
    borderRadius: 4,
    width: '52px',
    height: '52px',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })
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

const Feature = ({ vertical, children }) => {
  const { label, description, icon: Icon, href } = CATALOG[vertical]
  const tile = TILE[vertical]
  return (
    <Card
      href={href}
      $accent={tile.color}
      onClick={() => trackEvent('home products grid', { product: label })}
    >
      <Flex css={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Flex css={theme({ gap: 3, alignItems: 'flex-start' })}>
          <IconTile css={{ background: tile.bg, color: tile.color }}>
            <Icon width='24px' height='24px' />
          </IconTile>
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
    background: ${tone.surface};
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
        color: colors.gray4,
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
    <Box css={{ color: syntax.heading }}># Microlink</Box>
    <Box css={{ height: '14px' }} />
    <Box>The universal API for web data.</Box>
    <Box css={{ height: '14px' }} />
    <Box css={{ color: syntax.heading }}>## Features</Box>
    <Box>- Built for speed</Box>
    <Box>- Reliable interface</Box>
    <Box>- Structured output</Box>
    <Box>- AI-ready content</Box>
    <Box>- Clean formatting</Box>
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
        background: colors.link
      }}
    />
    <Box
      as='span'
      css={{
        fontFamily: fonts.sans,
        fontWeight: 'bold',
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

const TextPreviewWrap = styled(Box)(
  theme({
    mt: 3,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })
)

const TextDocument = styled(Box)(
  theme({
    p: 3,
    border: 1,
    borderColor: 'gray2',
    borderRadius: 5,
    bg: 'white',
    overflow: 'hidden'
  }),
  css`
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.92),
        rgba(255, 255, 255, 0.98)
      ),
      radial-gradient(
        circle at 18% 8%,
        rgba(253, 126, 20, 0.08),
        transparent 34%
      ),
      radial-gradient(
        circle at 92% 16%,
        rgba(51, 154, 240, 0.08),
        transparent 36%
      );
  `
)

const TextDocHead = styled(Flex)(
  theme({
    alignItems: 'center',
    gap: 3,
    mb: 3
  })
)

const TextDocTile = styled(Flex)(
  theme({
    width: '42px',
    height: '42px',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    bg: 'orange0',
    color: 'orange6',
    flexShrink: 0
  }),
  css`
    svg {
      stroke: currentColor;
      stroke-width: 1.9;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `
)

const TextLine = styled(Box)(
  theme({
    height: '9px',
    borderRadius: 4,
    bg: 'gray2'
  })
)

const TextOutputCopy = styled(Box)(
  theme({
    fontFamily: 'mono',
    color: 'primary',
    fontSize: ['15px', '15px', '16px'],
    lineHeight: 2,
    mb: 3
  }),
  css`
    letter-spacing: 0;
  `
)

const TextPreview = () => (
  <TextPreviewWrap>
    <TextDocument>
      <TextDocHead>
        <TextDocTile>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
            <path d='M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z' />
            <path d='M14 3v5h5M9 13h6M9 17h5' />
          </svg>
        </TextDocTile>
        <Box>
          <TextLine css={theme({ width: '92px' })} />
          <TextLine css={theme({ width: '136px', mt: 2 })} />
        </Box>
      </TextDocHead>
      <TextOutputCopy>
        Microlink makes it easy to extract clean, readable text from any web
        page. No noise, just AI-ready content.
      </TextOutputCopy>
      <Box>
        <TextLine css={theme({ width: '78%', height: '8px' })} />
        <TextLine css={theme({ width: '58%', height: '8px', mt: 2 })} />
      </Box>
    </TextDocument>
  </TextPreviewWrap>
)

const ScreenshotPreview = () => (
  <Flex css={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
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
  </Flex>
)

const TrafficDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
`

const WindowDots = () => (
  <>
    <TrafficDot css={{ background: colors.fullscreen }} />
    <TrafficDot css={{ background: colors.minimize }} />
    <TrafficDot css={{ background: colors.close }} />
  </>
)

const MiniButton = styled.span`
  font-size: 12px;
  ${theme({ fontWeight: 'bold' })};
  padding: 9px 18px;
  border-radius: ${radius.sm};
`

const EmbedPreview = () => (
  <Flex
    css={theme({
      mt: 3,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    })}
  >
    <Box
      css={theme({
        width: '100%',
        maxWidth: ['300px', 'none', 'none', 'none']
      })}
    >
      <IframePreviewsShowcase
        minHeight={['380px', '380px', '480px', '480px']}
      />
    </Box>
  </Flex>
)

const Skel = styled.span`
  height: 8px;
  border-radius: 4px;
  background: ${colors.gray1};
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
              background: colors.gray3
            }}
          />
          <Skel
            css={{ width: '34%', height: '9px', background: colors.gray2 }}
          />
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

const PdfUrl = styled(Flex)(
  theme({
    alignItems: 'center',
    gap: 2,
    height: '48px',
    px: 3,
    minWidth: 0,
    flex: 1,
    bg: 'gray0',
    borderRadius: '9999px',
    fontWeight: 'regular',
    color: 'black80',
    fontSize: [0, 0, 1]
  })
)

const PdfOutput = styled(Flex)(
  theme({
    alignItems: 'center',
    gap: 2,
    height: '48px',
    px: 3,
    bg: 'red0',
    borderRadius: '9999px',
    fontSize: 1,
    fontWeight: 'bold',
    color: 'black',
    whiteSpace: 'nowrap',
    flexShrink: 0
  })
)

const PdfSheet = styled(Box)(
  theme({
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 3,
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 5,
    p: [3, 3, 4],
    overflow: 'hidden'
  })
)

const PdfBadge = styled(Flex)(
  theme({
    alignItems: 'center',
    justifyContent: 'center',
    bg: 'red7',
    color: 'white',
    borderRadius: 4,
    fontWeight: 'bold',
    boxShadow: '0 8px 18px rgba(240,62,62,.28)'
  })
)

const PdfLineGrid = styled(Box)(
  theme({
    display: 'grid',
    gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
    columnGap: 5,
    rowGap: 3
  })
)

const PdfFold = styled(Box)(
  theme({
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '48px',
    height: '48px',
    borderTopLeftRadius: 5,
    background: `linear-gradient(to top left, ${colors.white} 0%, ${colors.white} 50%, ${colors.gray3} 50%, ${colors.gray1} 70%)`,
    boxShadow: `-6px -6px 16px rgba(${shadowInk}, 0.05)`
  })
)

const PdfPreview = () => (
  <Box
    aria-hidden='true'
    css={theme({
      mt: 3,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    })}
  >
    <Flex css={theme({ alignItems: 'center', gap: 3 })}>
      <PdfUrl>
        <svg
          width='19'
          height='19'
          viewBox='0 0 24 24'
          fill='none'
          stroke={colors.gray7}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          css={theme({ flexShrink: 0 })}
        >
          <circle cx='12' cy='12' r='10' />
          <path d='M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20' />
        </svg>
        <Box
          as='span'
          css={theme({
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          })}
        >
          https://microlink.io
        </Box>
      </PdfUrl>
      <svg
        width='30'
        height='22'
        viewBox='0 0 30 22'
        fill='none'
        stroke={colors.gray4}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        css={theme({ flexShrink: 0, display: ['none', 'block'] })}
      >
        <path d='M2 11h24M18 3l8 8-8 8' />
      </svg>
      <PdfOutput>
        <FileType type='pdf' size={30} />
        PDF
      </PdfOutput>
    </Flex>

    <PdfSheet>
      <PdfBadge css={theme({ width: '52px', height: '30px', fontSize: 0 })}>
        PDF
      </PdfBadge>

      <PdfLineGrid>
        <Box css={theme({ minWidth: 0 })}>
          <Skel css={theme({ width: '92%', bg: 'gray3', mb: 2 })} />
          <Skel css={theme({ width: '64%', bg: 'gray3' })} />
        </Box>
        <Box css={theme({ display: ['none', 'none', 'block'] })}>
          <Skel css={theme({ width: '90%', bg: 'gray3', mb: 2 })} />
          <Skel css={theme({ width: '78%', bg: 'gray3', mb: 2 })} />
          <Skel css={theme({ width: '42%', bg: 'gray3' })} />
        </Box>
      </PdfLineGrid>

      <Flex css={theme({ alignItems: 'center', gap: 4 })}>
        <Box
          css={theme({
            flex: 1,
            minWidth: 0,
            color: 'link',
            fontSize: 2,
            fontWeight: 'bold',
            lineHeight: 0
          })}
        >
          Microlink
          <br />
          API Reference
        </Box>
        <Box
          css={theme({
            width: ['96px', '96px', '128px'],
            height: ['84px', '84px', '108px'],
            flexShrink: 0,
            borderRadius: 4,
            bg: 'violet1',
            overflow: 'hidden',
            position: 'relative'
          })}
        >
          <CornerSvg
            viewBox='0 0 128 108'
            preserveAspectRatio='none'
            width='100%'
            height='100%'
          >
            <circle cx='92' cy='32' r='13' fill={colors.violet3} />
            <path
              d='M0 108 L48 50 L82 86 L100 66 L128 94 L128 108 Z'
              fill={colors.violet3}
            />
          </CornerSvg>
        </Box>
      </Flex>

      <Box css={theme({ maxWidth: '72%' })}>
        <Skel css={theme({ width: '92%', bg: 'gray3', mb: 2 })} />
        <Skel css={theme({ width: '76%', bg: 'gray3', mb: 2 })} />
        <Skel css={theme({ width: '54%', bg: 'gray3' })} />
      </Box>

      <PdfFold />
    </PdfSheet>
  </Box>
)

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
          <LogoImg
            src={Microlink.logoUri}
            alt='Microlink logo'
            css={{ width }}
          />
        </LogoTile>
      ))}
    </Box>
    <Flex
      css={{
        marginTop: '12px',
        borderRadius: radius.sm,
        overflow: 'hidden',
        boxShadow: shadows[2]
      }}
    >
      {LOGO_PALETTE.map(c => (
        <Swatch key={c} css={{ background: c }} />
      ))}
    </Flex>
  </Box>
)

const SEARCH_RESULTS = [
  {
    name: 'Microlink',
    domain: 'microlink.io',
    url: 'microlink.io',
    title: 'Microlink — The universal API',
    description: 'One API to turn any URL into structured data.',
    tint: colors.gray9
  },
  {
    name: 'GitHub',
    domain: 'github.com',
    url: 'github.com/microlinkhq',
    title: 'microlinkhq · GitHub',
    description: 'Open source tools to turn websites into data.',
    tint: colors.black
  },
  {
    name: 'Hacker News',
    domain: 'news.ycombinator.com',
    url: 'news.ycombinator.com/item?id=1',
    title: 'Show HN: Microlink API',
    description: 'Extract structured data from any website.',
    tint: colors.orange6
  }
]

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
          boxShadow: shadows[1]
        }}
      >
        <svg
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke={colors.gray5}
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
            color: colors.link,
            fontWeight: 'bold',
            borderBottom: `2px solid ${colors.link}`,
            paddingBottom: '9px',
            marginBottom: '-9px'
          }}
        >
          All
        </Box>
        <span>News</span>
        <span>Images</span>
      </Flex>
      {SEARCH_RESULTS.map(result => (
        <Box key={result.url} css={{ marginBottom: '14px' }}>
          <Flex css={{ alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Flex
              css={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: result.tint,
                color: tone.white,
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '11px'
              }}
            >
              {result.name[0]}
            </Flex>
            <Box css={{ lineHeight: 1.1 }}>
              <Box css={{ fontSize: '12px', fontWeight: 'bold' }}>
                {result.name}
              </Box>
              <Box css={{ fontSize: '11px', color: tone.faint }}>
                {result.domain}
              </Box>
            </Box>
          </Flex>
          <Box
            css={{ color: colors.link, fontSize: '15px', fontWeight: 'bold' }}
          >
            {result.title}
          </Box>
          <Box
            css={{ color: syntax.muted, fontSize: '12.5px', marginTop: '3px' }}
          >
            {result.description}
          </Box>
        </Box>
      ))}
    </Box>
    <Box
      css={theme({
        flex: 1,
        position: 'relative',
        minHeight: ['320px', '320px', 0, 0]
      })}
    >
      <CodeBox
        css={{
          position: 'absolute',
          inset: 0,
          marginTop: 0,
          whiteSpace: 'pre',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
      >
        <NodeLabel>Structured data</NodeLabel>
        <Box>
          {'[\n'}
          {SEARCH_RESULTS.map((result, i) => (
            <React.Fragment key={result.url}>
              {'  {\n    '}
              <K>&quot;title&quot;</K>: <V>&quot;{result.title}&quot;</V>
              {',\n    '}
              <K>&quot;url&quot;</K>: <V>&quot;https://{result.url}&quot;</V>
              {',\n    '}
              <K>&quot;position&quot;</K>: <V>{i + 1}</V>
              {'\n  }'}
              {i < SEARCH_RESULTS.length - 1 ? ',' : ''}
              {'\n'}
            </React.Fragment>
          ))}
          ]
        </Box>
      </CodeBox>
    </Box>
  </Flex>
)

const Chip = styled(Flex)(
  theme({ gap: 2, borderRadius: 4, p: 2, fontSize: 0 }),
  css`
    align-items: center;
    border: 1px solid ${tone.border};
    ${theme({ fontWeight: 'bold' })};
  `
)

const TechPreview = () => (
  <Flex
    css={{
      flex: 1,
      flexWrap: 'wrap',
      alignContent: 'center',
      gap: '9px',
      marginTop: '24px'
    }}
  >
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
    css={{
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '6px',
      marginTop: '26px'
    }}
  >
    {LIGHTHOUSE.map(([score, label]) => (
      <Flex
        key={label}
        css={{ flexDirection: 'column', alignItems: 'center', width: '60px' }}
      >
        <Flex
          css={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: colors.green0,
            border: `3px solid ${colors.green5}`,
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '18px',
            color: colors.green8
          }}
        >
          {score}
        </Flex>
        <Box
          css={{
            fontSize: '11.5px',
            color: syntax.body,
            marginTop: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          {label}
        </Box>
      </Flex>
    ))}
  </Flex>
)

const VideoPreview = () => (
  <Flex
    css={theme({
      flex: 1,
      mt: 3,
      gap: 3,
      flexDirection: 'column',
      justifyContent: 'center'
    })}
  >
    <Box
      css={{
        borderRadius: radius.panel,
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '16 / 9',
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
  </Flex>
)

const WAVE = [
  30, 55, 80, 45, 95, 60, 35, 70, 50, 85, 40, 65, 30, 55, 45, 72, 38, 58
]

const Bar = styled.span`
  flex: 1;
  border-radius: 2px;
`

const AudioPreview = () => (
  <Box
    css={theme({
      flex: 1,
      mt: '26px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    })}
  >
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
          css={{
            height: `${h}%`,
            background: h >= 80 ? colors.pink6 : colors.pink2
          }}
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
          background: colors.gray2,
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
        borderRadius: radius.panel,
        overflow: 'hidden'
      }}
    >
      <Flex
        css={{
          padding: '10px 14px',
          gap: '7px',
          borderBottom: `1px solid ${colors.gray1}`
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
          {[80, 60, 72, 52, 66].map((w, i) => (
            <Skel
              key={i}
              css={{
                width: `${w}%`,
                height: '6px',
                background: i === 0 ? colors.indigo1 : colors.gray1
              }}
            />
          ))}
        </Box>
        <Box css={{ flex: 1, padding: '14px 14px 18px' }}>
          <Skel
            css={{
              width: '52%',
              background: colors.gray2,
              marginBottom: '11px'
            }}
          />
          <Box
            css={{
              height: '18px',
              width: '100%',
              background: `linear-gradient(90deg, ${colors.indigo2}, ${colors.indigo1})`,
              borderRadius: '5px',
              marginBottom: '14px'
            }}
          />
          <Box
            css={{
              height: '110px',
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
              height='82'
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
        boxShadow: shadows[3],
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
          background: colors.red7
        }}
      />
      <Box
        as='span'
        css={{
          fontSize: '16px',
          fontWeight: 'bold',
          letterSpacing: '2px',
          color: colors.gray9
        }}
      >
        REC 00:08
      </Box>
    </Flex>
  </Box>
)

const stepIcon = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: colors.gray8,
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
    box-shadow: ${shadows[1]};
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
    css={theme({
      flex: 1,
      mt: 3,
      flexDirection: 'column',
      justifyContent: 'center'
    })}
  >
    <Flex
      css={{
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '4px'
      }}
    >
      {FLOW_STEPS.map((step, i) => (
        <React.Fragment key={step.label}>
          <Box css={{ textAlign: 'center' }}>
            <StepTile>{step.icon}</StepTile>
            <Box
              css={{
                fontSize: '11.5px',
                color: syntax.body,
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
  <Flex
    css={{
      flex: 1,
      flexWrap: 'wrap',
      alignContent: 'center',
      gap: '9px',
      marginTop: '24px'
    }}
  >
    {SDK_LANGS.map(l => (
      <Chip key={l.name}>
        <LangBadge css={{ background: l.bg, color: l.fg }}>{l.abbr}</LangBadge>
        {l.name}
      </Chip>
    ))}
    <Chip css={{ color: tone.muted }}>+3</Chip>
  </Flex>
)

const CONVERT_INPUTS = [
  { name: 'document.pdf', type: 'pdf' },
  { name: 'report.xlsx', type: 'xlsx' },
  { name: 'guide.docx', type: 'docx' },
  { name: 'slides.pptx', type: 'pptx' }
]

const CONVERT_OUTPUTS = ['html', 'markdown', 'text', 'pdf']

const CONV_DASH = `repeating-linear-gradient(to right,${colors.gray4} 0 6px,transparent 6px 13px)`
const CONV_LINE = colors.gray4

const ConvCard = styled(Flex)(
  theme({
    bg: 'white',
    width: '260px',
    height: '68px',
    alignItems: 'center',
    gap: '18px',
    px: '20px',
    border: 1,
    borderColor: 'gray2',
    borderRadius: '18px',
    fontSize: 2,
    fontWeight: 'bold',
    color: 'primary',
    whiteSpace: 'nowrap',
    flexShrink: 0
  })
)

const OutTile = styled(Flex)(
  theme({
    width: '46px',
    height: '46px',
    borderRadius: '14px',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })
)

const FlowColumn = styled(Box)(
  theme({ flexShrink: 0, display: 'flex', flexDirection: 'column' })
)

const BusSvg = styled.svg(theme({ flexShrink: 0 }))

const DashRun = styled.span(
  theme({
    position: 'absolute',
    left: 0,
    height: '2px',
    background: CONV_DASH
  })
)

const LogoNode = () => (
  <Box
    css={theme({
      position: 'relative',
      flexShrink: 0,
      alignSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    })}
  >
    <Box
      css={{
        ...theme({
          position: 'absolute',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${rgba(
            colors.pink6,
            0.2
          )}, ${rgba(colors.violet6, 0.16)} 42%, ${rgba(colors.white, 0)} 72%)`
        }),
        filter: 'blur(8px)'
      }}
    />
    <Flex
      css={theme({
        position: 'relative',
        width: '136px',
        height: '136px',
        borderRadius: '50%',
        bg: 'white',
        boxShadow: 0,
        alignItems: 'center',
        justifyContent: 'center'
      })}
    >
      <img
        src={Microlink.logoUri}
        alt='Microlink'
        css={theme({ width: '60px', height: 'auto', display: 'block' })}
      />
    </Flex>
  </Box>
)

const sheetStyle = borderColor => ({
  position: 'absolute',
  background: tone.surface,
  border: `1px solid ${borderColor}`,
  borderRadius: radius.panel
})

const PanelStack = ({ sheetBorder, children }) => (
  <Box css={{ position: 'relative' }}>
    <Box
      css={{
        ...sheetStyle(sheetBorder),
        top: '14px',
        left: '14px',
        right: '-14px',
        bottom: '-14px'
      }}
    />
    <Box
      css={{
        ...sheetStyle(sheetBorder),
        top: '7px',
        left: '7px',
        right: '-7px',
        bottom: '-7px'
      }}
    />
    <Box css={{ position: 'relative' }}>{children}</Box>
  </Box>
)

const FlowArrow = styled(Flex)`
  align-items: center;
  flex-shrink: 0;
  margin: 0 16px;
  position: relative;
  top: 7px;
  left: 7px;

  @media (max-width: 980px) {
    transform: rotate(90deg);
    margin: 14px 0;
  }
`

const DeniedSite = () => (
  <Box css={{ flex: 1, minWidth: 0, width: '100%' }}>
    <PanelStack sheetBorder={tone.border}>
      <Box
        css={{
          background: tone.surface,
          border: `1px solid ${tone.border}`,
          borderRadius: radius.panel,
          overflow: 'hidden'
        }}
      >
        <Flex
          css={{
            padding: '9px 12px',
            gap: '6px',
            borderBottom: `1px solid ${tone.borderSoft}`
          }}
        >
          <TrafficDot
            css={{ width: '7px', height: '7px', background: tone.arrow }}
          />
          <TrafficDot
            css={{ width: '7px', height: '7px', background: tone.arrow }}
          />
          <TrafficDot
            css={{ width: '7px', height: '7px', background: tone.arrow }}
          />
        </Flex>
        <Box css={{ padding: '20px 16px 18px' }}>
          <Flex css={{ justifyContent: 'center', marginBottom: '12px' }}>
            <svg width='46' height='46' viewBox='0 0 24 24' fill='none'>
              <path
                d='M12 2.5l7.5 3.2v5.8c0 4.5-3.1 8.6-7.5 9.7-4.4-1.1-7.5-5.2-7.5-9.7V5.7L12 2.5z'
                fill={tone.white}
                stroke={colors.violet6}
                strokeWidth='1.3'
              />
              <path
                d='M9.9 11.2V9.8a2.1 2.1 0 0 1 4.2 0v1.4'
                fill='none'
                stroke={colors.violet7}
                strokeWidth='1.4'
              />
              <rect
                x='8.7'
                y='11'
                width='6.6'
                height='5.2'
                rx='1.4'
                fill={colors.violet7}
              />
              <circle cx='12' cy='13' r='0.9' fill={tone.white} />
              <path
                d='M12 13.7v1.1'
                stroke={tone.white}
                strokeWidth='0.9'
                strokeLinecap='round'
              />
            </svg>
          </Flex>
          <Box
            css={{
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: colors.gray8,
              lineHeight: 1.4,
              marginBottom: '18px'
            }}
          >
            Anti-scraping
            <br />
            protection
          </Box>
          <Flex css={{ gap: '12px', alignItems: 'flex-start' }}>
            <Flex
              css={{
                flex: 1,
                flexDirection: 'column',
                gap: '9px',
                paddingTop: '2px'
              }}
            >
              <Skel css={{ background: colors.gray2 }} />
              <Skel css={{ background: colors.gray2, width: '92%' }} />
              <Skel css={{ background: colors.gray2, width: '62%' }} />
            </Flex>
            <Box
              css={{
                width: '52px',
                height: '48px',
                borderRadius: radius.sm,
                background: colors.gray2,
                flexShrink: 0
              }}
            />
          </Flex>
        </Box>
      </Box>
    </PanelStack>
  </Box>
)

const CodePanel = () => (
  <Box
    css={{
      flex: 1.1,
      minWidth: 0,
      width: '100%',
      position: 'relative',
      paddingTop: '14px'
    }}
  >
    <Box
      css={{
        position: 'absolute',
        top: 0,
        left: '18px',
        background: colors.violet0,
        border: `1px solid ${colors.violet1}`,
        borderRadius: '7px',
        padding: '4px 13px',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.02em',
        color: colors.violet7,
        zIndex: 2
      }}
    >
      HTML
    </Box>
    <PanelStack sheetBorder={colors.violet1}>
      <Box
        css={{
          border: `1px solid ${colors.violet1}`,
          borderRadius: radius.panel,
          background: tone.surface,
          padding: '18px 16px 16px',
          fontFamily: MONO,
          fontSize: '11px',
          lineHeight: 1.9,
          color: colors.violet7,
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}
      >
        <div>&lt;html&gt;</div>
        <Box css={{ paddingLeft: '16px' }}>&lt;head&gt; ... &lt;/head&gt;</Box>
        <Box css={{ paddingLeft: '16px' }}>&lt;body&gt;</Box>
        <Box
          css={{
            background: colors.violet0,
            borderRadius: '6px',
            margin: '3px -6px',
            padding: '3px 6px'
          }}
        >
          <Box css={{ paddingLeft: '20px' }}>
            &lt;div class=
            <Box as='span' css={{ color: colors.red6 }}>
              &quot;content&quot;
            </Box>
            &gt;
          </Box>
          <Box css={{ paddingLeft: '36px' }}>...</Box>
          <Box css={{ paddingLeft: '20px' }}>&lt;/div&gt;</Box>
        </Box>
        <Box css={{ paddingLeft: '16px' }}>&lt;/body&gt;</Box>
        <div>&lt;/html&gt;</div>
      </Box>
    </PanelStack>
  </Box>
)

const FlowRow = styled(Flex)`
  width: 100%;
  align-items: center;
  flex-direction: row;
  padding: 8px 14px 22px 0;

  @media (max-width: 980px) {
    flex-direction: column;
  }
`

const HtmlPreview = () => (
  <Flex css={theme({ mt: 3, flex: 1, alignItems: 'center' })}>
    <FlowRow>
      <DeniedSite />
      <FlowArrow aria-hidden='true'>
        <Flex
          css={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: colors.violet0,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke={colors.violet7}
            strokeWidth='2.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M5 12h14M13 6l6 6-6 6' />
          </svg>
        </Flex>
      </FlowArrow>
      <CodePanel />
    </FlowRow>
  </Flex>
)

const LANE_Y = [34, 122, 210, 298]

const FileConversionPreview = () => (
  <Box css={theme({ mt: 3, flex: 1 })}>
    <Box
      css={theme({
        border: 1,
        borderColor: 'gray2',
        borderRadius: '24px',
        overflow: 'hidden'
      })}
    >
      <Box
        css={theme({
          pt: '40px',
          px: 3,
          pb: '56px',
          overflowX: 'auto'
        })}
      >
        <Box css={theme({ minWidth: '980px' })}>
          <Flex css={theme({ alignItems: 'stretch', height: '332px' })}>
            <FlowColumn css={theme({ gap: '20px' })}>
              {CONVERT_INPUTS.map(f => (
                <ConvCard key={f.name}>
                  <FileType type={f.type} size={38} />
                  {f.name}
                </ConvCard>
              ))}
            </FlowColumn>
            <Box
              css={theme({ position: 'relative', flex: 1, minWidth: '50px' })}
            >
              {LANE_Y.map(y => (
                <DashRun key={y} css={theme({ right: 0, top: `${y - 1}px` })} />
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
                <path d='M126 166 C 72 166 82 34 0 34' />
                <path d='M126 166 C 72 166 78 122 0 122' />
                <path d='M126 166 C 72 166 78 210 0 210' />
                <path d='M126 166 C 72 166 82 298 0 298' />
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
                <path d='M0 166 C 54 166 44 34 126 34' />
                <path d='M0 166 C 54 166 48 122 126 122' />
                <path d='M0 166 C 54 166 48 210 126 210' />
                <path d='M0 166 C 54 166 44 298 126 298' />
              </g>
            </BusSvg>
            <Box
              css={theme({ position: 'relative', flex: 1, minWidth: '50px' })}
            >
              {LANE_Y.map(y => (
                <React.Fragment key={y}>
                  <DashRun css={theme({ right: '12px', top: `${y - 1}px` })} />
                  <svg
                    width='12'
                    height='14'
                    viewBox='0 0 12 14'
                    fill='none'
                    stroke={colors.gray4}
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    css={theme({
                      position: 'absolute',
                      right: 0,
                      top: `${y - 7}px`
                    })}
                  >
                    <path d='M2 1 L10 7 L2 13' />
                  </svg>
                </React.Fragment>
              ))}
            </Box>
            <FlowColumn css={theme({ justifyContent: 'center', gap: '20px' })}>
              {CONVERT_OUTPUTS.map(vertical => {
                const { label, icon: Icon } = PRODUCTS[vertical]
                return (
                  <ConvCard key={label}>
                    <OutTile css={theme({ bg: 'violet1', color: 'violet7' })}>
                      <Icon width='22px' height='22px' />
                    </OutTile>
                    {label}
                  </ConvCard>
                )
              })}
            </FlowColumn>
          </Flex>
        </Box>
      </Box>
    </Box>
  </Box>
)

const Products = () => (
  <Box as='section' css={theme({ pt: SECTION_VERTICAL_SPACING })}>
    <Box
      css={theme({
        maxWidth: layout.large,
        mx: 'auto',
        textAlign: 'center',
        px: 3
      })}
    >
      <Subhead>
        Turn any link
        <br />
        into{' '}
        <Subhead variant='gradient' as='span'>
          what you need
        </Subhead>
      </Subhead>
      <Caption forwardedAs='p' css={theme({ pt: [3, 3, 4, 4] })}>
        Screenshots, PDFs, clean text, data & more. One simple request, any
        format.
      </Caption>
    </Box>

    <Grid>
      <Row $template='1.1fr 1fr'>
        <Feature vertical='metadata'>
          <MetadataPreview />
        </Feature>
        <Feature vertical='markdown'>
          <MarkdownPreview />
        </Feature>
      </Row>

      <Row $template='1fr 1.3fr'>
        <Feature vertical='pdf'>
          <PdfPreview />
        </Feature>
        <Feature vertical='screenshot'>
          <ScreenshotPreview />
        </Feature>
      </Row>

      <Row $template='1fr 1fr'>
        <Feature vertical='html'>
          <HtmlPreview />
        </Feature>
        <Feature vertical='embed'>
          <EmbedPreview />
        </Feature>
      </Row>

      <Feature vertical='conversion'>
        <FileConversionPreview />
      </Feature>

      <Row $template='4fr 8fr'>
        <Feature vertical='technologies'>
          <TechPreview />
        </Feature>
        <Feature vertical='function'>
          <FunctionPreview />
        </Feature>
      </Row>

      <Row $template='8fr 4fr'>
        <Feature vertical='search'>
          <SearchPreview />
        </Feature>
        <Feature vertical='preview'>
          <LinkPreview />
        </Feature>
      </Row>

      <Row $template='8fr 4fr'>
        <Feature vertical='automation'>
          <AutomationPreview />
        </Feature>
        <Feature vertical='logo'>
          <LogoPreview />
        </Feature>
      </Row>

      <Row $template='1fr 1fr 1fr'>
        <Feature vertical='video'>
          <VideoPreview />
        </Feature>
        <Feature vertical='text'>
          <TextPreview />
        </Feature>
        <Feature vertical='animated'>
          <AnimatedPreview />
        </Feature>
      </Row>

      <Row $template='4fr 4fr 4fr'>
        <Feature vertical='lighthouse'>
          <LighthousePreview />
        </Feature>
        <Feature vertical='sdk'>
          <SdkPreview />
        </Feature>
        <Feature vertical='audio'>
          <AudioPreview />
        </Feature>
      </Row>
    </Grid>
  </Box>
)

export default Products
