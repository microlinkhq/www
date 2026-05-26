import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Yumpu',
  slug: 'yumpu',
  color: '#D72E26',
  exampleUrl: 'https://yumpu.com',
  metaTitle:
    'Yumpu Embed Code Generator — Embed Digital publications and flipbooks',
  metaDescription:
    'Free Yumpu embed code generator. Paste any Yumpu URL — get a ready-to-paste embed for digital publications and flipbooks. No signup.',
  keywords: ['embed yumpu', 'yumpu embed code', 'yumpu flipbook embed'],
  heroTitle: 'Yumpu Embed Code Generator',
  heroSubtitle:
    'Paste any Yumpu URL — get a ready-to-paste embed for digital publications and flipbooks.',
  howItWorksHeading: 'How to embed Yumpu content',
  howItWorksSteps: [
    {
      title: 'Paste a Yumpu link',
      description:
        'Copy any yumpu.com URL — digital publications and flipbooks.'
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
  explanationHeading: 'Why use our Yumpu embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Yumpu link and get working embed HTML.'
    },
    {
      title: 'All Yumpu content',
      description:
        'Works with digital publications and flipbooks — the tool handles all Yumpu URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Yumpu embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Yumpu embed with full interactivity when available.'
    },
    {
      title: 'All digital publications and flipbooks',
      description:
        'Works with digital publications and flipbooks — all Yumpu content types.'
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
      question: 'How do I embed Yumpu content on my website?',
      answer:
        'Paste any Yumpu URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Yumpu embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Yumpu content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
