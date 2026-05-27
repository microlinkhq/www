import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Heyzine',
  slug: 'heyzine',
  color: '#666666',
  exampleUrl: 'https://heyzine.com',
  metaTitle: 'Heyzine Embed Code Generator — Embed Heyzine Content',
  metaDescription:
    'Free Heyzine embed code generator. Paste any Heyzine URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed heyzine', 'heyzine embed code', 'heyzine embed generator'],
  heroTitle: 'Heyzine Embed Code Generator',
  heroSubtitle:
    'Paste any Heyzine URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Heyzine content',
  howItWorksSteps: [
    { title: 'Paste a Heyzine link', description: 'Copy any heyzine.com URL.' },
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
  explanationHeading: 'Why use our Heyzine embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Heyzine link and get working embed HTML.'
    },
    {
      title: 'Heyzine content',
      description: 'The tool handles all Heyzine URL formats.'
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
        'Get the real Heyzine embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Heyzine URL formats and content types.'
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
      question: 'How do I embed Heyzine content on my website?',
      answer: 'Paste any Heyzine URL into the tool and click Generate.'
    },
    {
      question: 'Is the Heyzine embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Heyzine content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
