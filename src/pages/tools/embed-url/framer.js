import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Framer',
  slug: 'framer',
  color: '#0055FF',
  exampleUrl: 'https://framer.com',
  metaTitle: 'Framer Embed Code Generator — Embed Prototypes and sites',
  metaDescription:
    'Free Framer embed code generator. Paste any Framer URL — get a ready-to-paste embed for prototypes and sites. No signup.',
  keywords: ['embed framer', 'framer embed code', 'framer prototype embed'],
  heroTitle: 'Framer Embed Code Generator',
  heroSubtitle:
    'Paste any Framer URL — get a ready-to-paste embed for prototypes and sites.',
  howItWorksHeading: 'How to embed Framer content',
  howItWorksSteps: [
    {
      title: 'Paste a Framer link',
      description: 'Copy any framer.com URL — prototypes and sites.'
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
  explanationHeading: 'Why use our Framer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Framer link and get working embed HTML.'
    },
    {
      title: 'All Framer content',
      description:
        'Works with prototypes and sites — the tool handles all Framer URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Framer embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Framer embed with full interactivity when available.'
    },
    {
      title: 'All prototypes and sites',
      description: 'Works with prototypes and sites — all Framer content types.'
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
      question: 'How do I embed Framer content on my website?',
      answer:
        'Paste any Framer URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Framer embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Framer content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
