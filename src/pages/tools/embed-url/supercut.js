import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Supercut',
  slug: 'supercut',
  color: '#666666',
  exampleUrl: 'https://supercut.video',
  metaTitle: 'Supercut Embed Code Generator — Embed Supercut Content',
  metaDescription:
    'Free Supercut embed code generator. Paste any Supercut URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed supercut',
    'supercut embed code',
    'supercut embed generator'
  ],
  heroTitle: 'Supercut Embed Code Generator',
  heroSubtitle:
    'Paste any Supercut URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Supercut content',
  howItWorksSteps: [
    {
      title: 'Paste a Supercut link',
      description: 'Copy any supercut.video URL.'
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
  explanationHeading: 'Why use our Supercut embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Supercut link and get working embed HTML.'
    },
    {
      title: 'Supercut content',
      description: 'The tool handles all Supercut URL formats.'
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
        'Get the real Supercut embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Supercut URL formats and content types.'
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
      question: 'How do I embed Supercut content on my website?',
      answer: 'Paste any Supercut URL into the tool and click Generate.'
    },
    {
      question: 'Is the Supercut embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Supercut content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
