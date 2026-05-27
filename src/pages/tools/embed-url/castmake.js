import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Castmake',
  slug: 'castmake',
  color: '#666666',
  exampleUrl: 'https://castmake.com',
  metaTitle: 'Castmake Embed Code Generator — Embed Castmake Content',
  metaDescription:
    'Free Castmake embed code generator. Paste any Castmake URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed castmake',
    'castmake embed code',
    'castmake embed generator'
  ],
  heroTitle: 'Castmake Embed Code Generator',
  heroSubtitle:
    'Paste any Castmake URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Castmake content',
  howItWorksSteps: [
    {
      title: 'Paste a Castmake link',
      description: 'Copy any castmake.com URL.'
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
  explanationHeading: 'Why use our Castmake embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Castmake link and get working embed HTML.'
    },
    {
      title: 'Castmake content',
      description: 'The tool handles all Castmake URL formats.'
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
        'Get the real Castmake embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Castmake URL formats and content types.'
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
      question: 'How do I embed Castmake content on my website?',
      answer: 'Paste any Castmake URL into the tool and click Generate.'
    },
    {
      question: 'Is the Castmake embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Castmake content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
