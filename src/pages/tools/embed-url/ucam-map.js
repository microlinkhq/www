import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Cambridge Map',
  slug: 'ucam-map',
  color: '#666666',
  exampleUrl: 'https://map.cam.ac.uk',
  metaTitle: 'Cambridge Map Embed Code Generator — Embed Cambridge Map Content',
  metaDescription:
    'Free Cambridge Map embed code generator. Paste any Cambridge Map URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed cambridge map',
    'cambridge map embed code',
    'cambridge map embed generator'
  ],
  heroTitle: 'Cambridge Map Embed Code Generator',
  heroSubtitle:
    'Paste any Cambridge Map URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Cambridge Map content',
  howItWorksSteps: [
    {
      title: 'Paste a Cambridge Map link',
      description: 'Copy any map.cam.ac.uk URL.'
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
  explanationHeading: 'Why use our Cambridge Map embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Cambridge Map link and get working embed HTML.'
    },
    {
      title: 'Cambridge Map content',
      description: 'The tool handles all Cambridge Map URL formats.'
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
        'Get the real Cambridge Map embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Cambridge Map URL formats and content types.'
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
      question: 'How do I embed Cambridge Map content on my website?',
      answer: 'Paste any Cambridge Map URL into the tool and click Generate.'
    },
    {
      question: 'Is the Cambridge Map embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Cambridge Map content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
