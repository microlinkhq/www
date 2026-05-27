import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Homey',
  slug: 'homey',
  color: '#666666',
  exampleUrl: 'https://homey.app',
  metaTitle: 'Homey Embed Code Generator — Embed Homey Content',
  metaDescription:
    'Free Homey embed code generator. Paste any Homey URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed homey', 'homey embed code', 'homey embed generator'],
  heroTitle: 'Homey Embed Code Generator',
  heroSubtitle:
    'Paste any Homey URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Homey content',
  howItWorksSteps: [
    { title: 'Paste a Homey link', description: 'Copy any homey.app URL.' },
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
  explanationHeading: 'Why use our Homey embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Homey link and get working embed HTML.'
    },
    {
      title: 'Homey content',
      description: 'The tool handles all Homey URL formats.'
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
        'Get the real Homey embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Homey URL formats and content types.'
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
      question: 'How do I embed Homey content on my website?',
      answer: 'Paste any Homey URL into the tool and click Generate.'
    },
    {
      question: 'Is the Homey embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Homey content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
