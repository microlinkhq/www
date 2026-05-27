import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Shared File',
  slug: 'shared-file-kappa',
  color: '#666666',
  exampleUrl: 'https://shared-file.com',
  metaTitle: 'Shared File Embed Code Generator — Embed Shared File Content',
  metaDescription:
    'Free Shared File embed code generator. Paste any Shared File URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed shared file',
    'shared file embed code',
    'shared file embed generator'
  ],
  heroTitle: 'Shared File Embed Code Generator',
  heroSubtitle:
    'Paste any Shared File URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Shared File content',
  howItWorksSteps: [
    {
      title: 'Paste a Shared File link',
      description: 'Copy any shared-file.com URL.'
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
  explanationHeading: 'Why use our Shared File embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Shared File link and get working embed HTML.'
    },
    {
      title: 'Shared File content',
      description: 'The tool handles all Shared File URL formats.'
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
        'Get the real Shared File embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Shared File URL formats and content types.'
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
      question: 'How do I embed Shared File content on my website?',
      answer: 'Paste any Shared File URL into the tool and click Generate.'
    },
    {
      question: 'Is the Shared File embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Shared File content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
