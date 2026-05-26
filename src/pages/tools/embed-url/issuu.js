import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Issuu',
  slug: 'issuu',
  color: '#0071D1',
  exampleUrl: 'https://issuu.com',
  metaTitle: 'Issuu Embed Code Generator — Embed Publications',
  metaDescription:
    'Free Issuu embed code generator. Paste any Issuu URL — get a ready-to-paste embed for publications, magazines, and catalogs. No signup.',
  keywords: [
    'embed issuu',
    'issuu embed code',
    'issuu publication embed',
    'issuu flipbook embed'
  ],
  heroTitle: 'Issuu Embed Code Generator',
  heroSubtitle:
    'Paste any Issuu URL — get a ready-to-paste embed for publications, magazines, and catalogs.',
  howItWorksHeading: 'How to embed Issuu content',
  howItWorksSteps: [
    {
      title: 'Paste a Issuu link',
      description:
        'Copy any issuu.com URL — publications, magazines, and catalogs.'
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
  explanationHeading: 'Why use our Issuu embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Issuu link and get working embed HTML.'
    },
    {
      title: 'All Issuu content',
      description:
        'Works with publications, magazines, and catalogs — the tool handles all Issuu URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Issuu embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Issuu embed with full interactivity when available.'
    },
    {
      title: 'All publications',
      description:
        'Works with publications, magazines, and catalogs — all Issuu content types.'
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
      question: 'How do I embed Issuu content on my website?',
      answer:
        'Paste any Issuu URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Issuu embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Issuu content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
