import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Synthesia',
  slug: 'synthesia',
  color: '#666666',
  exampleUrl: 'https://synthesia.io',
  metaTitle: 'Synthesia Embed Code Generator — Embed Synthesia Content',
  metaDescription:
    'Free Synthesia embed code generator. Paste any Synthesia URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed synthesia',
    'synthesia embed code',
    'synthesia embed generator'
  ],
  heroTitle: 'Synthesia Embed Code Generator',
  heroSubtitle:
    'Paste any Synthesia URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Synthesia content',
  howItWorksSteps: [
    {
      title: 'Paste a Synthesia link',
      description: 'Copy any synthesia.io URL.'
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
  explanationHeading: 'Why use our Synthesia embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Synthesia link and get working embed HTML.'
    },
    {
      title: 'Synthesia content',
      description: 'The tool handles all Synthesia URL formats.'
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
        'Get the real Synthesia embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Synthesia URL formats and content types.'
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
      question: 'How do I embed Synthesia content on my website?',
      answer: 'Paste any Synthesia URL into the tool and click Generate.'
    },
    {
      question: 'Is the Synthesia embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Synthesia content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
