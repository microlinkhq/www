import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Plinth',
  slug: 'plinth',
  color: '#666666',
  exampleUrl: 'https://plinth.io',
  metaTitle: 'Plinth Embed Code Generator — Embed Plinth Content',
  metaDescription:
    'Free Plinth embed code generator. Paste any Plinth URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed plinth', 'plinth embed code', 'plinth embed generator'],
  heroTitle: 'Plinth Embed Code Generator',
  heroSubtitle:
    'Paste any Plinth URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Plinth content',
  howItWorksSteps: [
    { title: 'Paste a Plinth link', description: 'Copy any plinth.io URL.' },
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
  explanationHeading: 'Why use our Plinth embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Plinth link and get working embed HTML.'
    },
    {
      title: 'Plinth content',
      description: 'The tool handles all Plinth URL formats.'
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
        'Get the real Plinth embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Plinth URL formats and content types.'
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
      question: 'How do I embed Plinth content on my website?',
      answer: 'Paste any Plinth URL into the tool and click Generate.'
    },
    {
      question: 'Is the Plinth embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Plinth content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
