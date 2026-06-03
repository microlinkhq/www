import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'hearthis.at',
  slug: 'hearthis',
  color: '#D81900',
  exampleUrl:
    'https://hearthis.at/edmliveset/set/transmission-bangkok-2024-bangkok-thailand-12-10-2024/',
  metaTitle: 'hearthis.at Embed Code Generator — Embed DJ Sets & Tracks',
  metaDescription:
    'Free hearthis.at embed code generator. Paste any hearthis.at URL — get a ready-to-paste player for DJ sets, mixes, and tracks. No signup.',
  keywords: [
    'embed hearthis.at',
    'hearthis.at embed code',
    'hearthis.at embed code generator',
    'embed hearthis.at dj set',
    'hearthis.at player embed',
    'embed hearthis.at mix',
    'embed hearthis.at track'
  ],
  heroTitle: 'hearthis.at Embed Code Generator',
  heroSubtitle:
    'Paste any hearthis.at URL — get a ready-to-paste player for DJ sets, mixes, and tracks.',
  howItWorksHeading: 'How to embed hearthis.at content',
  howItWorksSteps: [
    {
      title: 'Paste a hearthis.at link',
      description:
        'Copy any hearthis.at URL from hearthis.at — tracks, DJ sets, and mixes.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content type and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our hearthis.at embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual embed code lookup. Paste any hearthis.at link and get working embed HTML.'
    },
    {
      title: 'Tracks, sets & mixes',
      description:
        'Works with single tracks, full DJ sets, and live mixes — the tool handles all hearthis.at URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 hearthis.at embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native hearthis.at player',
      description:
        'Get the real hearthis.at player with its waveform, cover art, and playback controls.'
    },
    {
      title: 'DJ sets & long-form mixes',
      description:
        'Individual tracks, hour-long DJ sets, and live mixes all embed with the streaming player.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    },
    {
      href: '/tools/embed-url/mixcloud',
      label: 'Mixcloud'
    },
    {
      href: '/tools/embed-url/audiomack',
      label: 'Audiomack'
    }
  ],
  faq: [
    {
      question: 'How do I embed a hearthis.at DJ set on my website?',
      answer:
        'Paste any hearthis.at URL into the tool and click Generate. You will get a ready-to-paste player.'
    },
    {
      question: 'Can I embed hearthis.at tracks and mixes?',
      answer:
        'Yes. Single tracks, full DJ sets, and live mixes are all supported.'
    },
    {
      question: 'Is the hearthis.at player responsive?',
      answer:
        'The embedded player adapts to your container width, so it fits inline or full-width layouts.'
    },
    {
      question: 'What if the hearthis.at content is private?',
      answer:
        'When native embedding is restricted, the tool falls back to a styled preview card with the available metadata.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
