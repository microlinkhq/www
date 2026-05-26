import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Zeplin',
  slug: 'zeplin',
  color: '#FDBD39',
  exampleUrl: 'https://zeplin.io',
  metaTitle:
    'Zeplin Embed Code Generator — Embed Design specs and style guides',
  metaDescription:
    'Free Zeplin embed code generator. Paste any Zeplin URL — get a ready-to-paste embed for design specs and style guides. No signup.',
  keywords: ['embed zeplin', 'zeplin embed code', 'zeplin design embed'],
  heroTitle: 'Zeplin Embed Code Generator',
  heroSubtitle:
    'Paste any Zeplin URL — get a ready-to-paste embed for design specs and style guides.',
  howItWorksHeading: 'How to embed Zeplin content',
  howItWorksSteps: [
    {
      title: 'Paste a Zeplin link',
      description: 'Copy any zeplin.io URL — design specs and style guides.'
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
  explanationHeading: 'Why use our Zeplin embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Zeplin link and get working embed HTML.'
    },
    {
      title: 'All Zeplin content',
      description:
        'Works with design specs and style guides — the tool handles all Zeplin URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Zeplin embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Zeplin embed with full interactivity when available.'
    },
    {
      title: 'All design specs and style guides',
      description:
        'Works with design specs and style guides — all Zeplin content types.'
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
      question: 'How do I embed Zeplin content on my website?',
      answer:
        'Paste any Zeplin URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Zeplin embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Zeplin content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
