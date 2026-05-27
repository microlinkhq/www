import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Zoomable',
  slug: 'zoomable',
  color: '#666666',
  exampleUrl: 'https://zoomable.ca',
  metaTitle: 'Zoomable Embed Code Generator — Embed Zoomable Content',
  metaDescription:
    'Free Zoomable embed code generator. Paste any Zoomable URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed zoomable',
    'zoomable embed code',
    'zoomable embed generator'
  ],
  heroTitle: 'Zoomable Embed Code Generator',
  heroSubtitle:
    'Paste any Zoomable URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Zoomable content',
  howItWorksSteps: [
    {
      title: 'Paste a Zoomable link',
      description: 'Copy any zoomable.ca URL.'
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
  explanationHeading: 'Why use our Zoomable embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Zoomable link and get working embed HTML.'
    },
    {
      title: 'Zoomable content',
      description: 'The tool handles all Zoomable URL formats.'
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
        'Get the real Zoomable embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Zoomable URL formats and content types.'
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
      question: 'How do I embed Zoomable content on my website?',
      answer: 'Paste any Zoomable URL into the tool and click Generate.'
    },
    {
      question: 'Is the Zoomable embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Zoomable content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
