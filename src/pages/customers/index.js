import { breakpoints, colors, speed, textGradient, theme } from 'theme'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'

import {
  ACCENT,
  CUSTOMERS,
  DashedGridOverlay,
  Eyebrow,
  Section,
  SectionInner,
  StoryTag
} from 'components/patterns/CustomerStory'
import Layout from 'components/patterns/Layout'

import { cdnUrl } from 'helpers/cdn-url'

const ROTATE_MS = 6000

/* ─── Shared primitives ──────────────────────────────────────────────────── */

const CompanyName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 2,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

const CompanyLogo = styled('img')`
  ${theme({
    display: 'block',
    borderRadius: 2
  })}
  object-fit: cover;
`

const Avatar = styled('img')`
  ${theme({
    borderRadius: '50%',
    flex: '0 0 auto',
    display: 'block'
  })}
  object-fit: cover;
`

const Initials = styled(Box).withConfig({
  shouldForwardProp: prop => !['size'].includes(prop)
})`
  ${theme({
    borderRadius: '50%',
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'mono',
    fontWeight: 'bold',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  font-size: ${({ size }) => Math.round(size * 0.36)}px;
`

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const HeroGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [4, 4, 5, 5] })}
  align-items: start;

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: 2fr 3fr;
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
  box-shadow: 0 1px 2px ${colors.black05};
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
    borderRadius: '50%',
    width: '8px',
    height: '8px',
    p: 0
  })}
  cursor: pointer;
  transition: background ${speed.quickly}ms ease;
  background: ${({ $active }) => ($active ? colors.link : colors.black20)};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Hero = () => {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)

  const startInterval = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      clearTimeout(timeoutRef.current)
      setVisible(false)
      timeoutRef.current = setTimeout(() => {
        setIndex(prev => (prev + 1) % CUSTOMERS.length)
        setVisible(true)
      }, speed.slowly)
    }, ROTATE_MS)
  }

  const goTo = i => {
    if (i === index) return
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
    setVisible(false)
    timeoutRef.current = setTimeout(() => {
      setIndex(i)
      setVisible(true)
      startInterval()
    }, speed.slowly)
  }

  useEffect(() => {
    startInterval()
    return () => {
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
            <Text
              as='h1'
              css={theme({
                color: 'black',
                fontWeight: 'bold',
                fontSize: ['32px', '40px', '52px', '60px'],
                textAlign: 'left',
                letterSpacing: '-0.01em',
                lineHeight: 0,
                m: 0,
                scrollMarginTop: 4
              })}
            >
              Real teams. <LineBreak />
              <span css={textGradient}>Real results.</span>
            </Text>
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

          <FeaturedCard
            as='a'
            href={`/customers/${current.slug}`}
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
                <QuoteMark css={textGradient}>“</QuoteMark>
                {current.quote}
              </FeaturedQuote>

              <Flex
                css={theme({ alignItems: 'center', gap: 2, pt: [3, 3, 4, 4] })}
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

            <Flex
              css={theme({
                justifyContent: 'center',
                gap: 2,
                pt: 3
              })}
            >
              {CUSTOMERS.map((_, i) => (
                <Dot
                  key={i}
                  $active={i === index}
                  aria-label={`Show ${CUSTOMERS[i].name} quote`}
                  onClick={e => {
                    e.preventDefault()
                    goTo(i)
                  }}
                />
              ))}
            </Flex>
          </FeaturedCard>
        </HeroGrid>
      </SectionInner>
    </Section>
  )
}

/* ─── Logo bar ───────────────────────────────────────────────────────────── */

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

/* ─── Customer grid ──────────────────────────────────────────────────────── */

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [3, 3, 4, 4] })}

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
  box-shadow: 0 1px 2px ${colors.black05};
`

const CardLink = styled(Link)`
  ${theme({
    fontWeight: 'bold',
    fontSize: [0, 1, 1, 1]
  })}
  margin-top: auto;
`

const CardQuote = styled(Text)`
  ${theme({
    color: 'black60',
    fontSize: 0,
    fontStyle: 'italic',
    lineHeight: 2
  })}
`

const CustomerGrid = () => (
  <Section id='stories'>
    <SectionInner>
      <Eyebrow
        accent={ACCENT}
        css={theme({ pb: [3, 3, 4, 4], display: 'block' })}
      >
        Customer stories
      </Eyebrow>

      <Grid>
        {CUSTOMERS.map(
          ({
            slug,
            name,
            blurb,
            icon,
            quote,
            author,
            role,
            initials,
            avatar
          }) => (
            <Card key={slug}>
              <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                <CompanyLogo
                  src={icon}
                  alt=''
                  width='40'
                  height='40'
                  loading='lazy'
                  decoding='async'
                  css={theme({ width: '40px', height: '40px' })}
                />
                <CompanyName>{name}</CompanyName>
              </Flex>
              <Text
                css={theme({ color: 'black70', fontSize: 1, lineHeight: 2 })}
              >
                {blurb}
              </Text>
              <CardQuote>
                “
                {quote}
                ”
              </CardQuote>
              <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                {avatar
                  ? (
                    <Avatar
                      src={avatar}
                      alt={author}
                      width='28'
                      height='28'
                      loading='lazy'
                      decoding='async'
                      css={theme({ width: '28px', height: '28px' })}
                    />
                    )
                  : (
                    <Initials
                      size={28}
                      aria-hidden='true'
                      css={theme({ bg: 'black05', color: 'black60' })}
                    >
                      {initials}
                    </Initials>
                    )}
                <Box>
                  <Text
                    css={theme({
                      color: 'black',
                      fontSize: 0,
                      fontWeight: 'bold',
                      lineHeight: 1
                    })}
                  >
                    {author}
                  </Text>
                  <Text css={theme({ color: 'black60', fontSize: '11px' })}>
                    {role}, {name}
                  </Text>
                </Box>
              </Flex>
              <CardLink
                href={`/customers/${slug}`}
                css={theme({ color: 'link' })}
              >
                Read story →
              </CardLink>
            </Card>
          )
        )}
      </Grid>
    </SectionInner>
  </Section>
)

const CustomersIndexPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <LogoBar />
      <CustomerGrid />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Customer stories: how teams ship with Microlink'
    description='Real teams using Microlink in production — link previews, screenshots, and metadata at scale.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
  />
)

export default CustomersIndexPage
