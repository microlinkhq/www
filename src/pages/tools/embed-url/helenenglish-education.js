import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Helen English',
  slug: 'helenenglish-education',
  color: '#666666',
  exampleUrl: 'https://helenenglish.education',
  metaTitle: 'Helen English Embed Code Generator — Embed Helen English Content',
  metaDescription:
    'Free Helen English embed code generator. Paste any Helen English URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed helen english',
    'helen english embed code',
    'helen english embed generator'
  ],
  heroTitle: 'Helen English Embed Code Generator',
  heroSubtitle:
    'Paste any Helen English URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Helen English content',
  howItWorksSteps: [
    {
      title: 'Paste a Helen English link',
      description: 'Copy any helenenglish.education URL.'
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
  explanationHeading: 'Why use our Helen English embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Helen English link and get working embed HTML.'
    },
    {
      title: 'Helen English content',
      description: 'The tool handles all Helen English URL formats.'
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
        'Get the real Helen English embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Helen English URL formats and content types.'
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
      question: 'How do I embed Helen English content on my website?',
      answer: 'Paste any Helen English URL into the tool and click Generate.'
    },
    {
      question: 'Is the Helen English embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Helen English content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
