import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Kubit',
  slug: 'kubit',
  color: '#666666',
  exampleUrl: 'https://kubit.ai',
  metaTitle: 'Kubit Embed Code Generator — Embed Kubit Content',
  metaDescription:
    'Free Kubit embed code generator. Paste any Kubit URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed kubit', 'kubit embed code', 'kubit embed generator'],
  heroTitle: 'Kubit Embed Code Generator',
  heroSubtitle:
    'Paste any Kubit URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Kubit content',
  howItWorksSteps: [
    { title: 'Paste a Kubit link', description: 'Copy any kubit.ai URL.' },
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
  explanationHeading: 'Why use our Kubit embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Kubit link and get working embed HTML.'
    },
    {
      title: 'Kubit content',
      description: 'The tool handles all Kubit URL formats.'
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
        'Get the real Kubit embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Kubit URL formats and content types.'
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
      question: 'How do I embed Kubit content on my website?',
      answer: 'Paste any Kubit URL into the tool and click Generate.'
    },
    {
      question: 'Is the Kubit embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Kubit content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
