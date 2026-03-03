import {
  borders,
  colors,
  fonts,
  gradient,
  layout,
  transition,
  theme,
  textGradient,
  breakpoints
} from 'theme'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import Faq from 'components/patterns/Faq/Faq'
import ArrowLink from 'components/patterns/ArrowLink'
import { cdnUrl } from 'helpers/cdn-url'
import styled, { keyframes, css } from 'styled-components'
import React, { useState, useRef, useEffect } from 'react'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import FeatherIcon from 'components/icons/Feather'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { Zap, Code, Gift, TrendingUp } from 'react-feather'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

/* ---------------------------------------------------------------------------
 * Keyframes
 * --------------------------------------------------------------------------- */

const fillBar = keyframes`
  from { width: 0; }
  to { width: var(--bar-width); }
`

const countUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`

/* ---------------------------------------------------------------------------
 * useInView hook
 * --------------------------------------------------------------------------- */

function useInView (options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, ...options }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

/* ---------------------------------------------------------------------------
 * Styled primitives
 * --------------------------------------------------------------------------- */

const Section = styled(Box)`
  ${theme({
    py: [5, 5, 6, 6],
    px: [3, 3, 4, 4]
  })}
`

const SectionInner = styled(Container)`
  ${theme({
    maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
    alignItems: 'center',
    pt: 0
  })}
`

const Badge = styled(Caps)`
  display: inline-flex;
  align-items: center;
  ${theme({
    fontSize: '11px',
    fontWeight: 'bold',
    px: '10px',
    py: '4px',
    borderRadius: '20px',
    letterSpacing: '0.08em'
  })}
`

const GradientText = styled('span')`
  ${css`
    ${textGradient}
  `}
`

const HeroVideoDesktop = styled.video`
  display: none;
  max-width: 1150px;
  width: 100%;
  height: auto;
  border-radius: 18px;
  box-shadow: 0 25px 50px rgba(15, 23, 42, 0.35),
    0 0 0 1px rgba(15, 23, 42, 0.12);
  @media screen and (min-width: ${breakpoints[1]}) {
    display: block;
  }
`

const HeroImageMobile = styled.img`
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  @media screen and (min-width: ${breakpoints[1]}) {
    display: none;
  }
`

const CodeBlock = styled('pre')`
  ${theme({
    fontFamily: 'mono',
    fontSize: '13px',
    lineHeight: '1.7',
    p: 4,
    borderRadius: 3,
    border: 1,
    borderColor: 'black10',
    m: 0
  })}
  overflow-x: auto;
  white-space: pre;
  tab-size: 2;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const InlineCode = styled('code')`
  ${theme({
    fontFamily: 'mono',
    fontSize: '13px',
    px: '6px',
    py: '2px',
    borderRadius: 1,
    bg: 'black05'
  })}
`

/* ---------------------------------------------------------------------------
 * Comparison Table
 * --------------------------------------------------------------------------- */

const TableWrapper = styled(Box)`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  ${theme({ borderRadius: 3 })}
`

const Table = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  ${theme({
    fontFamily: 'sans',
    fontSize: [0, 0, 1, 1]
  })}
`

const Th = styled('th')`
  text-align: left;
  white-space: nowrap;
  ${theme({
    px: [2, 3, 3, 3],
    py: 3,
    fontWeight: 'bold',
    borderBottom: 1,
    borderColor: 'black10'
  })}

  &:first-child {
    ${theme({ pl: [3, 4] })}
  }
`

const Td = styled('td')`
  ${theme({
    px: [2, 3, 3, 3],
    py: [2, 3, 3, 3],
    borderBottom: 1,
    borderColor: 'black05'
  })}
  vertical-align: top;

  &:first-child {
    ${theme({ pl: [3, 4], fontWeight: 'regular' })}
  }
