import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Plusdocs',
  slug: 'plusdocs',
  color: '#666666',
  exampleUrl: 'https://plusdocs.com',
  metaTitle: 'Plusdocs Embed Code Generator — Embed Plusdocs Content',
  metaDescription:
    'Free Plusdocs embed code generator. Paste any Plusdocs URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed plusdocs',
    'plusdocs embed code',
    'plusdocs embed generator'
  ],
  heroTitle: 'Plusdocs Embed Code Generator',
  heroSubtitle:
    'Paste any Plusdocs URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Plusdocs content',
  howItWorksSteps: [
    {
      title: 'Paste a Plusdocs link',
      description: 'Copy any plusdocs.com URL.'
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
  explanationHeading: 'Why use our Plusdocs embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Plusdocs link and get working embed HTML.'
    },
    {
      title: 'Plusdocs content',
      description: 'The tool handles all Plusdocs URL formats.'
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
        'Get the real Plusdocs embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Plusdocs URL formats and content types.'
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
      question: 'How do I embed Plusdocs content on my website?',
      answer: 'Paste any Plusdocs URL into the tool and click Generate.'
    },
    {
      question: 'Is the Plusdocs embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Plusdocs content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
