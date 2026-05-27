import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Developer',
  slug: 'developer',
  color: '#666666',
  exampleUrl: 'https://developer.li',
  metaTitle: 'Developer Embed Code Generator — Embed Developer Content',
  metaDescription:
    'Free Developer embed code generator. Paste any Developer URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed developer',
    'developer embed code',
    'developer embed generator'
  ],
  heroTitle: 'Developer Embed Code Generator',
  heroSubtitle:
    'Paste any Developer URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Developer content',
  howItWorksSteps: [
    {
      title: 'Paste a Developer link',
      description: 'Copy any developer.li URL.'
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
  explanationHeading: 'Why use our Developer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Developer link and get working embed HTML.'
    },
    {
      title: 'Developer content',
      description: 'The tool handles all Developer URL formats.'
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
        'Get the real Developer embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Developer URL formats and content types.'
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
      question: 'How do I embed Developer content on my website?',
      answer: 'Paste any Developer URL into the tool and click Generate.'
    },
    {
      question: 'Is the Developer embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Developer content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
