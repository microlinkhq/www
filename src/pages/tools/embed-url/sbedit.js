import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Sbedit',
  slug: 'sbedit',
  color: '#666666',
  exampleUrl: 'https://sbedit.com',
  metaTitle: 'Sbedit Embed Code Generator — Embed Sbedit Content',
  metaDescription:
    'Free Sbedit embed code generator. Paste any Sbedit URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed sbedit', 'sbedit embed code', 'sbedit embed generator'],
  heroTitle: 'Sbedit Embed Code Generator',
  heroSubtitle:
    'Paste any Sbedit URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Sbedit content',
  howItWorksSteps: [
    { title: 'Paste a Sbedit link', description: 'Copy any sbedit.com URL.' },
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
  explanationHeading: 'Why use our Sbedit embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Sbedit link and get working embed HTML.'
    },
    {
      title: 'Sbedit content',
      description: 'The tool handles all Sbedit URL formats.'
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
        'Get the real Sbedit embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Sbedit URL formats and content types.'
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
      question: 'How do I embed Sbedit content on my website?',
      answer: 'Paste any Sbedit URL into the tool and click Generate.'
    },
    {
      question: 'Is the Sbedit embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Sbedit content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
