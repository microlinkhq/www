import {
  breakpoints,
  colors,
  layout,
  speed,
  textGradient,
  theme,
  shadows
} from 'theme'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import LineBreak from 'components/elements/LineBreak'
import Heading from 'components/elements/Heading'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import {
  DashedGridOverlay,
  Eyebrow,
  Section,
  SectionInner,
  StoryTag
} from 'components/patterns/CustomerStory'
import { ACCENT, FEATURES } from 'components/patterns/FeatureStory'
import Layout from 'components/patterns/Layout'

import { withTitle } from 'helpers/hoc/with-title'

const Caption = withTitle(CaptionBase)

const ROTATE_MS = 6000

const FeatureName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 2,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

const PlanPill = styled(Box)`
  display: inline-flex;
  align-items: center;
  ${theme({
    bg: 'white',
    color: 'black70',
    border: 1,
    borderColor: 'black10',
    borderRadius: 5,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    px: 2,
    py: 1,
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

const Snippet = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    color: 'black70',
    bg: ACCENT.bgSoft,
    border: 1,
    borderColor: ACCENT.bgEdge,
    borderRadius: 2,
    px: 3,
    py: 2
  })}
  overflow-x: auto;
  white-space: nowrap;
`

const HeroGrid = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${theme({ gap: [4, 4, 5, 5] })}
  align-items: start;

  /* minmax(0, 1fr) so the nowrap snippet can't blow out its track — columns
     stay a true 50/50 split and the grid never overflows the container. */
  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
  }
`

const FeaturedCard = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    display: 'flex',
    flexDirection: 'column'
  })}
  box-shadow: ${shadows[1]};
`

const FeaturedName = styled(Text)`
  ${theme({
    m: 0,
    color: 'black',
    fontSize: ['18px', '20px', '22px', '24px'],
    fontWeight: 'bold',
    lineHeight: 2,
    letterSpacing: '-0.01em'
  })}
`

const FadeContent = styled(Box)`
  transition: opacity ${speed.slowly}ms ease;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Dot = styled('button')`
  ${theme({
    border: 0,
    p: 0,
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })}
  cursor: pointer;
  background: transparent;

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: background ${speed.quickly}ms ease;
    background: ${({ $active }) => ($active ? colors.link : colors.black20)};
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }
  }
`

const Hero = () => {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)
  const reducedMotion = useRef(false)

  const hoveredRef = useRef(false)
  const focusedRef = useRef(false)

  const isPaused = () => hoveredRef.current || focusedRef.current

  const startInterval = () => {
    clearInterval(intervalRef.current)
    if (reducedMotion.current || isPaused()) return
    intervalRef.current = setInterval(() => {
      clearTimeout(timeoutRef.current)
      setVisible(false)
      timeoutRef.current = setTimeout(() => {
        setIndex(prev => (prev + 1) % FEATURES.length)
        setVisible(true)
      }, speed.slowly)
    }, ROTATE_MS)
  }

  const stop = () => {
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
    setVisible(true)
  }

  const tryResume = () => {
    if (!isPaused()) startInterval()
  }

  const goTo = i => {
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
    if (i === index) {
      setVisible(true)
      startInterval()
      return
    }
    if (reducedMotion.current) {
      setIndex(i)
      return
    }
    setVisible(false)
    timeoutRef.current = setTimeout(() => {
      setIndex(i)
      setVisible(true)
      startInterval()
    }, speed.slowly)
  }

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = mql.matches
    const onChange = () => {
      reducedMotion.current = mql.matches
      if (mql.matches) {
        clearInterval(intervalRef.current)
        clearTimeout(timeoutRef.current)
        setVisible(true)
      } else {
        startInterval()
      }
    }
    mql.addEventListener('change', onChange)
    startInterval()
    return () => {
      mql.removeEventListener('change', onChange)
      clearInterval(intervalRef.current)
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const current = FEATURES[index]

  return (
    <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
      <SectionInner>
        <HeroGrid>
          <Box>
            <StoryTag
              accent={ACCENT}
              css={theme({ mb: [3, 3, 4, 4], display: 'inline-flex' })}
            >
              Features
            </StoryTag>
            <Heading variant={null} css={theme({ textAlign: 'left' })}>
              Every parameter. <LineBreak />
              <span css={textGradient}>Every output.</span>
            </Heading>
            <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
              Production-grade capabilities —{' '}
              <Link href='/features/scraping'>data extraction</Link>,{' '}
              <Link href='/features/proxy'>proxy</Link>,{' '}
              <Link href='/features/ttl'>caching</Link>,{' '}
              <Link href='/features/headers'>headers</Link> — that work
              uniformly across <Link href='/metadata'>metadata</Link>,{' '}
              <Link href='/screenshot'>screenshots</Link>,{' '}
              <Link href='/pdf'>PDFs</Link>, and{' '}
              <Link href='/markdown'>markdown</Link>.
            </Text>
            <Box css={theme({ pt: [3, 3, 4, 4] })}>
              <Text
                as='a'
                href='#features'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [1, 2, 2, 2],
                  textDecoration: 'none'
                })}
              >
                Explore features →
              </Text>
            </Box>
          </Box>

          <Box
            onMouseEnter={() => {
              hoveredRef.current = true
              stop()
            }}
            onMouseLeave={() => {
              hoveredRef.current = false
              tryResume()
            }}
            onFocusCapture={() => {
              focusedRef.current = true
              stop()
            }}
            onBlurCapture={e => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                focusedRef.current = false
                tryResume()
              }
            }}
          >
            <FeaturedCard
              as={GatsbyLink}
              to={`/features/${current.slug}`}
              css={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <FadeContent $visible={visible}>
                <Flex
                  css={theme({
                    alignItems: 'center',
                    gap: 2,
                    pb: [3, 3, 4, 4]
                  })}
                >
                  <StoryTag accent={ACCENT}>{current.category}</StoryTag>
                  <PlanPill>{current.tag}</PlanPill>
                </Flex>

                <FeaturedName>{current.name}</FeaturedName>

                <Text
                  css={theme({
                    color: 'black70',
                    fontSize: 1,
                    lineHeight: 2,
                    pt: 2
                  })}
                >
                  {current.oneLiner}
                </Text>

                <Snippet css={theme({ mt: [3, 3, 4, 4] })}>
                  {current.snippet}
                </Snippet>
              </FadeContent>
            </FeaturedCard>

            <Flex
              css={theme({
                justifyContent: 'center',
                gap: 2,
                pt: 3
              })}
            >
              {FEATURES.map((feature, i) => (
                <Dot
                  key={feature.name}
                  $active={i === index}
                  aria-label={`Show ${feature.name} feature`}
                  onClick={() => goTo(i)}
                />
              ))}
            </Flex>
          </Box>
        </HeroGrid>
      </SectionInner>
    </Section>
  )
}

const ParamBarSection = styled(Section)`
  ${theme({
    borderTop: 1,
    borderBottom: 1,
    borderColor: 'black10',
    py: [3, 3, 4, 4]
  })}
