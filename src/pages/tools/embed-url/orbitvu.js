import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Orbitvu',
  slug: 'orbitvu',
  color: '#666666',
  exampleUrl: 'https://orbitvu.co',
  metaTitle: 'Orbitvu Embed Code Generator — Embed Orbitvu Content',
  metaDescription:
    'Free Orbitvu embed code generator. Paste any Orbitvu URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed orbitvu', 'orbitvu embed code', 'orbitvu embed generator'],
  heroTitle: 'Orbitvu Embed Code Generator',
  heroSubtitle:
    'Paste any Orbitvu URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Orbitvu content',
  howItWorksSteps: [
    { title: 'Paste a Orbitvu link', description: 'Copy any orbitvu.co URL.' },
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
  explanationHeading: 'Why use our Orbitvu embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Orbitvu link and get working embed HTML.'
    },
    {
      title: 'Orbitvu content',
      description: 'The tool handles all Orbitvu URL formats.'
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
        'Get the real Orbitvu embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Orbitvu URL formats and content types.'
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
      question: 'How do I embed Orbitvu content on my website?',
      answer: 'Paste any Orbitvu URL into the tool and click Generate.'
    },
    {
      question: 'Is the Orbitvu embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Orbitvu content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
