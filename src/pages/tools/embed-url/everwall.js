import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Everwall',
  slug: 'everwall',
  color: '#666666',
  exampleUrl: 'https://everwall.com',
  metaTitle: 'Everwall Embed Code Generator — Embed Everwall Content',
  metaDescription:
    'Free Everwall embed code generator. Paste any Everwall URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed everwall',
    'everwall embed code',
    'everwall embed generator'
  ],
  heroTitle: 'Everwall Embed Code Generator',
  heroSubtitle:
    'Paste any Everwall URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Everwall content',
  howItWorksSteps: [
    {
      title: 'Paste a Everwall link',
      description: 'Copy any everwall.com URL.'
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
  explanationHeading: 'Why use our Everwall embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Everwall link and get working embed HTML.'
    },
    {
      title: 'Everwall content',
      description: 'The tool handles all Everwall URL formats.'
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
        'Get the real Everwall embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Everwall URL formats and content types.'
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
      question: 'How do I embed Everwall content on my website?',
      answer: 'Paste any Everwall URL into the tool and click Generate.'
    },
    {
      question: 'Is the Everwall embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Everwall content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
