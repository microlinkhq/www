import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Toornament',
  slug: 'toornament',
  color: '#666666',
  exampleUrl: 'https://toornament.com',
  metaTitle: 'Toornament Embed Code Generator — Embed Toornament Content',
  metaDescription:
    'Free Toornament embed code generator. Paste any Toornament URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed toornament',
    'toornament embed code',
    'toornament embed generator'
  ],
  heroTitle: 'Toornament Embed Code Generator',
  heroSubtitle:
    'Paste any Toornament URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Toornament content',
  howItWorksSteps: [
    {
      title: 'Paste a Toornament link',
      description: 'Copy any toornament.com URL.'
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
  explanationHeading: 'Why use our Toornament embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Toornament link and get working embed HTML.'
    },
    {
      title: 'Toornament content',
      description: 'The tool handles all Toornament URL formats.'
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
        'Get the real Toornament embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Toornament URL formats and content types.'
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
      question: 'How do I embed Toornament content on my website?',
      answer: 'Paste any Toornament URL into the tool and click Generate.'
    },
    {
      question: 'Is the Toornament embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Toornament content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
