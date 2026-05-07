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
        <span css={theme({ color: ACCENT.text })}>R-Advertising:</span> Sales
        prospecting as a Tinder-style swipe deck
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
        How a performance-marketing agency built an internal tool that turns
        every prospect into a swipeable card — with Microlink generating the
        website screenshot behind every "right" or "left" decision.
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/screenshot'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          See how to integrate screenshots
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── Figures (shared by About + How sections) ───────────────────────────── */

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

const FigurePlaceholder = styled(Box)`
  ${theme({
    bg: ACCENT.bgSoft,
    border: 1,
    borderColor: ACCENT.bgEdge,
    borderRadius: 3,
    width: '100%',
    maxWidth: '600px',
    mx: 'auto',
    py: [4, 4, 5, 5],
    px: 3,
    color: ACCENT.text,
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    textAlign: 'center',
    textTransform: 'uppercase'
  })}
`

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
      Microlink's screenshot API allowed us to create an engaging, swipe-based
      interface for our sales team to qualify prospects at a glance. It's
      transformed our internal workflow.
    </Quote>
    <Author as='figcaption'>
      <AuthorAvatar aria-hidden='true'>FP</AuthorAvatar>
      <Box>
        <AuthorName>François Pacot</AuthorName>
        <AuthorRole>CEO · R-Advertising</AuthorRole>
      </Box>
    </Author>
  </TestimonialCard>
)

/* ─── About the customer ─────────────────────────────────────────────────── */

const AboutCustomer = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
    <SectionInner>
      <Figure css={theme({ pt: 0, pb: 5 })}>
        <FigureImage
          src='/images/clients/r-advertising-web.png'
          alt='R-Advertising platform'
          width='2816'
          height='1920'
          loading='eager'
          decoding='async'
          css={theme({ maxWidth: layout.normal })}
        />
      </Figure>
      <Eyebrow css={theme({ pb: 3, pt: 3, display: 'block' })}>
        About R-Advertising
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
        Performance marketing across email, programmatic, data, outdoor, and
        influence — since 2006.
      </SubheadBase>
      <BodyText>
        R-Advertising is a performance-driven digital marketing agency that has
        been activating multi-channel campaigns for brands since 2006. Their
        teams design and run acquisition, traffic, visibility, and
        lead-generation programs across email and SMS, programmatic advertising,
        data, outdoor media, and influence — orchestrated together rather than
        treated as silos.
      </BodyText>
      <Figure>
        <FigurePlaceholder aria-hidden='true'>
          [Screenshot of R-Advertising using Microlink]
        </FigurePlaceholder>
      </Figure>
      <BodyText>
        The agency supported 60 clients in 2024 across e-commerce, retail,
        travel, and enterprise — including Air France, Crédit Agricole,
        Printemps, Showroom Privé, and French Bee — and operates a proprietary
        database of more than 20 million qualified profiles that feeds the
        targeting layer of every campaign.
      </BodyText>
      <Box css={theme({ pt: 2, pb: [3, 3, 4, 4] })}>
        <Text
          as='a'
          href='https://r-advertising.com'
          target='_blank'
          rel='noopener'
          css={theme({
            color: ACCENT.text,
            fontWeight: 'bold',
            fontSize: [1, 2, 2, 2],
            textDecoration: 'underline'
          })}
        >
          Visit r-advertising.com
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
  <Section css={theme({ pb: 5 })}>
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
        A Tinder-style swipe deck for sales prospecting
      </SubheadBase>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        R-Advertising's sales team works through long lists of candidate
        prospects every week. To make that work feel less like a spreadsheet and
        more like the apps the team actually uses, the agency built an internal
        tool that turns each prospect into a card the salesperson can swipe
        right or left — exactly like Tinder. The card shows what the prospect's
        website actually looks like.
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
            <NodeLabel>Prospect list</NodeLabel>
            <NodeSub>Domains to evaluate</NodeSub>
          </Node>
          <Arrow />
          <NodeActive>
            <NodeLabel>Microlink</NodeLabel>
            <NodeSub>Screenshot generated</NodeSub>
          </NodeActive>
          <Arrow />
          <Node>
            <NodeLabel>Swipe card</NodeLabel>
            <NodeSub>Card with site preview</NodeSub>
          </Node>
          <Arrow />
          <Node>
            <NodeLabel>Salesperson</NodeLabel>
            <NodeSub>Right or left swipe</NodeSub>
          </Node>
        </Flex>
      </Figure>
      <BodyText>
        Microlink generates the screenshot for every prospect on demand,
        rendered the way a real visitor would see the site. The salesperson can
        decide in a fraction of a second whether the company looks like a fit
        and is worth contacting, or swipe past. What used to be a list of opaque
        domain names becomes a visual queue the team can move through quickly.
      </BodyText>
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
          A screenshot API that fits behind an internal tool
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Building an internal tool isn't where R-Advertising's engineering time
          should go on rendering pipelines and browser pools. They reached for
          Microlink for three reasons.
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
              From idea to swipe deck without a rendering pipeline.
            </CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              The prospecting tool exists because the screenshot work didn't
              have to be built from scratch. A single API call returns a
              website's screenshot in a format the swipe deck can drop straight
              onto a card — no headless browsers to operate, no queue, no
              infrastructure for the team to maintain.
            </CardBody>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · Visual fidelity</CardKicker>
            <CardTitle>
              What the salesperson sees is what a customer sees.
            </CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              The whole premise of the swipe deck is judging a prospect at a
              glance, so the screenshot has to look like a real visit to the
              site. Microlink renders the page with the layout, fonts, and
              imagery a normal browser would, which is what makes "right or
              left" a meaningful decision instead of a guess from a URL.
            </CardBody>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · Internal-tool fit</CardKicker>
            <CardTitle>Right-sized for an internal use case.</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              This isn't a customer-facing product — it's a tool the sales team
              uses every day. Microlink's hosted API and simple integration mean
              the agency can run it as a small line in their internal stack
              without operating any rendering infrastructure of their own.
            </CardBody>
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
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
        Ready to ship{' '}
        <span css={theme({ color: ACCENT.text })}>screenshots</span>?
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
        Capture pixel-accurate screenshots of any URL with a single API call —
        drop them straight into an internal tool, the way R-Advertising does.
      </Caption>
      <Flex
        css={theme({
          pt: [3, 4, 4, 4],
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <ArrowLink
          href='/screenshot'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Start capturing screenshots
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
    height: '96px',
    mx: 'auto'
  })}
`

const ThanksSection = () => (
  <Section css={theme({ pt: 5, pb: [3, 3, 4, 4] })}>
    <SectionInner css={theme({ textAlign: 'center', maxWidth: layout.small })}>
      <Box css={theme({ pt: [3, 3, 4, 4], pb: [2, 2, 3, 3] })}>
        <Text
          as='a'
          href='https://r-advertising.com'
          target='_blank'
          rel='noopener'
        >
          <ThanksLogo
            src='/images/clients/r-advertising.com.png'
            alt='R-Advertising'
            width='300'
            height='300'
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
        <b>Thank you to the R-Advertising team</b> for letting us share their
        use case, and for choosing Microlink to power the screenshots in their
        internal sales prospecting tool.
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
    title='R-Advertising: Tinder-style sales prospecting'
    description="R-Advertising's sales team picks prospects on a swipe deck of website screenshots, generated on demand by Microlink, instead of staring at a spreadsheet of URLs."
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
  />
)

export default CustomerStoryPage
