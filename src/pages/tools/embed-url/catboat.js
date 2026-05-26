import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Catboat',
  slug: 'catboat',
  color: '#666666',
  exampleUrl: 'https://catboat.me',
  metaTitle: 'Catboat Embed Code Generator — Embed Catboat Content',
  metaDescription:
    'Free Catboat embed code generator. Paste any Catboat URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed catboat', 'catboat embed code', 'catboat embed generator'],
  heroTitle: 'Catboat Embed Code Generator',
  heroSubtitle:
    'Paste any Catboat URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Catboat content',
  howItWorksSteps: [
    { title: 'Paste a Catboat link', description: 'Copy any catboat.me URL.' },
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
  explanationHeading: 'Why use our Catboat embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Catboat link and get working embed HTML.'
    },
    {
      title: 'Catboat content',
      description: 'The tool handles all Catboat URL formats.'
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
        'Get the real Catboat embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Catboat URL formats and content types.'
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
      question: 'How do I embed Catboat content on my website?',
      answer: 'Paste any Catboat URL into the tool and click Generate.'
    },
    {
      question: 'Is the Catboat embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Catboat content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
