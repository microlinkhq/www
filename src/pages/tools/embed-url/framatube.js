import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Framatube',
  slug: 'framatube',
  color: '#666666',
  exampleUrl: 'https://framatube.org',
  metaTitle: 'Framatube Embed Code Generator — Embed Framatube Content',
  metaDescription:
    'Free Framatube embed code generator. Paste any Framatube URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed framatube',
    'framatube embed code',
    'framatube embed generator'
  ],
  heroTitle: 'Framatube Embed Code Generator',
  heroSubtitle:
    'Paste any Framatube URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Framatube content',
  howItWorksSteps: [
    {
      title: 'Paste a Framatube link',
      description: 'Copy any framatube.org URL.'
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
  explanationHeading: 'Why use our Framatube embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Framatube link and get working embed HTML.'
    },
    {
      title: 'Framatube content',
      description: 'The tool handles all Framatube URL formats.'
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
        'Get the real Framatube embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Framatube URL formats and content types.'
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
      question: 'How do I embed Framatube content on my website?',
      answer: 'Paste any Framatube URL into the tool and click Generate.'
    },
    {
      question: 'Is the Framatube embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Framatube content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
