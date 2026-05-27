import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Hulu',
  slug: 'hulu',
  color: '#1CE783',
  exampleUrl: 'https://hulu.com',
  metaTitle: 'Hulu Embed Code Generator — Embed Shows and movies',
  metaDescription:
    'Free Hulu embed code generator. Paste any Hulu URL — get a ready-to-paste embed for shows and movies. No signup.',
  keywords: ['embed hulu', 'hulu embed code', 'hulu video embed'],
  heroTitle: 'Hulu Embed Code Generator',
  heroSubtitle:
    'Paste any Hulu URL — get a ready-to-paste embed for shows and movies.',
  howItWorksHeading: 'How to embed Hulu content',
  howItWorksSteps: [
    {
      title: 'Paste a Hulu link',
      description: 'Copy any hulu.com URL — shows and movies.'
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
  explanationHeading: 'Why use our Hulu embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Hulu link and get working embed HTML.'
    },
    {
      title: 'All Hulu content',
      description:
        'Works with shows and movies — the tool handles all Hulu URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Hulu embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Hulu embed with full interactivity when available.'
    },
    {
      title: 'All shows and movies',
      description: 'Works with shows and movies — all Hulu content types.'
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
      question: 'How do I embed Hulu content on my website?',
      answer:
        'Paste any Hulu URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Hulu embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Hulu content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
