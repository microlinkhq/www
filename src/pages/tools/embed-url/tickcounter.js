import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'TickCounter',
  slug: 'tickcounter',
  color: '#666666',
  exampleUrl: 'https://tickcounter.com',
  metaTitle: 'TickCounter Embed Code Generator — Embed TickCounter Content',
  metaDescription:
    'Free TickCounter embed code generator. Paste any TickCounter URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed tickcounter',
    'tickcounter embed code',
    'tickcounter embed generator'
  ],
  heroTitle: 'TickCounter Embed Code Generator',
  heroSubtitle:
    'Paste any TickCounter URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed TickCounter content',
  howItWorksSteps: [
    {
      title: 'Paste a TickCounter link',
      description: 'Copy any tickcounter.com URL.'
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
  explanationHeading: 'Why use our TickCounter embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any TickCounter link and get working embed HTML.'
    },
    {
      title: 'TickCounter content',
      description: 'The tool handles all TickCounter URL formats.'
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
        'Get the real TickCounter embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all TickCounter URL formats and content types.'
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
      question: 'How do I embed TickCounter content on my website?',
      answer: 'Paste any TickCounter URL into the tool and click Generate.'
    },
    {
      question: 'Is the TickCounter embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the TickCounter content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
