import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Embedery',
  slug: 'embedery',
  color: '#666666',
  exampleUrl: 'https://embedery.com',
  metaTitle: 'Embedery Embed Code Generator — Embed Embedery Content',
  metaDescription:
    'Free Embedery embed code generator. Paste any Embedery URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed embedery',
    'embedery embed code',
    'embedery embed generator'
  ],
  heroTitle: 'Embedery Embed Code Generator',
  heroSubtitle:
    'Paste any Embedery URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Embedery content',
  howItWorksSteps: [
    {
      title: 'Paste a Embedery link',
      description: 'Copy any embedery.com URL.'
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
  explanationHeading: 'Why use our Embedery embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Embedery link and get working embed HTML.'
    },
    {
      title: 'Embedery content',
      description: 'The tool handles all Embedery URL formats.'
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
        'Get the real Embedery embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Embedery URL formats and content types.'
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
      question: 'How do I embed Embedery content on my website?',
      answer: 'Paste any Embedery URL into the tool and click Generate.'
    },
    {
      question: 'Is the Embedery embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Embedery content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
