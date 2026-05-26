import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Znipe',
  slug: 'znipe',
  color: '#666666',
  exampleUrl: 'https://znipe.tv',
  metaTitle: 'Znipe Embed Code Generator — Embed Znipe Content',
  metaDescription:
    'Free Znipe embed code generator. Paste any Znipe URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed znipe', 'znipe embed code', 'znipe embed generator'],
  heroTitle: 'Znipe Embed Code Generator',
  heroSubtitle:
    'Paste any Znipe URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Znipe content',
  howItWorksSteps: [
    { title: 'Paste a Znipe link', description: 'Copy any znipe.tv URL.' },
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
  explanationHeading: 'Why use our Znipe embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Znipe link and get working embed HTML.'
    },
    {
      title: 'Znipe content',
      description: 'The tool handles all Znipe URL formats.'
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
        'Get the real Znipe embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Znipe URL formats and content types.'
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
      question: 'How do I embed Znipe content on my website?',
      answer: 'Paste any Znipe URL into the tool and click Generate.'
    },
    {
      question: 'Is the Znipe embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Znipe content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
