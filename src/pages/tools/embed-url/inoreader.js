import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Inoreader',
  slug: 'inoreader',
  color: '#666666',
  exampleUrl: 'https://inoreader.com',
  metaTitle: 'Inoreader Embed Code Generator — Embed Inoreader Content',
  metaDescription:
    'Free Inoreader embed code generator. Paste any Inoreader URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed inoreader',
    'inoreader embed code',
    'inoreader embed generator'
  ],
  heroTitle: 'Inoreader Embed Code Generator',
  heroSubtitle:
    'Paste any Inoreader URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Inoreader content',
  howItWorksSteps: [
    {
      title: 'Paste a Inoreader link',
      description: 'Copy any inoreader.com URL.'
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
  explanationHeading: 'Why use our Inoreader embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Inoreader link and get working embed HTML.'
    },
    {
      title: 'Inoreader content',
      description: 'The tool handles all Inoreader URL formats.'
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
        'Get the real Inoreader embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Inoreader URL formats and content types.'
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
      question: 'How do I embed Inoreader content on my website?',
      answer: 'Paste any Inoreader URL into the tool and click Generate.'
    },
    {
      question: 'Is the Inoreader embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Inoreader content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
