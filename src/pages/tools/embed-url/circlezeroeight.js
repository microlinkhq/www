import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Circle Zero Eight',
  slug: 'circlezeroeight',
  color: '#666666',
  exampleUrl: 'https://cze.io',
  metaTitle:
    'Circle Zero Eight Embed Code Generator — Embed Circle Zero Eight Content',
  metaDescription:
    'Free Circle Zero Eight embed code generator. Paste any Circle Zero Eight URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed circle zero eight',
    'circle zero eight embed code',
    'circle zero eight embed generator'
  ],
  heroTitle: 'Circle Zero Eight Embed Code Generator',
  heroSubtitle:
    'Paste any Circle Zero Eight URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Circle Zero Eight content',
  howItWorksSteps: [
    {
      title: 'Paste a Circle Zero Eight link',
      description: 'Copy any cze.io URL.'
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
  explanationHeading: 'Why use our Circle Zero Eight embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Circle Zero Eight link and get working embed HTML.'
    },
    {
      title: 'Circle Zero Eight content',
      description: 'The tool handles all Circle Zero Eight URL formats.'
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
        'Get the real Circle Zero Eight embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description:
        'Works with all Circle Zero Eight URL formats and content types.'
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
      question: 'How do I embed Circle Zero Eight content on my website?',
      answer:
        'Paste any Circle Zero Eight URL into the tool and click Generate.'
    },
    {
      question: 'Is the Circle Zero Eight embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Circle Zero Eight content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
