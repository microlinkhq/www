import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Mixcloud',
  slug: 'mixcloud',
  color: '#5000FF',
  exampleUrl: 'https://www.mixcloud.com/spartacus/party-time/',
  metaTitle: 'Mixcloud Embed Code Generator — Embed DJ Mixes & Radio Shows',
  metaDescription:
    'Free Mixcloud embed code generator. Paste any Mixcloud URL — get a ready-to-paste player for DJ mixes, radio shows, and podcasts. No signup.',
  keywords: [
    'embed mixcloud',
    'mixcloud embed code',
    'mixcloud embed code generator',
    'embed mixcloud mix',
    'mixcloud iframe code',
    'mixcloud player embed',
    'embed mixcloud radio show'
  ],
  heroTitle: 'Mixcloud Embed Code Generator',
  heroSubtitle:
    'Paste any Mixcloud URL — get a ready-to-paste player for DJ mixes, radio shows, and podcasts.',
  howItWorksHeading: 'How to embed a Mixcloud mix',
  howItWorksSteps: [
    {
      title: 'Paste a Mixcloud link',
      description:
        'Copy any mixcloud.com URL — DJ mixes, radio shows, and podcasts.'
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
  explanationHeading: 'Why use our Mixcloud embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Mixcloud link and get working embed HTML.'
    },
    {
      title: 'All Mixcloud content',
      description:
        'Works with DJ mixes, radio shows, and podcasts — the tool handles all Mixcloud URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Mixcloud embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Mixcloud player',
      description:
        'Get the real Mixcloud player with cover art, playback controls, and the full tracklist.'
    },
    {
      title: 'Mixes, shows & podcasts',
      description:
        'Hour-long DJ sets, weekly radio shows, and podcast episodes — all Mixcloud content types work.'
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
      href: '/tools/embed-url/spotify',
      label: 'Spotify'
    },
    {
      href: '/tools/embed-url/audiomack',
      label: 'Audiomack'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Mixcloud mix on my website?',
      answer:
        'Paste any Mixcloud URL into the tool and click Generate. You will get a ready-to-paste player snippet.'
    },
    {
      question: 'Can I embed radio shows and podcasts?',
      answer:
        'Yes. DJ mixes, radio shows, and podcast episodes hosted on Mixcloud are all supported.'
    },
    {
      question: 'What if native embedding is restricted?',
      answer:
        'The tool falls back to a styled preview card with the available title and cover image.'
    },
    {
      question: 'Does the embedded player show the tracklist?',
      answer:
        'The native Mixcloud player includes playback controls and the tracklist when the uploader has provided one.'
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
