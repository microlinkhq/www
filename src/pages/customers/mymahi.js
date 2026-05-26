import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  ACCENT,
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
  Testimonial,
  WhyCard
} from 'components/patterns/CustomerStory'
import Layout from 'components/patterns/Layout'

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <img
          src='/images/clients/mymahi-icon.png'
          alt=''
          width='40'
          height='40'
          css={theme({
            display: 'block',
            borderRadius: 2,
            width: '40px',
            height: '40px'
          })}
          style={{ objectFit: 'cover' }}
          decoding='async'
        />
        <Text
          css={theme({
            color: 'black',
            fontSize: 2,
            fontWeight: 'bold',
            lineHeight: 1
          })}
        >
          MyMahi
        </Text>
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
        Rich link previews for every Newsfeed post
      </Text>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        How a learner-focused platform used by schools across New Zealand and
        Australia uses Microlink's Metadata API to turn every shared link into a
        cached, fast-loading preview card.
      </Text>
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
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, pt: 3, display: 'block' })}>
        About MyMahi
      </Eyebrow>
      <Text as='h2' css={theme({ pb: [3, 3, 4, 4] })}>
        Supporting learning, wellbeing, and future pathways for students across
        New Zealand and Australia.
      </Text>
      <Text as='p' css={theme({ pb: [3, 3, 4, 4] })}>
        MyMahi is a self-management platform for learners. It puts students at
        the centre of their own story with tools for Digital Identity, a Digital
        Backpack to capture learning milestones, mentoring, wellbeing, and
        future pathways planning. The mentor dashboard is the backbone of the
        product, giving teachers a single place to connect with the learners
        they support.
      </Text>
      <Text as='p'>
        The platform is used in schools and centres of learning across New
        Zealand and Australia, and was successfully assessed by Safer
        Technologies 4 Schools (ST4S) in 2024 — a national standardised review
        of digital products used by schools across both countries.
      </Text>
      <Box css={theme({ pt: 2, pb: 0 })}>
        <Text
          as='a'
          href='https://mymahi.com'
          target='_blank'
          rel='noopener'
          css={theme({
            color: ACCENT.text,
            fontWeight: 'bold',
            fontSize: [1, 2, 2, 2],
            textDecoration: 'underline'
          })}
        >
          Visit mymahi.com
        </Text>
      </Box>
      <Testimonial
        accent={ACCENT}
        maxWidth={layout.normal}
        quote='Microlink.io is the engine behind our Newsfeed previews. It provides the metadata we need to keep our platform visual and engaging, while giving us the flexibility to store and refresh data for maximum performance.'
        author='Stefan Charsley'
        role='CTO'
        company='MyMahi'
        avatar='/images/clients/stefan-charsley.jpeg'
        initials='SC'
      />
    </SectionInner>
  </Section>
)

/* ─── How they use Microlink ─────────────────────────────────────────────── */

const HowTheyUseIt = () => (
  <Section css={theme({ pb: 5, pt: 5 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        How they use Microlink
      </Eyebrow>
      <Text as='h2'>Rich link previews for every Newsfeed post</Text>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        When a teacher or mentor shares a link in the MyMahi Newsfeed, the
        platform calls Microlink's Metadata API to extract the page's title,
        description, and preview image. The result is hydrated into a card
        students recognise instantly — the same kind of preview they'd expect
        from any modern app.
      </Text>
      <FlowDiagram
        accent={ACCENT}
        nodes={[
          { label: 'Newsfeed link', sub: 'Shared by teacher' },
          { label: 'Microlink', sub: 'Scrapes metadata', active: true },
          { label: 'MyMahi database', sub: 'Stores for fast reads' },
          { label: 'Newsfeed preview', sub: 'Rendered to learners' }
        ]}
      />
      <Text as='p'>
        Metadata is stored in MyMahi's database as soon as it's fetched, so
        subsequent renders of the Newsfeed are served straight from their own
        infrastructure. A background job periodically refreshes those records,
        keeping previews current without re-scraping on every read. The whole
        loop runs without anyone on the team maintaining a scraper, a headless
        browser pool, or an unfurl service.
      </Text>
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

/* ─── Why Microlink ──────────────────────────────────────────────────────── */

const WhyMicrolink = () => (
  <Section css={theme({ pt: 0, pb: 6 })}>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
          Why Microlink
        </Eyebrow>
        <Text as='h2'>Reliable link previews without the maintenance</Text>
        <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
          A small team supporting schools across New Zealand and Australia can't
          afford to babysit a metadata scraper. MyMahi reaches for Microlink for
          three reasons.
        </Text>
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
          kicker='Reliability'
          title='One API for every link a teacher pastes.'
          body={
            'Newsfeed links come from anywhere — news sites, Google Docs, YouTube, government pages, school portals. Microlink handles all of them through a single endpoint, so MyMahi doesn\'t have to maintain per-domain parsers or fall back to "title-only" cards.'
          }
        />
        <WhyCard
          accent={ACCENT}
          number={2}
          kicker='Performance'
          title='Cache once, serve forever.'
          body="Microlink runs at the moment a link is shared. The metadata is then cached in MyMahi's own database, so loading the Newsfeed is just a database read. Students on slow school connections see their feed render instantly."
        />
        <WhyCard
          accent={ACCENT}
          number={3}
          kicker='Stack simplicity'
          title='No browser pool to operate.'
          body="Scraping arbitrary web pages reliably means running a fleet of headless browsers, dealing with bot detection, and patching breakage forever. Outsourcing that to Microlink lets MyMahi's engineering time stay on the platform itself — Digital Backpack, mentoring, wellbeing."
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
    height: '32px',
    mx: 'auto'
  })}
`

const ThanksSection = () => (
  <Section css={theme({ pt: 0, pb: [3, 3, 4, 4] })}>
    <SectionInner css={theme({ textAlign: 'center', maxWidth: layout.small })}>
      <Box css={theme({ pt: [3, 3, 4, 4], pb: [2, 2, 3, 3] })}>
        <Text as='a' href='https://mymahi.com' target='_blank' rel='noopener'>
          <ThanksLogo
            src='/images/clients/mymahi.com.svg'
            alt='MyMahi'
            width='258'
            height='52'
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
        <b>Thank you to the MyMahi team</b> for letting us share their use case,
        and for choosing Microlink to power link previews across their platform.
      </Caption>
    </SectionInner>
  </Section>
)

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
        mt={0}
        headlinePrefix='Ready to ship link'
        headlineAccent='previews'
        body='Extract title, description, and preview image from any URL with a single API call. Cache the response and serve previews straight from your own database, the way MyMahi does.'
        href='/metadata'
        label='Start extracting metadata'
      />
      <MoreCustomers accent={ACCENT} currentSlug='mymahi' />
      <ThanksSection />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='MyMahi: Rich link previews for every Newsfeed post'
    description="MyMahi powers rich link previews in its Newsfeed with Microlink's Metadata API, caching the results in its own database for fast reads."
    image='https://microlink.io/images/clients/mymahi-web.png'
    schemaType='WebPage'
  />
)

export default CustomerStoryPage
