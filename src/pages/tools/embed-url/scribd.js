import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Scribd',
  slug: 'scribd',
  color: '#1A7BBA',
  exampleUrl: 'https://scribd.com',
  metaTitle: 'Scribd Embed Code Generator — Embed Documents',
  metaDescription:
    'Free Scribd embed code generator. Paste any Scribd URL — get a ready-to-paste embed for documents, books, and audiobooks. No signup.',
  keywords: ['embed scribd', 'scribd embed code', 'scribd document embed'],
  heroTitle: 'Scribd Embed Code Generator',
  heroSubtitle:
    'Paste any Scribd URL — get a ready-to-paste embed for documents, books, and audiobooks.',
  howItWorksHeading: 'How to embed Scribd content',
  howItWorksSteps: [
    {
      title: 'Paste a Scribd link',
      description: 'Copy any scribd.com URL — documents, books, and audiobooks.'
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
  explanationHeading: 'Why use our Scribd embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Scribd link and get working embed HTML.'
    },
    {
      title: 'All Scribd content',
      description:
        'Works with documents, books, and audiobooks — the tool handles all Scribd URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Scribd embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Scribd embed with full interactivity when available.'
    },
    {
      title: 'All documents',
      description:
        'Works with documents, books, and audiobooks — all Scribd content types.'
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
      question: 'How do I embed Scribd content on my website?',
      answer:
        'Paste any Scribd URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Scribd embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Scribd content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
