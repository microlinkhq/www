import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Audius',
  slug: 'audius',
  color: '#CC0FE0',
  exampleUrl: 'https://audius.co',
  metaTitle: 'Audius Embed Code Generator — Embed Tracks and playlists',
  metaDescription:
    'Free Audius embed code generator. Paste any Audius URL — get a ready-to-paste embed for tracks and playlists. No signup.',
  keywords: ['embed audius', 'audius embed code', 'audius player embed'],
  heroTitle: 'Audius Embed Code Generator',
  heroSubtitle:
    'Paste any Audius URL — get a ready-to-paste embed for tracks and playlists.',
  howItWorksHeading: 'How to embed Audius content',
  howItWorksSteps: [
    {
      title: 'Paste a Audius link',
      description: 'Copy any audius.co URL — tracks and playlists.'
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
  explanationHeading: 'Why use our Audius embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Audius link and get working embed HTML.'
    },
    {
      title: 'All Audius content',
      description:
        'Works with tracks and playlists — the tool handles all Audius URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Audius embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Audius embed with full interactivity when available.'
    },
    {
      title: 'All tracks and playlists',
      description: 'Works with tracks and playlists — all Audius content types.'
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
      question: 'How do I embed Audius content on my website?',
      answer:
        'Paste any Audius URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Audius embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Audius content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
