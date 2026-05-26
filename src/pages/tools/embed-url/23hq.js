import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: '23hq',
  slug: '23hq',
  color: '#666666',
  exampleUrl: 'https://23hq.com',
  metaTitle: '23hq Embed Code Generator — Embed 23hq Content',
  metaDescription:
    'Free 23hq embed code generator. Paste any 23hq URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed 23hq', '23hq embed code', '23hq embed generator'],
  heroTitle: '23hq Embed Code Generator',
  heroSubtitle:
    'Paste any 23hq URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed 23hq content',
  howItWorksSteps: [
    { title: 'Paste a 23hq link', description: 'Copy any 23hq.com URL.' },
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
  explanationHeading: 'Why use our 23hq embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any 23hq link and get working embed HTML.'
    },
    {
      title: '23hq content',
      description: 'The tool handles all 23hq URL formats.'
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
        'Get the real 23hq embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all 23hq URL formats and content types.'
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
      question: 'How do I embed 23hq content on my website?',
      answer: 'Paste any 23hq URL into the tool and click Generate.'
    },
    {
      question: 'Is the 23hq embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the 23hq content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
