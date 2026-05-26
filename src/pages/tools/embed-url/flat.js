import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Flat.io',
  slug: 'flat',
  color: '#3481F7',
  exampleUrl: 'https://flat.io',
  metaTitle: 'Flat.io Embed Code Generator — Embed Music scores and sheets',
  metaDescription:
    'Free Flat.io embed code generator. Paste any Flat.io URL — get a ready-to-paste embed for music scores and sheets. No signup.',
  keywords: [
    'embed flat.io',
    'flat embed code',
    'music score embed',
    'sheet music embed'
  ],
  heroTitle: 'Flat.io Embed Code Generator',
  heroSubtitle:
    'Paste any Flat.io URL — get a ready-to-paste embed for music scores and sheets.',
  howItWorksHeading: 'How to embed Flat.io content',
  howItWorksSteps: [
    {
      title: 'Paste a Flat.io link',
      description: 'Copy any flat.io URL — music scores and sheets.'
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
  explanationHeading: 'Why use our Flat.io embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Flat.io link and get working embed HTML.'
    },
    {
      title: 'All Flat.io content',
      description:
        'Works with music scores and sheets — the tool handles all Flat.io URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Flat.io embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Flat.io embed with full interactivity when available.'
    },
    {
      title: 'All music scores and sheets',
      description:
        'Works with music scores and sheets — all Flat.io content types.'
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
      question: 'How do I embed Flat.io content on my website?',
      answer:
        'Paste any Flat.io URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Flat.io embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Flat.io content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
