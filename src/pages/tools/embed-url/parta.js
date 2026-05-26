import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Parta',
  slug: 'parta',
  color: '#666666',
  exampleUrl: 'https://parta.io',
  metaTitle: 'Parta Embed Code Generator — Embed Parta Content',
  metaDescription:
    'Free Parta embed code generator. Paste any Parta URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed parta', 'parta embed code', 'parta embed generator'],
  heroTitle: 'Parta Embed Code Generator',
  heroSubtitle:
    'Paste any Parta URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Parta content',
  howItWorksSteps: [
    { title: 'Paste a Parta link', description: 'Copy any parta.io URL.' },
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
  explanationHeading: 'Why use our Parta embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Parta link and get working embed HTML.'
    },
    {
      title: 'Parta content',
      description: 'The tool handles all Parta URL formats.'
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
        'Get the real Parta embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Parta URL formats and content types.'
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
      question: 'How do I embed Parta content on my website?',
      answer: 'Paste any Parta URL into the tool and click Generate.'
    },
    {
      question: 'Is the Parta embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Parta content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