`

const Check = () => (
  <span
    css={{ color: colors.green7, fontSize: '18px', lineHeight: 1 }}
    aria-label='Yes'
    role='img'
  >
    ✓
  </span>
)

const Cross = () => (
  <span
    css={{ color: colors.red5, fontSize: '18px', lineHeight: 1, opacity: 0.7 }}
    aria-label='No'
    role='img'
  >
    ✕
  </span>
)

const Partial = ({ children }) => (
  <span css={{ color: colors.yellow7, fontSize: '14px' }}>
    {children || '~'}
  </span>
)

const COMPARISON_DATA = [
  // Both
  { feature: 'Screenshot capture', microlink: true, screenshotone: true },
  { feature: 'Full-page screenshots', microlink: true, screenshotone: true },
  {
    feature: 'Element-level capture (CSS selector)',
    microlink: true,
    screenshotone: true
  },
  {
    feature: 'PDF generation',
    microlink: true,
    screenshotone: true,
    highlight: true
  },
  { feature: 'HTML rendering', microlink: true, screenshotone: true },
  { feature: 'Animated GIF output', microlink: true, screenshotone: true },
  { feature: 'Video output', microlink: true, screenshotone: true },
  { feature: 'Dark/light mode capture', microlink: true, screenshotone: true },
  { feature: 'Device emulation presets', microlink: true, screenshotone: true },
  { feature: 'Custom JS/CSS injection', microlink: true, screenshotone: true },
  { feature: 'Custom HTTP headers', microlink: true, screenshotone: true },
  { feature: 'Custom cookies', microlink: true, screenshotone: true },
  {
    feature: 'Hide elements (CSS selectors)',
    microlink: true,
    screenshotone: true
  },
  {
    feature: 'Click/scroll interactions',
    microlink: true,
    screenshotone: true
  },
  { feature: 'Wait for selector', microlink: true, screenshotone: true },
  { feature: 'Cookie banner blocking', microlink: true, screenshotone: true },
  { feature: 'Ad blocking', microlink: true, screenshotone: true },
  { feature: 'Signed request URLs', microlink: true, screenshotone: true },
  { feature: 'Built-in response cache', microlink: true, screenshotone: true },
  { feature: 'MCP server', microlink: true, screenshotone: true },
  { feature: 'Markdown rendering', microlink: true, screenshotone: true },
  { feature: 'Custom proxy support', microlink: true, screenshotone: true },
  // Microlink-only
  {
    feature: 'Built-in proxy',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  {
    feature: 'Metadata extraction',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  {
    feature: 'Link previews SDK',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  {
    feature: 'Browser chrome overlay',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  {
    feature: 'Direct embed (no backend)',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  {
    feature: 'Open-source core',
    microlink: true,
    screenshotone: false,
    highlight: true
  },
  { feature: 'Remote JS execution', microlink: true, screenshotone: false },
  { feature: '240+ CDN edge nodes', microlink: true, screenshotone: false },
  // ScreenshotOne-only / partial
  { feature: 'GPU rendering', microlink: 'on demand', screenshotone: true },
  {
    feature: 'No-code integrations (Zapier, Make...)',
    microlink: 'partial',
    screenshotone: true
  },
  { feature: 'Async + webhooks', microlink: false, screenshotone: true },
  { feature: 'S3 direct upload', microlink: false, screenshotone: true },
  { feature: 'Bulk screenshots', microlink: false, screenshotone: true },
  { feature: 'Geolocation targeting', microlink: false, screenshotone: true },
  {
    feature: 'OpenAI Vision integration',
    microlink: false,
    screenshotone: true
  },
  {
    feature: 'Team organizations / roles',
    microlink: false,
    screenshotone: true
  }
]

const CellValue = ({ value, note }) => {
  if (value === true) return <Check />
  if (value === false) return <Cross />
  if (value === 'partial' || value === 'on demand') {
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1)
    return <Partial>{capitalized}</Partial>
  }
  return <span>{value}</span>
}

const ComparisonTable = () => (
  <TableWrapper>
    <Table>
      <thead>
        <tr css={{ background: colors.gray0 }}>
          <Th css={{ minWidth: '200px' }}>Feature</Th>
          <Th css={{ textAlign: 'center', minWidth: '120px' }}>
            <span css={textGradient}>Microlink</span>
          </Th>
          <Th
            css={{
              textAlign: 'center',
              minWidth: '120px',
              color: colors.black60
            }}
          >
            ScreenshotOne
          </Th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, screenshotone, highlight, note }) => (
            <tr
              key={feature}
              css={{
                background: highlight
                  ? 'rgba(6, 125, 247, 0.03)'
                  : 'transparent',
                '&:hover': { background: colors.gray0 }
              }}
            >
              <Td>
                {feature}
                {note && (
                  <Text
                    css={theme({
                      fontSize: '11px',
                      color: 'black40',
                      pt: 1,
                      lineHeight: 1
                    })}
                    as='div'
                  >
                    {note}
                  </Text>
                )}
              </Td>
              <Td css={{ textAlign: 'center' }}>
                <CellValue value={microlink} />
              </Td>
              <Td css={{ textAlign: 'center' }}>
                <CellValue value={screenshotone} />
              </Td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  </TableWrapper>
)

/* ---------------------------------------------------------------------------
 * Speed Benchmark Visualization
 * --------------------------------------------------------------------------- */

const BENCHMARKS = [
  {
    label: 'Simple page',
    url: 'example.com',
    sublabel: 'PNG, 1280×800',
    microlink: 1.38,
    screenshotone: 2.93,
    unit: 's'
  },
  {
    label: 'Full-page capture',
    url: 'news.ycombinator.com',
    sublabel: 'JPEG, 1440×1080, full page',
    microlink: 3.46,
    screenshotone: 6.56,
    unit: 's'
  },
  {
    label: 'Their own site',
    url: 'screenshotone.com',
    sublabel: 'PNG, 1920×1080, full page',
    microlink: 5.85,
    screenshotone: 10.33,
    unit: 's'
  },
  {
    label: 'Large landing page',
    url: 'vercel.com',
    sublabel: 'JPEG, 1920×1080, full page',
    microlink: 7.46,
    screenshotone: 10.57,
    unit: 's'
  },
  {
    label: 'Tablet viewport',
    url: 'github.com/trending',
    sublabel: 'PNG, 768×1024',
    microlink: 3.59,
    screenshotone: 6.09,
    unit: 's'
  }
]

const BarContainer = styled(Box)`
  position: relative;
  height: 32px;
  border-radius: 6px;
  overflow: hidden;
  background: ${colors.gray1};
