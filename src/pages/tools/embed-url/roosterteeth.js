import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Roosterteeth',
  slug: 'roosterteeth',
  color: '#666666',
  exampleUrl: 'https://roosterteeth.com',
  metaTitle: 'Roosterteeth Embed Code Generator — Embed Roosterteeth Content',
  metaDescription:
    'Free Roosterteeth embed code generator. Paste any Roosterteeth URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed roosterteeth',
    'roosterteeth embed code',
    'roosterteeth embed generator'
  ],
  heroTitle: 'Roosterteeth Embed Code Generator',
  heroSubtitle:
    'Paste any Roosterteeth URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Roosterteeth content',
  howItWorksSteps: [
    {
      title: 'Paste a Roosterteeth link',
      description: 'Copy any roosterteeth.com URL.'
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
  explanationHeading: 'Why use our Roosterteeth embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Roosterteeth link and get working embed HTML.'
    },
    {
      title: 'Roosterteeth content',
      description: 'The tool handles all Roosterteeth URL formats.'
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
        'Get the real Roosterteeth embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Roosterteeth URL formats and content types.'
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
      question: 'How do I embed Roosterteeth content on my website?',
      answer: 'Paste any Roosterteeth URL into the tool and click Generate.'
    },
    {
      question: 'Is the Roosterteeth embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Roosterteeth content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
