import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Altrulabs',
  slug: 'altrulabs',
  color: '#666666',
  exampleUrl: 'https://altru.video',
  metaTitle: 'Altrulabs Embed Code Generator — Embed Altrulabs Content',
  metaDescription:
    'Free Altrulabs embed code generator. Paste any Altrulabs URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed altrulabs',
    'altrulabs embed code',
    'altrulabs embed generator'
  ],
  heroTitle: 'Altrulabs Embed Code Generator',
  heroSubtitle:
    'Paste any Altrulabs URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Altrulabs content',
  howItWorksSteps: [
    {
      title: 'Paste a Altrulabs link',
      description: 'Copy any altru.video URL.'
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
  explanationHeading: 'Why use our Altrulabs embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Altrulabs link and get working embed HTML.'
    },
    {
      title: 'Altrulabs content',
      description: 'The tool handles all Altrulabs URL formats.'
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
        'Get the real Altrulabs embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Altrulabs URL formats and content types.'
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
      question: 'How do I embed Altrulabs content on my website?',
      answer: 'Paste any Altrulabs URL into the tool and click Generate.'
    },
    {
      question: 'Is the Altrulabs embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Altrulabs content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
