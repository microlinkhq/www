import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Kidoju',
  slug: 'kidoju',
  color: '#666666',
  exampleUrl: 'https://kidoju.com',
  metaTitle: 'Kidoju Embed Code Generator — Embed Kidoju Content',
  metaDescription:
    'Free Kidoju embed code generator. Paste any Kidoju URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed kidoju', 'kidoju embed code', 'kidoju embed generator'],
  heroTitle: 'Kidoju Embed Code Generator',
  heroSubtitle:
    'Paste any Kidoju URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Kidoju content',
  howItWorksSteps: [
    { title: 'Paste a Kidoju link', description: 'Copy any kidoju.com URL.' },
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
  explanationHeading: 'Why use our Kidoju embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Kidoju link and get working embed HTML.'
    },
    {
      title: 'Kidoju content',
      description: 'The tool handles all Kidoju URL formats.'
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
        'Get the real Kidoju embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Kidoju URL formats and content types.'
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
      question: 'How do I embed Kidoju content on my website?',
      answer: 'Paste any Kidoju URL into the tool and click Generate.'
    },
    {
      question: 'Is the Kidoju embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Kidoju content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
