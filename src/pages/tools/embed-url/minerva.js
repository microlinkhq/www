import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Minerva',
  slug: 'minerva',
  color: '#666666',
  exampleUrl: 'https://minerva.com',
  metaTitle: 'Minerva Embed Code Generator — Embed Minerva Content',
  metaDescription:
    'Free Minerva embed code generator. Paste any Minerva URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed minerva', 'minerva embed code', 'minerva embed generator'],
  heroTitle: 'Minerva Embed Code Generator',
  heroSubtitle:
    'Paste any Minerva URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Minerva content',
  howItWorksSteps: [
    { title: 'Paste a Minerva link', description: 'Copy any minerva.com URL.' },
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
  explanationHeading: 'Why use our Minerva embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Minerva link and get working embed HTML.'
    },
    {
      title: 'Minerva content',
      description: 'The tool handles all Minerva URL formats.'
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
        'Get the real Minerva embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Minerva URL formats and content types.'
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
      question: 'How do I embed Minerva content on my website?',
      answer: 'Paste any Minerva URL into the tool and click Generate.'
    },
    {
      question: 'Is the Minerva embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Minerva content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
