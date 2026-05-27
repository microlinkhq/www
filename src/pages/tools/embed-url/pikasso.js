import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pikasso',
  slug: 'pikasso',
  color: '#666666',
  exampleUrl: 'https://pikasso.me',
  metaTitle: 'Pikasso Embed Code Generator — Embed Pikasso Content',
  metaDescription:
    'Free Pikasso embed code generator. Paste any Pikasso URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed pikasso', 'pikasso embed code', 'pikasso embed generator'],
  heroTitle: 'Pikasso Embed Code Generator',
  heroSubtitle:
    'Paste any Pikasso URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Pikasso content',
  howItWorksSteps: [
    { title: 'Paste a Pikasso link', description: 'Copy any pikasso.me URL.' },
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
  explanationHeading: 'Why use our Pikasso embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Pikasso link and get working embed HTML.'
    },
    {
      title: 'Pikasso content',
      description: 'The tool handles all Pikasso URL formats.'
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
        'Get the real Pikasso embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Pikasso URL formats and content types.'
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
      question: 'How do I embed Pikasso content on my website?',
      answer: 'Paste any Pikasso URL into the tool and click Generate.'
    },
    {
      question: 'Is the Pikasso embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Pikasso content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
