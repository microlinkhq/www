import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Wecandeo',
  slug: 'wecandeo',
  color: '#666666',
  exampleUrl: 'https://wecandeo.com',
  metaTitle: 'Wecandeo Embed Code Generator — Embed Wecandeo Content',
  metaDescription:
    'Free Wecandeo embed code generator. Paste any Wecandeo URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed wecandeo',
    'wecandeo embed code',
    'wecandeo embed generator'
  ],
  heroTitle: 'Wecandeo Embed Code Generator',
  heroSubtitle:
    'Paste any Wecandeo URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Wecandeo content',
  howItWorksSteps: [
    {
      title: 'Paste a Wecandeo link',
      description: 'Copy any wecandeo.com URL.'
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
  explanationHeading: 'Why use our Wecandeo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Wecandeo link and get working embed HTML.'
    },
    {
      title: 'Wecandeo content',
      description: 'The tool handles all Wecandeo URL formats.'
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
        'Get the real Wecandeo embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Wecandeo URL formats and content types.'
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
      question: 'How do I embed Wecandeo content on my website?',
      answer: 'Paste any Wecandeo URL into the tool and click Generate.'
    },
    {
      question: 'Is the Wecandeo embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Wecandeo content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
