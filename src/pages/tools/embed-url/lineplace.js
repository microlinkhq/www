import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Lineplace',
  slug: 'lineplace',
  color: '#666666',
  exampleUrl: 'https://lineplace.naver.com',
  metaTitle: 'Lineplace Embed Code Generator — Embed Lineplace Content',
  metaDescription:
    'Free Lineplace embed code generator. Paste any Lineplace URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed lineplace',
    'lineplace embed code',
    'lineplace embed generator'
  ],
  heroTitle: 'Lineplace Embed Code Generator',
  heroSubtitle:
    'Paste any Lineplace URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Lineplace content',
  howItWorksSteps: [
    {
      title: 'Paste a Lineplace link',
      description: 'Copy any lineplace.naver.com URL.'
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
  explanationHeading: 'Why use our Lineplace embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Lineplace link and get working embed HTML.'
    },
    {
      title: 'Lineplace content',
      description: 'The tool handles all Lineplace URL formats.'
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
        'Get the real Lineplace embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Lineplace URL formats and content types.'
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
      question: 'How do I embed Lineplace content on my website?',
      answer: 'Paste any Lineplace URL into the tool and click Generate.'
    },
    {
      question: 'Is the Lineplace embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Lineplace content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
