import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Juntos',
  slug: 'juntos',
  color: '#666666',
  exampleUrl: 'https://juntos.live',
  metaTitle: 'Juntos Embed Code Generator — Embed Juntos Content',
  metaDescription:
    'Free Juntos embed code generator. Paste any Juntos URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed juntos', 'juntos embed code', 'juntos embed generator'],
  heroTitle: 'Juntos Embed Code Generator',
  heroSubtitle:
    'Paste any Juntos URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Juntos content',
  howItWorksSteps: [
    { title: 'Paste a Juntos link', description: 'Copy any juntos.live URL.' },
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
  explanationHeading: 'Why use our Juntos embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Juntos link and get working embed HTML.'
    },
    {
      title: 'Juntos content',
      description: 'The tool handles all Juntos URL formats.'
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
        'Get the real Juntos embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Juntos URL formats and content types.'
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
      question: 'How do I embed Juntos content on my website?',
      answer: 'Paste any Juntos URL into the tool and click Generate.'
    },
    {
      question: 'Is the Juntos embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Juntos content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
