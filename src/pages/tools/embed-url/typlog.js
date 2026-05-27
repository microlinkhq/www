import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Typlog',
  slug: 'typlog',
  color: '#666666',
  exampleUrl: 'https://typlog.com',
  metaTitle: 'Typlog Embed Code Generator — Embed Typlog Content',
  metaDescription:
    'Free Typlog embed code generator. Paste any Typlog URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed typlog', 'typlog embed code', 'typlog embed generator'],
  heroTitle: 'Typlog Embed Code Generator',
  heroSubtitle:
    'Paste any Typlog URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Typlog content',
  howItWorksSteps: [
    { title: 'Paste a Typlog link', description: 'Copy any typlog.com URL.' },
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
  explanationHeading: 'Why use our Typlog embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Typlog link and get working embed HTML.'
    },
    {
      title: 'Typlog content',
      description: 'The tool handles all Typlog URL formats.'
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
        'Get the real Typlog embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Typlog URL formats and content types.'
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
      question: 'How do I embed Typlog content on my website?',
      answer: 'Paste any Typlog URL into the tool and click Generate.'
    },
    {
      question: 'Is the Typlog embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Typlog content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
