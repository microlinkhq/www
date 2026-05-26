import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SmugMug',
  slug: 'smugmug',
  color: '#6BB130',
  exampleUrl: 'https://smugmug.com',
  metaTitle: 'SmugMug Embed Code Generator — Embed Photos and galleries',
  metaDescription:
    'Free SmugMug embed code generator. Paste any SmugMug URL — get a ready-to-paste embed for photos and galleries. No signup.',
  keywords: ['embed smugmug', 'smugmug embed code', 'smugmug photo embed'],
  heroTitle: 'SmugMug Embed Code Generator',
  heroSubtitle:
    'Paste any SmugMug URL — get a ready-to-paste embed for photos and galleries.',
  howItWorksHeading: 'How to embed SmugMug content',
  howItWorksSteps: [
    {
      title: 'Paste a SmugMug link',
      description: 'Copy any smugmug.com URL — photos and galleries.'
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
  explanationHeading: 'Why use our SmugMug embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any SmugMug link and get working embed HTML.'
    },
    {
      title: 'All SmugMug content',
      description:
        'Works with photos and galleries — the tool handles all SmugMug URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 SmugMug embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real SmugMug embed with full interactivity when available.'
    },
    {
      title: 'All photos and galleries',
      description:
        'Works with photos and galleries — all SmugMug content types.'
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
      question: 'How do I embed SmugMug content on my website?',
      answer:
        'Paste any SmugMug URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the SmugMug embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the SmugMug content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
