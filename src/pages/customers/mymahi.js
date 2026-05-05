import { breakpoints, colors, layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'

import { withTitle } from 'helpers/hoc/with-title'
import { cdnUrl } from 'helpers/cdn-url'

const Caption = withTitle(CaptionBase)

/* ─── Accent ─────────────────────────────────────────────────────────────── */

const ACCENT = {
  text: 'orange7',
  bgSoft: 'orange0',
  bgEdge: 'orange1',
  highlight: 'orange5'
}

/* ─── Layout primitives ──────────────────────────────────────────────────── */

const SECTION_PX = [3, 3, 4, 4]
const SECTION_PY = [3, 3, 4, 5]
const SECTION_MAX_WIDTH = layout.large

const Section = styled(Box)`
  ${theme({
    py: SECTION_PY,
    px: SECTION_PX,
    width: '100%'
  })}
`

const SectionInner = styled(Box)`
  ${theme({
    width: '100%',
    maxWidth: SECTION_MAX_WIDTH,
    mx: 'auto'
  })}
`

const Eyebrow = styled(Text)`
  ${theme({
    color: ACCENT.text,
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.12em',
    textTransform: 'uppercase'
  })}
`

const BodyText = props => (
  <Caption
    forwardedAs='p'
    titleize={false}
    {...props}
    css={[
      theme({
        fontSize: [1, 2, 2, 2],
        textAlign: 'left',
        maxWidth: layout.large,
        mx: 0,
        color: 'black'
      }),
      props.css
    ]}
  />
)

const StoryTag = styled(Box)`
  display: inline-flex;
  align-items: center;
  ${theme({
    bg: ACCENT.bgSoft,
    color: ACCENT.text,
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    px: '10px',
    py: '4px',
    borderRadius: '20px',
    textTransform: 'uppercase'
  })}
`

/* ─── Background overlay ─────────────────────────────────────────────────── */

const DashedGridOverlay = styled(Box)`
  ${theme({ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0 })}
  height: 1200px;
  pointer-events: none;
  background-image: linear-gradient(
      to right,
      ${colors.gray2} 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, ${colors.gray2} 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 0 0;
  mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  -webkit-mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
`

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <StoryTag>Customer story</StoryTag>
      </Flex>
      <Text
        as='h1'
        css={theme({
          color: 'black',
          fontWeight: 'bold',
          fontSize: ['32px', '40px', '52px', '60px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0,
          m: 0
        })}
      >
        <span css={theme({ color: ACCENT.text })}>MyMahi:</span> Rich link
        previews for every Newsfeed post
      </Text>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          textAlign: 'left',
          maxWidth: layout.large,
          mx: 0
        })}
      >
        How a learner-focused platform used by schools across New Zealand and
        Australia uses Microlink's Metadata API to turn every shared link into a
        cached, fast-loading preview card.
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/metadata'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          See how to integrate metadata
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── About the customer ─────────────────────────────────────────────────── */

const AboutCustomer = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
    <SectionInner>
      <Figure css={theme({ pt: 0, pb: 5 })}>
        <FigureImage
          src='/images/clients/mymahi-web.png'
          alt='MyMahi platform'
          width='2816'
          height='1920'
          loading='eager'
          decoding='async'
          css={theme({ maxWidth: layout.normal })}
        />
      </Figure>
      <Eyebrow css={theme({ pb: 3, pt: 2, display: 'block' })}>
        About MyMahi
      </Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0,
          pb: [3, 3, 4, 4]
        })}
      >
        Supporting learning, wellbeing, and future pathways for students across
        New Zealand and Australia.
      </SubheadBase>
      <BodyText css={theme({ pb: [3, 3, 4, 4] })}>
        MyMahi is a self-management platform for learners. It puts students at
        the centre of their own story with tools for Digital Identity, a Digital
        Backpack to capture learning milestones, mentoring, wellbeing, and
        future pathways planning. The mentor dashboard is the backbone of the
        product, giving teachers a single place to connect with the learners
        they support.
      </BodyText>
      <BodyText>
        The platform is used in schools and centres of learning across New
        Zealand and Australia, and was successfully assessed by Safer
        Technologies 4 Schools (ST4S) in 2024 — a national standardised review
        of digital products used by schools across both countries.
      </BodyText>
      <Box css={theme({ pt: 2, pb: 0 })}>
        <Link
          href='https://mymahi.com'
          externalIcon
          css={theme({
            color: ACCENT.text,
            fontWeight: 'bold',
            fontSize: [1, 2, 2, 2]
          })}
        >
          Visit mymahi.com
        </Link>
      </Box>
      <Testimonial />
    </SectionInner>
  </Section>
)

/* ─── How they use Microlink ─────────────────────────────────────────────── */

const Figure = styled('figure')`
  ${theme({
    m: 0,
    py: [4, 4, 5, 5]
  })}
`

const FigureImage = styled('img')`
  ${theme({
    display: 'block',
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    mx: 'auto',
    borderRadius: 3,
    boxShadow: 1
  })}
`

