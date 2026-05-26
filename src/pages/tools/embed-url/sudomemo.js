import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Sudomemo',
  slug: 'sudomemo',
  color: '#666666',
  exampleUrl: 'https://sudomemo.net',
  metaTitle: 'Sudomemo Embed Code Generator — Embed Sudomemo Content',
  metaDescription:
    'Free Sudomemo embed code generator. Paste any Sudomemo URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed sudomemo',
    'sudomemo embed code',
    'sudomemo embed generator'
  ],
  heroTitle: 'Sudomemo Embed Code Generator',
  heroSubtitle:
    'Paste any Sudomemo URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Sudomemo content',
  howItWorksSteps: [
    {
      title: 'Paste a Sudomemo link',
      description: 'Copy any sudomemo.net URL.'
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
  explanationHeading: 'Why use our Sudomemo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Sudomemo link and get working embed HTML.'
    },
    {
      title: 'Sudomemo content',
      description: 'The tool handles all Sudomemo URL formats.'
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
        'Get the real Sudomemo embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Sudomemo URL formats and content types.'
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
      question: 'How do I embed Sudomemo content on my website?',
      answer: 'Paste any Sudomemo URL into the tool and click Generate.'
    },
    {
      question: 'Is the Sudomemo embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Sudomemo content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
