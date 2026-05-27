import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Getshow',
  slug: 'getshow',
  color: '#666666',
  exampleUrl: 'https://getshow.io',
  metaTitle: 'Getshow Embed Code Generator — Embed Getshow Content',
  metaDescription:
    'Free Getshow embed code generator. Paste any Getshow URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed getshow', 'getshow embed code', 'getshow embed generator'],
  heroTitle: 'Getshow Embed Code Generator',
  heroSubtitle:
    'Paste any Getshow URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Getshow content',
  howItWorksSteps: [
    { title: 'Paste a Getshow link', description: 'Copy any getshow.io URL.' },
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
  explanationHeading: 'Why use our Getshow embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Getshow link and get working embed HTML.'
    },
    {
      title: 'Getshow content',
      description: 'The tool handles all Getshow URL formats.'
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
        'Get the real Getshow embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Getshow URL formats and content types.'
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
      question: 'How do I embed Getshow content on my website?',
      answer: 'Paste any Getshow URL into the tool and click Generate.'
    },
    {
      question: 'Is the Getshow embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Getshow content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
