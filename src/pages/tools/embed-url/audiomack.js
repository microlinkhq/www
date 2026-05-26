import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Audiomack',
  slug: 'audiomack',
  color: '#FFA200',
  exampleUrl: 'https://audiomack.com',
  metaTitle: 'Audiomack Embed Code Generator — Embed Songs',
  metaDescription:
    'Free Audiomack embed code generator. Paste any Audiomack URL — get a ready-to-paste embed for songs, albums, and playlists. No signup.',
  keywords: [
    'embed audiomack',
    'audiomack embed code',
    'audiomack player embed'
  ],
  heroTitle: 'Audiomack Embed Code Generator',
  heroSubtitle:
    'Paste any Audiomack URL — get a ready-to-paste embed for songs, albums, and playlists.',
  howItWorksHeading: 'How to embed Audiomack content',
  howItWorksSteps: [
    {
      title: 'Paste a Audiomack link',
      description: 'Copy any audiomack.com URL — songs, albums, and playlists.'
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
  explanationHeading: 'Why use our Audiomack embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Audiomack link and get working embed HTML.'
    },
    {
      title: 'All Audiomack content',
      description:
        'Works with songs, albums, and playlists — the tool handles all Audiomack URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Audiomack embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Audiomack embed with full interactivity when available.'
    },
    {
      title: 'All songs',
      description:
        'Works with songs, albums, and playlists — all Audiomack content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed Audiomack content on my website?',
      answer:
        'Paste any Audiomack URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Audiomack embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Audiomack content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
