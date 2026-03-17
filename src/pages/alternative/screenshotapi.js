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
  { feature: 'Screenshot capture', microlink: true, screenshotapi: true },
  { feature: 'Full-page screenshots', microlink: true, screenshotapi: true },
  {
    feature: 'Element-level capture (CSS selector)',
    microlink: true,
    screenshotapi: true
  },
  {
    feature: 'PDF generation',
    microlink: true,
    screenshotapi: true,
    highlight: true
  },
  { feature: 'HTML rendering', microlink: true, screenshotapi: true },
  { feature: 'Dark/light mode capture', microlink: true, screenshotapi: true },
  {
    feature: 'Device emulation presets',
    microlink: true,
    screenshotapi: true
  },
  { feature: 'Custom JS/CSS injection', microlink: true, screenshotapi: true },
  { feature: 'Custom HTTP headers', microlink: true, screenshotapi: true },
  { feature: 'Custom cookies', microlink: true, screenshotapi: true },
  {
    feature: 'Hide/remove elements (CSS selectors)',
    microlink: true,
    screenshotapi: true
  },
  {
    feature: 'Click interactions',
    microlink: true,
    screenshotapi: true
  },
  { feature: 'Wait for selector', microlink: true, screenshotapi: true },
  { feature: 'Cookie banner blocking', microlink: true, screenshotapi: true },
  { feature: 'Ad blocking', microlink: true, screenshotapi: true },
  { feature: 'Built-in response cache', microlink: true, screenshotapi: true },
  { feature: 'Custom proxy support', microlink: true, screenshotapi: true },
  {
    feature: 'Built-in proxy',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Metadata extraction',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Link previews SDK',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Browser chrome overlay',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Direct embed (no backend)',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Open-source core',
    microlink: true,
    screenshotapi: false,
    highlight: true
  },
  {
    feature: 'Remote JS execution (return values)',
    microlink: true,
    screenshotapi: false
  },
  { feature: '240+ CDN edge nodes', microlink: true, screenshotapi: false },
  {
    feature: 'MQL (structured data extraction)',
    microlink: true,
    screenshotapi: false
  },
  { feature: 'MCP server', microlink: true, screenshotapi: false },
  { feature: 'Markdown conversion', microlink: true, screenshotapi: false },
  { feature: 'Lighthouse audits', microlink: true, screenshotapi: false },
  { feature: 'Technology detection', microlink: true, screenshotapi: false },
  {
    feature: 'Color palette extraction',
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Typed SDKs (React/Vue/JS)',
    microlink: true,
    screenshotapi: false
  },
  {
    feature: 'Video output (page content)',
    microlink: true,
    screenshotapi: false
  },
  { feature: 'Animated screenshots', microlink: true, screenshotapi: true },
  {
    feature: 'Scheduled screenshots (cron)',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Bulk screenshots (JSON/CSV)',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'BYOB storage (S3/Wasabi/GCS)',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Scrolling video capture (WebM/MP4/GIF)',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Geolocation targeting',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Text/HTML extraction',
    microlink: false,
    screenshotapi: true
  },
  {
    feature: 'Granular resource blocking (15+ toggles)',
    microlink: 'partial',
    screenshotapi: true
  },
  {
    feature: 'No-code integrations (Zapier, Make, n8n…)',
    microlink: 'partial',
    screenshotapi: true
  }
]

