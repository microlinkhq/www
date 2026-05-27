import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Redlof Medien',
  slug: 'redlof-medien',
  color: '#666666',
  exampleUrl: 'https://redlof.de',
  metaTitle: 'Redlof Medien Embed Code Generator — Embed Redlof Medien Content',
  metaDescription:
    'Free Redlof Medien embed code generator. Paste any Redlof Medien URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed redlof medien',
    'redlof medien embed code',
    'redlof medien embed generator'
  ],
  heroTitle: 'Redlof Medien Embed Code Generator',
  heroSubtitle:
    'Paste any Redlof Medien URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Redlof Medien content',
  howItWorksSteps: [
    {
      title: 'Paste a Redlof Medien link',
      description: 'Copy any redlof.de URL.'
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
  explanationHeading: 'Why use our Redlof Medien embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Redlof Medien link and get working embed HTML.'
    },
    {
      title: 'Redlof Medien content',
      description: 'The tool handles all Redlof Medien URL formats.'
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
        'Get the real Redlof Medien embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Redlof Medien URL formats and content types.'
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
      question: 'How do I embed Redlof Medien content on my website?',
      answer: 'Paste any Redlof Medien URL into the tool and click Generate.'
    },
    {
      question: 'Is the Redlof Medien embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Redlof Medien content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
