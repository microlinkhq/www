import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'hearthis.at',
  slug: 'hearthis',
  color: '#666666',
  exampleUrl: 'https://hearthis.at',
  metaTitle: 'hearthis.at Embed Code Generator — Embed hearthis.at Content',
  metaDescription:
    'Free hearthis.at embed code generator. Paste any hearthis.at URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed hearthis.at',
    'hearthis.at embed code',
    'hearthis.at embed generator'
  ],
  heroTitle: 'hearthis.at Embed Code Generator',
  heroSubtitle:
    'Paste any hearthis.at URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed hearthis.at content',
  howItWorksSteps: [
    {
      title: 'Paste a hearthis.at link',
      description: 'Copy any hearthis.at URL.'
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
  explanationHeading: 'Why use our hearthis.at embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any hearthis.at link and get working embed HTML.'
    },
    {
      title: 'hearthis.at content',
      description: 'The tool handles all hearthis.at URL formats.'
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
        'Get the real hearthis.at embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all hearthis.at URL formats and content types.'
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
      question: 'How do I embed hearthis.at content on my website?',
      answer: 'Paste any hearthis.at URL into the tool and click Generate.'
    },
    {
      question: 'Is the hearthis.at embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the hearthis.at content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
