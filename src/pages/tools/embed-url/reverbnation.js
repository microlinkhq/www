import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'ReverbNation',
  slug: 'reverbnation',
  color: '#E43526',
  exampleUrl: 'https://www.reverbnation.com/scottyandthereverbs',
  metaTitle:
    'ReverbNation Embed Code Generator — Embed Songs & Artist Profiles',
  metaDescription:
    'Free ReverbNation embed code generator. Paste any ReverbNation URL — get a ready-to-paste player widget for songs and independent artist profiles. No signup.',
  keywords: [
    'embed reverbnation',
    'reverbnation embed code',
    'reverbnation embed code generator',
    'embed reverbnation song',
    'embed reverbnation artist',
    'reverbnation player widget',
    'reverbnation widget embed'
  ],
  heroTitle: 'ReverbNation Embed Code Generator',
  heroSubtitle:
    'Paste any ReverbNation URL — get a ready-to-paste player widget for songs and independent artist profiles.',
  howItWorksHeading: 'How to embed ReverbNation content',
  howItWorksSteps: [
    {
      title: 'Paste a ReverbNation link',
      description:
        'Copy any reverbnation.com URL — independent artist profiles and song pages.'
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
  explanationHeading: 'Why use our ReverbNation embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Share menu. Paste any ReverbNation link and get working embed HTML.'
    },
    {
      title: 'Songs and artist profiles',
      description:
        'Works with individual song pages and full independent artist profiles on reverbnation.com.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 ReverbNation embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native player widget',
      description:
        'Get the real ReverbNation player widget with artwork and playback controls when available.'
    },
    {
      title: 'Songs and artist profiles',
      description:
        'Individual songs and full independent artist profiles — the tool handles ReverbNation URL formats.'
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
      href: '/tools/embed-url/audiomack',
      label: 'Audiomack'
    },
    {
      href: '/tools/embed-url/audius',
      label: 'Audius'
    }
  ],
  faq: [
    {
      question: 'How do I embed a ReverbNation song on my website?',
      answer:
        'Paste any ReverbNation URL into the tool and click Generate. You will get a ready-to-paste player widget.'
    },
    {
      question: 'Can I embed an artist profile?',
      answer:
        'Yes. Both individual song pages and full independent artist profiles are supported.'
    },
    {
      question: 'Does the embed play the music?',
      answer:
        'Yes. The native ReverbNation player widget includes playback controls so visitors can listen in place.'
    },
    {
      question: 'What if native embedding is restricted?',
      answer:
        'The tool falls back to a styled preview card with the available title and image.'
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
