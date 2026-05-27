import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Audiomeans',
  slug: 'audiomeans',
  color: '#666666',
  exampleUrl: 'https://audiomeans.fr',
  metaTitle: 'Audiomeans Embed Code Generator — Embed Audiomeans Content',
  metaDescription:
    'Free Audiomeans embed code generator. Paste any Audiomeans URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed audiomeans',
    'audiomeans embed code',
    'audiomeans embed generator'
  ],
  heroTitle: 'Audiomeans Embed Code Generator',
  heroSubtitle:
    'Paste any Audiomeans URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Audiomeans content',
  howItWorksSteps: [
    {
      title: 'Paste a Audiomeans link',
      description: 'Copy any audiomeans.fr URL.'
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
  explanationHeading: 'Why use our Audiomeans embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Audiomeans link and get working embed HTML.'
    },
    {
      title: 'Audiomeans content',
      description: 'The tool handles all Audiomeans URL formats.'
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
        'Get the real Audiomeans embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Audiomeans URL formats and content types.'
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
      question: 'How do I embed Audiomeans content on my website?',
      answer: 'Paste any Audiomeans URL into the tool and click Generate.'
    },
    {
      question: 'Is the Audiomeans embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Audiomeans content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
