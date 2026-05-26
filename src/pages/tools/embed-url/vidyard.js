import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Vidyard',
  slug: 'vidyard',
  color: '#25BB66',
  exampleUrl: 'https://vidyard.com',
  metaTitle: 'Vidyard Embed Code Generator — Embed Videos and playlists',
  metaDescription:
    'Free Vidyard embed code generator. Paste any Vidyard URL — get a ready-to-paste embed for videos and playlists. No signup.',
  keywords: ['embed vidyard', 'vidyard embed code', 'vidyard video embed'],
  heroTitle: 'Vidyard Embed Code Generator',
  heroSubtitle:
    'Paste any Vidyard URL — get a ready-to-paste embed for videos and playlists.',
  howItWorksHeading: 'How to embed Vidyard content',
  howItWorksSteps: [
    {
      title: 'Paste a Vidyard link',
      description: 'Copy any vidyard.com URL — videos and playlists.'
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
  explanationHeading: 'Why use our Vidyard embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Vidyard link and get working embed HTML.'
    },
    {
      title: 'All Vidyard content',
      description:
        'Works with videos and playlists — the tool handles all Vidyard URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Vidyard embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Vidyard embed with full interactivity when available.'
    },
    {
      title: 'All videos and playlists',
      description:
        'Works with videos and playlists — all Vidyard content types.'
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
      question: 'How do I embed Vidyard content on my website?',
      answer:
        'Paste any Vidyard URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Vidyard embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Vidyard content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
