import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Roomshare',
  slug: 'roomshare',
  color: '#666666',
  exampleUrl: 'https://roomshare.jp',
  metaTitle: 'Roomshare Embed Code Generator — Embed Roomshare Content',
  metaDescription:
    'Free Roomshare embed code generator. Paste any Roomshare URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed roomshare',
    'roomshare embed code',
    'roomshare embed generator'
  ],
  heroTitle: 'Roomshare Embed Code Generator',
  heroSubtitle:
    'Paste any Roomshare URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Roomshare content',
  howItWorksSteps: [
    {
      title: 'Paste a Roomshare link',
      description: 'Copy any roomshare.jp URL.'
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
  explanationHeading: 'Why use our Roomshare embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Roomshare link and get working embed HTML.'
    },
    {
      title: 'Roomshare content',
      description: 'The tool handles all Roomshare URL formats.'
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
        'Get the real Roomshare embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Roomshare URL formats and content types.'
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
      question: 'How do I embed Roomshare content on my website?',
      answer: 'Paste any Roomshare URL into the tool and click Generate.'
    },
    {
      question: 'Is the Roomshare embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Roomshare content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
