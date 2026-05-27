import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Releasewire',
  slug: 'releasewire',
  color: '#666666',
  exampleUrl: 'https://releasewire.com',
  metaTitle: 'Releasewire Embed Code Generator — Embed Releasewire Content',
  metaDescription:
    'Free Releasewire embed code generator. Paste any Releasewire URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed releasewire',
    'releasewire embed code',
    'releasewire embed generator'
  ],
  heroTitle: 'Releasewire Embed Code Generator',
  heroSubtitle:
    'Paste any Releasewire URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Releasewire content',
  howItWorksSteps: [
    {
      title: 'Paste a Releasewire link',
      description: 'Copy any releasewire.com URL.'
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
  explanationHeading: 'Why use our Releasewire embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Releasewire link and get working embed HTML.'
    },
    {
      title: 'Releasewire content',
      description: 'The tool handles all Releasewire URL formats.'
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
        'Get the real Releasewire embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Releasewire URL formats and content types.'
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
      question: 'How do I embed Releasewire content on my website?',
      answer: 'Paste any Releasewire URL into the tool and click Generate.'
    },
    {
      question: 'Is the Releasewire embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Releasewire content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
