import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Audioboom',
  slug: 'audioboom',
  color: '#666666',
  exampleUrl: 'https://audioboom.com',
  metaTitle: 'Audioboom Embed Code Generator — Embed Audioboom Content',
  metaDescription:
    'Free Audioboom embed code generator. Paste any Audioboom URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed audioboom',
    'audioboom embed code',
    'audioboom embed generator'
  ],
  heroTitle: 'Audioboom Embed Code Generator',
  heroSubtitle:
    'Paste any Audioboom URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Audioboom content',
  howItWorksSteps: [
    {
      title: 'Paste a Audioboom link',
      description: 'Copy any audioboom.com URL.'
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
  explanationHeading: 'Why use our Audioboom embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Audioboom link and get working embed HTML.'
    },
    {
      title: 'Audioboom content',
      description: 'The tool handles all Audioboom URL formats.'
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
        'Get the real Audioboom embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Audioboom URL formats and content types.'
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
      question: 'How do I embed Audioboom content on my website?',
      answer: 'Paste any Audioboom URL into the tool and click Generate.'
    },
    {
      question: 'Is the Audioboom embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Audioboom content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
