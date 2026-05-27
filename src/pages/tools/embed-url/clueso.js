import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Clueso',
  slug: 'clueso',
  color: '#666666',
  exampleUrl: 'https://clueso.io',
  metaTitle: 'Clueso Embed Code Generator — Embed Clueso Content',
  metaDescription:
    'Free Clueso embed code generator. Paste any Clueso URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed clueso', 'clueso embed code', 'clueso embed generator'],
  heroTitle: 'Clueso Embed Code Generator',
  heroSubtitle:
    'Paste any Clueso URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Clueso content',
  howItWorksSteps: [
    { title: 'Paste a Clueso link', description: 'Copy any clueso.io URL.' },
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
  explanationHeading: 'Why use our Clueso embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Clueso link and get working embed HTML.'
    },
    {
      title: 'Clueso content',
      description: 'The tool handles all Clueso URL formats.'
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
        'Get the real Clueso embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Clueso URL formats and content types.'
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
      question: 'How do I embed Clueso content on my website?',
      answer: 'Paste any Clueso URL into the tool and click Generate.'
    },
    {
      question: 'Is the Clueso embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Clueso content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
