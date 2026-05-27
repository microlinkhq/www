import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Sendtonews',
  slug: 'sendtonews',
  color: '#666666',
  exampleUrl: 'https://sendtonews.com',
  metaTitle: 'Sendtonews Embed Code Generator — Embed Sendtonews Content',
  metaDescription:
    'Free Sendtonews embed code generator. Paste any Sendtonews URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed sendtonews',
    'sendtonews embed code',
    'sendtonews embed generator'
  ],
  heroTitle: 'Sendtonews Embed Code Generator',
  heroSubtitle:
    'Paste any Sendtonews URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Sendtonews content',
  howItWorksSteps: [
    {
      title: 'Paste a Sendtonews link',
      description: 'Copy any sendtonews.com URL.'
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
  explanationHeading: 'Why use our Sendtonews embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Sendtonews link and get working embed HTML.'
    },
    {
      title: 'Sendtonews content',
      description: 'The tool handles all Sendtonews URL formats.'
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
        'Get the real Sendtonews embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Sendtonews URL formats and content types.'
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
      question: 'How do I embed Sendtonews content on my website?',
      answer: 'Paste any Sendtonews URL into the tool and click Generate.'
    },
    {
      question: 'Is the Sendtonews embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Sendtonews content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
