import { breakpoints, colors, layout, theme } from 'theme'
import {
  Archive,
  Chrome,
  Clock,
  Key,
  Layers,
  Shield,
  Sliders
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
  PDF_EXTENSION_URL
} from 'components/patterns/ChromeExtensionBanner/ChromeExtensionBanner'
import {
  ACCENT,
  CtaSection,
  DashedGridOverlay,
  Eyebrow,
  FeatureCard,
  FeatureGrid,
  PdfExtensionMockup,
  PdfStepDownloadMini,
  PdfStepOptionsMini,
  PdfStepUrlsMini,
  Section,
  SectionInner,
  StepCard
} from 'components/patterns/ExtensionStory'
import Layout from 'components/patterns/Layout'

import { trackEvent } from 'helpers/plausible'

const EVENT_NAME = 'pdf extension install'

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
            Convert websites to PDF,{' '}
            <span css={theme({ color: ACCENT.text })}>100 at a time</span>
          </Heading>
          <Text
            as='p'
            css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.normal })}
          >
            <b>Microlink: Website to PDF</b> lives in Chrome&apos;s side panel.
            Paste up to 100 links, pick your paper format and margins, and every
            page becomes a PDF — bundled into a single ZIP that downloads
            automatically. Powered by the{' '}
            <Link href='/pdf'>Microlink PDF API</Link>.
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
              href={PDF_EXTENSION_URL}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => trackEvent(EVENT_NAME)}
            >
              <Chrome size={18} style={{ flexShrink: 0 }} />
              Add to Chrome — it&apos;s free
            </InstallButtonInline>
            <ArrowLink
              href='/tools/website-to-pdf'
              css={theme({ color: 'link', fontWeight: 'bold', fontSize: 1 })}
            >
              Or try it online first
            </ArrowLink>
          </Flex>
        </Box>
        <HeroMockup aria-hidden='true'>
          <HeroMockupGlow
            css={`
              background: ${colors.violet2};
              opacity: 0.5;
            `}
          />
          <Box css={theme({ position: 'relative', zIndex: 1 })}>
            <PdfExtensionMockup />
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
        From a list of links to a ZIP of PDFs
      </Subhead>
      <Text as='p' css={theme({ pb: 4 })}>
        Archiving articles, saving invoices, snapshotting competitor pages —
        converting web pages to PDF one by one is slow, and browser print
        dialogs mangle layouts. This extension takes a plain list of URLs (one
        per line), converts each page through the Microlink API with ads blocked
        automatically, and tracks progress live with a running &ldquo;Completed
        X of Y&rdquo; counter and a Stop button.
      </Text>
      <Text as='p'>
        When the batch finishes, every document is bundled into one ZIP archive
        that downloads on its own. Each PDF is generated by a real headless
        browser in the cloud — your machine does none of the rendering work.
      </Text>
    </SectionInner>
  </Section>
)

/* ─── Features ───────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: Layers,
    title: 'Bulk by design',
    body: 'Paste up to 100 unique URLs, one per line. The extension deduplicates the list and converts every page in sequence with live progress.'
  },
  {
    icon: Archive,
    title: 'One ZIP, all your PDFs',
    body: 'When the run completes, all documents are packaged into a single ZIP archive that downloads automatically — no clicking through files.'
  },
  {
    icon: Sliders,
    title: 'Full PDF control',
    body: 'Paper format from A0 to A6 plus Letter, Legal, Tabloid, and Ledger. Portrait or landscape, print or screen appearance, and advanced scale, margin, and page-range options.'
  },
  {
    icon: Clock,
    title: '24-hour history',
    body: 'Your last 100 PDFs stay available for 24 hours. Open any of them in a new tab, re-download, delete, or select a few and export them together as a ZIP.'
  },
  {
    icon: Key,
    title: 'Free tier, pro ready',
    body: 'Works without an account — 25 conversions per day on the house. Add your Microlink API key and the extension switches to the pro endpoint with your plan limits.'
  },
  {
    icon: Shield,
    title: 'Privacy-first permissions',
    body: 'The extension never reads your tabs or browsing history — you paste the URLs by hand. It only talks to microlink.io endpoints, nothing else.'
  }
]

const Features = () => (
  <Section css={theme({ pt: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        Features
      </Eyebrow>
      <Subhead css={theme({ pb: [3, 3, 4, 4], textAlign: 'left' })}>
        Everything the online tool does, without the tab
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
        Three steps, zero configuration
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
          kicker='Paste your URLs'
          title='Open the side panel and drop in your list.'
          body='Click the extension icon and Chrome opens the side panel next to whatever you are reading. Paste up to 100 links, one per line — articles, invoices, documentation, any public page.'
          visual={<PdfStepUrlsMini />}
        />
        <StepCard
          accent={ACCENT}
          number={2}
          kicker='Pick your options'
          title='Same knobs as the Microlink PDF API.'
          body='Choose paper format, orientation, and appearance (print version or screen view). Open Advanced for scale (0.1–2.0), custom margins in any CSS unit, and page ranges like 1-5,8. Every option maps one-to-one to a documented API parameter.'
          visual={<PdfStepOptionsMini />}
        />
        <StepCard
          accent={ACCENT}
          number={3}
          kicker='Download the ZIP'
          title='Watch the counter, get the archive.'
          body='The extension converts each URL and shows a live “Completed X of Y” counter with a Stop button. When the batch is done, the ZIP with every PDF downloads automatically — and the run is saved to your 24-hour history.'
          visual={<PdfStepDownloadMini />}
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
        The extension is free and includes <b>25 conversions per day</b> — no
        account, no credit card. It runs on the same infrastructure that
        converts millions of web pages to PDF every week for paying customers.
      </Text>
      <Text as='p'>
        Need serious volume? A{' '}
        <Link href='/pdf#pricing'>Microlink PDF API subscription</Link> unlocks
        up to <b>46,000 conversions per month</b>. Paste your API key in the
        extension settings and it switches to your plan automatically.
      </Text>
    </SectionInner>
  </Section>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

const WebsitePdfExtensionPage = () => (
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
        headlinePrefix='Ready to convert'
        headlineAccent='100 pages at once'
        body='The extension runs on the Microlink PDF API — the same endpoint you can call from your own code to convert any URL into a pixel-perfect document.'
        href='/pdf'
        label='Explore the PDF API'
      />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Website to PDF Chrome Extension — Bulk Convert 100 URLs'
    noSuffix
    description='Convert websites to PDF in bulk from Chrome’s side panel. Paste up to 100 links, pick paper format and margins, and download every PDF as one ZIP. Free.'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/extensions/chrome/website-pdf',
        name: 'Microlink: Website to PDF',
        description:
          'Chrome extension that converts websites to PDF in bulk — paste up to 100 links and download them all as a ZIP, powered by Microlink.',
        url: 'https://microlink.io/extensions/chrome/website-pdf',
        installUrl: PDF_EXTENSION_URL,
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
            'Free to install — 25 conversions per day included, no account required'
        }
      }
    ]}
  />
)

export default WebsitePdfExtensionPage
