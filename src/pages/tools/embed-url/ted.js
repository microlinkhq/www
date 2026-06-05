import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'TED',
  slug: 'ted',
  color: '#EB0028',
  exampleUrl:
    'https://www.ted.com/talks/sir_ken_robinson_do_schools_kill_creativity',
  metaTitle: 'TED Embed Code Generator — Embed TED Talk Videos',
  metaDescription:
    'Free TED embed code generator. Paste any TED Talk URL — get a ready-to-paste iframe player for talks from ted.com. No signup.',
  keywords: [
    'embed ted',
    'ted embed code',
    'ted embed code generator',
    'embed ted talk',
    'embed ted talk video',
    'ted iframe code',
    'ted talk player embed'
  ],
  heroTitle: 'TED Embed Code Generator',
  heroSubtitle:
    'Paste any TED Talk URL — get a ready-to-paste iframe player for talks from ted.com.',
  howItWorksHeading: 'How to embed a TED Talk',
  howItWorksSteps: [
    {
      title: 'Paste a TED link',
      description:
        'Copy any ted.com Talk URL straight from the talk page or the Share button.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the TED Talk and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our TED embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip rewriting the URL or digging through the Share menu. Paste any TED link and get working embed HTML.'
    },
    {
      title: 'Real TED video player',
      description:
        'Get the native TED player so visitors can watch the full talk without leaving your page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 TED embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native TED player',
      description:
        'Get the real TED video player with full playback controls and the talk title.'
    },
    {
      title: 'Responsive embeds',
      description:
        'The TED player scales to fit your layout, from full-width articles to narrow sidebars.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    },
    {
      href: '/tools/embed-url/dailymotion',
      label: 'Dailymotion'
    }
  ],
  faq: [
    {
      question: 'How do I embed a TED Talk on my website?',
      answer:
        'Paste any ted.com Talk URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Does the embed play the full talk?',
      answer:
        'Yes. The native TED player streams the full talk with standard playback controls.'
    },
    {
      question: 'Is the TED embed responsive?',
      answer:
        'Yes. The player scales to the width of its container, so it works on desktop and mobile layouts.'
    },
    {
      question: 'What if a talk cannot be embedded?',
      answer:
        'If native embedding is restricted, switch to Card mode to get a styled preview card with the talk title and image.'
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
