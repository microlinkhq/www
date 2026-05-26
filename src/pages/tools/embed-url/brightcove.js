import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Brightcove',
  slug: 'brightcove',
  color: '#006DCC',
  exampleUrl: 'https://brightcove.com',
  metaTitle: 'Brightcove Embed Code Generator — Embed Videos and playlists',
  metaDescription:
    'Free Brightcove embed code generator. Paste any Brightcove URL — get a ready-to-paste embed for videos and playlists. No signup.',
  keywords: [
    'embed brightcove',
    'brightcove embed code',
    'brightcove video embed'
  ],
  heroTitle: 'Brightcove Embed Code Generator',
  heroSubtitle:
    'Paste any Brightcove URL — get a ready-to-paste embed for videos and playlists.',
  howItWorksHeading: 'How to embed Brightcove content',
  howItWorksSteps: [
    {
      title: 'Paste a Brightcove link',
      description: 'Copy any brightcove.com URL — videos and playlists.'
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
  explanationHeading: 'Why use our Brightcove embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Brightcove link and get working embed HTML.'
    },
    {
      title: 'All Brightcove content',
      description:
        'Works with videos and playlists — the tool handles all Brightcove URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Brightcove embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Brightcove embed with full interactivity when available.'
    },
    {
      title: 'All videos and playlists',
      description:
        'Works with videos and playlists — all Brightcove content types.'
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
      question: 'How do I embed Brightcove content on my website?',
      answer:
        'Paste any Brightcove URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Brightcove embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Brightcove content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
