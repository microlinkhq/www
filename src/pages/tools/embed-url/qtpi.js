import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'QTpi',
  slug: 'qtpi',
  color: '#666666',
  exampleUrl: 'https://qtpi.gg',
  metaTitle: 'QTpi Embed Code Generator — Embed QTpi Content',
  metaDescription:
    'Free QTpi embed code generator. Paste any QTpi URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed qtpi', 'qtpi embed code', 'qtpi embed generator'],
  heroTitle: 'QTpi Embed Code Generator',
  heroSubtitle:
    'Paste any QTpi URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed QTpi content',
  howItWorksSteps: [
    { title: 'Paste a QTpi link', description: 'Copy any qtpi.gg URL.' },
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
  explanationHeading: 'Why use our QTpi embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any QTpi link and get working embed HTML.'
    },
    {
      title: 'QTpi content',
      description: 'The tool handles all QTpi URL formats.'
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
        'Get the real QTpi embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all QTpi URL formats and content types.'
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
      question: 'How do I embed QTpi content on my website?',
      answer: 'Paste any QTpi URL into the tool and click Generate.'
    },
    {
      question: 'Is the QTpi embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the QTpi content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
