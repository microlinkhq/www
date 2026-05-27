import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Odds',
  slug: 'odds',
  color: '#666666',
  exampleUrl: 'https://odds.com.au',
  metaTitle: 'Odds Embed Code Generator — Embed Odds Content',
  metaDescription:
    'Free Odds embed code generator. Paste any Odds URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed odds', 'odds embed code', 'odds embed generator'],
  heroTitle: 'Odds Embed Code Generator',
  heroSubtitle:
    'Paste any Odds URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Odds content',
  howItWorksSteps: [
    { title: 'Paste a Odds link', description: 'Copy any odds.com.au URL.' },
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
  explanationHeading: 'Why use our Odds embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Odds link and get working embed HTML.'
    },
    {
      title: 'Odds content',
      description: 'The tool handles all Odds URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description: 'Generate up to 50 embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Odds embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Odds URL formats and content types.'
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
      question: 'How do I embed Odds content on my website?',
      answer: 'Paste any Odds URL into the tool and click Generate.'
    },
    {
      question: 'Is the Odds embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Odds content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
