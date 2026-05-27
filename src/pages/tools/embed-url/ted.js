import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'TED',
  slug: 'ted',
  color: '#E62B1E',
  exampleUrl: 'https://ted.com',
  metaTitle: 'TED Embed Code Generator — Embed Talks and playlists',
  metaDescription:
    'Free TED embed code generator. Paste any TED URL — get a ready-to-paste embed for talks and playlists. No signup.',
  keywords: [
    'embed ted talk',
    'ted embed code',
    'ted talk embed',
    'ted video embed'
  ],
  heroTitle: 'TED Embed Code Generator',
  heroSubtitle:
    'Paste any TED URL — get a ready-to-paste embed for talks and playlists.',
  howItWorksHeading: 'How to embed TED content',
  howItWorksSteps: [
    {
      title: 'Paste a TED link',
      description: 'Copy any ted.com URL — talks and playlists.'
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
  explanationHeading: 'Why use our TED embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any TED link and get working embed HTML.'
    },
    {
      title: 'All TED content',
      description:
        'Works with talks and playlists — the tool handles all TED URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description: 'Generate up to 50 TED embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real TED embed with full interactivity when available.'
    },
    {
      title: 'All talks and playlists',
      description: 'Works with talks and playlists — all TED content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/embed/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed TED content on my website?',
      answer:
        'Paste any TED URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the TED embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the TED content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
