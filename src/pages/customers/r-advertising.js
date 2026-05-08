import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  BodyText,
  Caption,
  CtaSection,
  DashedGridOverlay,
  Eyebrow,
  Figure,
  FigureImage,
  FlowDiagram,
  MoreCustomers,
  Section,
  SectionInner,
  StoryTag,
  Testimonial,
  WhyCard
} from 'components/patterns/CustomerStory'
import Layout from 'components/patterns/Layout'

import { cdnUrl } from 'helpers/cdn-url'

const ACCENT = {
  text: 'orange7',
  bgSoft: 'orange0',
  bgEdge: 'orange1',
  highlight: 'orange5'
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <StoryTag accent={ACCENT}>Customer story</StoryTag>
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
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        How a performance-marketing agency built an internal tool that turns
        every prospect into a swipeable card — with Microlink generating the
        website screenshot behind every "right" or "left" decision.
      </BodyText>
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

/* ─── Preview carousel (mobile crossfade) ────────────────────────────────── */

const PreviewWrapper = styled(Box)`
  ${theme({
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    mx: 'auto'
  })}
`

const PreviewOverlayImage = styled(FigureImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.6s ease-in-out;
  opacity: ${props => (props.$active ? 1 : 0)};
`

const PreviewCarousel = () => {
  const [showSecond, setShowSecond] = React.useState(false)

  React.useEffect(() => {
    const id = setInterval(() => {
      setShowSecond(prev => !prev)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <PreviewWrapper>
      <FigureImage
        src='/images/clients/r-advertising-preview-1.png'
        alt='R-Advertising prospect swipe deck'
        loading='lazy'
        decoding='async'
      />
      <PreviewOverlayImage
        src='/images/clients/r-advertising-preview-2.png'
        alt='R-Advertising prospect swipe deck'
        loading='lazy'
        decoding='async'
        $active={showSecond}
      />
    </PreviewWrapper>
  )
}

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
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, pt: 3, display: 'block' })}>
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
      <BodyText css={theme({ pb: [3, 3, 4, 4] })}>
        R-Advertising is a performance-driven digital marketing agency that has
        been activating multi-channel campaigns for brands since 2006. Their
        teams design and run acquisition, traffic, visibility, and
        lead-generation programs across email and SMS, programmatic advertising,
        data, outdoor media, and influence — orchestrated together rather than
        treated as silos.
      </BodyText>
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
      <Testimonial
        accent={ACCENT}
        quote="Microlink's screenshot API allowed us to create an engaging, swipe-based interface for our sales team to qualify prospects at a glance. It's transformed our internal workflow."
        author='François Pacot'
        role='CEO'
        company='R-Advertising'
        initials='FP'
      />
    </SectionInner>
  </Section>
)

/* ─── How they use Microlink ─────────────────────────────────────────────── */

const HowTheyUseIt = () => (
  <Section css={theme({ pb: 5 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
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
      <FlowDiagram
        accent={ACCENT}
        nodes={[
          { label: 'Prospect list', sub: 'Domains to evaluate' },
          { label: 'Microlink', sub: 'Screenshot generated', active: true },
          { label: 'Swipe card', sub: 'Card with site preview' },
          { label: 'Salesperson', sub: 'Right or left swipe' }
        ]}
      />
      <BodyText>
        Microlink generates the screenshot for every prospect on demand,
        rendered the way a real visitor would see the site. The salesperson can
        decide in a fraction of a second whether the company looks like a fit
        and is worth contacting, or swipe past. What used to be a list of opaque
        domain names becomes a visual queue the team can move through quickly.
      </BodyText>
      <Figure css={theme({ pb: 0 })}>
        <PreviewCarousel />
      </Figure>
    </SectionInner>
  </Section>
)

/* ─── Why Microlink ──────────────────────────────────────────────────────── */

const WhyMicrolink = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
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
        <WhyCard
          accent={ACCENT}
          number={1}
          kicker='Speed to ship'
          title='From idea to swipe deck without a rendering pipeline.'
          body="The prospecting tool exists because the screenshot work didn't have to be built from scratch. A single API call returns a website's screenshot in a format the swipe deck can drop straight onto a card — no headless browsers to operate, no queue, no infrastructure for the team to maintain."
        />
        <WhyCard
          accent={ACCENT}
          number={2}
          kicker='Visual fidelity'
          title='What the salesperson sees is what a customer sees.'
          body='The whole premise of the swipe deck is judging a prospect at a glance, so the screenshot has to look like a real visit to the site. Microlink renders the page with the layout, fonts, and imagery a normal browser would, which is what makes "right or left" a meaningful decision instead of a guess from a URL.'
        />
        <WhyCard
          accent={ACCENT}
          number={3}
          kicker='Internal-tool fit'
          title='Right-sized for an internal use case.'
          body="This isn't a customer-facing product — it's a tool the sales team uses every day. Microlink's hosted API and simple integration mean the agency can run it as a small line in their internal stack without operating any rendering infrastructure of their own."
        />
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
  <Section css={theme({ pt: 0, pb: [3, 3, 4, 4] })}>
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
      <CtaSection
        accent={ACCENT}
        headlinePrefix='Ready to ship'
        headlineAccent='screenshots'
        body='Capture pixel-accurate screenshots of any URL with a single API call — drop them straight into an internal tool, the way R-Advertising does.'
        href='/screenshot'
        label='Start capturing screenshots'
      />
      <MoreCustomers accent={ACCENT} currentSlug='r-advertising' />
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
