import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Form-Data',
  slug: 'form-data',
  color: '#666666',
  exampleUrl: 'https://form-data.com',
  metaTitle: 'Form-Data Embed Code Generator — Embed Form-Data Content',
  metaDescription:
    'Free Form-Data embed code generator. Paste any Form-Data URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed form-data',
    'form-data embed code',
    'form-data embed generator'
  ],
  heroTitle: 'Form-Data Embed Code Generator',
  heroSubtitle:
    'Paste any Form-Data URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Form-Data content',
  howItWorksSteps: [
    {
      title: 'Paste a Form-Data link',
      description: 'Copy any form-data.com URL.'
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
  explanationHeading: 'Why use our Form-Data embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Form-Data link and get working embed HTML.'
    },
    {
      title: 'Form-Data content',
      description: 'The tool handles all Form-Data URL formats.'
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
        'Get the real Form-Data embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Form-Data URL formats and content types.'
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
      question: 'How do I embed Form-Data content on my website?',
      answer: 'Paste any Form-Data URL into the tool and click Generate.'
    },
    {
      question: 'Is the Form-Data embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Form-Data content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
