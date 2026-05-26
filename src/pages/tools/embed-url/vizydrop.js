import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Vizydrop',
  slug: 'vizydrop',
  color: '#666666',
  exampleUrl: 'https://vizydrop.com',
  metaTitle: 'Vizydrop Embed Code Generator — Embed Vizydrop Content',
  metaDescription:
    'Free Vizydrop embed code generator. Paste any Vizydrop URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed vizydrop',
    'vizydrop embed code',
    'vizydrop embed generator'
  ],
  heroTitle: 'Vizydrop Embed Code Generator',
  heroSubtitle:
    'Paste any Vizydrop URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Vizydrop content',
  howItWorksSteps: [
    {
      title: 'Paste a Vizydrop link',
      description: 'Copy any vizydrop.com URL.'
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
  explanationHeading: 'Why use our Vizydrop embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Vizydrop link and get working embed HTML.'
    },
    {
      title: 'Vizydrop content',
      description: 'The tool handles all Vizydrop URL formats.'
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
        'Get the real Vizydrop embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Vizydrop URL formats and content types.'
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
      question: 'How do I embed Vizydrop content on my website?',
      answer: 'Paste any Vizydrop URL into the tool and click Generate.'
    },
    {
      question: 'Is the Vizydrop embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Vizydrop content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
