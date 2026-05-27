import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Amtraker',
  slug: 'amtraker',
  color: '#666666',
  exampleUrl: 'https://amtraker.com',
  metaTitle: 'Amtraker Embed Code Generator — Embed Amtraker Content',
  metaDescription:
    'Free Amtraker embed code generator. Paste any Amtraker URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed amtraker',
    'amtraker embed code',
    'amtraker embed generator'
  ],
  heroTitle: 'Amtraker Embed Code Generator',
  heroSubtitle:
    'Paste any Amtraker URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Amtraker content',
  howItWorksSteps: [
    {
      title: 'Paste a Amtraker link',
      description: 'Copy any amtraker.com URL.'
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
  explanationHeading: 'Why use our Amtraker embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Amtraker link and get working embed HTML.'
    },
    {
      title: 'Amtraker content',
      description: 'The tool handles all Amtraker URL formats.'
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
        'Get the real Amtraker embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Amtraker URL formats and content types.'
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
      question: 'How do I embed Amtraker content on my website?',
      answer: 'Paste any Amtraker URL into the tool and click Generate.'
    },
    {
      question: 'Is the Amtraker embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Amtraker content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