`

const BarFill = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  font-size: 13px;
  font-weight: 700;
  font-family: ${fonts.mono};
  color: white;
  min-width: 60px;
  will-change: width;

  @media (prefers-reduced-motion: no-preference) {
    &[data-animate='true'] {
      animation: ${fillBar} 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      animation-delay: var(--delay);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    width: var(--bar-width) !important;
  }
`

const SpeedLabel = styled(Text)`
  ${theme({
    fontWeight: 'bold',
    fontSize: [1, 1, 2, 2],
    pb: 1
  })}
`

const MultiplierBadge = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${theme({
    fontFamily: 'mono',
    fontSize: '13px',
    fontWeight: 'bold',
    px: 2,
    py: 1,
    borderRadius: 2,
    ml: 2
  })}
  background: ${colors.green0};
  color: ${colors.green8};
  white-space: nowrap;

  @media (prefers-reduced-motion: no-preference) {
    &[data-animate='true'] {
      animation: ${countUp} 0.5s ease-out forwards;
      animation-delay: var(--delay);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
  }
`

const BenchmarkRow = ({ benchmark, index, inView }) => {
  const { label, sublabel, microlink, screenshotone, unit, url } = benchmark
  const maxVal = Math.max(...BENCHMARKS.map(b => b.screenshotone)) * 1.1
  const mlWidth = `${Math.max((microlink / maxVal) * 100, 8)}%`
  const soWidth = `${Math.max((screenshotone / maxVal) * 100, 8)}%`
  const multiplier = (screenshotone / microlink).toFixed(1)
  const microlinkWins = screenshotone > microlink

  return (
    <Box css={theme({ pb: [2], pt: [3, 3, 4, 4] })}>
      <Flex css={{ alignItems: 'baseline', flexWrap: 'wrap' }}>
        <SpeedLabel>{label}</SpeedLabel>
        {microlinkWins && (
          <MultiplierBadge
            data-animate={inView ? 'true' : 'false'}
            style={{ '--delay': `${index * 0.3 + 1}s` }}
          >
            {multiplier}× faster
          </MultiplierBadge>
        )}
      </Flex>
      <Text
        css={theme({
          fontSize: '14px',
          color: 'black80',
          fontFamily: 'mono',
          pb: 2
        })}
      >
        {url} - <span css={theme({ color: 'black40' })}>{sublabel}</span>
      </Text>

      <Box css={theme({ py: 2 })}>
        <Flex css={{ alignItems: 'center', pb: '6px' }}>
          <Text
            css={theme({
              fontSize: '14px',
              fontWeight: 'bold',
              width: '120px',
              flexShrink: 0,
              color: 'black80'
            })}
          >
            Microlink
          </Text>
          <BarContainer css={{ flex: 1 }}>
            <BarFill
              data-animate={inView ? 'true' : 'false'}
              style={{
                '--bar-width': mlWidth,
                '--delay': `${index * 0.15}s`,
                backgroundImage: gradient,
                width: inView ? undefined : 0
              }}
            >
              {microlink}
              {unit}
            </BarFill>
          </BarContainer>
        </Flex>

        <Flex css={{ alignItems: 'center' }}>
          <Text
            css={theme({
              fontSize: '14px',
              width: '120px',
              flexShrink: 0,
              color: 'black50'
            })}
          >
            ScreenshotOne
          </Text>
          <BarContainer css={{ flex: 1 }}>
            <BarFill
              data-animate={inView ? 'true' : 'false'}
              style={{
                '--bar-width': soWidth,
                '--delay': `${index * 0.15 + 0.1}s`,
                background: colors.gray5,
                width: inView ? undefined : 0
              }}
            >
              {screenshotone}
              {unit}
            </BarFill>
          </BarContainer>
        </Flex>
      </Box>
    </Box>
  )
}

/* ---------------------------------------------------------------------------
 * Pricing Comparison
 * --------------------------------------------------------------------------- */

const PriceCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    p: [3, 4, 4, 4],
    borderRadius: 3,
    border: 1,
    borderColor: 'black10',
    flex: 1,
    minWidth: '260px'
  })}
`

const PriceAmount = styled(Text)`
  ${theme({
    fontSize: [4, 5, 5, 5],
    fontWeight: 'bold',
    lineHeight: 0
  })}
  font-variant-numeric: tabular-nums;
`

/* ---------------------------------------------------------------------------
 * Hero Section
 * --------------------------------------------------------------------------- */

const Hero = () => (
  <Flex
    as='section'
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      pt: 3,
      pb: [4, 4, 5, 5],
      px: 4
    })}
  >
    <Heading
      variant={null}
      css={theme({
        textAlign: 'center',
        maxWidth: '100%',
        fontSize: [4, 4, 5, 5],
        color: 'black'
      })}
    >
      The fastest <GradientText>Screenshot One</GradientText> alternative
    </Heading>

    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [3, 3, 4, 4],
        maxWidth: layout.large,
        color: 'black80'
      })}
      titleize={false}
    >
      <b>ScreenshotOne</b> does one thing: render screenshots. <b>Microlink</b>{' '}
      does many things. That's exactly why it's been battle-tested across enough
      edge cases to make its screenshot engine <b>46% faster on average</b>.
    </Caption>

    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        fontSize: [2, 2, 3, 3],
        gap: '16px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      })}
    >
      <ArrowLink href='/screenshot'>Get Started Free</ArrowLink>
    </Flex>

    <Flex
      css={theme({ width: '100%', justifyContent: 'center', my: [3, 3, 4, 4] })}
    >
      <HeroVideoDesktop
        src='https://cdn.microlink.io/www/alternative/benchmark-screenshotone.mp4'
        autoPlay
        muted
        loop
        playsInline
      />
      <HeroImageMobile
        src='https://cdn.microlink.io/www/alternative/benchmark-screenshotone-mb.gif'
        alt='ScreenshotOne Hero'
      />
    </Flex>

    <Flex
      css={theme({
        pt: [2, 2, 3, 3],
        gap: [3, 5, 5, '80px'],
        flexWrap: 'wrap',
        justifyContent: ['space-between', 'space-between', 'center'],
        alignItems: 'center',
        width: '100%'
      })}
    >
      {[
        {
          icon: Zap,
          value: '46%',
          label: 'Faster on average'
        },
        {
          icon: Code,
          value: 'Open source',
          label: 'Transparent & auditable'
        },
        {
          icon: Gift,
          value: 'Free',
          label: 'To start'
        },
        {
          icon: TrendingUp,
          value: '4× requests',
          label: 'for half the price'
        }
      ].map(({ icon, value, label }) => (
        <Flex
          key={label}
          css={theme({
            flexDirection: 'row',
            alignItems: 'center',
            minWidth: '100px'
          })}
        >
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'flex-start'
            })}
          >
            <Text
              css={theme({
                fontSize: ['32px', '42px'],
                fontWeight: 'bold',
                lineHeight: 0,
                textAlign: 'center'
              })}
              style={{ fontVariantNumeric: 'tabular-nums' }}
              dangerouslySetInnerHTML={{ __html: value }}
            ></Text>
            <Flex
              css={theme({
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
                pt: 1
              })}
            >
              <FeatherIcon icon={icon} size={1} color='blue8' />
              <Caps
                css={theme({
                  fontSize: 1,
                  color: 'black50',
                  fontWeight: 'bold'
                })}
                dangerouslySetInnerHTML={{ __html: label }}
              ></Caps>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  </Flex>
)

