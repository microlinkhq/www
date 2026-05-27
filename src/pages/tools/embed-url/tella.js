import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Tella',
  slug: 'tella',
  color: '#666666',
  exampleUrl: 'https://tella.video',
  metaTitle: 'Tella Embed Code Generator — Embed Tella Content',
  metaDescription:
    'Free Tella embed code generator. Paste any Tella URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed tella', 'tella embed code', 'tella embed generator'],
  heroTitle: 'Tella Embed Code Generator',
  heroSubtitle:
    'Paste any Tella URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Tella content',
  howItWorksSteps: [
    { title: 'Paste a Tella link', description: 'Copy any tella.video URL.' },
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
  explanationHeading: 'Why use our Tella embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Tella link and get working embed HTML.'
    },
    {
      title: 'Tella content',
      description: 'The tool handles all Tella URL formats.'
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
        'Get the real Tella embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Tella URL formats and content types.'
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
      question: 'How do I embed Tella content on my website?',
      answer: 'Paste any Tella URL into the tool and click Generate.'
    },
    {
      question: 'Is the Tella embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Tella content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
