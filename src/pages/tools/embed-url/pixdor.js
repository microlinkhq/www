import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pixdor',
  slug: 'pixdor',
  color: '#666666',
  exampleUrl: 'https://pixdor.com',
  metaTitle: 'Pixdor Embed Code Generator — Embed Pixdor Content',
  metaDescription:
    'Free Pixdor embed code generator. Paste any Pixdor URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed pixdor', 'pixdor embed code', 'pixdor embed generator'],
  heroTitle: 'Pixdor Embed Code Generator',
  heroSubtitle:
    'Paste any Pixdor URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Pixdor content',
  howItWorksSteps: [
    { title: 'Paste a Pixdor link', description: 'Copy any pixdor.com URL.' },
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
  explanationHeading: 'Why use our Pixdor embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Pixdor link and get working embed HTML.'
    },
    {
      title: 'Pixdor content',
      description: 'The tool handles all Pixdor URL formats.'
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
        'Get the real Pixdor embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Pixdor URL formats and content types.'
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
      question: 'How do I embed Pixdor content on my website?',
      answer: 'Paste any Pixdor URL into the tool and click Generate.'
    },
    {
      question: 'Is the Pixdor embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Pixdor content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