/* ---------------------------------------------------------------------------
 * Comparison Table Section
 * --------------------------------------------------------------------------- */

const ComparisonSection = () => (
  <Section
    as='section'
    id='comparison'
    css={theme({
      borderTop: `${borders[1]} ${colors.black05}`,
      borderBottom: `${borders[1]} ${colors.black05}`,
      paddingBottom: [2, 2, 3, 3],
      py: 5
    })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [2, 2, 3, 3], fontSize: [3, 3, 4, 4], pt: 3 })}
        titleize={false}
      >
        <GradientText>Feature-by-Feature</GradientText> Comparison
      </Subhead>
      <Caption
        css={theme({
          pt: 2,
          pb: [3, 3, 4, 4],
          maxWidth: layout.normal,
          color: 'black60'
        })}
        titleize={false}
      >
        An honest look at what each API offers.
      </Caption>
      <ComparisonTable />
      <Text
        css={theme({
          pt: 4,
          pb: 4,
          fontSize: '12px',
          color: 'black40',
          textAlign: 'center',
          fontFamily: 'mono'
        })}
      >
        Last verified: February 2026. See each product's docs for the latest.
      </Text>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Speed Section (most important visual block)
 * --------------------------------------------------------------------------- */

const SpeedSection = () => {
  const [ref, inView] = useInView()

  return (
    <Section
      as='section'
      id='speed'
      ref={ref}
      css={theme({ background: colors.gray0, paddingTop: [5, 5, 6, 6] })}
    >
      <SectionInner>
        <Subhead
          css={theme({ pb: [2, 2, 3, 3], fontSize: [4, 4, 5, 5] })}
          titleize={false}
        >
          <GradientText>Up to 2× faster</GradientText> response times
        </Subhead>

        <Caption
          css={theme({
            pb: [3, 3, 4, 4],
            maxWidth: layout.normal,
            color: 'black80',
            fontSize: 3
          })}
          titleize={false}
        >
          Same request. Same URL. Same output format.
        </Caption>

        <Text
          css={theme({
            fontSize: '20px',
            color: 'black60',
            fontFamily: 'mono',
            maxWidth: layout.normal,
            mx: 'auto',
            pt: 3,
            pb: 2
          })}
        >
          Averaged over 10 runs from a New York server Microlink is 46% faster.
          The gap widens even more on complex, full-page captures.
        </Text>

        <Box
          css={theme({
            width: '100%',
            maxWidth: layout.normal,
            mx: 'auto'
          })}
        >
          {BENCHMARKS.map((benchmark, index) => (
            <BenchmarkRow
              key={benchmark.label}
              benchmark={benchmark}
              index={index}
              inView={inView}
            />
          ))}
        </Box>

        <Flex
          css={theme({
            pt: [4, 4, 5, 5],
            pb: [3, 3, 4, 4],
            fontSize: [2, 2, 3, 3],
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          })}
        >
          <ArrowLink href='https://github.com/microlinkhq/benchmark'>
            Complete speed benchmark
          </ArrowLink>
        </Flex>

        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            flexDirection: ['column', 'column', 'row', 'row'],
            gap: [3, 3, 4, 4],
            justifyContent: 'center',
            width: '100%',
            maxWidth: layout.normal,
            mx: 'auto'
          })}
        >
          {[
            {
              icon: '⚡',
              title: 'Cold start',
              description:
                'We obsessively fine-tune our libraries to eliminate latency, delivering maximum speed.'
            },
            {
              icon: '🌐',
              title: 'Edge proximity',
              description:
                '240+ Cloudflare nodes means the nearest browser is milliseconds away, not seconds.'
            },
            {
              icon: '🔒',
              title: 'Isolated requests',
              description:
                'No shared browser contexts. Clean state on every request — fast and secure by default.'
            }
          ].map(({ icon, title, description }) => (
            <Flex
              key={title}
              css={theme({
                flexDirection: 'column',
                p: [3, 3, 4, 4],
                borderRadius: 3,
                border: 1,
                borderColor: 'black10',
                flex: 1,
                bg: 'white'
              })}
            >
              <Text
                css={{ fontSize: '24px', lineHeight: 1, paddingBottom: '8px' }}
              >
                {icon}
              </Text>
              <Text css={theme({ fontWeight: 'bold', fontSize: 1, pb: 1 })}>
                {title}
              </Text>
              <Text
                css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}
              >
                {description}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Text
          css={theme({
            pt: 4,
            fontSize: '15px',
            color: 'black40',
            textAlign: 'center',
            fontFamily: 'mono',
            maxWidth: layout.small,
            mx: 'auto'
          })}
        >
          Averages from 10 benchmark runs taken from a New York server at
          different hours. The{' '}
          <Link
            css={theme({ fontSize: '16px' })}
            href='https://github.com/microlinkhq/benchmark'
          >
            benchmark repo
          </Link>{' '}
          is open — run it yourself and see.
        </Text>
      </SectionInner>
    </Section>
  )
}

