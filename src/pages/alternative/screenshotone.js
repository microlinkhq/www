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

const HeroImageDesktop = styled.img`
  display: none;
  max-width: 1000px;
  width: 100%;
  height: auto;
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
  // Microlink-only
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
  { feature: 'Proxy resolution', microlink: true, screenshotone: false },
  { feature: 'Custom proxy support', microlink: true, screenshotone: false },
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
    label: 'Desktop screenshot',
    url: 'microlink.io',
    sublabel: 'PNG, 1280×800',
    microlink: 1.2,
    screenshotone: 4.8,
    unit: 's'
  },
  {
    label: 'Full-page capture',
    url: 'github.com/trending',
    sublabel: 'PNG, full scroll',
    microlink: 2.1,
    screenshotone: 8.3,
    unit: 's'
  },
  {
    label: 'JPEG output',
    url: 'stripe.com',
    sublabel: 'JPEG 80%, 1280×800',
    microlink: 0.9,
    screenshotone: 3.6,
    unit: 's'
  },
  {
    label: 'Large landing page',
    url: 'vercel.com',
    sublabel: 'PNG, full-page',
    microlink: 2.8,
    screenshotone: 11.2,
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

  return (
    <Box css={theme({ pb: [2], pt: [3, 3, 4, 4] })}>
      <Flex css={{ alignItems: 'baseline', flexWrap: 'wrap' }}>
        <SpeedLabel>{label}</SpeedLabel>
        <MultiplierBadge
          data-animate={inView ? 'true' : 'false'}
          style={{ '--delay': `${index * 0.3 + 1}s` }}
        >
          {multiplier}× faster
        </MultiplierBadge>
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
  transition: box-shadow ${transition.medium}, transform ${transition.medium};

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
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
 * Code Comparison
 * --------------------------------------------------------------------------- */

const CodeTab = styled('button')`
  appearance: none;
  border: none;
  cursor: pointer;
  transition: background ${transition.medium}, color ${transition.medium};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  ${theme({
    fontFamily: 'mono',
    fontSize: '13px',
    fontWeight: 'bold',
    px: 3,
    py: 2,
    borderRadius: '6px 6px 0 0',
    bg: 'transparent',
    color: 'black50'
  })}

  &[data-active='true'] {
    background: ${colors.gray9};
    color: ${colors.white};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: -2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const CODE_MICROLINK_BASIC = `# Take a screenshot with Microlink
curl "https://api.microlink.io?url=https://stripe.com&screenshot=true&embed=screenshot.url"

# That's it — the response is the image itself.
# Use it directly in an <img> tag, no backend needed.`

const CODE_MICROLINK_OVERLAY = `# Browser chrome overlay — unique to Microlink
curl "https://api.microlink.io\\
  ?url=https://stripe.com\\
  &screenshot=true\\
  &screenshot.overlay.browser=dark\\
  &screenshot.overlay.background=linear-gradient(225deg,+%23FF057C+0%25,+%238D0B93+50%25,+%23321575+100%25)\\
  &embed=screenshot.url"

# Generates a presentation-ready image with
# browser chrome + custom gradient background.
# No design tools needed.`

const CODE_SCREENSHOTONE = `# Take a screenshot with ScreenshotOne
curl "https://api.screenshotone.com/take\\
  ?access_key=YOUR_ACCESS_KEY\\
  &url=https://stripe.com\\
  &viewport_width=1280\\
  &viewport_height=800\\
  &format=png"

# Returns the image binary.
# No overlay equivalent available.
# No direct embed parameter.`

const CODE_MICROLINK_SDK = `import mql from '@microlink/mql'

const { data } = await mql('https://stripe.com', {
  screenshot: true,
  overlay: {
    browser: 'dark',
    background: 'linear-gradient(225deg, #FF057C, #8D0B93, #321575)'
  }
})

console.log(data.screenshot.url)
// → https://microlink.io/.../screenshot.png`

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
      The fastest <GradientText>ScreenshotOne</GradientText> alternative
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
      edge cases to make its screenshot engine <b>50% faster</b>.
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
      <HeroImageDesktop
        src='/images/benchmark-screenshotone.gif'
        alt='ScreenshotOne Hero'
      />
      <HeroImageMobile
        src='/images/benchmark-screenshotone-mb.gif'
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
          value: '50%',
          label: 'Faster engine'
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
          value: '8× reqs',
          label: 'For the same price'
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
      paddingBottom: [2, 2, 3, 3]
    })}
  >
    <SectionInner>
      <Subhead css={theme({ pb: [1, 2, 2, 2] })} titleize={false}>
        Feature-by-Feature Comparison
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.small,
          color: 'black60'
        })}
        titleize={false}
      >
        An honest look at what each API offers. Microlink is a platform;
        ScreenshotOne is a point solution.
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
      css={theme({ background: colors.gray0, paddingTop: [4, 4, 5, 5] })}
    >
      <SectionInner>
        <Badge
          css={{
            background: colors.green0,
            color: colors.green8,
            marginBottom: '16px'
          }}
        >
          Performance
        </Badge>

        <Subhead
          css={theme({ pb: [2, 2, 3, 3], fontSize: [4, 4, 5, 5] })}
          titleize={false}
        >
          <GradientText>3–4× faster</GradientText> response times
        </Subhead>

        <Caption
          css={theme({
            pb: [3, 3, 4, 4],
            maxWidth: layout.normal,
            color: 'black60'
          })}
          titleize={false}
        >
          Same request. Same URL. Same output format. Microlink consistently
          delivers screenshots in a fraction of the time.
        </Caption>

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
            py: [3, 3, 4, 4],
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
                'Microlink pre-warms browser instances at the edge. No cold boot penalty on first request.'
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
            fontSize: '12px',
            color: 'black40',
            textAlign: 'center',
            fontFamily: 'mono',
            maxWidth: layout.small,
            mx: 'auto'
          })}
        >
          Benchmarks measured from EU-West and US-East averaged over 10 runs per
          URL. Your results may vary. We encourage you to run your own tests.
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
          color: 'white80',
          pb: [4, 4, 5, 5],
          maxWidth: layout.small
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
            title: 'Response time matters at scale',
            description:
              'When you process 100k+ screenshots/month, the difference between 1.2s and 4.8s per request compounds into hours of wall-clock time. Pipeline throughput depends on API latency.'
          },
          {
            number: '02',
            title: 'One API key, not five',
            description:
              'Microlink replaces separate services for screenshots, metadata, PDFs, link previews, and remote JS. One integration, one billing, one set of docs.'
          },
          {
            number: '03',
            title: 'Enterprise-grade at any scale',
            description:
              '99.9% uptime SLA with request isolation. No shared browsers between requests. Trusted by enterprises handling hundreds of millions of requests per month.'
          },
          {
            number: '04',
            title: 'Open-source, auditable stack',
            description:
              'Metascraper, MQL, and Browserless are MIT-licensed. Enterprise teams can inspect, fork, and audit the core engine. No black boxes.'
          },
          {
            number: '05',
            title: 'Direct embed without a backend',
            description:
              'The embed=screenshot.url parameter returns the image URL directly. Put live screenshots in any <img> tag, CSS background, or Markdown — no server needed.'
          },
          {
            number: '06',
            title: 'Max quality by default',
            description:
              'Microlink serves maximum quality screenshots with optimal compression out of the box. No manual tuning for the quality/size trade-off.'
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
                fontSize: '12px',
                color: 'white40',
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
            <Text css={theme({ fontSize: 1, color: 'white70', lineHeight: 2 })}>
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
  <Section as='section' id='screenshotone-strengths'>
    <SectionInner>
      <Subhead css={theme({ pb: [1, 2, 2, 2] })} titleize={false}>
        Where ScreenshotOne Might Be the Right Choice
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        Here is where ScreenshotOne has capabilities Microlink does not.
      </Caption>

      <Flex
        css={theme({
          flexDirection: 'column',
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
            title: 'Team access control (organizations/roles)',
            description:
              'ScreenshotOne supports organizations with role-based access. Microlink does not have a team/organization feature.'
          }
        ].map(({ title, description }) => (
          <Flex
            key={title}
            css={theme({
              p: [3, 4, 4, 4],
              borderRadius: 3,
              border: 1,
              borderColor: 'black10',
              flexDirection: 'column'
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
      </Flex>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Code Comparison Section
 * --------------------------------------------------------------------------- */

const CodeComparisonSection = () => {
  const [activeTab, setActiveTab] = useState('microlink')

  const tabs = [
    { id: 'microlink', label: 'Microlink (cURL)' },
    { id: 'overlay', label: 'Microlink Overlay' },
    { id: 'sdk', label: 'Microlink SDK' },
    { id: 'screenshotone', label: 'ScreenshotOne' }
  ]

  const codeMap = {
    microlink: CODE_MICROLINK_BASIC,
    overlay: CODE_MICROLINK_OVERLAY,
    sdk: CODE_MICROLINK_SDK,
    screenshotone: CODE_SCREENSHOTONE
  }

  return (
    <Section
      as='section'
      id='code'
      css={{
        background: colors.gray0,
        borderTop: `${borders[1]} ${colors.black05}`,
        borderBottom: `${borders[1]} ${colors.black05}`
      }}
    >
      <SectionInner>
        <Subhead css={theme({ pb: [1, 2, 2, 2] })} titleize={false}>
          Code Comparison
        </Subhead>
        <Caption
          css={theme({
            pb: [4, 4, 5, 5],
            maxWidth: layout.small,
            color: 'black60'
          })}
          titleize={false}
        >
          Same task, different APIs. Note the{' '}
          <InlineCode>embed=screenshot.url</InlineCode> and{' '}
          <InlineCode>overlay</InlineCode> parameters — unique to Microlink.
        </Caption>

        <Box
          css={theme({
            maxWidth: layout.normal,
            width: '100%',
            mx: 'auto'
          })}
        >
          <Flex css={{ flexWrap: 'wrap', gap: '2px' }} role='tablist'>
            {tabs.map(({ id, label }) => (
              <CodeTab
                key={id}
                role='tab'
                aria-selected={activeTab === id}
                data-active={activeTab === id ? 'true' : 'false'}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </CodeTab>
            ))}
          </Flex>

          <CodeBlock
            role='tabpanel'
            css={{
              background: colors.gray9,
              color: colors.white90,
              borderTopLeftRadius: 0
            }}
          >
            {codeMap[activeTab]}
          </CodeBlock>
        </Box>

        <Flex
          css={theme({
            pt: [4, 4, 5, 5],
            flexDirection: ['column', 'column', 'row', 'row'],
            gap: [3, 3, 4, 4],
            maxWidth: layout.normal,
            width: '100%',
            mx: 'auto'
          })}
        >
          <Flex
            css={theme({
              flexDirection: 'column',
              flex: 1,
              p: [3, 3, 4, 4],
              borderRadius: 3,
              border: 1,
              borderColor: 'black10',
              bg: 'white'
            })}
          >
            <Text
              css={theme({ fontWeight: 'bold', fontSize: [1, 2, 2, 2], pb: 2 })}
            >
              <GradientText>embed=screenshot.url</GradientText>
            </Text>
            <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
              Returns the screenshot URL directly. Drop it into an{' '}
              <InlineCode>&lt;img&gt;</InlineCode> tag, CSS{' '}
              <InlineCode>background-image</InlineCode>, or Markdown. No
              backend, no storage, no extra step.
            </Text>
          </Flex>
          <Flex
            css={theme({
              flexDirection: 'column',
              flex: 1,
              p: [3, 3, 4, 4],
              borderRadius: 3,
              border: 1,
              borderColor: 'black10',
              bg: 'white'
            })}
          >
            <Text
              css={theme({ fontWeight: 'bold', fontSize: [1, 2, 2, 2], pb: 2 })}
            >
              <GradientText>screenshot.overlay</GradientText>
            </Text>
            <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
              Wraps the screenshot in a browser chrome frame with a custom
              background — gradient, solid color, or image URL.
              Presentation-ready visuals without design tools.
            </Text>
          </Flex>
        </Flex>
      </SectionInner>
    </Section>
  )
}

/* ---------------------------------------------------------------------------
 * Pricing Section
 * --------------------------------------------------------------------------- */

const PricingSection = () => (
  <Section as='section' id='pricing'>
    <SectionInner>
      <Subhead css={theme({ pb: [1, 2, 2, 2] })} titleize={false}>
        Pricing Comparison
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.small,
          color: 'black60'
        })}
        titleize={false}
      >
        Microlink gives you more capabilities at a comparable price point — and
        you can start without a credit card.
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
        <PriceCard style={{ borderColor: colors.link, borderWidth: '2px' }}>
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
            €39
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
          <Text css={theme({ fontSize: 1, color: 'black60', pt: 2, pb: 3 })}>
            ~46,000 requests/month
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              'Screenshots + PDF + metadata + previews + remote JS',
              'Free tier: 50 requests/day, no credit card',
              '240+ edge nodes, 99.9% SLA',
              'Request isolation (no shared browsers)',
              'Open-source core (MIT)',
              'Pay-as-you-go, scale up anytime'
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
            ~$17
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
          <Text css={theme({ fontSize: 1, color: 'black60', pt: 2, pb: 3 })}>
            Entry plan (screenshots only)
          </Text>
          <Box as='ul' css={theme({ pl: 3, m: 0 })}>
            {[
              'Screenshots only',
              'Free tier: 100 screenshots/month',
              'Overage: $0.004/screenshot',
              'Hard cap: 100k screenshots/month',
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
          color: 'black50',
          textAlign: 'center',
          maxWidth: layout.small,
          mx: 'auto',
          lineHeight: 2
        })}
      >
        With Microlink, the same plan that powers your screenshots also handles
        PDF generation, metadata extraction, link previews, and remote
        JavaScript. With ScreenshotOne, each additional capability requires a
        separate service.
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
    css={{
      background: colors.gray9,
      borderTop: `${borders[1]} ${colors.white10}`
    }}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.small,
        mx: 'auto',
        textAlign: 'center'
      })}
    >
      <Subhead
        css={theme({ color: 'white', pb: [1, 2, 2, 2] })}
        titleize={false}
      >
        Try Microlink Free
      </Subhead>
      <Caption
        css={theme({
          color: 'white60',
          pb: [3, 3, 4, 4]
        })}
        titleize={false}
      >
        50 requests/day, no credit card required. See the speed difference for
        yourself.
      </Caption>

      <Flex
        css={theme({
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        <Button
          as='a'
          href='/docs/api/parameters/screenshot'
          css={theme({ fontSize: 1 })}
        >
          <Caps>Screenshot Docs</Caps>
        </Button>
        <Button
          as='a'
          href='/screenshot'
          variant='white'
          css={theme({ fontSize: 1 })}
        >
          <Caps>Live Demo</Caps>
        </Button>
      </Flex>

      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 4, 5, 5],
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {[
          { label: 'SDKs', value: 'JS, Python, Ruby, PHP, Go + CLI' },
          { label: 'Start', value: 'Free, no credit card' },
          { label: 'Support', value: 'hello@microlink.io' }
        ].map(({ label, value }) => (
          <Flex
            key={label}
            css={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <Caps
              css={theme({
                fontSize: 0,
                color: 'white40',
                fontWeight: 'bold',
                pb: 1
              })}
            >
              {label}
            </Caps>
            <Text css={theme({ fontSize: 1, color: 'white80' })}>{value}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </Section>
)

/* ---------------------------------------------------------------------------
 * FAQ Section
 * --------------------------------------------------------------------------- */

const FAQSection = () => (
  <Faq
    title='Frequently Asked Questions'
    caption='Common questions when evaluating Microlink as a ScreenshotOne alternative.'
    css={theme({
      pb: [5, 5, 6, 6],
      bg: 'pinky',
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
              screenshots 3–4× faster due to its 240+ edge node infrastructure
              and optimized browser instances.
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
    description='Microlink captures screenshots 3-4× faster than ScreenshotOne, plus includes PDF, metadata, and link previews in one API. Free to start.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'ScreenshotOne Alternative — Microlink Screenshot API',
        description:
          'Compare Microlink and ScreenshotOne screenshot APIs. Microlink delivers 3-4× faster response times with screenshots, PDF generation, metadata extraction, and more in one API.',
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
              text: 'Both services produce high-quality screenshots using Chromium. Microlink serves maximum quality with optimal compression by default and returns screenshots 3-4× faster due to its 240+ edge node infrastructure.'
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
    <HonestySection />
    <CodeComparisonSection />
    <PricingSection />
    <CTASection />
    <FAQSection />
  </Layout>
)

export default ScreenshotOnePage
