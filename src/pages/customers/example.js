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
  text: 'teal7',
  bgSoft: 'teal0',
  bgEdge: 'teal1',
  highlight: 'teal5'
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
        <span css={theme({ color: ACCENT.text })}>[Customer Name]:</span>{' '}
        [Headline summarizing the use case]
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
        [One or two-sentence summary of who the customer is and the outcome they
        get with Microlink — placeholder copy.]
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/pricing'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          See how they integrated Microlink
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
  <TestimonialCard as='figure' css={theme({ mt: [3, 3, 4, 4] })}>
    <QuoteMark>“</QuoteMark>
    <Quote>
      [Pull-quote from the customer about why Microlink works for them. One to
      three sentences. Placeholder copy.]
    </Quote>
    <Author as='figcaption'>
      <AuthorAvatar aria-hidden='true'>[X]</AuthorAvatar>
      <Box>
        <AuthorName>[Author Name]</AuthorName>
        <AuthorRole>[Role] · [Company]</AuthorRole>
      </Box>
    </Author>
  </TestimonialCard>
)

/* ─── About the customer ─────────────────────────────────────────────────── */

const AboutCustomer = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: [4, 4, 5, 5] })}>
    <SectionInner>
      <Eyebrow css={theme({ pb: 3, display: 'block' })}>
        About [Customer]
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
        [What the customer does, in one line]
      </SubheadBase>
      <BodyText>
        [Paragraph describing the customer's product, audience, and the problem
        space they operate in. Placeholder copy.]
      </BodyText>
      <Figure>
        <FigurePlaceholder aria-hidden='true'>
          [Screenshot of [Customer] using Microlink]
        </FigurePlaceholder>
      </Figure>
      <BodyText>
        [Second paragraph adding context — scale, traction, why this matters.
        Placeholder copy.]
      </BodyText>
      <Box css={theme({ pt: 2, pb: [3, 3, 4, 4] })}>
        <Text
          as='a'
          href='https://example.com'
          target='_blank'
          rel='noopener'
          css={theme({
            color: ACCENT.text,
            fontWeight: 'bold',
            fontSize: [1, 2, 2, 2],
            textDecoration: 'underline'
          })}
        >
          Visit example.com
        </Text>
      </Box>
      {/* TODO: replace placeholder testimonial before publishing */}
      <Testimonial />
    </SectionInner>
  </Section>
)

/* ─── How they use Microlink ─────────────────────────────────────────────── */

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
        [Short headline — what Microlink powers for them]
      </SubheadBase>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        [Paragraph describing the integration: which API endpoints they consume,
        where the data flows in their product, what triggers each request.
        Placeholder copy.]
      </BodyText>
      <Figure>
        <FigurePlaceholder aria-hidden='true'>
          [Architecture diagram placeholder]
        </FigurePlaceholder>
      </Figure>
      <BodyText>
        [Closing paragraph — operational impact, what this replaced, who owns it
        internally. Placeholder copy.]
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
          [Why they chose Microlink — short headline]
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          [Lead-in paragraph framing the three reasons below. Placeholder copy.]
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
            <CardKicker>01 · [Reason category]</CardKicker>
            <CardTitle>[First reason — short title]</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              [Body explaining the first reason. Placeholder copy.]
            </CardBody>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · [Reason category]</CardKicker>
            <CardTitle>[Second reason — short title]</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              [Body explaining the second reason. Placeholder copy.]
            </CardBody>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · [Reason category]</CardKicker>
            <CardTitle>[Third reason — short title]</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              [Body explaining the third reason. Placeholder copy.]
            </CardBody>
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── More customer stories carousel ─────────────────────────────────────── */

const CarouselTrack = styled(Flex)`
  ${theme({
    gap: [3, 3, 4, 4],
    width: '100%',
    overflowX: 'auto',
    px: SECTION_PX,
    py: 3,
    justifyContent: ['flex-start', 'flex-start', 'center', 'center']
  })}
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 24px;
  scrollbar-width: thin;
  scrollbar-color: ${colors.black10} transparent;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.black10};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (min-width: ${breakpoints[1]}) {
    scroll-padding-inline: 32px;
  }
`

