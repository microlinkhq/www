import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Clyp',
  slug: 'clyp',
  color: '#666666',
  exampleUrl: 'https://clyp.it',
  metaTitle: 'Clyp Embed Code Generator — Embed Clyp Content',
  metaDescription:
    'Free Clyp embed code generator. Paste any Clyp URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed clyp', 'clyp embed code', 'clyp embed generator'],
  heroTitle: 'Clyp Embed Code Generator',
  heroSubtitle:
    'Paste any Clyp URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Clyp content',
  howItWorksSteps: [
    { title: 'Paste a Clyp link', description: 'Copy any clyp.it URL.' },
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
  explanationHeading: 'Why use our Clyp embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Clyp link and get working embed HTML.'
    },
    {
      title: 'Clyp content',
      description: 'The tool handles all Clyp URL formats.'
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
        'Get the real Clyp embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Clyp URL formats and content types.'
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
      question: 'How do I embed Clyp content on my website?',
      answer: 'Paste any Clyp URL into the tool and click Generate.'
    },
    {
      question: 'Is the Clyp embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Clyp content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
