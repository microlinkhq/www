import { breakpoints, colors, layout, theme } from 'theme'
import {
  Chrome,
  Clock,
  Crosshair,
  Edit3,
  Layers,
  Monitor,
  Share2
} from 'react-feather'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Heading from 'components/elements/Heading'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  ChromeChip,
  InstallButtonInline,
  SCREENSHOT_EXTENSION_URL
} from 'components/patterns/ChromeExtensionBanner/ChromeExtensionBanner'
import {
  CtaSection,
  DashedGridOverlay,
  EXTENSIONS,
  Eyebrow,
  FeatureCard,
  FeatureGrid,
  ScreenshotExtensionMockup,
  ScreenshotStepConfigMini,
  ScreenshotStepResultMini,
  ScreenshotStepUrlMini,
  Section,
  SectionInner,
  StepCard
} from 'components/patterns/ExtensionStory'
import Layout from 'components/patterns/Layout'

import { trackEvent } from 'helpers/plausible'

const EVENT_NAME = 'screenshot extension install'

// The screenshot extension owns the pink end of the install gradient
// (see the registry in ExtensionStory/extensions.js) — the page accent
// must match its mockups, not the violet extensions umbrella.
const ACCENT = EXTENSIONS.find(
  extension => extension.slug === 'chrome/website-screenshot'
).accent

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const HeroGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [4, 4, 5, 5] })}
  align-items: center;

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: 3fr 2fr;
  }
`

const HeroMockup = styled(Box)`
  position: relative;
  width: 100%;
  max-width: 300px;
  ${theme({ mx: 'auto' })}
`

const HeroMockupGlow = styled(Box)`
  position: absolute;
  inset: 8%;
  border-radius: 50%;
  filter: blur(64px);
  pointer-events: none;
