import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Gloriatv',
  slug: 'gloriatv',
  color: '#666666',
  exampleUrl: 'https://gloria.tv',
  metaTitle: 'Gloriatv Embed Code Generator — Embed Gloriatv Content',
  metaDescription:
    'Free Gloriatv embed code generator. Paste any Gloriatv URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed gloriatv',
    'gloriatv embed code',
    'gloriatv embed generator'
  ],
  heroTitle: 'Gloriatv Embed Code Generator',
  heroSubtitle:
    'Paste any Gloriatv URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Gloriatv content',
  howItWorksSteps: [
    { title: 'Paste a Gloriatv link', description: 'Copy any gloria.tv URL.' },
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
  explanationHeading: 'Why use our Gloriatv embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Gloriatv link and get working embed HTML.'
    },
    {
      title: 'Gloriatv content',
      description: 'The tool handles all Gloriatv URL formats.'
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
        'Get the real Gloriatv embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Gloriatv URL formats and content types.'
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
      question: 'How do I embed Gloriatv content on my website?',
      answer: 'Paste any Gloriatv URL into the tool and click Generate.'
    },
    {
      question: 'Is the Gloriatv embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Gloriatv content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