const CellValue = ({ value }) => {
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
            ScreenshotAPI
          </Th>
        </tr>
      </thead>
      <tbody>
        {COMPARISON_DATA.map(
          ({ feature, microlink, screenshotapi, highlight, note }) => (
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
                <CellValue value={screenshotapi} />
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
    microlink: 1.21,
    screenshotapi: 4.88,
    unit: 's'
  },
  {
    label: 'Full-page capture',
    url: 'news.ycombinator.com',
    sublabel: 'JPEG, 1440×1080, full page',
    microlink: 3.53,
    screenshotapi: 5.31,
    unit: 's'
  },
  {
    label: 'SaaS product page',
    url: 'microlink.io',
    sublabel: 'PNG, 1920×1080, full page',
    microlink: 2.54,
    screenshotapi: 5.4,
    unit: 's'
  },
  {
    label: 'Large landing page',
    url: 'vercel.com',
    sublabel: 'JPEG, 1920×1080, full page',
    microlink: 5.83,
    screenshotapi: 6.0,
    unit: 's'
  },
  {
    label: 'Tablet viewport',
    url: 'github.com/trending',
    sublabel: 'PNG, 768×1024',
    microlink: 3.19,
    screenshotapi: 5.77,
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
  const { label, sublabel, microlink, screenshotapi, unit, url } = benchmark
  const maxVal = Math.max(...BENCHMARKS.map(b => b.screenshotapi)) * 1.1
  const mlWidth = `${Math.max((microlink / maxVal) * 100, 8)}%`
  const saWidth = `${Math.max((screenshotapi / maxVal) * 100, 8)}%`
  const multiplier = (screenshotapi / microlink).toFixed(1)
  const microlinkWins = screenshotapi > microlink

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
            ScreenshotAPI
          </Text>
          <BarContainer css={{ flex: 1 }}>
            <BarFill
              data-animate={inView ? 'true' : 'false'}
              style={{
                '--bar-width': saWidth,
                '--delay': `${index * 0.15 + 0.1}s`,
                background: colors.gray5,
                width: inView ? undefined : 0
              }}
            >
              {screenshotapi}
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
      The <GradientText>ScreenshotAPI</GradientText> alternative that does more
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
      <b>ScreenshotAPI</b> covers screenshots well. The moment you need PDFs,
      metadata, or link previews, you are looking at a second service.{' '}
      <b>Microlink</b> covers all of it from one API key and is{' '}
      <b>33% faster than ScreenshotAPI on average</b>.
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
        src='https://cdn.microlink.io/www/alternative/benchmark-screenshotapi.mp4'
        autoPlay
        muted
        loop
        playsInline
      />
      <HeroImageMobile
        src='https://cdn.microlink.io/www/alternative/benchmark-screenshotapi-mb.gif'
        alt='ScreenshotAPI Hero'
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
          value: '33%',
          label: 'Faster on average'
        },
        {
          icon: Code,
          value: 'Open source',
          label: 'Fully auditable'
        },
        {
          icon: Gift,
          value: 'Free',
          label: '50 req/day, forever'
        },
        {
          icon: TrendingUp,
          value: '4.6×',
          label: 'more requests, $10 more'
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
            />
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
              />
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
        Last verified: March 2026. See each product's docs for the latest.
      </Text>
    </SectionInner>
  </Section>
)

/* ---------------------------------------------------------------------------
 * Speed Section
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
          <GradientText>Up to 4× faster</GradientText> response times
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
          Averaged over 10 runs from a New York server, Microlink is 33% faster.
          On simple pages, the gap reaches 4×. On complex, full-page captures it
          narrows, but Microlink still wins every time.
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
            See the full benchmark
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
              title: 'No cold starts',
              description:
                'We fine-tune every layer of the stack to cut boot time. The browser is ready before your request lands.'
            },
            {
              icon: '🌐',
              title: 'Edge proximity',
              description:
                '240+ Cloudflare nodes. The nearest browser is milliseconds away from your users, not seconds.'
            },
            {
              icon: '🔒',
              title: 'Clean isolation',
              description:
                'No shared browser contexts. Every request gets a clean state, which also means no cross-request leakage.'
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
          Averages from 10 runs on a New York server, spread across different
          hours. The{' '}
          <Link
            css={theme({ fontSize: '16px' })}
            href='https://github.com/microlinkhq/benchmark'
          >
            benchmark repo
          </Link>{' '}
          is public. Run it against your own URLs and see.
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
        What actually changes once you make the switch.
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
            title: 'Latency compounds at scale',
            description:
              'At 100k screenshots/month, 1.9s saved per request adds up to 53 hours of recovered pipeline time. Microlink is 33% faster on average, up to 4× faster on simple pages.'
          },
          {
            number: '02',
            title: 'One API key, not five',
            description:
              'Screenshots, PDFs, metadata extraction, link previews, and remote JS in one integration. One bill, one set of docs, no glue code.'
          },
          {
            number: '03',
            title: '4.6× more requests for $10 more',
            description:
              'ScreenshotAPI Startup: 10,000 screenshots for $29/month. Microlink: 46,000 requests for $39. Same $10 more, 4.6× the volume, and every request covers screenshots, PDF, metadata, and more.'
          },
          {
            number: '04',
            title: 'Open source, fully auditable',
            description:
              'Metascraper, MQL, and Browserless are MIT-licensed on GitHub. Read the code, fork it, or self-host. ScreenshotAPI is closed-source, with no way to inspect what runs against your URLs.'
          },
          {
            number: '05',
            title: 'Drop screenshots anywhere, no backend',
            description:
              'embed=screenshot.url returns the image URL directly. Put it in an <img> tag, a CSS background-image, or Markdown. No storage layer, no server, no extra step.'
          },
          {
            number: '06',
            title: 'Marketing-ready screenshots in one call',
            description:
              'screenshot.overlay wraps any capture in a browser chrome frame with a custom gradient or image background. Presentation-ready visuals straight from the API, no Figma needed.'
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
              border: '1px solid rgba(255, 255, 255, 0.12)'
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
 * Where ScreenshotAPI Might Be Right
 * --------------------------------------------------------------------------- */

const HonestySection = () => (
  <Section
    as='section'
    id='screenshotapi-strengths'
    css={theme({ background: colors.gray0, px: 5, pt: 5, pb: 6 })}
  >
    <SectionInner>
      <Subhead
        css={theme({ pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3 })}
        titleize={false}
      >
        Where <GradientText>ScreenshotAPI</GradientText> <br /> Might Be the
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
            title: 'You need screenshots on a schedule',
            description:
              'ScreenshotAPI supports cron-based scheduling: hourly, daily, weekly, or any custom expression, straight from the dashboard. Microlink handles on-demand captures and does not include a built-in scheduler.'
          },
          {
            title: 'You are processing URLs in bulk',
            description:
              'ScreenshotAPI accepts JSON payloads or CSV uploads for batch jobs, with pause, resume, and cancel controls, plus an email notification when the run finishes. Microlink does not have native bulk processing.'
          },
          {
            title: 'You need page-scroll video output',
            description:
              'ScreenshotAPI records a scrolling page as WebM, MP4, or GIF with configurable speed, direction, and duration across multiple viewports. Microlink does not produce scrolling video captures.'
          },
          {
            title: 'You need fine-grained resource control',
            description:
              'ScreenshotAPI lets you block JS, stylesheets, images, fonts, XHR, fetch, WebSockets, and more, each with its own toggle. Microlink covers ad blocking and CSS-selector hiding but not per-resource-type controls.'
          },
          {
            title: 'You live in Zapier, Make, or n8n',
            description:
              'ScreenshotAPI ships first-class connectors for Zapier, Make.com, n8n, Google Sheets, viaSocket, and Pipedream. Microlink has fewer no-code connectors today (more on the way).'
          },
          {
            title: 'You want screenshots sent to your own bucket',
            description:
              'Every paid ScreenshotAPI plan can push captures directly to Amazon S3, Wasabi, or Google Cloud Storage. Microlink returns the image in the API response and does not include native storage upload.'
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
        4.6× the volume. <GradientText>Just $10 more.</GradientText>
      </Subhead>
      <Caption
        css={theme({
          pb: [4, 4, 5, 5],
          maxWidth: layout.large,
          color: 'black60'
        })}
        titleize={false}
      >
        ScreenshotAPI&nbsp;Startup is $29 for 10,000 screenshots. Microlink is
        $39 for 46,000 requests. <b>$10 more. 4.6× more.</b>
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
              $39
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
                'Screenshots, PDF, metadata, link previews, remote JS',
                'Free: 50 requests/day, no credit card, no expiry',
                'No rate limit on any paid plan',
                '240+ edge nodes, 99.9% SLA',
                'Open-source core (MIT licensed)',
                '$0.00085/request — 10× cheaper than ScreenshotAPI Essentials'
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
            ScreenshotAPI
          </Badge>
          <PriceAmount>
            $29
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
              '40 req/min rate limit on Startup',
              '$0.008 per extra screenshot',
              'Screenshots and PDF only — no metadata, previews, or remote JS',
              'No-code integrations (Zapier, Make, n8n)',
              'BYOB storage (S3/Wasabi/GCS, all paid plans)'
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
        Prices stay low because{' '}
        <Link href='/enterprise'>enterprise clients</Link> processing millions
        of requests a month cover the infrastructure. Indie devs and startups
        get the same 240+ edge network at a fraction of the cost.
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
        <b css={theme({ color: 'white' })}>
          Swap the endpoint. Keep your code.
        </b>
        <br />
        <br />
        Change the host and the key, and your integration keeps working.
        <br />
        Your first{' '}
        <b css={theme({ color: 'white' })}>50 requests/day are free</b>, no
        credit card, no time limit.
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
        question: 'Is there a free ScreenshotAPI.net alternative?',
        answer: (
          <>
            <div>
              Yes. Microlink's <Link href='/#pricing'>free tier</Link> gives you
              50&nbsp;requests/day with no credit card and no expiry date. Same
              API, same quality, same 240+ edge network as paid plans.
            </div>
            <div>
              ScreenshotAPI's free trial is 100&nbsp;screenshots that expire
              after 7&nbsp;days. After just 2&nbsp;days on Microlink's free
              tier, you've already passed that total, and the counter resets
              every morning.
            </div>
          </>
        )
      },
      {
        question:
          'Does Microlink produce the same screenshot quality as ScreenshotAPI?',
        answer: (
          <>
            <div>
              Both use Chromium under the hood. Microlink applies optimal
              compression by default so output quality is high without manual
              tuning. ScreenshotAPI also produces good results and supports
              retina 2× captures up to 5K&nbsp;resolution for pixel-dense
              output.
            </div>
          </>
        )
      },
      {
        question: 'How do I migrate from ScreenshotAPI to Microlink?',
        answer: (
          <>
            <div>
              ScreenshotAPI sends GET requests with query params: <i>token</i>,{' '}
              <i>url</i>, <i>width</i>, <i>height</i>, <i>output</i>,{' '}
              <i>full_page</i>. Microlink accepts the same concepts under its
              own parameter names. Change the host and the key, and most
              integrations keep working. The{' '}
              <Link href='/docs/api/parameters/screenshot'>
                screenshot docs
              </Link>{' '}
              cover every parameter with examples.
            </div>
            <div>
              Paste your existing code into any LLM and ask it to migrate to
              Microlink. Or email{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>{' '}
              and we'll help directly.
            </div>
          </>
        )
      },
      {
        question: 'Does Microlink do more than screenshots?',
        answer: (
          <>
            <div>
              Yes. One API key gives you screenshots, PDF generation,
              Open&nbsp;Graph and metadata extraction, link previews (via the
              React/Vue/JS SDK), remote JavaScript execution, and Lighthouse
              audits. ScreenshotAPI covers screenshots and PDFs only. Anything
              else requires a separate service.
            </div>
          </>
        )
      },
      {
        question: 'Is Microlink really open source?',
        answer: (
          <>
            <div>
              The core engine components are MIT-licensed on GitHub:{' '}
              <Link href='https://github.com/microlinkhq/metascraper'>
                Metascraper
              </Link>{' '}
              (metadata extraction),{' '}
              <Link href='https://github.com/microlinkhq/mql'>MQL</Link> (query
              language), and{' '}
              <Link href='https://github.com/microlinkhq/browserless'>
                Browserless
              </Link>{' '}
              (headless browser). Read the code, fork it, or run it yourself.
            </div>
            <div>
              ScreenshotAPI is closed-source. There is no way to inspect the
              code that handles your URLs.
            </div>
          </>
        )
      },
      {
        question: 'How does ScreenshotAPI pricing compare to Microlink?',
        answer: (
          <>
            <div>
              ScreenshotAPI Essentials: $9/month for 1,000&nbsp;screenshots at
              $0.009 each. Startup: $29/month for 10,000 with a 40&nbsp;req/min
              cap. Microlink: $39/month for 46,000&nbsp;requests at $0.00085
              each, no per-minute cap.
            </div>
            <div>
              Per request, Microlink is 10.6× cheaper than ScreenshotAPI
              Essentials and 3.4× cheaper than Startup. Enterprise clients
              running millions of requests fund the infrastructure, which is how
              indie devs get the same global edge network at these prices.
            </div>
          </>
        )
      },
      {
        question: 'Does Microlink throttle requests?',
        answer: (
          <>
            <div>
              Paid plans have no requests-per-minute cap. Burst as high as your
              concurrency allows. The only limit is your monthly quota.
            </div>
            <div>
              ScreenshotAPI enforces rate limits on every plan: 20&nbsp;req/min
              on Essentials, 40 on Startup, 80 on Business. That cap can
              bottleneck batch jobs or high-traffic embed workflows.
            </div>
          </>
        )
      },
      {
        question: 'How does Microlink handle cookie banners and ads?',
        answer: (
          <>
            <div>
              Both Microlink and ScreenshotAPI block ads and remove cookie
              banners. ScreenshotAPI gives you 15+ resource-type toggles: block
              JS, stylesheets, fonts, XHR, fetch, WebSockets, and more,
              individually. Microlink uses the{' '}
              <Link href='/docs/api/parameters/adblock'>adblock</Link> parameter
              and custom CSS/JS injection to dismiss consent dialogs before
              capture.
            </div>
            <div>
              Use{' '}
              <Link href='/docs/api/parameters/screenshot/hide'>
                screenshot.hide
              </Link>{' '}
              to remove any element by CSS selector, whether that's a sticky
              banner, a chat widget, or a promo overlay.
            </div>
          </>
        )
      },
      {
        question: 'What SLA does Microlink offer?',
        answer: (
          <>
            <div>
              Microlink guarantees 99.9% uptime with a formal SLA. Requests are
              served from 240+ Cloudflare edge nodes, so latency stays low
              regardless of where your users are located. ScreenshotAPI runs on
              Google Cloud Platform and does not publish a formal SLA or CDN
              edge distribution.
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
    title='ScreenshotAPI.net Alternative | Microlink Screenshot API'
    description='Microlink is 33% faster than ScreenshotAPI on average, costs $0.00085/request (vs $0.009), and covers screenshots, PDF, metadata, and link previews in one API. Free tier, no credit card.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'ScreenshotAPI.net Alternative — Microlink Screenshot API',
        description:
          'Compare Microlink and ScreenshotAPI. Microlink is 33% faster on average, up to 4× faster on simple pages, and includes screenshots, PDF generation, metadata extraction, and link previews in one API at $0.00085 per request.',
        url: 'https://microlink.io/alternative/screenshotapi',
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
            name: 'How does Microlink compare to ScreenshotAPI for screenshot quality?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Both services produce high-quality screenshots using Chromium. Microlink serves maximum quality with optimal compression by default and is 33% faster on average — up to 4× faster on full-page captures — due to its 240+ edge node infrastructure.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the best alternative to ScreenshotAPI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink is a full headless browser API that replaces ScreenshotAPI for screenshots and adds PDF generation, metadata extraction, link previews, and remote JS execution — all in one API with one key.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I migrate from ScreenshotAPI to Microlink?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. ScreenshotAPI uses GET with query params (token, url, width, height, output). Microlink accepts similar parameters. Most migrations involve updating the endpoint and key.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is there a free ScreenshotAPI.net alternative?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. Microlink's free tier gives you 50 requests/day with no credit card and no expiry. ScreenshotAPI's free trial is 100 screenshots that expire after 7 days. After 2 days on Microlink's free tier you've already exceeded that total."
            }
          },
          {
            '@type': 'Question',
            name: 'How does ScreenshotAPI pricing compare to Microlink?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ScreenshotAPI Startup is $29/month for 10,000 screenshots with a 40 req/min cap. Microlink is $39/month for 46,000 requests at $0.00085 each, with no per-minute rate limit. That is 4.6× more volume for $10 more, and 10.6× cheaper per request than ScreenshotAPI Essentials.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Microlink throttle requests?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Paid plans have no requests-per-minute cap. The only limit is the monthly request quota. ScreenshotAPI enforces rate limits on every plan: 20 req/min on Essentials, 40 on Startup, 80 on Business.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I use the screenshot API without a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. Microlink's embed mode returns a direct image URL you can put in an img tag, CSS background-image, or Markdown with no backend or storage layer needed."
            }
          },
          {
            '@type': 'Question',
            name: 'What output formats does Microlink support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'PNG, JPEG, and WebP for still screenshots, animated GIF and MP4 video for motion captures, and PDF generation — all from the same API endpoint.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does Microlink handle cookie banners and ads?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Both services support ad blocking and cookie banner removal. ScreenshotAPI provides 15+ resource-type toggles. Microlink uses the adblock parameter, custom CSS/JS injection, and screenshot.hide to remove elements by CSS selector.'
            }
          },
          {
            '@type': 'Question',
            name: 'What SLA does Microlink offer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Microlink guarantees 99.9% uptime with a formal SLA, served from 240+ Cloudflare edge nodes. ScreenshotAPI runs on Google Cloud Platform and does not publish a formal SLA.'
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

const ScreenshotAPIPage = () => (
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

export default ScreenshotAPIPage