const CarouselCard = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    minWidth: ['260px', '280px', '300px', '320px'],
    maxWidth: '320px',
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
  box-shadow: 0 1px 2px ${colors.black05};
  scroll-snap-align: start;
`

const LogoPlaceholder = styled(Box)`
  ${theme({
    bg: ACCENT.bgSoft,
    border: 1,
    borderColor: ACCENT.bgEdge,
    borderRadius: 2,
    width: '40px',
    height: '40px'
  })}
`

const CarouselCardName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 2,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

const CarouselCardBlurb = styled(Text)`
  ${theme({
    color: 'black70',
    fontSize: 1,
    lineHeight: 2
  })}
`

const CarouselCardLink = styled(Link)`
  ${theme({
    color: ACCENT.text,
    fontWeight: 'bold',
    fontSize: [0, 1, 1, 1]
  })}
  margin-top: auto;
`

const MORE_CUSTOMERS = [
  {
    slug: 'placeholder-1',
    name: '[Customer One]',
    blurb: '[One-line description of their use case.]'
  },
  {
    slug: 'placeholder-2',
    name: '[Customer Two]',
    blurb: '[One-line description of their use case.]'
  },
  {
    slug: 'placeholder-3',
    name: '[Customer Three]',
    blurb: '[One-line description of their use case.]'
  }
]

const MoreCustomers = () => (
  <Section css={theme({ px: 0 })}>
    <SectionInner css={theme({ maxWidth: '100%', px: 0 })}>
      <Box
        css={theme({
          maxWidth: SECTION_MAX_WIDTH,
          mx: 'auto',
          px: SECTION_PX,
          pb: [3, 3, 4, 4],
          textAlign: 'center'
        })}
      >
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          More customer stories
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'center',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          See how other teams ship with Microlink
        </SubheadBase>
      </Box>

      <CarouselTrack
        role='list'
        aria-label='More customer stories'
        css={theme({ maxWidth: '100%', mx: 'auto' })}
      >
        {MORE_CUSTOMERS.map(({ slug, name, blurb }) => (
          <CarouselCard key={slug} role='listitem'>
            <LogoPlaceholder aria-hidden='true' />
            <CarouselCardName>{name}</CarouselCardName>
            <CarouselCardBlurb>{blurb}</CarouselCardBlurb>
            <CarouselCardLink href={`/customers/${slug}`}>
              Read story →
            </CarouselCardLink>
          </CarouselCard>
        ))}
      </CarouselTrack>
    </SectionInner>
  </Section>
)

/* ─── CTA ────────────────────────────────────────────────────────────────── */

const CtaSection = () => (
  <Section
    css={`
      background-color: rgba(12, 166, 120, 0.06);
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
        Ready to ship with{' '}
        <span css={theme({ color: ACCENT.text })}>Microlink</span>?
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
        [Short closing line that mirrors the customer outcome and invites the
        reader to start. Placeholder copy.]
      </Caption>
      <Flex
        css={theme({
          pt: [3, 4, 4, 4],
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
          Start your integration
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
        <Text
          as='a'
          href='https://example.com'
          target='_blank'
          rel='noopener'
          css={theme({
            color: ACCENT.text,
            fontWeight: 'bold',
            fontSize: [1, 2, 2, 2],
            textDecoration: 'underline'
          })}
        >
          [Customer]
        </Text>
        {/* When a customer SVG logo exists at /images/clients/<domain>.svg,
            replace the link above with:
        <Text as='a' href='https://example.com' target='_blank' rel='noopener'>
          <ThanksLogo
            src='/images/clients/example.com.svg'
            alt='[Customer]'
            width='258'
            height='52'
            loading='lazy'
            decoding='async'
          />
        </Text>
        */}
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
        <b>Thank you to the [Customer] team</b> for letting us share their use
        case, and for choosing Microlink to power [their primary use case].
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
      <MoreCustomers />
      <CtaSection />
      <ThanksSection />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='[Customer]: [one-line use case] · Microlink'
    description='[Placeholder description — how this customer uses Microlink to power their product.]'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
  />
)

export default CustomerStoryPage