`

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <HeroGrid>
        <Box>
          <ChromeChip css={theme({ mb: [3, 3, 4, 4] })}>
            <Chrome size={14} color={colors.black80} />
            <Caps css={theme({ fontSize: 0, fontWeight: 'bold' })}>
              Chrome extension
            </Caps>
          </ChromeChip>
          <Heading
            variant={null}
            css={theme({ textAlign: 'left', scrollMarginTop: 4 })}
          >
            Capture, annotate, and share{' '}
            <span css={theme({ color: ACCENT.text })}>website screenshots</span>
          </Heading>
          <Text
            as='p'
            css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.normal })}
          >
            <b>Microlink: Web Page Screenshots</b> lives in Chrome&apos;s side
            panel. Capture any URL — or 50 at once — in pixel-perfect quality,
            annotate the result in the built-in editor, and wrap it in a
            social-ready browser frame. Powered by the{' '}
            <Link href='/screenshot'>Microlink Screenshot API</Link>.
          </Text>
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 3
            })}
          >
            <InstallButtonInline
              href={SCREENSHOT_EXTENSION_URL}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => trackEvent(EVENT_NAME)}
            >
              <Chrome size={18} style={{ flexShrink: 0 }} />
              Add to Chrome — it&apos;s free
            </InstallButtonInline>
            <ArrowLink
              href='/tools/website-screenshot'
              css={theme({ color: 'link', fontWeight: 'bold', fontSize: 1 })}
            >
              Or try it online first
            </ArrowLink>
          </Flex>
        </Box>
        <HeroMockup aria-hidden='true'>
          <HeroMockupGlow
            css={`
              background: ${colors.pink2};
              opacity: 0.5;
            `}
          />
          <Box css={theme({ position: 'relative', zIndex: 1 })}>
            <ScreenshotExtensionMockup />
          </Box>
        </HeroMockup>
      </HeroGrid>
    </SectionInner>
  </Section>
)

/* ─── What it does ───────────────────────────────────────────────────────── */

const WhatItDoes = () => (
  <Section css={theme({ pt: [4, 4, 5, 5], pb: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, display: 'block' })}>
        What it does
      </Eyebrow>
      <Subhead css={theme({ pb: [3, 3, 4, 4], textAlign: 'left' })}>
        Screenshots that skip the crop-and-cleanup step
      </Subhead>
      <Text as='p' css={theme({ pb: 4 })}>
        System screenshots capture your screen — browser chrome, notifications,
        and all. This extension captures the <i>page</i>: it renders the URL in
        a clean headless browser in the cloud and returns a pixel-perfect image
        at the exact viewport you choose. Desktop (1920×1080), tablet
        (768×1024), mobile (393×852), or any custom size — plus full-page
        capture that scrolls the entire document for you.
      </Text>
      <Text as='p'>
        It even suggests the tab you&apos;re looking at: open the side panel and
        the current URL is pre-filled, one click away from a capture. From
        there, copy it to the clipboard, download it, annotate it in the editor,
        or switch to Social Sharing mode and get a framed, gradient-backed image
        ready for X, LinkedIn, or your changelog.
      </Text>
    </SectionInner>
  </Section>
)

/* ─── Features ───────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: Layers,
    title: 'Bulk capture, 50 at once',
    body: 'Paste up to 50 URLs and the extension captures them in sequence with live progress — then downloads everything together as a single ZIP archive.'
  },
  {
    icon: Share2,
    title: 'Social Sharing mode',
    body: 'Wrap any capture in a browser frame over a gradient background — a shareable image ready for social posts, changelogs, and launch threads.'
  },
  {
    icon: Edit3,
    title: 'Built-in annotation editor',
    body: 'Freehand pen, text, rectangles, and arrows with color and stroke controls. Zoom, undo/redo, and download the annotated result as a PNG.'
  },
  {
    icon: Monitor,
    title: 'Viewport presets',
    body: 'Desktop, tablet, and mobile presets with custom width and height overrides. Capture the visible viewport or the full scrolling page.'
  },
  {
    icon: Crosshair,
    title: 'Element targeting',
    body: 'Screenshot a single DOM element instead of the whole page — type a CSS selector or point and click with the visual picker (experimental).'
  },
  {
    icon: Clock,
    title: '24-hour history',
    body: 'Your last 50 screenshots stay available for 24 hours with thumbnails. Re-edit, copy, download, or select several and export them as a ZIP.'
  }
]

const Features = () => (
  <Section css={theme({ pt: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        Features
      </Eyebrow>
      <Subhead css={theme({ pb: [3, 3, 4, 4], textAlign: 'left' })}>
        A full screenshot workflow in the side panel
      </Subhead>
      <FeatureGrid>
        {FEATURES.map(feature => (
          <FeatureCard key={feature.title} accent={ACCENT} {...feature} />
        ))}
      </FeatureGrid>
    </SectionInner>
  </Section>
)

/* ─── How it works ───────────────────────────────────────────────────────── */

const HowItWorks = () => (
  <Section id='how-it-works' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        How it works
      </Eyebrow>
      <Subhead css={theme({ textAlign: 'left' })}>
        Capture to share in three steps
      </Subhead>
      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          gap: [3, 3, 4, 4],
          flexDirection: 'column',
          alignItems: 'stretch'
        })}
      >
        <StepCard
          accent={ACCENT}
          number={1}
          kicker='Pick a URL'
          title='The side panel already knows where you are.'
          body='Open the extension and the current tab’s URL is pre-filled. Keep it, paste another one, or switch to bulk mode and drop in up to 50 links at once.'
          visual={<ScreenshotStepUrlMini />}
        />
        <StepCard
          accent={ACCENT}
          number={2}
          kicker='Choose your capture'
          title='Viewport, full page, or a single element.'
          body='Select a device preset or custom dimensions, toggle full-page capture, choose the image format, or target a specific DOM element with a CSS selector. Social Sharing mode adds the browser frame and gradient background.'
          visual={<ScreenshotStepConfigMini />}
        />
        <StepCard
          accent={ACCENT}
          number={3}
          kicker='Act on the result'
          title='Copy, download, annotate, or ZIP.'
          body='Preview appears inline: copy it to the clipboard as PNG, download it with a URL-based filename, or open the annotation editor. Bulk runs bundle every image into one ZIP, and everything lands in your 24-hour history.'
          visual={<ScreenshotStepResultMini />}
        />
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Pricing note ───────────────────────────────────────────────────────── */

const Pricing = () => (
  <Section css={theme({ pt: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        Pricing
      </Eyebrow>
      <Subhead css={theme({ pb: [3, 3, 4, 4], textAlign: 'left' })}>
        Free to install, built to scale
      </Subhead>
      <Text as='p' css={theme({ pb: 3 })}>
        The extension is free and includes <b>25 screenshots per day</b> — no
        account, no credit card. Every capture runs on the same infrastructure
        that processes millions of screenshots per week for paying customers.
      </Text>
      <Text as='p'>
        Need serious volume? A{' '}
        <Link href='/screenshot#pricing'>
          Microlink Screenshot API subscription
        </Link>{' '}
        unlocks up to <b>46,000 screenshots per month</b>. Paste your API key in
        the extension settings and it switches to your plan automatically.
      </Text>
    </SectionInner>
  </Section>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

const WebsiteScreenshotExtensionPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <WhatItDoes />
      <HowItWorks />
      <Features />
      <Pricing />
      <CtaSection
        accent={ACCENT}
        headlinePrefix='Ready to capture'
        headlineAccent='pixel-perfect screenshots'
        body='The extension runs on the Microlink Screenshot API — the same endpoint you can call from your own code to capture any URL at any viewport.'
        href='/screenshot'
        label='Explore the Screenshot API'
      />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Website Screenshot Chrome Extension — Capture, Annotate, Share'
    noSuffix
    description='Capture website screenshots from Chrome’s side panel — single URLs or 50 in bulk. Annotate, add social-ready frames, and download as ZIP. Free.'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/extensions/chrome/website-screenshot',
        name: 'Microlink: Web Page Screenshots',
        description:
          'Chrome extension to instantly capture web page screenshots, bulk capture, annotate, and generate shareable images without leaving your browser.',
        url: 'https://microlink.io/extensions/chrome/website-screenshot',
        installUrl: SCREENSHOT_EXTENSION_URL,
        applicationCategory: 'BrowserApplication',
        operatingSystem: 'Chrome',
        browserRequirements: 'Requires Google Chrome 114 or later',
        provider: {
          '@type': 'Organization',
          '@id': 'https://microlink.io/#organization',
          name: 'Microlink',
          url: 'https://microlink.io'
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          description:
            'Free to install — 25 screenshots per day included, no account required'
        }
      }
    ]}
  />
)

export default WebsiteScreenshotExtensionPage
