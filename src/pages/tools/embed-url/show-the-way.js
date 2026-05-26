import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Show the Way',
  slug: 'show-the-way',
  color: '#666666',
  exampleUrl: 'https://showtheway.io',
  metaTitle: 'Show the Way Embed Code Generator — Embed Show the Way Content',
  metaDescription:
    'Free Show the Way embed code generator. Paste any Show the Way URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed show the way',
    'show the way embed code',
    'show the way embed generator'
  ],
  heroTitle: 'Show the Way Embed Code Generator',
  heroSubtitle:
    'Paste any Show the Way URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Show the Way content',
  howItWorksSteps: [
    {
      title: 'Paste a Show the Way link',
      description: 'Copy any showtheway.io URL.'
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
  explanationHeading: 'Why use our Show the Way embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Show the Way link and get working embed HTML.'
    },
    {
      title: 'Show the Way content',
      description: 'The tool handles all Show the Way URL formats.'
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
        'Get the real Show the Way embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Show the Way URL formats and content types.'
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
      question: 'How do I embed Show the Way content on my website?',
      answer: 'Paste any Show the Way URL into the tool and click Generate.'
    },
    {
      question: 'Is the Show the Way embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Show the Way content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
