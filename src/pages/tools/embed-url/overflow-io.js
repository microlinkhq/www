import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Overflow',
  slug: 'overflow-io',
  color: '#666666',
  exampleUrl: 'https://overflow.io',
  metaTitle: 'Overflow Embed Code Generator — Embed Overflow Content',
  metaDescription:
    'Free Overflow embed code generator. Paste any Overflow URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed overflow',
    'overflow embed code',
    'overflow embed generator'
  ],
  heroTitle: 'Overflow Embed Code Generator',
  heroSubtitle:
    'Paste any Overflow URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Overflow content',
  howItWorksSteps: [
    {
      title: 'Paste a Overflow link',
      description: 'Copy any overflow.io URL.'
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
  explanationHeading: 'Why use our Overflow embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Overflow link and get working embed HTML.'
    },
    {
      title: 'Overflow content',
      description: 'The tool handles all Overflow URL formats.'
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
        'Get the real Overflow embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Overflow URL formats and content types.'
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
      question: 'How do I embed Overflow content on my website?',
      answer: 'Paste any Overflow URL into the tool and click Generate.'
    },
    {
      question: 'Is the Overflow embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Overflow content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
