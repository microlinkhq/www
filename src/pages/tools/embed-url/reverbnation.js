import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'ReverbNation',
  slug: 'reverbnation',
  color: '#E43526',
  exampleUrl: 'https://reverbnation.com',
  metaTitle: 'ReverbNation Embed Code Generator — Embed Songs and artist pages',
  metaDescription:
    'Free ReverbNation embed code generator. Paste any ReverbNation URL — get a ready-to-paste embed for songs and artist pages. No signup.',
  keywords: [
    'embed reverbnation',
    'reverbnation embed code',
    'reverbnation player embed'
  ],
  heroTitle: 'ReverbNation Embed Code Generator',
  heroSubtitle:
    'Paste any ReverbNation URL — get a ready-to-paste embed for songs and artist pages.',
  howItWorksHeading: 'How to embed ReverbNation content',
  howItWorksSteps: [
    {
      title: 'Paste a ReverbNation link',
      description: 'Copy any reverbnation.com URL — songs and artist pages.'
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
  explanationHeading: 'Why use our ReverbNation embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any ReverbNation link and get working embed HTML.'
    },
    {
      title: 'All ReverbNation content',
      description:
        'Works with songs and artist pages — the tool handles all ReverbNation URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 ReverbNation embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real ReverbNation embed with full interactivity when available.'
    },
    {
      title: 'All songs and artist pages',
      description:
        'Works with songs and artist pages — all ReverbNation content types.'
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
      question: 'How do I embed ReverbNation content on my website?',
      answer:
        'Paste any ReverbNation URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the ReverbNation embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the ReverbNation content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
