import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Mathembed',
  slug: 'mathembed',
  color: '#666666',
  exampleUrl: 'https://mathembed.com',
  metaTitle: 'Mathembed Embed Code Generator — Embed Mathembed Content',
  metaDescription:
    'Free Mathembed embed code generator. Paste any Mathembed URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed mathembed',
    'mathembed embed code',
    'mathembed embed generator'
  ],
  heroTitle: 'Mathembed Embed Code Generator',
  heroSubtitle:
    'Paste any Mathembed URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Mathembed content',
  howItWorksSteps: [
    {
      title: 'Paste a Mathembed link',
      description: 'Copy any mathembed.com URL.'
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
  explanationHeading: 'Why use our Mathembed embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Mathembed link and get working embed HTML.'
    },
    {
      title: 'Mathembed content',
      description: 'The tool handles all Mathembed URL formats.'
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
        'Get the real Mathembed embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Mathembed URL formats and content types.'
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
      question: 'How do I embed Mathembed content on my website?',
      answer: 'Paste any Mathembed URL into the tool and click Generate.'
    },
    {
      question: 'Is the Mathembed embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Mathembed content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
