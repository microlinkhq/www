import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Trinityaudio',
  slug: 'trinityaudio',
  color: '#666666',
  exampleUrl: 'https://trinityaudio.ai',
  metaTitle: 'Trinityaudio Embed Code Generator — Embed Trinityaudio Content',
  metaDescription:
    'Free Trinityaudio embed code generator. Paste any Trinityaudio URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed trinityaudio',
    'trinityaudio embed code',
    'trinityaudio embed generator'
  ],
  heroTitle: 'Trinityaudio Embed Code Generator',
  heroSubtitle:
    'Paste any Trinityaudio URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Trinityaudio content',
  howItWorksSteps: [
    {
      title: 'Paste a Trinityaudio link',
      description: 'Copy any trinityaudio.ai URL.'
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
  explanationHeading: 'Why use our Trinityaudio embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Trinityaudio link and get working embed HTML.'
    },
    {
      title: 'Trinityaudio content',
      description: 'The tool handles all Trinityaudio URL formats.'
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
        'Get the real Trinityaudio embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Trinityaudio URL formats and content types.'
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
      question: 'How do I embed Trinityaudio content on my website?',
      answer: 'Paste any Trinityaudio URL into the tool and click Generate.'
    },
    {
      question: 'Is the Trinityaudio embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Trinityaudio content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
