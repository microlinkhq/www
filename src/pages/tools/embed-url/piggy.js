import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Piggy',
  slug: 'piggy',
  color: '#666666',
  exampleUrl: 'https://piggy.to',
  metaTitle: 'Piggy Embed Code Generator — Embed Piggy Content',
  metaDescription:
    'Free Piggy embed code generator. Paste any Piggy URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed piggy', 'piggy embed code', 'piggy embed generator'],
  heroTitle: 'Piggy Embed Code Generator',
  heroSubtitle:
    'Paste any Piggy URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Piggy content',
  howItWorksSteps: [
    { title: 'Paste a Piggy link', description: 'Copy any piggy.to URL.' },
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
  explanationHeading: 'Why use our Piggy embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Piggy link and get working embed HTML.'
    },
    {
      title: 'Piggy content',
      description: 'The tool handles all Piggy URL formats.'
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
        'Get the real Piggy embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Piggy URL formats and content types.'
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
      question: 'How do I embed Piggy content on my website?',
      answer: 'Paste any Piggy URL into the tool and click Generate.'
    },
    {
      question: 'Is the Piggy embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Piggy content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
