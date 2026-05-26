import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Meme',
  slug: 'meme',
  color: '#666666',
  exampleUrl: 'https://meme.com',
  metaTitle: 'Meme Embed Code Generator — Embed Meme Content',
  metaDescription:
    'Free Meme embed code generator. Paste any Meme URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed meme', 'meme embed code', 'meme embed generator'],
  heroTitle: 'Meme Embed Code Generator',
  heroSubtitle:
    'Paste any Meme URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Meme content',
  howItWorksSteps: [
    { title: 'Paste a Meme link', description: 'Copy any meme.com URL.' },
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
  explanationHeading: 'Why use our Meme embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Meme link and get working embed HTML.'
    },
    {
      title: 'Meme content',
      description: 'The tool handles all Meme URL formats.'
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
        'Get the real Meme embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Meme URL formats and content types.'
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
      question: 'How do I embed Meme content on my website?',
      answer: 'Paste any Meme URL into the tool and click Generate.'
    },
    {
      question: 'Is the Meme embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Meme content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
