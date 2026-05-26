import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Kirimemail',
  slug: 'kirimemail',
  color: '#666666',
  exampleUrl: 'https://kirimemail.com',
  metaTitle: 'Kirimemail Embed Code Generator — Embed Kirimemail Content',
  metaDescription:
    'Free Kirimemail embed code generator. Paste any Kirimemail URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed kirimemail',
    'kirimemail embed code',
    'kirimemail embed generator'
  ],
  heroTitle: 'Kirimemail Embed Code Generator',
  heroSubtitle:
    'Paste any Kirimemail URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Kirimemail content',
  howItWorksSteps: [
    {
      title: 'Paste a Kirimemail link',
      description: 'Copy any kirimemail.com URL.'
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
  explanationHeading: 'Why use our Kirimemail embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Kirimemail link and get working embed HTML.'
    },
    {
      title: 'Kirimemail content',
      description: 'The tool handles all Kirimemail URL formats.'
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
        'Get the real Kirimemail embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Kirimemail URL formats and content types.'
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
      question: 'How do I embed Kirimemail content on my website?',
      answer: 'Paste any Kirimemail URL into the tool and click Generate.'
    },
    {
      question: 'Is the Kirimemail embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Kirimemail content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
