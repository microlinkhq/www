import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'iFixit',
  slug: 'ifixit',
  color: '#0071CE',
  exampleUrl: 'https://ifixit.com',
  metaTitle: 'iFixit Embed Code Generator — Embed Repair guides and teardowns',
  metaDescription:
    'Free iFixit embed code generator. Paste any iFixit URL — get a ready-to-paste embed for repair guides and teardowns. No signup.',
  keywords: ['embed ifixit', 'ifixit embed code', 'ifixit guide embed'],
  heroTitle: 'iFixit Embed Code Generator',
  heroSubtitle:
    'Paste any iFixit URL — get a ready-to-paste embed for repair guides and teardowns.',
  howItWorksHeading: 'How to embed iFixit content',
  howItWorksSteps: [
    {
      title: 'Paste a iFixit link',
      description: 'Copy any ifixit.com URL — repair guides and teardowns.'
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
  explanationHeading: 'Why use our iFixit embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any iFixit link and get working embed HTML.'
    },
    {
      title: 'All iFixit content',
      description:
        'Works with repair guides and teardowns — the tool handles all iFixit URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 iFixit embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real iFixit embed with full interactivity when available.'
    },
    {
      title: 'All repair guides and teardowns',
      description:
        'Works with repair guides and teardowns — all iFixit content types.'
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
      question: 'How do I embed iFixit content on my website?',
      answer:
        'Paste any iFixit URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the iFixit embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the iFixit content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
