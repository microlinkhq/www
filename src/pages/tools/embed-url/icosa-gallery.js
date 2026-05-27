import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Icosa Gallery',
  slug: 'icosa-gallery',
  color: '#666666',
  exampleUrl: 'https://icosa.gallery',
  metaTitle: 'Icosa Gallery Embed Code Generator — Embed Icosa Gallery Content',
  metaDescription:
    'Free Icosa Gallery embed code generator. Paste any Icosa Gallery URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed icosa gallery',
    'icosa gallery embed code',
    'icosa gallery embed generator'
  ],
  heroTitle: 'Icosa Gallery Embed Code Generator',
  heroSubtitle:
    'Paste any Icosa Gallery URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Icosa Gallery content',
  howItWorksSteps: [
    {
      title: 'Paste a Icosa Gallery link',
      description: 'Copy any icosa.gallery URL.'
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
  explanationHeading: 'Why use our Icosa Gallery embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Icosa Gallery link and get working embed HTML.'
    },
    {
      title: 'Icosa Gallery content',
      description: 'The tool handles all Icosa Gallery URL formats.'
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
        'Get the real Icosa Gallery embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Icosa Gallery URL formats and content types.'
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
      question: 'How do I embed Icosa Gallery content on my website?',
      answer: 'Paste any Icosa Gallery URL into the tool and click Generate.'
    },
    {
      question: 'Is the Icosa Gallery embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Icosa Gallery content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
