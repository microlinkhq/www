import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Screen9',
  slug: 'screen9',
  color: '#666666',
  exampleUrl: 'https://screen9.com',
  metaTitle: 'Screen9 Embed Code Generator — Embed Screen9 Content',
  metaDescription:
    'Free Screen9 embed code generator. Paste any Screen9 URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed screen9', 'screen9 embed code', 'screen9 embed generator'],
  heroTitle: 'Screen9 Embed Code Generator',
  heroSubtitle:
    'Paste any Screen9 URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Screen9 content',
  howItWorksSteps: [
    { title: 'Paste a Screen9 link', description: 'Copy any screen9.com URL.' },
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
  explanationHeading: 'Why use our Screen9 embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Screen9 link and get working embed HTML.'
    },
    {
      title: 'Screen9 content',
      description: 'The tool handles all Screen9 URL formats.'
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
        'Get the real Screen9 embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Screen9 URL formats and content types.'
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
      question: 'How do I embed Screen9 content on my website?',
      answer: 'Paste any Screen9 URL into the tool and click Generate.'
    },
    {
      question: 'Is the Screen9 embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Screen9 content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
