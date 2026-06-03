import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Podbean',
  slug: 'podbean',
  color: '#428200',
  exampleUrl:
    'https://podcast.podbean.com/e/podbean-amplified-s2e1-live-at-podcast-movement/',
  metaTitle: 'Podbean Embed Code Generator — Embed Episodes & Podcasts',
  metaDescription:
    'Free Podbean embed code generator. Paste any Podbean URL — get a ready-to-paste iframe player for episodes, podcasts, and playlists. No signup.',
  keywords: [
    'embed podbean',
    'podbean embed code',
    'podbean embed code generator',
    'embed podbean episode',
    'podbean player embed',
    'podbean iframe code',
    'embed podbean podcast'
  ],
  heroTitle: 'Podbean Embed Code Generator',
  heroSubtitle:
    'Paste any Podbean URL — get a ready-to-paste iframe player for episodes, podcasts, and playlists.',
  howItWorksHeading: 'How to embed Podbean content',
  howItWorksSteps: [
    {
      title: 'Paste a Podbean link',
      description:
        'Copy any podbean.com URL — single episodes, full podcasts, or playlists.'
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
  explanationHeading: 'Why use our Podbean embed code generator',
  reasons: [
    {
      title: 'No dashboard needed',
      description:
        'Skip digging through the Podbean dashboard for the Share and Embed button. Paste a link and get working embed HTML.'
    },
    {
      title: 'All Podbean content',
      description:
        'Works with single episodes, full podcasts, and playlists — the tool handles Podbean URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Podbean embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Podbean player',
      description:
        'Get the real Podbean audio player with cover art, playback controls, and download and share buttons.'
    },
    {
      title: 'Episodes, podcasts & playlists',
      description:
        'Single episodes, an entire podcast feed, or a playlist — all Podbean content types work.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/spreaker',
      label: 'Spreaker'
    },
    {
      href: '/tools/embed-url/simplecast',
      label: 'Simplecast'
    },
    {
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Podbean episode on my website?',
      answer:
        'Paste any Podbean URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Can I embed a whole Podbean podcast?',
      answer:
        'Yes. Single episodes, full podcast feeds, and playlists are all supported.'
    },
    {
      question: 'What if the episode is private or unlisted?',
      answer:
        'Native embedding only works for public episodes. For restricted content the tool falls back to a preview card with the title and image.'
    },
    {
      question: 'Does the embedded player work on mobile?',
      answer:
        'Yes. The Podbean player is responsive and adapts to the width of your page on phones and tablets.'
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
