import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'They Said So',
  slug: 'they-said-so',
  color: '#666666',
  exampleUrl: 'https://theysaidso.com',
  metaTitle: 'They Said So Embed Code Generator — Embed They Said So Content',
  metaDescription:
    'Free They Said So embed code generator. Paste any They Said So URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed they said so',
    'they said so embed code',
    'they said so embed generator'
  ],
  heroTitle: 'They Said So Embed Code Generator',
  heroSubtitle:
    'Paste any They Said So URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed They Said So content',
  howItWorksSteps: [
    {
      title: 'Paste a They Said So link',
      description: 'Copy any theysaidso.com URL.'
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
  explanationHeading: 'Why use our They Said So embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any They Said So link and get working embed HTML.'
    },
    {
      title: 'They Said So content',
      description: 'The tool handles all They Said So URL formats.'
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
        'Get the real They Said So embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all They Said So URL formats and content types.'
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
      question: 'How do I embed They Said So content on my website?',
      answer: 'Paste any They Said So URL into the tool and click Generate.'
    },
    {
      question: 'Is the They Said So embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the They Said So content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
