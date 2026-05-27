import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Sato',
  slug: 'sato',
  color: '#666666',
  exampleUrl: 'https://sato.cc',
  metaTitle: 'Sato Embed Code Generator — Embed Sato Content',
  metaDescription:
    'Free Sato embed code generator. Paste any Sato URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed sato', 'sato embed code', 'sato embed generator'],
  heroTitle: 'Sato Embed Code Generator',
  heroSubtitle:
    'Paste any Sato URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Sato content',
  howItWorksSteps: [
    { title: 'Paste a Sato link', description: 'Copy any sato.cc URL.' },
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
  explanationHeading: 'Why use our Sato embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Sato link and get working embed HTML.'
    },
    {
      title: 'Sato content',
      description: 'The tool handles all Sato URL formats.'
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
        'Get the real Sato embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Sato URL formats and content types.'
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
      question: 'How do I embed Sato content on my website?',
      answer: 'Paste any Sato URL into the tool and click Generate.'
    },
    {
      question: 'Is the Sato embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Sato content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