const Node = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    px: [3, 3, 3, 3],
    py: [3, 3, 3, 3],
    width: ['100%', '100%', 'auto', 'auto'],
    minWidth: [0, 0, '0', '0'],
    flex: ['0 0 auto', '0 0 auto', '1 1 0', '1 1 0']
  })}
  box-shadow: 0 1px 2px ${colors.black05};
  text-align: center;
`

const NodeActive = styled(Node)`
  ${theme({
    bg: ACCENT.bgSoft,
    borderColor: ACCENT.text
  })}
`

const NodeLabel = styled(Text)`
  ${theme({
    fontSize: 0,
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

const NodeSub = styled(Text)`
  ${theme({
    fontSize: 0,
    color: 'black60',
    pt: 1
  })}
`

const Arrow = () => (
  <Flex
    aria-hidden='true'
    css={`
      ${theme({
        color: 'black30',
        flex: '0 0 auto',
        alignItems: 'center',
        justifyContent: 'center'
      })}
      @media (max-width: calc(${breakpoints[1]} - 1px)) {
        transform: rotate(90deg);
      }
    `}
  >
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='9 18 15 12 9 6' />
    </svg>
  </Flex>
)

const HowTheyUseIt = () => (
  <Section css={theme({ pb: 5, pt: 4 })}>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>
        How they use Microlink
      </Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        Rich link previews for every Newsfeed post
      </SubheadBase>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        When a teacher or mentor shares a link in the MyMahi Newsfeed, the
        platform calls Microlink's Metadata API to extract the page's title,
        description, and preview image. The result is hydrated into a card
        students recognise instantly — the same kind of preview they'd expect
        from any modern app.
      </BodyText>
      <Figure>
        <Flex
          css={theme({
            alignItems: 'stretch',
            gap: [2, 2, 3, 3],
            flexDirection: ['column', 'column', 'row', 'row']
          })}
        >
          <Node>
            <NodeLabel>Newsfeed link</NodeLabel>
            <NodeSub>Shared by teacher</NodeSub>
          </Node>
          <Arrow />
          <NodeActive>
            <NodeLabel>Microlink</NodeLabel>
            <NodeSub>Scrapes metadata</NodeSub>
          </NodeActive>
          <Arrow />
          <Node>
            <NodeLabel>MyMahi database</NodeLabel>
            <NodeSub>Stores for fast reads</NodeSub>
          </Node>
          <Arrow />
          <Node>
            <NodeLabel>Newsfeed preview</NodeLabel>
            <NodeSub>Rendered to learners</NodeSub>
          </Node>
        </Flex>
      </Figure>
      <BodyText>
        Metadata is stored in MyMahi's database as soon as it's fetched, so
        subsequent renders of the Newsfeed are served straight from their own
        infrastructure. A background job periodically refreshes those records,
        keeping previews current without re-scraping on every read. The whole
        loop runs without anyone on the team maintaining a scraper, a headless
        browser pool, or an unfurl service.
      </BodyText>
      <Figure>
        <FigureImage
          src='/images/clients/mymahi-preview.png'
          alt='MyMahi using Microlink'
          width='1272'
          height='1150'
          loading='lazy'
          decoding='async'
        />
      </Figure>
    </SectionInner>
  </Section>
)

/* ─── Why Microlink — numbered cards ─────────────────────────────────────── */

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: [3, 3, 4, 4],
    alignItems: 'stretch'
  })}
  box-shadow: 0 1px 2px ${colors.black05};
`

const CardSide = styled(Box)`
  ${theme({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  })}
