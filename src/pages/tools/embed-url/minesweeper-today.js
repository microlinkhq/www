import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Minesweeper',
  slug: 'minesweeper-today',
  color: '#666666',
  exampleUrl: 'https://minesweeper.today',
  metaTitle: 'Minesweeper Embed Code Generator — Embed Minesweeper Content',
  metaDescription:
    'Free Minesweeper embed code generator. Paste any Minesweeper URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed minesweeper',
    'minesweeper embed code',
    'minesweeper embed generator'
  ],
  heroTitle: 'Minesweeper Embed Code Generator',
  heroSubtitle:
    'Paste any Minesweeper URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Minesweeper content',
  howItWorksSteps: [
    {
      title: 'Paste a Minesweeper link',
      description: 'Copy any minesweeper.today URL.'
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
  explanationHeading: 'Why use our Minesweeper embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Minesweeper link and get working embed HTML.'
    },
    {
      title: 'Minesweeper content',
      description: 'The tool handles all Minesweeper URL formats.'
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
        'Get the real Minesweeper embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Minesweeper URL formats and content types.'
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
      question: 'How do I embed Minesweeper content on my website?',
      answer: 'Paste any Minesweeper URL into the tool and click Generate.'
    },
    {
      question: 'Is the Minesweeper embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Minesweeper content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
