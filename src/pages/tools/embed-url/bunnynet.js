import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Bunny.net',
  slug: 'bunnynet',
  color: '#666666',
  exampleUrl: 'https://bunny.net',
  metaTitle: 'Bunny.net Embed Code Generator — Embed Bunny.net Content',
  metaDescription:
    'Free Bunny.net embed code generator. Paste any Bunny.net URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed bunny.net',
    'bunny.net embed code',
    'bunny.net embed generator'
  ],
  heroTitle: 'Bunny.net Embed Code Generator',
  heroSubtitle:
    'Paste any Bunny.net URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Bunny.net content',
  howItWorksSteps: [
    { title: 'Paste a Bunny.net link', description: 'Copy any bunny.net URL.' },
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
  explanationHeading: 'Why use our Bunny.net embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Bunny.net link and get working embed HTML.'
    },
    {
      title: 'Bunny.net content',
      description: 'The tool handles all Bunny.net URL formats.'
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
        'Get the real Bunny.net embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Bunny.net URL formats and content types.'
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
      question: 'How do I embed Bunny.net content on my website?',
      answer: 'Paste any Bunny.net URL into the tool and click Generate.'
    },
    {
      question: 'Is the Bunny.net embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Bunny.net content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
