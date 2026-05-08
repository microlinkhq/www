import { breakpoints, colors, layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
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
          m: 0,
          scrollMarginTop: 4
        })}
      >
        <span css={theme({ color: ACCENT.text })}>Luckynote:</span> rich link
        previews in a chat-style note app
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
        How a "message yourself" notes app turns every URL into a tappable
        preview card — with Microlink generating the metadata behind every link
        saved.
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

const AboutCustomer = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
    <SectionInner>
      <Figure css={theme({ pt: 0, pb: 5 })}>
        <FigureImage
          src='/images/clients/luckynote-web.png'
          alt='Luckynote platform'
          width='1200'
          height='818'
          loading='eager'
          decoding='async'
          css={theme({ maxWidth: '800px' })}
        />
      </Figure>
      <Eyebrow css={theme({ pb: 3, display: 'block' })}>
        About Luckynote
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
        A "message yourself" note-taking app for ideas, links, and tasks across
        iOS, Android, and Web.
      </SubheadBase>
      <BodyText css={theme({ pb: 4 })}>
        Luckynote is a note-taking app built around a simple idea: you write to
        yourself, like you'd message a friend, and your ideas, links, and tasks
        live in one chat-style interface. It's designed for the kind of saving
        people already do in WhatsApp, Telegram, or the iOS Notes app — except
        in Luckynote those saves stay organized, synced, and easy to find again.
      </BodyText>
      <BodyText>
        The app runs on iOS, Android, and the web, with a Chrome extension that
        drops anything you find online straight into your inbox. The free tier
        includes unlimited folders, sync across all devices, and Lucky Actions —
        the app's smart message handling — and is loved by 6,000+ users at a 4.6
        rating.
      </BodyText>
      <Box css={theme({ pt: 2, pb: [3, 3, 4, 4] })}>
        <Text
          as='a'
          href='https://luckynote.io'
          target='_blank'
          rel='noopener'
          css={theme({
            color: ACCENT.text,
            fontWeight: 'bold',
            fontSize: [1, 2, 2, 2],
            textDecoration: 'underline'
          })}
        >
          Visit luckynote.io
        </Text>
      </Box>
      <Testimonial />
    </SectionInner>
  </Section>
)

/* ─── How they use Microlink — flow diagram primitives ───────────────────── */

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
  <Section css={theme({ pb: 0 })}>
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
        A rich preview behind every link pasted into a note
      </SubheadBase>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        When a user writes a note that contains a URL, Luckynote calls
        Microlink's Metadata API and gets back the page's title, description,
        and preview image in a single request. That metadata feeds straight into
        the card the user sees right next to the message — so the link arrives
        with context, not just a domain name.
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
            <NodeLabel>Note with link</NodeLabel>
            <NodeSub>URL pasted into chat</NodeSub>
          </Node>
          <Arrow />
          <Node>
            <NodeLabel>Luckynote</NodeLabel>
            <NodeSub>Detects link</NodeSub>
          </Node>
          <Arrow />
          <NodeActive>
            <NodeLabel>Microlink</NodeLabel>
            <NodeSub>Metadata extracted</NodeSub>
          </NodeActive>
          <Arrow />
          <Node>
            <NodeLabel>Preview card</NodeLabel>
            <NodeSub>Rendered inline</NodeSub>
          </Node>
        </Flex>
      </Figure>
      <BodyText>
        What used to be an opaque URL becomes a tappable preview the user can
        scan in a glance. The same Microlink endpoint serves Luckynote's iOS
        app, Android app, web app, and Chrome extension — Microlink works just
        as well from a native HTTP client on Swift or Kotlin as it does from the
        browser, so there's no preview logic to duplicate per platform.
      </BodyText>
      <Figure>
        <FigureImage
          src='/images/clients/luckynote-preview.jpg'
          alt='Luckynote using Microlink'
          width='1080'
          height='2201'
          loading='lazy'
          decoding='async'
          css={theme({ maxWidth: '400px' })}
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
  <Section>
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
          A metadata API that ships to web and native, no SDK required
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Building rich previews for every URL in every note shouldn't require
          an in-house rendering pipeline. Luckynote reached for Microlink for
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
            <CardKicker>01 · Speed to ship</CardKicker>
            <CardTitle>
              Link previews from day one — no metadata pipeline to build.
            </CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              The chat-style notes feel only works if a pasted URL renders as a
              real preview, not a string of characters. A single API call
              returns the title, description, and image Luckynote needs to draw
              the card — no headless browser, no scraping rules, no
              infrastructure to keep alive.
            </CardBody>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · Web + native</CardKicker>
            <CardTitle>
              One endpoint behind iOS, Android, and the web.
            </CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Microlink is a plain HTTP + JSON API, so Luckynote's iOS app,
              Android app, web app, and Chrome extension all hit the same
              endpoint — no platform-specific SDK to maintain, no rendering
              layer per surface. A link saved from an iPhone, a Pixel, or the
              browser comes back with the same preview, every time.
            </CardBody>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · Hands-off operations</CardKicker>
            <CardTitle>An API the team doesn't have to babysit.</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              Luckynote's engineering time goes into the notes experience, not
              into operating a rendering pipeline. Microlink's hosted API
              absorbs the messy edge cases — paywalls, JS-heavy pages, malformed
              Open Graph tags — so the app gets a clean preview for every URL
              the user pastes.
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
    maxWidth: layout.small,
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
  <TestimonialCard as='figure' css={theme({ my: [4, 4, 5, 5] })}>
    <QuoteMark>“</QuoteMark>
    <Quote>
      Microlink turns messy URLs into beautiful, tappable previews instantly.
      It's the fastest way to add professional polish to a cross-platform app.
    </Quote>
    <Author as='figcaption'>
      <AuthorAvatar aria-hidden='true'>UD</AuthorAvatar>
      <Box>
        <AuthorName>Uros Durdevic</AuthorName>
        <AuthorRole>Founder · Luckynote</AuthorRole>
      </Box>
    </Author>
  </TestimonialCard>
)

/* ─── CTA ────────────────────────────────────────────────────────────────── */

const CtaSection = () => (
  <Section
    css={`
      background-color: rgba(247, 103, 7, 0.06);
      ${theme({
        borderTop: 1,
        borderTopColor: ACCENT.bgEdge,
        borderBottom: 1,
        borderBottomColor: ACCENT.bgEdge,
        mt: 5
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
          color: 'black70',
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        Extract titles, descriptions, and images from any URL with a single API
        call — drop them straight into your product, the way Luckynote does.
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
        <Text as='a' href='https://luckynote.io' target='_blank' rel='noopener'>
          <ThanksLogo
            src='/images/clients/luckynote.io.svg'
            alt='Luckynote'
            width='129'
            height='24'
            loading='lazy'
            decoding='async'
          />
        </Text>
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
        <b>Thank you to the Luckynote team</b> for letting us share their use
        case, and for choosing Microlink to power link previews across their
        notes app.
      </Caption>
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
    title="Luckynote: rich link previews in a 'message yourself' note app"
    description="Luckynote uses Microlink's Metadata API to turn every URL pasted into a note into a tappable preview card — on iOS, Android, Web, and the Chrome extension."
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
  />
)

export default CustomerStoryPage
