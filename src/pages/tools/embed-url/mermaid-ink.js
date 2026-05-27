import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Mermaid Ink',
  slug: 'mermaid-ink',
  color: '#666666',
  exampleUrl: 'https://mermaid.ink',
  metaTitle: 'Mermaid Ink Embed Code Generator — Embed Mermaid Ink Content',
  metaDescription:
    'Free Mermaid Ink embed code generator. Paste any Mermaid Ink URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed mermaid ink',
    'mermaid ink embed code',
    'mermaid ink embed generator'
  ],
  heroTitle: 'Mermaid Ink Embed Code Generator',
  heroSubtitle:
    'Paste any Mermaid Ink URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Mermaid Ink content',
  howItWorksSteps: [
    {
      title: 'Paste a Mermaid Ink link',
      description: 'Copy any mermaid.ink URL.'
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
  explanationHeading: 'Why use our Mermaid Ink embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Mermaid Ink link and get working embed HTML.'
    },
    {
      title: 'Mermaid Ink content',
      description: 'The tool handles all Mermaid Ink URL formats.'
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
        'Get the real Mermaid Ink embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Mermaid Ink URL formats and content types.'
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
      question: 'How do I embed Mermaid Ink content on my website?',
      answer: 'Paste any Mermaid Ink URL into the tool and click Generate.'
    },
    {
      question: 'Is the Mermaid Ink embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Mermaid Ink content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
