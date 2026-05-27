import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Gumlet',
  slug: 'gumlet',
  color: '#666666',
  exampleUrl: 'https://gumlet.com',
  metaTitle: 'Gumlet Embed Code Generator — Embed Gumlet Content',
  metaDescription:
    'Free Gumlet embed code generator. Paste any Gumlet URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed gumlet', 'gumlet embed code', 'gumlet embed generator'],
  heroTitle: 'Gumlet Embed Code Generator',
  heroSubtitle:
    'Paste any Gumlet URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Gumlet content',
  howItWorksSteps: [
    { title: 'Paste a Gumlet link', description: 'Copy any gumlet.com URL.' },
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
  explanationHeading: 'Why use our Gumlet embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Gumlet link and get working embed HTML.'
    },
    {
      title: 'Gumlet content',
      description: 'The tool handles all Gumlet URL formats.'
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
        'Get the real Gumlet embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Gumlet URL formats and content types.'
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
      question: 'How do I embed Gumlet content on my website?',
      answer: 'Paste any Gumlet URL into the tool and click Generate.'
    },
    {
      question: 'Is the Gumlet embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Gumlet content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
