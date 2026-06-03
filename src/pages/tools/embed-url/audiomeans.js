import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Audiomeans',
  slug: 'audiomeans',
  color: '#0052CC',
  exampleUrl:
    'https://podcasts.audiomeans.fr/reporters-637ad90aafb6/episode-5-avec-hugo-travers-hugodecrypte-71977b6d29f4',
  metaTitle: 'Audiomeans Embed Code Generator — Embed Podcasts & Episodes',
  metaDescription:
    'Free Audiomeans embed code generator. Paste any Audiomeans podcast URL — get a ready-to-paste audio player for shows and episodes. No signup.',
  keywords: [
    'embed audiomeans',
    'audiomeans embed code',
    'audiomeans embed code generator',
    'embed audiomeans podcast',
    'audiomeans player embed',
    'audiomeans iframe code',
    'embed audiomeans episode'
  ],
  heroTitle: 'Audiomeans Embed Code Generator',
  heroSubtitle:
    'Paste any Audiomeans podcast URL — get a ready-to-paste audio player for shows and episodes.',
  howItWorksHeading: 'How to embed Audiomeans content',
  howItWorksSteps: [
    {
      title: 'Paste an Audiomeans link',
      description:
        'Copy any podcasts.audiomeans.fr URL — a full show page or a single episode.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the podcast and generates the right audio player embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Audiomeans embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Audiomeans link and get working embed HTML.'
    },
    {
      title: 'Shows and episodes',
      description:
        'Works with full show pages and individual episode URLs from podcasts.audiomeans.fr.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Audiomeans embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Audiomeans player',
      description:
        'Get the real Audiomeans audio player with episode artwork and playback controls.'
    },
    {
      title: 'Responsive audio embed',
      description:
        'The player adapts to your layout, so podcasts look right on any screen size.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/podbean',
      label: 'Podbean'
    },
    {
      href: '/tools/embed-url/acast',
      label: 'Acast'
    },
    {
      href: '/tools/embed-url/spreaker',
      label: 'Spreaker'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Audiomeans podcast on my website?',
      answer:
        'Paste any Audiomeans URL into the tool and click Generate. You will get a ready-to-paste audio player.'
    },
    {
      question: 'Can I embed a single episode?',
      answer:
        'Yes. Both full show pages and individual episode URLs from podcasts.audiomeans.fr are supported.'
    },
    {
      question: 'What if native embedding is not available?',
      answer:
        'The tool falls back to a styled preview card with the title and image that you can customize before copying.'
    },
    {
      question: 'Does the embedded player support playback?',
      answer:
        'Yes. The native Audiomeans player includes playback controls so listeners can play episodes inline.'
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
