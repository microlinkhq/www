import { breakpoints, colors, layout, theme } from 'theme'
import {
  CheckCircle,
  Chrome,
  Code,
  Cpu,
  Eye,
  FileText,
  Key,
  Shield,
  Sidebar
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
  SHARING_DEBUGGER_EXTENSION_URL
} from 'components/patterns/ChromeExtensionBanner/ChromeExtensionBanner'
import {
  CtaSection,
  DashedGridOverlay,
  EXTENSIONS,
  Eyebrow,
  FeatureCard,
  FeatureGrid,
  Section,
  SectionInner,
  SharingDebuggerExtensionMockup,
  SharingDebuggerStepFixMini,
  SharingDebuggerStepScoreMini,
  SharingDebuggerStepUrlMini,
  StepCard
} from 'components/patterns/ExtensionStory'
import Layout from 'components/patterns/Layout'

import { trackEvent } from 'helpers/plausible'

const EVENT_NAME = 'sharing debugger extension install'

const ACCENT = EXTENSIONS.find(
  extension => extension.slug === 'chrome/sharing-debugger'
).accent

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
            Debug link previews{' '}
            <span css={theme({ color: ACCENT.text })}>
              before you hit publish
            </span>
          </Heading>
          <Text
            as='p'
            css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.normal })}
          >
            <b>Microlink: Sharing Debugger</b> lives in Chrome&apos;s side
            panel. Point it at any URL — or the tab you&apos;re reading — and
            get sharing and SEO scores in seconds, link previews for
            8&nbsp;platforms, and copy-ready tags that fix every issue. Powered
            by the <Link href='/metadata'>Microlink Metadata API</Link>.
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
              href={SHARING_DEBUGGER_EXTENSION_URL}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => trackEvent(EVENT_NAME)}
            >
              <Chrome size={18} style={{ flexShrink: 0 }} />
              Add to Chrome — it&apos;s free
            </InstallButtonInline>
            <ArrowLink
              href='/tools/sharing-debugger'
              css={theme({ color: 'link', fontWeight: 'bold', fontSize: 1 })}
            >
              Try it online now
            </ArrowLink>
          </Flex>
          <Caps
            as='p'
            css={theme({
              fontFamily: 'mono',
              fontSize: 0,
              fontWeight: 'bold',
              color: 'black50',
              letterSpacing: '0.08em',
              m: 0,
              pt: 3
            })}
          >
            Version 1.0.0 · Free · Chrome&nbsp;114+
          </Caps>
        </Box>
        <HeroMockup aria-hidden='true'>
          <HeroMockupGlow
            css={`
              background: ${colors.grape2};
              opacity: 0.5;
            `}
          />
          <Box css={theme({ position: 'relative', zIndex: 1 })}>
            <SharingDebuggerExtensionMockup />
          </Box>
        </HeroMockup>
      </HeroGrid>
    </SectionInner>
  </Section>
)

const WhatItDoes = () => (
  <Section css={theme({ pt: [4, 4, 5, 5], pb: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, display: 'block' })}>
        What it does
      </Eyebrow>
      <Subhead css={theme({ pb: [3, 3, 4, 4], textAlign: 'left' })}>
        From blank cards to perfect previews
      </Subhead>
      <Text as='p' css={theme({ pb: 4 })}>
        You ship a page, paste the link in Slack, and the card comes up blank —
        wrong title, missing image, stale description. Every platform reads your
        metadata differently, and the first time you find out is usually in
        front of your audience. This extension checks the page the way crawlers
        do: it resolves the live metadata through the Microlink API — the
        normalized title, description, image, publisher, logo, language, author,
        date, and canonical URL a crawler actually ends up with — then runs 17
        checks across two lenses. Sharing covers title and description length,
        image presence, resolution and aspect ratio, HTTPS, publisher, and logo.
        SEO covers title and description length, language, canonical and
        redirect hygiene, tracking parameters, duplicate title and description,
        content freshness, and author.
      </Text>
      <Text as='p' css={theme({ pb: 4 })}>
        Each category gets a score, every check comes back as a pass, info,
        warning, or error, and the preview pane renders the card WhatsApp,
        Facebook, Google, Telegram, LinkedIn, X, Discord, and Slack will show —
        so you can fix the tags before anyone sees them broken. A Raw Metadata
        panel keeps the full normalized API response one click away, so you can
        see exactly what a crawler resolves before you write a single tag.
      </Text>
      <Text as='p'>
        The scores are arithmetic, not opinion. Each lens starts at 100 and
        loses 22 points per error, 10 per warning, and 4 per info finding; the
        overall score is the average of the two. In the panel, 85 and above
        reads green, 65 and above amber, anything lower red — a number you can
        act on, and the same number every time you re-run the check.
      </Text>
    </SectionInner>
  </Section>
)

