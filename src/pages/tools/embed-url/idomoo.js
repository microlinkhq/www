import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Idomoo',
  slug: 'idomoo',
  color: '#666666',
  exampleUrl: 'https://idomoo.com',
  metaTitle: 'Idomoo Embed Code Generator — Embed Idomoo Content',
  metaDescription:
    'Free Idomoo embed code generator. Paste any Idomoo URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed idomoo', 'idomoo embed code', 'idomoo embed generator'],
  heroTitle: 'Idomoo Embed Code Generator',
  heroSubtitle:
    'Paste any Idomoo URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Idomoo content',
  howItWorksSteps: [
    { title: 'Paste a Idomoo link', description: 'Copy any idomoo.com URL.' },
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
  explanationHeading: 'Why use our Idomoo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Idomoo link and get working embed HTML.'
    },
    {
      title: 'Idomoo content',
      description: 'The tool handles all Idomoo URL formats.'
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
        'Get the real Idomoo embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Idomoo URL formats and content types.'
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
      question: 'How do I embed Idomoo content on my website?',
      answer: 'Paste any Idomoo URL into the tool and click Generate.'
    },
    {
      question: 'Is the Idomoo embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Idomoo content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
