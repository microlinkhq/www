import { breakpoints, colors, speed, textGradient, theme, shadows } from 'theme'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Meta from 'components/elements/Meta/Meta'
import LineBreak from 'components/elements/LineBreak'
import Heading from 'components/elements/Heading'
import Text from 'components/elements/Text'

import {
  ACCENT,
  Avatar,
  CompanyLogo,
  CompanyName,
  CUSTOMERS,
  DashedGridOverlay,
  Eyebrow,
  Initials,
  Section,
  SectionInner,
  StoryTag,
  customerPath
} from 'components/patterns/CustomerStory'
import { UseCaseGroups } from 'components/patterns/UseCaseStory'
import Layout from 'components/patterns/Layout'

const ROTATE_MS = 6000

const HeroGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [4, 4, 5, 5] })}
  align-items: start;

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: 1fr 1fr;
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

const FeaturedQuote = styled(Text).attrs({ as: 'blockquote' })`
  ${theme({
    m: 0,
    color: 'black',
    fontSize: ['18px', '20px', '22px', '24px'],
    fontWeight: 'normal',
    lineHeight: 2,
    letterSpacing: '-0.01em'
  })}
`

const QuoteMark = styled('span')`
  ${theme({
    fontSize: ['32px', '36px', '40px', '44px'],
    fontWeight: 'bold',
    mr: 1
  })}
  line-height: 0;
  vertical-align: -0.2em;
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
        setIndex(prev => (prev + 1) % CUSTOMERS.length)
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

  const current = CUSTOMERS[index]

  return (
    <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
      <SectionInner>
        <HeroGrid>
          <Box>
            <StoryTag
              accent={ACCENT}
              css={theme({ mb: [3, 3, 4, 4], display: 'inline-flex' })}
            >
              Customer stories
            </StoryTag>
            <Heading
              variant={null}
              css={theme({ textAlign: 'left', scrollMarginTop: 4 })}
            >
              Real teams. <LineBreak />
              <span css={textGradient}>Real results.</span>
            </Heading>
            <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
              See how companies use Microlink to ship rich link previews,
              screenshots, and metadata in production.
            </Text>
            <Box css={theme({ pt: [3, 3, 4, 4] })}>
              <Text
                as='a'
                href='#stories'
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [1, 2, 2, 2],
                  textDecoration: 'none'
                })}
              >
                Explore stories →
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
              to={customerPath(current.slug)}
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
                  <CompanyLogo
                    src={current.icon}
                    alt=''
                    width='40'
                    height='40'
                    css={theme({ width: '40px', height: '40px' })}
                    decoding='async'
                  />
                  <CompanyName>{current.name}</CompanyName>
                </Flex>

                <FeaturedQuote>
                  <QuoteMark css={textGradient}>”</QuoteMark>
                  {current.quote}
                </FeaturedQuote>

                <Flex
                  css={theme({
                    alignItems: 'center',
                    gap: 2,
                    pt: [3, 3, 4, 4]
                  })}
                >
                  {current.avatar
                    ? (
                      <Avatar
                        src={current.avatar}
                        alt={current.author}
                        width='44'
                        height='44'
                        css={theme({
                          width: '44px',
                          height: '44px',
                          border: 1,
                          borderColor: 'black10'
                        })}
                        decoding='async'
                      />
                      )
                    : (
                      <Initials
                        size={44}
                        aria-hidden='true'
                        css={theme({
                          bg: ACCENT.bgSoft,
                          borderColor: ACCENT.bgEdge,
                          color: ACCENT.text,
                          border: 1
                        })}
                      >
                        {current.initials}
                      </Initials>
                      )}
                  <Box>
                    <Text
                      css={theme({
                        color: 'black',
                        fontSize: 1,
                        fontWeight: 'bold',
                        lineHeight: 1
                      })}
                    >
                      {current.author}
                    </Text>
                    <Text css={theme({ color: 'black60', fontSize: 0, pt: 1 })}>
                      {current.role}, {current.name}
                    </Text>
                  </Box>
                </Flex>
              </FadeContent>
            </FeaturedCard>

            <Flex
              css={theme({
                justifyContent: 'center',
                gap: 2,
                pt: 3
              })}
            >
              {CUSTOMERS.map((customer, i) => (
                <Dot
                  key={customer.name}
                  $active={i === index}
                  aria-label={`Show ${customer.name} quote`}
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

const LogoBarSection = styled(Section)`
  ${theme({
    borderTop: 1,
    borderBottom: 1,
    borderColor: 'black10',
    py: [3, 3, 4, 4]
  })}
`

const LogoItem = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 2,
    flex: '0 0 auto'
  })}
`

const LogoBar = () => (
  <LogoBarSection>
    <SectionInner>
      <Eyebrow
        accent={ACCENT}
        css={theme({ pb: [3, 3, 4, 4], display: 'block', textAlign: 'center' })}
      >
        Trusted by innovative companies
      </Eyebrow>
      <Flex
        css={theme({
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: [4, 4, 5, 5]
        })}
      >
        {CUSTOMERS.map(({ slug, name, icon }) => (
          <LogoItem key={slug}>
            <CompanyLogo
              src={icon}
              alt=''
              width='32'
              height='32'
              loading='lazy'
              decoding='async'
              css={theme({ width: '32px', height: '32px' })}
            />
            <CompanyName>{name}</CompanyName>
          </LogoItem>
        ))}
      </Flex>
    </SectionInner>
  </LogoBarSection>
)

const UseCaseGrid = () => (
  <Section id='use-cases' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      <Eyebrow
        forwardedAs='h2'
        accent={ACCENT}
        css={theme({ m: 0, pb: [3, 3, 4, 4], display: 'block' })}
      >
        Use cases
      </Eyebrow>
      <UseCaseGroups />
    </SectionInner>
  </Section>
)

const UseCasesIndexPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <LogoBar />
      <UseCaseGrid />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Use cases: how teams build with Microlink'
    description='Real customer stories plus practical, copy-pasteable use cases — see how teams ship link previews, screenshots, and metadata with Microlink.'
    schemaType='WebPage'
  />
)

export default UseCasesIndexPage