const FEATURES = [
  {
    icon: CheckCircle,
    title: '17 checks, two lenses',
    body: 'Sharing checks cover title and description length, image presence, resolution and aspect ratio, HTTPS, publisher, and logo. SEO checks cover title and description length, language, canonical and redirect hygiene, tracking parameters, duplicate title and description, freshness, and author.'
  },
  {
    icon: Eye,
    title: '8 platform previews',
    body: 'See the card WhatsApp, Facebook, Google, Telegram, LinkedIn, X, Discord, and Slack will render for your URL — before you share the link anywhere.'
  },
  {
    icon: Sidebar,
    title: 'Keeps up as you browse',
    body: 'The side panel stays open while you move around. Switch tabs and Use Tab follows you, so auditing a whole site is paste, read, fix, next page — never reopening anything.'
  },
  {
    icon: Code,
    title: 'Copy-ready fix tags',
    body: 'Every error and warning ships the exact HTML tag that fixes it — Open Graph and Twitter Card variants together. Copy the snippet, paste it into your page, and re-run the check to confirm the card is right.'
  },
  {
    icon: Cpu,
    title: 'An LLM prompt that fixes it',
    body: 'Each panel copies a structured prompt with its errors, warnings, and suggested tags. Hand it to Claude or your coding agent: the prompt makes it ask permission before every step and refuse to invent values it does not have.'
  },
  {
    icon: FileText,
    title: 'The raw metadata, one click away',
    body: 'Expand Raw Metadata to read the full normalized JSON the API returned for your URL — the same payload you get from the Metadata API when you call it from your own code.'
  },
  {
    icon: Key,
    title: 'Free tier, pro ready',
    body: 'Works without an account — 25 checks per day on the house. Add your Microlink API key and the extension switches to the pro endpoint with your plan limits.'
  },
  {
    icon: Shield,
    title: 'Honest about permissions',
    body: 'Chrome warns that this extension can read your browsing history — that is the permission behind the Use Tab button. Your active tab URL stays in the browser, nothing is stored, and nothing is sent anywhere until you press analyze. The only server it calls is the Microlink API.'
  }
]

const Features = () => (
  <Section css={theme({ pt: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        Features
      </Eyebrow>
      <Subhead css={theme({ pb: [3, 3, 4, 4], textAlign: 'left' })}>
        Everything the online debugger does, one panel away
      </Subhead>
      <FeatureGrid>
        {FEATURES.map(feature => (
          <FeatureCard key={feature.title} accent={ACCENT} {...feature} />
        ))}
      </FeatureGrid>
    </SectionInner>
  </Section>
)

const HowItWorks = () => (
  <Section id='how-it-works' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        How it works
      </Eyebrow>
      <Subhead css={theme({ textAlign: 'left' })}>
        Paste a URL, read the verdict, copy the fix
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
          kicker='Point it at a URL'
          title='Open the side panel on any page.'
          body='Click the extension icon and Chrome opens the side panel next to whatever you are reading. Paste a URL or hit Use Tab to analyze the current page — the extension pulls its live metadata through the Microlink API.'
          visual={<SharingDebuggerStepUrlMini />}
        />
        <StepCard
          accent={ACCENT}
          number={2}
          kicker='Read the verdict'
          title='Three scores, every check explained.'
          body='Overall, Sharing, and SEO scores land in seconds, with every check listed as a pass, info, warning, or error — and the passed ones collapsed behind a count until you want them. Flip through the preview pane to see the exact card each platform will render.'
          visual={<SharingDebuggerStepScoreMini />}
        />
        <StepCard
          accent={ACCENT}
          number={3}
          kicker='Copy the fix'
          title='Exact tags, ready to paste.'
          body='Every error and warning ships with the HTML tag that fixes it — copy a single tag, or copy the panel’s LLM fix prompt and let your coding agent apply every change, asking your permission at each step. Re-run the check to confirm the card is fixed.'
          visual={<SharingDebuggerStepFixMini />}
        />
      </Flex>
    </SectionInner>
  </Section>
)

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
        The extension is free and includes <b>25 checks per day</b> — no
        account, no credit card. It runs on the same infrastructure that
        extracts structured metadata from millions of URLs every week for paying
        customers.
      </Text>
      <Text as='p'>
        Auditing a whole site? A{' '}
        <Link href='/metadata#pricing'>
          Microlink Metadata API subscription
        </Link>{' '}
        unlocks up to <b>46,000 checks per month</b>. Paste your API key in the
        extension settings and it switches to your plan automatically.
      </Text>
    </SectionInner>
  </Section>
)

const SharingDebuggerExtensionPage = () => (
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
        headlinePrefix='Ready to debug'
        headlineAccent='every link you ship'
        body='The extension runs on the Microlink Metadata API — the same endpoint you can call from your own code to turn any URL into structured, normalized metadata.'
        href='/metadata'
        label='Explore the Metadata API'
      />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Sharing Debugger Chrome Extension — Fix Link Previews & SEO'
    noSuffix
    description='Debug sharing and SEO metadata from Chrome’s side panel. Score any URL, preview its link card across 8 platforms, and copy ready-to-paste fix tags. Free.'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/extensions/chrome/sharing-debugger',
        name: 'Microlink: Sharing Debugger',
        description:
          'Chrome extension that debugs social sharing and SEO metadata — score any URL, preview its link card across 8 platforms, and copy ready-to-paste fix tags, powered by Microlink.',
        url: 'https://microlink.io/extensions/chrome/sharing-debugger',
        installUrl: SHARING_DEBUGGER_EXTENSION_URL,
        applicationCategory: 'BrowserApplication',
        operatingSystem: 'Chrome',
        browserRequirements: 'Requires Google Chrome 114 or later',
        softwareVersion: '1.0.0',
        fileSize: '83.48 kB',
        permissions: 'storage, activeTab, tabs, sidePanel',
        featureList: [
          '17 sharing and SEO metadata checks',
          'Link card previews for WhatsApp, Facebook, Google, Telegram, LinkedIn, X, Discord, and Slack',
          'Copy-ready Open Graph and Twitter Card fix tags',
          'Copyable LLM fix prompt for coding agents',
          'Raw normalized metadata inspector'
        ],
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
            'Free to install — 25 checks per day included, no account required'
        }
      }
    ]}
  />
)

export default SharingDebuggerExtensionPage