/* ---------------------------------------------------------------------------
 * Why Developers Switch
 * --------------------------------------------------------------------------- */

const WhySwitchSection = () => (
  <Section
    as='section'
    id='why-switch'
    css={{
      backgroundImage: `radial-gradient(
        circle at center right,
        #850ba7 0%,
        #850ba7 48%,
        #a31b91 48%,
        #a31b91 52%,
        #c12a78 52%,
        #c12a78 65%,
        #df3a61 65%,
        #df3a61 79%,
        #fd494a 79%,
        #fd494a 100%
      )`,
      borderTop: `${borders[1]} ${colors.white20}`,
      borderBottom: `${borders[1]} ${colors.white20}`
    }}
  >
    <SectionInner>
      <Subhead
        css={theme({ color: 'white', pb: [1, 2, 2, 2] })}
        titleize={false}
      >
        Why Developers Switch
      </Subhead>
      <Caption
        css={theme({
          color: 'white90',
          pb: [4, 4, 5, 5],
          maxWidth: layout.normal
        })}
        titleize={false}
      >
        The top reasons teams move from ScreenshotOne to Microlink.
      </Caption>

      <Flex
        css={theme({
          flexDirection: ['column', 'column', 'row', 'row'],
          gap: [3, 3, 4, 4],
          width: '100%',
          maxWidth: layout.large,
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {[
          {
            number: '01',
            title: 'API latency compounds at scale',
            description:
              'At 100k screenshots/month, saving ~2s per request recovers over 55 hours of pipeline time. Microlink is 46% faster on average — and up to 2× faster on complex, full-page captures.'
          },
          {
            number: '02',
            title: 'One API key, not five',
            description:
              'Microlink handles screenshots, PDFs, metadata extraction, link previews, and remote JS in a single integration. One bill, one set of docs, no glue code between services.'
          },
          {
            number: '03',
            title: '4.6× more requests for nearly half the price',
            description:
              "ScreenshotOne's recommended plan: 10,000 screenshots for $79/month. Microlink: 46,000 requests for $45. That's the volume ScreenshotOne charges $259 for."
          },
          {
            number: '04',
            title: 'Open-source, fully auditable',
            description:
              'Metascraper, MQL, and Browserless are MIT-licensed. Inspect the core engine, fork it, or self-host. No black boxes, no vendor lock-in — just code you can read.'
          },
          {
            number: '05',
            title: 'Drop screenshots anywhere — no backend',
            description:
              'embed=screenshot.url returns the image URL directly. Drop it in an <img> tag, a CSS background-image, or Markdown. No storage layer, no server, no extra step.'
          },
          {
            number: '06',
            title: 'Presentation-ready screenshots in one call',
            description:
              'screenshot.overlay wraps any capture in a browser chrome frame with a custom gradient or image background. Marketing-ready visuals straight from the API — no Figma, no design tools.'
          }
        ].map(({ number, title, description }) => (
          <Flex
            key={number}
            css={theme({
              flexDirection: 'column',
              p: 4,
              borderRadius: 3,
              width: ['100%', '100%', 'calc(50% - 16px)', 'calc(50% - 16px)'],
              minWidth: '280px'
            })}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(8px)',
              border: `1px solid rgba(255, 255, 255, 0.12)`
            }}
          >
            <Text
              css={theme({
                fontFamily: 'mono',
                fontSize: '14px',
                color: 'white50',
                pb: 2
              })}
            >
              {number}
            </Text>
            <Text
              css={theme({
                fontWeight: 'bold',
                fontSize: [2, 2, 3, 3],
                color: 'white',
                pb: 2,
                lineHeight: 1
              })}
            >
              {title}
            </Text>
            <Text
              css={theme({ fontSize: '18px', color: 'white80', lineHeight: 2 })}
            >
              {description}
            </Text>
          </Flex>
        ))}
      </Flex>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Where ScreenshotOne Might Be Right
 * --------------------------------------------------------------------------- */

const HonestySection = () => (
  <Section
    as='section'
    id='screenshotone-strengths'
    css={theme({ background: colors.gray0, px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>Screenshot One</GradientText> <br></br> Might Be the
        Right Choice
      </Subhead>

      <Box
        css={theme({
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr'],
          gap: 3,
          maxWidth: layout.normal,
          width: '100%',
          mx: 'auto'
        })}
      >
        {[
          {
            title: 'You need S3 direct upload with webhooks',
            description:
              'ScreenshotOne can upload screenshots directly to S3-compatible storage and notify you via webhook when done. Microlink does not have native S3 upload.'
          },
          {
            title: 'GPU rendering is a requirement',
            description:
              'ScreenshotOne offers opt-in GPU rendering for sites that rely on WebGL or heavy canvas operations. Microlink does not currently support GPU rendering.'
          },
          {
            title: 'You want built-in OpenAI Vision analysis',
            description:
              'ScreenshotOne integrates with GPT-4V natively — capture and analyze a screenshot in one API call. Microlink does not have this integration.'
          },
          {
            title: 'No-code integrations are critical',
            description:
              'ScreenshotOne has first-class integrations with Make, Zapier, n8n, Bubble, and Clay. Microlink has fewer no-code connectors (coming soon... we promise!).'
          },
          {
            title: 'Team access control',
            description:
              'ScreenshotOne supports organizations with role-based access. Microlink does not have a team/organization feature.'
          },
          {
            title: 'Scheduled or recurring captures',
            description:
              'ScreenshotOne lets you schedule screenshots to run on a recurring basis straight from the dashboard. Microlink focuses on on-demand captures and does not include a built-in scheduler.'
          }
        ].map(({ title, description }) => (
          <Flex
            key={title}
            css={theme({
              p: [3, 4, 4, 4],
              borderRadius: 3,
              border: 1,
              borderColor: 'black10',
              flexDirection: 'column',
              bg: 'white'
            })}
          >
            <Text
              css={theme({ fontWeight: 'bold', fontSize: [1, 1, 2, 2], pb: 2 })}
            >
              {title}
            </Text>
            <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
              {description}
            </Text>
          </Flex>
        ))}
      </Box>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Pricing Section
 * --------------------------------------------------------------------------- */

const PricingSection = () => (
  <Section as='section' id='pricing' css={theme({ py: 5 })}>
    <SectionInner>
      <Subhead
        css={theme({ pb: [2, 2, 3, 3], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        More requests. <GradientText>Half the price.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        Get <b>4.6x more</b> for nearly half the price.
      </Caption>

      <Flex
        css={theme({
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          width: '100%',
          maxWidth: layout.normal,
          mx: 'auto'
        })}
      >
        <Box
          style={{
            background:
              'linear-gradient(90deg, rgb(247, 102, 152), rgb(192, 63, 162) 60%, rgb(140, 27, 171) 100%)',
            borderRadius: '8px',
            padding: '2px',
            flex: 1,
            minWidth: '400px'
          }}
        >
          <PriceCard
            style={{
              border: 'none',
              borderRadius: '6px',
              flex: 1,
              minWidth: 0,
              background: 'white'
            }}
          >
            <Badge
              css={{
                background: colors.blue0,
                color: colors.blue8,
                alignSelf: 'flex-start',
                marginBottom: '12px'
              }}
            >
              Microlink
            </Badge>
            <PriceAmount>
              $45
              <Text
                as='span'
                css={theme({
                  fontSize: 1,
                  color: 'black50',
                  fontWeight: 'normal'
                })}
              >
                /mo
              </Text>
            </PriceAmount>
            <Text
              css={theme({
                fontSize: 2,
                color: 'black80',
                pt: 2,
                pb: 3,
                fontWeight: 'bold'
              })}
            >
              46,000 requests/month
            </Text>
            <Box as='ul' css={theme({ pl: 3, m: 0 })}>
              {[
                'Screenshots + PDF + metadata + previews + remote JS',
                'Free tier: 50 requests/day, no credit card',
                'No requests-per-minute cap',
                '240+ edge nodes, 99.9% SLA',
                'Open-source core (MIT)',
                "Equivalent to ScreenshotOne's $259 plan by volume"
              ].map(item => (
                <Text
                  as='li'
                  key={item}
                  css={theme({
                    fontSize: 1,
                    color: 'black70',
                    pb: 2,
                    lineHeight: 2
                  })}
                >
                  {item}
                </Text>
              ))}
            </Box>
            <Box css={theme({ pt: 3 })}>
              <Button
                href='/#pricing'
                css={theme({ fontSize: 1, width: '100%', textAlign: 'center' })}
              >
                <Caps>Start for free</Caps>
              </Button>
            </Box>
          </PriceCard>
        </Box>

        <PriceCard>
          <Badge
            css={{
              background: colors.gray1,
              color: colors.gray7,
              alignSelf: 'flex-start',
              marginBottom: '12px'
            }}
          >
            ScreenshotOne
          </Badge>
          <PriceAmount>
            $79
            <Text
              as='span'
              css={theme({
                fontSize: 1,
                color: 'black50',
                fontWeight: 'normal'
              })}
            >
              /mo
            </Text>
          </PriceAmount>
          <Text
            css={theme({
              fontSize: 2,
              color: 'black80',
              pt: 2,
              pb: 3,
              fontWeight: 'bold'
            })}
          >
            10,000 screenshots/month
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              '80 requests per minute cap',
              '$0.006 per extra screenshot',
              'Screenshots only — no PDF, metadata, or previews',
              'GPU rendering (opt-in)',
              'S3 upload + webhooks'
            ].map(item => (
              <Text
                as='li'
                key={item}
                css={theme({
                  fontSize: 1,
                  color: 'black70',
                  pb: 2,
                  lineHeight: 2
                })}
              >
                {item}
              </Text>
            ))}
          </Box>
        </PriceCard>
      </Flex>

      <Text
        css={theme({
          pt: 4,
          fontSize: 1,
          color: 'black60',
          textAlign: 'center',
          maxWidth: layout.small,
          mx: 'auto',
          lineHeight: 2
        })}
      >
        We can keep prices this low because our{' '}
        <Link href='/enterprise'>enterprise clients</Link> cover the
        infrastructure cost. We want to help indie devs and startups{' '}
        <b>squeeze every drop of value</b> out of their budget.
      </Text>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * CTA Section
 * --------------------------------------------------------------------------- */

const CTASection = () => (
  <Section
    as='section'
    id='get-started'
    css={theme({
      py: 5,
      background: `radial-gradient(ellipse at 65% 0%, rgba(140, 27, 171, 0.35) 0%, transparent 65%), ${colors.gray9}`,
      borderTop: `${borders[1]} ${colors.white10}`
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.large,
        mx: 'auto',
        textAlign: 'center'
      })}
    >
      <Subhead
        css={theme({
          color: 'white',
          pb: [2, 2, 3, 3],
          fontSize: [3, 3, 4, 4]
        })}
        titleize={false}
      >
        Make the switch in minutes
      </Subhead>

      <Caption
        css={theme({
          color: 'white80',
          pb: [3, 3, 4, 4],
          maxWidth: layout.large,
          fontSize: 2
        })}
        titleize={false}
      >
        Replace your ScreenshotOne endpoint. Keep your code.
        <br />
        Your first{' '}
        <b css={theme({ color: 'white' })}>50 requests/day are free</b> — no
        credit card, no commitment.
      </Caption>

      <Flex
        css={theme({
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        <Button
          href='/screenshot'
          css={theme({ fontSize: 2, px: 5, py: 3 })}
          style={{
            background:
              'linear-gradient(90deg, #f76698, #c03fa2 60%, #8c1bab 100%)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(192, 63, 162, 0.45)'
          }}
        >
          <Caps>Start Building Free</Caps>
        </Button>
      </Flex>
    </Flex>
  </Section>
)

/* ---------------------------------------------------------------------------
 * FAQ Section
 * --------------------------------------------------------------------------- */

const FAQSection = () => (
  <Faq
    css={theme({
      pt: [4, 4, 5, 5],
      pb: [5, 5, 6, 6],
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={[
      {
        question:
          'How does Microlink compare to ScreenshotOne for screenshot quality?',
        answer: (
          <>
            <div>
              Both services produce high-quality screenshots using Chromium.
              Microlink serves maximum quality with optimal compression by
              default — no manual parameter tuning needed. ScreenshotOne also
              delivers good quality, with optional GPU rendering for WebGL-heavy
              sites.
            </div>
            <div>
              The main difference is speed: Microlink consistently returns
              screenshots up to 2× faster due to its 240+ edge node
              infrastructure and pre-warmed browser instances.
            </div>
          </>
        )
      },
      {
        question: 'Can I migrate from ScreenshotOne to Microlink easily?',
        answer: (
          <>
            <div>
              Yes. Microlink's screenshot API accepts similar parameters (URL,
              viewport, format, full-page, selectors). Most migrations involve
              updating the API endpoint and key. The{' '}
              <Link href='/docs/api/parameters/screenshot'>
                screenshot docs
              </Link>{' '}
              include examples for every parameter.
            </div>
            <div>
              SDKs are available for JavaScript, Python, Ruby, PHP, and Go. If
              you need help migrating, contact{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      },
      {
        question: 'What is the overlay feature and why does it matter?',
        answer: (
          <>
            <div>
              <Link href='/docs/api/parameters/screenshot/overlay'>
                screenshot.overlay
              </Link>{' '}
              wraps your screenshot in a browser chrome frame (light or dark)
              with a customizable background — CSS gradient, solid color, or
              image URL. The result is a presentation-ready image in a single
              API call.
            </div>
            <div>
              This eliminates the design step between "capture screenshot" and
              "use in marketing materials, documentation, or social media."
              ScreenshotOne has no equivalent feature.
            </div>
          </>
        )
      },
      {
        question: 'What does "platform vs. point solution" mean in practice?',
        answer: (
          <>
            <div>
              With Microlink, one API key and one integration gives you
              screenshots, PDF generation, metadata/Open Graph extraction, link
              previews (via SDK), remote JavaScript execution, and Lighthouse
              audits.
            </div>
            <div>
              With ScreenshotOne, you get screenshots. For PDFs, metadata,
              previews, or any other capability, you need additional services —
              each with their own billing, docs, and integration work.
            </div>
          </>
        )
      },
      {
        question: 'Is Microlink really open source?',
        answer: (
          <>
            <div>
              The core engine components are MIT-licensed and available on
              GitHub:{' '}
              <Link href='https://github.com/microlinkhq/metascraper'>
                Metascraper
              </Link>{' '}
              (metadata extraction),{' '}
              <Link href='https://github.com/microlinkhq/mql'>MQL</Link>{' '}
              (Microlink Query Language), and{' '}
              <Link href='https://github.com/microlinkhq/browserless'>
                Browserless
              </Link>{' '}
              (headless browser). Enterprise teams can audit, fork, and
              contribute.
            </div>
            <div>
              ScreenshotOne is closed-source. There is no way to inspect or
              audit the engine processing your requests.
            </div>
          </>
        )
      }
    ]}
  />
)

/* ---------------------------------------------------------------------------
 * Head / SEO
 * --------------------------------------------------------------------------- */

export const Head = () => (
  <Meta
    title='ScreenshotOne Alternative'
    description='Microlink captures screenshots up to 2× faster than ScreenshotOne — 46% faster on average — plus PDF, metadata, and link previews in one API. Free to start.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'ScreenshotOne Alternative — Microlink Screenshot API',
        description:
          'Compare Microlink and ScreenshotOne screenshot APIs. Microlink is 46% faster on average — up to 2× faster on full-page captures — with screenshots, PDF generation, metadata extraction, and more in one API.',
        url: 'https://microlink.io/alternative/screenshotone',
        mainEntity: {
          '@type': 'SoftwareApplication',
          name: 'Microlink',
          applicationCategory: ['DeveloperApplication', 'WebApplication'],
          url: 'https://microlink.io',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR'
          }
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does Microlink compare to ScreenshotOne for screenshot quality?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Both services produce high-quality screenshots using Chromium. Microlink serves maximum quality with optimal compression by default and is 46% faster on average — up to 2× faster on full-page captures — due to its 240+ edge node infrastructure.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the best alternative to ScreenshotOne?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink is a full headless browser API that replaces ScreenshotOne for screenshots and adds PDF generation, metadata extraction, link previews, and remote JS execution — all in one API with one key.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I migrate from ScreenshotOne to Microlink?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Microlink accepts similar parameters. Most migrations involve updating the API endpoint and key. SDKs are available for JavaScript, Python, Ruby, PHP, and Go.'
            }
          }
        ]
      }
    ]}
  />
)

/* ---------------------------------------------------------------------------
 * Page
 * --------------------------------------------------------------------------- */

const ScreenshotOnePage = () => (
  <Layout>
    <Hero />
    <SpeedSection />
    <ComparisonSection />
    <WhySwitchSection />
    <PricingSection />
    <HonestySection />
    <CTASection />
    <FAQSection />
  </Layout>
)

export default ScreenshotOnePage