`

const ParamChip = styled(Link)`
  display: inline-flex;
  align-items: center;
  ${theme({
    bg: 'white',
    color: 'black',
    border: 1,
    borderColor: 'black10',
    borderRadius: 2,
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    px: 3,
    py: 2
  })}
`

const ParamBar = () => (
  <ParamBarSection>
    <SectionInner>
      <Eyebrow
        accent={ACCENT}
        css={theme({ pb: [3, 3, 4, 4], display: 'block', textAlign: 'center' })}
      >
        One request away
      </Eyebrow>
      <Flex
        css={theme({
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: [3, 3, 4, 4]
        })}
      >
        {FEATURES.map(({ slug, param }) => (
          <ParamChip key={slug} href={`/features/${slug}`}>
            {param}
          </ParamChip>
        ))}
      </Flex>
    </SectionInner>
  </ParamBarSection>
)

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${theme({ gap: [3, 3, 4, 4] })}

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
  box-shadow: ${shadows[1]};
`

const CardLink = styled(Link)`
  ${theme({
    fontWeight: 'bold',
    fontSize: [0, 1, 1, 1]
  })}
  margin-top: auto;
`

const FeaturesGrid = () => (
  <Section id='features' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      <Eyebrow
        accent={ACCENT}
        css={theme({ pb: [3, 3, 4, 4], display: 'block' })}
      >
        Features
      </Eyebrow>

      <Grid>
        {FEATURES.map(({ slug, name, oneLiner, tag, category, snippet }) => (
          <Card key={slug}>
            <Flex css={theme({ alignItems: 'center', gap: 2 })}>
              <StoryTag accent={ACCENT}>{category}</StoryTag>
              <PlanPill>{tag}</PlanPill>
            </Flex>
            <FeatureName>{name}</FeatureName>
            <Text css={theme({ color: 'black70', fontSize: 1, lineHeight: 2 })}>
              {oneLiner}
            </Text>
            <Snippet>{snippet}</Snippet>
            <CardLink href={`/features/${slug}`} css={theme({ color: 'link' })}>
              Explore feature →
            </CardLink>
          </Card>
        ))}
      </Grid>
    </SectionInner>
  </Section>
)

const CtaSection = () => (
  <Section>
    <SectionInner css={theme({ textAlign: 'center' })}>
      <Subhead
        css={theme({
          color: 'black'
        })}
      >
        Built in,{' '}
        <span css={theme({ color: 'secondary' })}>not bolted on.</span>
      </Subhead>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          color: 'black70',
          pt: [3, 3, 4, 4],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        Every feature works across every workflow — the same request that{' '}
        <Link href='/features/scraping'>extracts data</Link> can capture the{' '}
        <Link href='/screenshot'>screenshot</Link>, render the{' '}
        <Link href='/pdf'>PDF</Link>, and{' '}
        <Link href='/features/ttl'>cache</Link> the result. No extra vendors, no
        extra glue.
      </Caption>
      <Flex
        css={theme({
          py: [3, 4, 4, 4],
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <ArrowLink
          href='/pricing'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Pick the plan that fits your traffic
        </ArrowLink>
      </Flex>
    </SectionInner>
  </Section>
)

const FeaturesIndexPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <ParamBar />
      <FeaturesGrid />
      <CtaSection />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Features: Microlink API capabilities'
    description='Explore Microlink API features — data extraction with CSS selectors, automatic proxy resolution against antibots, configurable cache TTL, and custom HTTP headers — applied uniformly across every output.'
    schemaType='WebPage'
  />
)

export default FeaturesIndexPage
