import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Ludus',
  slug: 'ludus',
  color: '#2A2A2A',
  exampleUrl: 'https://ludus.one',
  metaTitle: 'Ludus Embed Code Generator — Embed Presentations and decks',
  metaDescription:
    'Free Ludus embed code generator. Paste any Ludus URL — get a ready-to-paste embed for presentations and decks. No signup.',
  keywords: ['embed ludus', 'ludus embed code', 'ludus presentation embed'],
  heroTitle: 'Ludus Embed Code Generator',
  heroSubtitle:
    'Paste any Ludus URL — get a ready-to-paste embed for presentations and decks.',
  howItWorksHeading: 'How to embed Ludus content',
  howItWorksSteps: [
    {
      title: 'Paste a Ludus link',
      description: 'Copy any ludus.one URL — presentations and decks.'
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
  explanationHeading: 'Why use our Ludus embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Ludus link and get working embed HTML.'
    },
    {
      title: 'All Ludus content',
      description:
        'Works with presentations and decks — the tool handles all Ludus URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Ludus embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Ludus embed with full interactivity when available.'
    },
    {
      title: 'All presentations and decks',
      description:
        'Works with presentations and decks — all Ludus content types.'
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
      question: 'How do I embed Ludus content on my website?',
      answer:
        'Paste any Ludus URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Ludus embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Ludus content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
