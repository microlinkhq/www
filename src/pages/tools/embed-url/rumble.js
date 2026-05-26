import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Rumble',
  slug: 'rumble',
  color: '#85C742',
  exampleUrl: 'https://rumble.com',
  metaTitle: 'Rumble Embed Code Generator — Embed Videos and channels',
  metaDescription:
    'Free Rumble embed code generator. Paste any Rumble URL — get a ready-to-paste embed for videos and channels. No signup.',
  keywords: ['embed rumble', 'rumble embed code', 'rumble video embed'],
  heroTitle: 'Rumble Embed Code Generator',
  heroSubtitle:
    'Paste any Rumble URL — get a ready-to-paste embed for videos and channels.',
  howItWorksHeading: 'How to embed Rumble content',
  howItWorksSteps: [
    {
      title: 'Paste a Rumble link',
      description: 'Copy any rumble.com URL — videos and channels.'
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
  explanationHeading: 'Why use our Rumble embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Rumble link and get working embed HTML.'
    },
    {
      title: 'All Rumble content',
      description:
        'Works with videos and channels — the tool handles all Rumble URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Rumble embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Rumble embed with full interactivity when available.'
    },
    {
      title: 'All videos and channels',
      description: 'Works with videos and channels — all Rumble content types.'
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
      question: 'How do I embed Rumble content on my website?',
      answer:
        'Paste any Rumble URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Rumble embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Rumble content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
