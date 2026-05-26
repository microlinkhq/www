import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Namchey',
  slug: 'namchey',
  color: '#666666',
  exampleUrl: 'https://namchey.com',
  metaTitle: 'Namchey Embed Code Generator — Embed Namchey Content',
  metaDescription:
    'Free Namchey embed code generator. Paste any Namchey URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed namchey', 'namchey embed code', 'namchey embed generator'],
  heroTitle: 'Namchey Embed Code Generator',
  heroSubtitle:
    'Paste any Namchey URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Namchey content',
  howItWorksSteps: [
    { title: 'Paste a Namchey link', description: 'Copy any namchey.com URL.' },
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
  explanationHeading: 'Why use our Namchey embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Namchey link and get working embed HTML.'
    },
    {
      title: 'Namchey content',
      description: 'The tool handles all Namchey URL formats.'
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
        'Get the real Namchey embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Namchey URL formats and content types.'
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
      question: 'How do I embed Namchey content on my website?',
      answer: 'Paste any Namchey URL into the tool and click Generate.'
    },
    {
      question: 'Is the Namchey embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Namchey content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
