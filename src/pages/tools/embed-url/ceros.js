import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Ceros',
  slug: 'ceros',
  color: '#666666',
  exampleUrl: 'https://ceros.com',
  metaTitle: 'Ceros Embed Code Generator — Embed Ceros Content',
  metaDescription:
    'Free Ceros embed code generator. Paste any Ceros URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed ceros', 'ceros embed code', 'ceros embed generator'],
  heroTitle: 'Ceros Embed Code Generator',
  heroSubtitle:
    'Paste any Ceros URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Ceros content',
  howItWorksSteps: [
    { title: 'Paste a Ceros link', description: 'Copy any ceros.com URL.' },
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
  explanationHeading: 'Why use our Ceros embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Ceros link and get working embed HTML.'
    },
    {
      title: 'Ceros content',
      description: 'The tool handles all Ceros URL formats.'
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
        'Get the real Ceros embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Ceros URL formats and content types.'
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
      question: 'How do I embed Ceros content on my website?',
      answer: 'Paste any Ceros URL into the tool and click Generate.'
    },
    {
      question: 'Is the Ceros embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Ceros content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
