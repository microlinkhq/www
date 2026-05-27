import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SAPO Videos',
  slug: 'sapo-videos',
  color: '#666666',
  exampleUrl: 'https://videos.sapo.pt',
  metaTitle: 'SAPO Videos Embed Code Generator — Embed SAPO Videos Content',
  metaDescription:
    'Free SAPO Videos embed code generator. Paste any SAPO Videos URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed sapo videos',
    'sapo videos embed code',
    'sapo videos embed generator'
  ],
  heroTitle: 'SAPO Videos Embed Code Generator',
  heroSubtitle:
    'Paste any SAPO Videos URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed SAPO Videos content',
  howItWorksSteps: [
    {
      title: 'Paste a SAPO Videos link',
      description: 'Copy any videos.sapo.pt URL.'
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
  explanationHeading: 'Why use our SAPO Videos embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any SAPO Videos link and get working embed HTML.'
    },
    {
      title: 'SAPO Videos content',
      description: 'The tool handles all SAPO Videos URL formats.'
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
        'Get the real SAPO Videos embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all SAPO Videos URL formats and content types.'
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
      question: 'How do I embed SAPO Videos content on my website?',
      answer: 'Paste any SAPO Videos URL into the tool and click Generate.'
    },
    {
      question: 'Is the SAPO Videos embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the SAPO Videos content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
