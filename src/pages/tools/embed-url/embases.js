import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Embases',
  slug: 'embases',
  color: '#666666',
  exampleUrl: 'https://embases.com',
  metaTitle: 'Embases Embed Code Generator — Embed Embases Content',
  metaDescription:
    'Free Embases embed code generator. Paste any Embases URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed embases', 'embases embed code', 'embases embed generator'],
  heroTitle: 'Embases Embed Code Generator',
  heroSubtitle:
    'Paste any Embases URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Embases content',
  howItWorksSteps: [
    { title: 'Paste a Embases link', description: 'Copy any embases.com URL.' },
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
  explanationHeading: 'Why use our Embases embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Embases link and get working embed HTML.'
    },
    {
      title: 'Embases content',
      description: 'The tool handles all Embases URL formats.'
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
        'Get the real Embases embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Embases URL formats and content types.'
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
      question: 'How do I embed Embases content on my website?',
      answer: 'Paste any Embases URL into the tool and click Generate.'
    },
    {
      question: 'Is the Embases embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Embases content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
