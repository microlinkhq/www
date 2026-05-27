import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Ustudio',
  slug: 'ustudio',
  color: '#666666',
  exampleUrl: 'https://ustudio.com',
  metaTitle: 'Ustudio Embed Code Generator — Embed Ustudio Content',
  metaDescription:
    'Free Ustudio embed code generator. Paste any Ustudio URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed ustudio', 'ustudio embed code', 'ustudio embed generator'],
  heroTitle: 'Ustudio Embed Code Generator',
  heroSubtitle:
    'Paste any Ustudio URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Ustudio content',
  howItWorksSteps: [
    { title: 'Paste a Ustudio link', description: 'Copy any ustudio.com URL.' },
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
  explanationHeading: 'Why use our Ustudio embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Ustudio link and get working embed HTML.'
    },
    {
      title: 'Ustudio content',
      description: 'The tool handles all Ustudio URL formats.'
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
        'Get the real Ustudio embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Ustudio URL formats and content types.'
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
      question: 'How do I embed Ustudio content on my website?',
      answer: 'Paste any Ustudio URL into the tool and click Generate.'
    },
    {
      question: 'Is the Ustudio embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Ustudio content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
