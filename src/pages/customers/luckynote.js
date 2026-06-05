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

import { cdnUrl } from 'helpers/cdn-url'

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <img
          src='/images/clients/luckynote-icon.png'
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
          Luckynote
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
        Rich Link Previews in a Chat-Style Note App
      </Text>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        How a "message yourself" notes app turns every URL into a tappable
        preview card — with Microlink generating the metadata behind every link
        saved.
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
          src='/images/clients/luckynote-web.png'
          alt='Luckynote platform'
          width='1200'
          height='818'
          loading='eager'
          decoding='async'
          css={theme({ maxWidth: '800px' })}
        />
      </Figure>
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, display: 'block' })}>
        About Luckynote
      </Eyebrow>
      <Text as='h2' css={theme({ pb: [3, 3, 4, 4] })}>
        A "message yourself" note-taking app for ideas, links, and tasks across
        iOS, Android, and Web.
      </Text>
      <Text as='p' css={theme({ pb: 4 })}>
        Luckynote is a note-taking app built around a simple idea: you write to
        yourself, like you'd message a friend, and your ideas, links, and tasks
        live in one chat-style interface. It's designed for the kind of saving
        people already do in WhatsApp, Telegram, or the iOS Notes app — except
        in Luckynote those saves stay organized, synced, and easy to find again.
      </Text>
      <Text as='p'>
        The app runs on iOS, Android, and the web, with a Chrome extension that
        drops anything you find online straight into your inbox. The free tier
        includes unlimited folders, sync across all devices, and Lucky Actions —
        the app's smart message handling — and is loved by 6,000+ users at a 4.6
        rating.
      </Text>
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
      <Testimonial
        accent={ACCENT}
        maxWidth={layout.normal}
        quote="Microlink turns messy URLs into beautiful previews instantly. It's the fastest way to add professional polish to our cross-platform app. On top of that, every time I had an idea of additional info that could be fetched, the team responded promptly, and we found a way to integrate it. It feels like the service is also growing with the customers' needs."
        author='Uros Durdevic'
        role='Founder'
        company='Luckynote'
        initials='UD'
        avatar='/images/clients/uros-durdevic.jpeg'
      />
    </SectionInner>
  </Section>
)

/* ─── How they use Microlink ─────────────────────────────────────────────── */

const HowTheyUseIt = () => (
  <Section css={theme({ pb: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        How they use Microlink
      </Eyebrow>
      <Text as='h2'>A rich preview behind every link pasted into a note</Text>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        When a user writes a note that contains a URL, Luckynote calls
        Microlink's Metadata API and gets back the page's title, description,
        and preview image in a single request. That metadata feeds straight into
        the card the user sees right next to the message — so the link arrives
        with context, not just a domain name.
      </Text>
      <FlowDiagram
        accent={ACCENT}
        nodes={[
          { label: 'Note with link', sub: 'URL pasted into chat' },
          { label: 'Luckynote', sub: 'Detects link' },
          { label: 'Microlink', sub: 'Metadata extracted', active: true },
          { label: 'Preview card', sub: 'Rendered inline' }
        ]}
      />
      <Text as='p'>
        What used to be an opaque URL becomes a tappable preview the user can
        scan in a glance. The same Microlink endpoint serves Luckynote's iOS
        app, Android app, web app, and Chrome extension — Microlink works just
        as well from a native HTTP client on Swift or Kotlin as it does from the
        browser, so there's no preview logic to duplicate per platform.
      </Text>
      <Figure>
        <FigureImage
          src='/images/clients/luckynote-preview.png'
          alt='Luckynote using Microlink'
          width='1080'
          height='2201'
          loading='lazy'
          decoding='async'
          css={theme({ maxWidth: '900px', boxShadow: 'none' })}
        />
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
        <Text as='h2'>
          A metadata API that ships to web and native, no SDK required
        </Text>
        <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
          Building rich previews for every URL in every note shouldn't require
          an in-house rendering pipeline. Luckynote reached for Microlink for
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
          kicker='Speed to ship'
          title='Link previews from day one — no metadata pipeline to build.'
          body='The chat-style notes feel only works if a pasted URL renders as a real preview, not a string of characters. A single API call returns the title, description, and image Luckynote needs to draw the card — no headless browser, no scraping rules, no infrastructure to keep alive.'
        />
        <WhyCard
          accent={ACCENT}
          number={2}
          kicker='Web + native'
          title='One endpoint behind iOS, Android, and the web.'
          body="Microlink is a plain HTTP + JSON API, so Luckynote's iOS app, Android app, web app, and Chrome extension all hit the same endpoint — no platform-specific SDK to maintain, no rendering layer per surface. A link saved from an iPhone, a Pixel, or the browser comes back with the same preview, every time."
        />
        <WhyCard
          accent={ACCENT}
          number={3}
          kicker='Hands-off operations'
          title="An API the team doesn't have to babysit."
          body="Luckynote's engineering time goes into the notes experience, not into operating a rendering pipeline. Microlink's hosted API absorbs the messy edge cases — paywalls, JS-heavy pages, malformed Open Graph tags — so the app gets a clean preview for every URL the user pastes."
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
        headlinePrefix='Ready to ship link'
        headlineAccent='previews'
        body='Extract titles, descriptions, and images from any URL with a single API call — drop them straight into your product, the way Luckynote does.'
        href='/metadata'
        label='Start extracting metadata'
      />
      <MoreCustomers accent={ACCENT} currentSlug='luckynote' />
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
