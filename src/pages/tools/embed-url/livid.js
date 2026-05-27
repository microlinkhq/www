import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Livid',
  slug: 'livid',
  color: '#666666',
  exampleUrl: 'https://livid.com',
  metaTitle: 'Livid Embed Code Generator — Embed Livid Content',
  metaDescription:
    'Free Livid embed code generator. Paste any Livid URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed livid', 'livid embed code', 'livid embed generator'],
  heroTitle: 'Livid Embed Code Generator',
  heroSubtitle:
    'Paste any Livid URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Livid content',
  howItWorksSteps: [
    { title: 'Paste a Livid link', description: 'Copy any livid.com URL.' },
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
  explanationHeading: 'Why use our Livid embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Livid link and get working embed HTML.'
    },
    {
      title: 'Livid content',
      description: 'The tool handles all Livid URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description: 'Generate up to 50 embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Livid embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Livid URL formats and content types.'
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
      question: 'How do I embed Livid content on my website?',
      answer: 'Paste any Livid URL into the tool and click Generate.'
    },
    {
      question: 'Is the Livid embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Livid content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