`

const CardMain = styled(Box)`
  ${theme({
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
`

const CardTitle = styled(Text)`
  ${theme({
    fontSize: 2,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 1
  })}
`

const CardKicker = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    color: ACCENT.text,
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  })}
`

const CardBody = styled(Text)`
  ${theme({
    fontSize: [1, 1, 1, 1],
    lineHeight: 2,
    color: 'black70'
  })}
`

const WhyMicrolink = () => (
  <Section css={theme({ pt: 0, pb: 6 })}>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          Why Microlink
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'left',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          Reliable link previews without the maintenance
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          A small team supporting schools across New Zealand and Australia can't
          afford to babysit a metadata scraper. MyMahi reaches for Microlink for
          three reasons.
        </BodyText>
      </Box>

      <Flex
        css={theme({
          gap: 3,
          flexDirection: 'column',
          alignItems: 'stretch'
        })}
      >
        <Card>
          <CardSide>
            <CardKicker>01 · Reliability</CardKicker>
            <CardTitle>One API for every link a teacher pastes.</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Newsfeed links come from anywhere — news sites, Google Docs,
              YouTube, government pages, school portals. Microlink handles all
              of them through a single endpoint, so MyMahi doesn't have to
              maintain per-domain parsers or fall back to "title-only" cards.
            </CardBody>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · Performance</CardKicker>
            <CardTitle>Cache once, serve forever.</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Microlink runs at the moment a link is shared. The metadata is
              then cached in MyMahi's own database, so loading the Newsfeed is
              just a database read. Students on slow school connections see
              their feed render instantly.
            </CardBody>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · Stack simplicity</CardKicker>
            <CardTitle>No browser pool to operate.</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Scraping arbitrary web pages reliably means running a fleet of
              headless browsers, dealing with bot detection, and patching
              breakage forever. Outsourcing that to Microlink lets MyMahi's
              engineering time stay on the platform itself — Digital Backpack,
              mentoring, wellbeing.
            </CardBody>
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Testimonial ────────────────────────────────────────────────────────── */

const TestimonialCard = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderLeft: '4px solid',
    borderLeftColor: ACCENT.highlight,
    borderRadius: 3,
    p: [3, 3, 4, 4],
    width: '100%',
    maxWidth: layout.normal,
    mx: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: [2, 2, 3, 3]
  })}
  box-shadow: 0 1px 2px ${colors.black05};
`

const Quote = styled(Text).attrs({ as: 'blockquote' })`
  ${theme({
    m: 0,
    color: 'black',
    fontSize: ['16px', '17px', '19px', '20px'],
    fontStyle: 'italic',
    fontWeight: 'normal',
    lineHeight: 2,
    letterSpacing: '-0.005em'
  })}
`

const QuoteMark = styled(Text).attrs({ as: 'span', 'aria-hidden': 'true' })`
  ${theme({
    color: ACCENT.text,
    fontSize: ['28px', '32px', '36px', '40px'],
    fontWeight: 'bold',
    lineHeight: 0,
    display: 'block'
  })}
`

const Author = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 3
  })}
`

const AuthorAvatar = styled(Box)`
  ${theme({
    bg: ACCENT.bgSoft,
    border: 1,
    borderColor: ACCENT.bgEdge,
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ACCENT.text,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

const AuthorName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 1,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

const AuthorRole = styled(Text)`
  ${theme({
    color: 'black60',
    fontSize: 0,
    pt: 1
  })}
`

const Testimonial = () => (
  <Section css={theme({ pt: 5 })}>
    <SectionInner>
      <TestimonialCard as='figure'>
        <QuoteMark>“</QuoteMark>
        <Quote>
          Microlink.io is the engine behind our Newsfeed previews. It provides
          the metadata we need to keep our platform visual and engaging, while
          giving us the flexibility to store and refresh data for maximum
          performance.
        </Quote>
        <Author as='figcaption'>
          <AuthorAvatar aria-hidden='true'>SC</AuthorAvatar>
          <Box>
            <AuthorName>Stefan Charsley</AuthorName>
            <AuthorRole>CTO · MyMahi</AuthorRole>
          </Box>
        </Author>
      </TestimonialCard>
    </SectionInner>
  </Section>
)

/* ─── Thanks ─────────────────────────────────────────────────────────────── */

const ThanksLogo = styled('img')`
  ${theme({
    display: 'block',
    width: 'auto',
    height: '32px',
    mx: 'auto'
  })}
`

const ThanksSection = () => (
  <Section css={theme({ pt: 5, pb: [3, 3, 4, 4] })}>
    <SectionInner css={theme({ textAlign: 'center', maxWidth: layout.small })}>
      <Box css={theme({ pt: [3, 3, 4, 4], pb: [2, 2, 3, 3] })}>
        <Link href='https://mymahi.com'>
          <ThanksLogo
            src='/images/clients/mymahi.com.svg'
            alt='MyMahi'
            width='258'
            height='52'
            loading='lazy'
            decoding='async'
          />
        </Link>
      </Box>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          color: 'black70',
          fontSize: [0, 1],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        <b>Thank you to the MyMahi team</b> for letting us share their use case,
        and for choosing Microlink to power link previews across their platform.
      </Caption>
    </SectionInner>
  </Section>
)

/* ─── CTA ────────────────────────────────────────────────────────────────── */

const CtaSection = () => (
  <Section
    css={`
      background-color: rgba(246, 108, 6, 0.06);
      ${theme({
        borderTop: 1,
        borderTopColor: ACCENT.bgEdge,
        borderBottom: 1,
        borderBottomColor: ACCENT.bgEdge
      })}
    `}
  >
    <SectionInner css={theme({ textAlign: 'center' })}>
      <SubheadBase
        css={theme({
          color: 'black',
          fontSize: ['28px', '32px', '40px', '46px'],
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        Ready to ship link{' '}
        <span css={theme({ color: ACCENT.text })}>previews</span>?
      </SubheadBase>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          // color: 'black70',
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        Extract title, description, and preview image from any URL with a single
        API call. Cache the response and serve previews straight from your own
        database, the way MyMahi does.
      </Caption>
      <Flex
        css={theme({
          pt: [3, 4, 4, 4],
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <ArrowLink
          href='/metadata'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Start extracting metadata
        </ArrowLink>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

const CustomerStoryPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <AboutCustomer />
      <HowTheyUseIt />
      <WhyMicrolink />
      <CtaSection />
      <ThanksSection />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='How MyMahi uses Microlink'
    description="MyMahi powers rich link previews in its Newsfeed with Microlink's Metadata API, caching the results in its own database for fast reads."
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
  />
)

export default CustomerStoryPage
