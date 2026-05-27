import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Mybeweeg',
  slug: 'mybeweeg',
  color: '#666666',
  exampleUrl: 'https://mybeweeg.com',
  metaTitle: 'Mybeweeg Embed Code Generator — Embed Mybeweeg Content',
  metaDescription:
    'Free Mybeweeg embed code generator. Paste any Mybeweeg URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed mybeweeg',
    'mybeweeg embed code',
    'mybeweeg embed generator'
  ],
  heroTitle: 'Mybeweeg Embed Code Generator',
  heroSubtitle:
    'Paste any Mybeweeg URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Mybeweeg content',
  howItWorksSteps: [
    {
      title: 'Paste a Mybeweeg link',
      description: 'Copy any mybeweeg.com URL.'
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
  explanationHeading: 'Why use our Mybeweeg embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Mybeweeg link and get working embed HTML.'
    },
    {
      title: 'Mybeweeg content',
      description: 'The tool handles all Mybeweeg URL formats.'
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
        'Get the real Mybeweeg embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Mybeweeg URL formats and content types.'
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
      question: 'How do I embed Mybeweeg content on my website?',
      answer: 'Paste any Mybeweeg URL into the tool and click Generate.'
    },
    {
      question: 'Is the Mybeweeg embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Mybeweeg content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
