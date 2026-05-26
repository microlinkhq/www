import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'RadioPublic',
  slug: 'radiopublic',
  color: '#CE262F',
  exampleUrl: 'https://radiopublic.com',
  metaTitle: 'RadioPublic Embed Code Generator — Embed Podcast episodes',
  metaDescription:
    'Free RadioPublic embed code generator. Paste any RadioPublic URL — get a ready-to-paste embed for podcast episodes. No signup.',
  keywords: [
    'embed radiopublic',
    'radiopublic embed code',
    'radiopublic podcast embed'
  ],
  heroTitle: 'RadioPublic Embed Code Generator',
  heroSubtitle:
    'Paste any RadioPublic URL — get a ready-to-paste embed for podcast episodes.',
  howItWorksHeading: 'How to embed RadioPublic content',
  howItWorksSteps: [
    {
      title: 'Paste a RadioPublic link',
      description: 'Copy any radiopublic.com URL — podcast episodes.'
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
  explanationHeading: 'Why use our RadioPublic embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any RadioPublic link and get working embed HTML.'
    },
    {
      title: 'All RadioPublic content',
      description:
        'Works with podcast episodes — the tool handles all RadioPublic URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 RadioPublic embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real RadioPublic embed with full interactivity when available.'
    },
    {
      title: 'All podcast episodes',
      description:
        'Works with podcast episodes — all RadioPublic content types.'
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
      question: 'How do I embed RadioPublic content on my website?',
      answer:
        'Paste any RadioPublic URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the RadioPublic embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the RadioPublic content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
