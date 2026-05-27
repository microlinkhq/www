import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: '3Q',
  slug: '3q',
  color: '#666666',
  exampleUrl: 'https://3q.video',
  metaTitle: '3Q Embed Code Generator — Embed 3Q Content',
  metaDescription:
    'Free 3Q embed code generator. Paste any 3Q URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed 3q', '3q embed code', '3q embed generator'],
  heroTitle: '3Q Embed Code Generator',
  heroSubtitle:
    'Paste any 3Q URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed 3Q content',
  howItWorksSteps: [
    { title: 'Paste a 3Q link', description: 'Copy any 3q.video URL.' },
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
  explanationHeading: 'Why use our 3Q embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any 3Q link and get working embed HTML.'
    },
    {
      title: '3Q content',
      description: 'The tool handles all 3Q URL formats.'
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
        'Get the real 3Q embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all 3Q URL formats and content types.'
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
      question: 'How do I embed 3Q content on my website?',
      answer: 'Paste any 3Q URL into the tool and click Generate.'
    },
    {
      question: 'Is the 3Q embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the 3Q content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
