import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Veer',
  slug: 'veer',
  color: '#666666',
  exampleUrl: 'https://veer.tv',
  metaTitle: 'Veer Embed Code Generator — Embed Veer Content',
  metaDescription:
    'Free Veer embed code generator. Paste any Veer URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed veer', 'veer embed code', 'veer embed generator'],
  heroTitle: 'Veer Embed Code Generator',
  heroSubtitle:
    'Paste any Veer URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Veer content',
  howItWorksSteps: [
    { title: 'Paste a Veer link', description: 'Copy any veer.tv URL.' },
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
  explanationHeading: 'Why use our Veer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Veer link and get working embed HTML.'
    },
    {
      title: 'Veer content',
      description: 'The tool handles all Veer URL formats.'
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
        'Get the real Veer embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Veer URL formats and content types.'
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
      question: 'How do I embed Veer content on my website?',
      answer: 'Paste any Veer URL into the tool and click Generate.'
    },
    {
      question: 'Is the Veer embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Veer content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
