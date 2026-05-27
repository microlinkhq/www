import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Sketch',
  slug: 'sketch',
  color: '#666666',
  exampleUrl: 'https://sketch.com',
  metaTitle: 'Sketch Embed Code Generator — Embed Sketch Content',
  metaDescription:
    'Free Sketch embed code generator. Paste any Sketch URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed sketch', 'sketch embed code', 'sketch embed generator'],
  heroTitle: 'Sketch Embed Code Generator',
  heroSubtitle:
    'Paste any Sketch URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Sketch content',
  howItWorksSteps: [
    { title: 'Paste a Sketch link', description: 'Copy any sketch.com URL.' },
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
  explanationHeading: 'Why use our Sketch embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Sketch link and get working embed HTML.'
    },
    {
      title: 'Sketch content',
      description: 'The tool handles all Sketch URL formats.'
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
        'Get the real Sketch embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Sketch URL formats and content types.'
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
      question: 'How do I embed Sketch content on my website?',
      answer: 'Paste any Sketch URL into the tool and click Generate.'
    },
    {
      question: 'Is the Sketch embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Sketch content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
