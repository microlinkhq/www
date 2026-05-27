import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Archivos',
  slug: 'archivos',
  color: '#666666',
  exampleUrl: 'https://app.archivos.digital',
  metaTitle: 'Archivos Embed Code Generator — Embed Archivos Content',
  metaDescription:
    'Free Archivos embed code generator. Paste any Archivos URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed archivos',
    'archivos embed code',
    'archivos embed generator'
  ],
  heroTitle: 'Archivos Embed Code Generator',
  heroSubtitle:
    'Paste any Archivos URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Archivos content',
  howItWorksSteps: [
    {
      title: 'Paste a Archivos link',
      description: 'Copy any app.archivos.digital URL.'
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
  explanationHeading: 'Why use our Archivos embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Archivos link and get working embed HTML.'
    },
    {
      title: 'Archivos content',
      description: 'The tool handles all Archivos URL formats.'
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
        'Get the real Archivos embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Archivos URL formats and content types.'
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
      question: 'How do I embed Archivos content on my website?',
      answer: 'Paste any Archivos URL into the tool and click Generate.'
    },
    {
      question: 'Is the Archivos embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Archivos content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
