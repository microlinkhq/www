import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'RunKit',
  slug: 'runkit',
  color: '#491F59',
  exampleUrl: 'https://runkit.com',
  metaTitle: 'RunKit Embed Code Generator — Embed Code notebooks',
  metaDescription:
    'Free RunKit embed code generator. Paste any RunKit URL — get a ready-to-paste embed for code notebooks. No signup.',
  keywords: ['embed runkit', 'runkit embed code', 'runkit notebook embed'],
  heroTitle: 'RunKit Embed Code Generator',
  heroSubtitle:
    'Paste any RunKit URL — get a ready-to-paste embed for code notebooks.',
  howItWorksHeading: 'How to embed RunKit content',
  howItWorksSteps: [
    {
      title: 'Paste a RunKit link',
      description: 'Copy any runkit.com URL — code notebooks.'
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
  explanationHeading: 'Why use our RunKit embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any RunKit link and get working embed HTML.'
    },
    {
      title: 'All RunKit content',
      description:
        'Works with code notebooks — the tool handles all RunKit URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 RunKit embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real RunKit embed with full interactivity when available.'
    },
    {
      title: 'All code notebooks',
      description: 'Works with code notebooks — all RunKit content types.'
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
      question: 'How do I embed RunKit content on my website?',
      answer:
        'Paste any RunKit URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the RunKit embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the RunKit content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
