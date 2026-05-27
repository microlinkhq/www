import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Smashnotes',
  slug: 'smashnotes',
  color: '#666666',
  exampleUrl: 'https://smashnotes.com',
  metaTitle: 'Smashnotes Embed Code Generator — Embed Smashnotes Content',
  metaDescription:
    'Free Smashnotes embed code generator. Paste any Smashnotes URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed smashnotes',
    'smashnotes embed code',
    'smashnotes embed generator'
  ],
  heroTitle: 'Smashnotes Embed Code Generator',
  heroSubtitle:
    'Paste any Smashnotes URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Smashnotes content',
  howItWorksSteps: [
    {
      title: 'Paste a Smashnotes link',
      description: 'Copy any smashnotes.com URL.'
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
  explanationHeading: 'Why use our Smashnotes embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Smashnotes link and get working embed HTML.'
    },
    {
      title: 'Smashnotes content',
      description: 'The tool handles all Smashnotes URL formats.'
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
        'Get the real Smashnotes embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Smashnotes URL formats and content types.'
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
      question: 'How do I embed Smashnotes content on my website?',
      answer: 'Paste any Smashnotes URL into the tool and click Generate.'
    },
    {
      question: 'Is the Smashnotes embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Smashnotes content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
