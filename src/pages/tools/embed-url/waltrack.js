import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Waltrack',
  slug: 'waltrack',
  color: '#666666',
  exampleUrl: 'https://waltrack.net',
  metaTitle: 'Waltrack Embed Code Generator — Embed Waltrack Content',
  metaDescription:
    'Free Waltrack embed code generator. Paste any Waltrack URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed waltrack',
    'waltrack embed code',
    'waltrack embed generator'
  ],
  heroTitle: 'Waltrack Embed Code Generator',
  heroSubtitle:
    'Paste any Waltrack URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Waltrack content',
  howItWorksSteps: [
    {
      title: 'Paste a Waltrack link',
      description: 'Copy any waltrack.net URL.'
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
  explanationHeading: 'Why use our Waltrack embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Waltrack link and get working embed HTML.'
    },
    {
      title: 'Waltrack content',
      description: 'The tool handles all Waltrack URL formats.'
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
        'Get the real Waltrack embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Waltrack URL formats and content types.'
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
      question: 'How do I embed Waltrack content on my website?',
      answer: 'Paste any Waltrack URL into the tool and click Generate.'
    },
    {
      question: 'Is the Waltrack embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Waltrack content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
