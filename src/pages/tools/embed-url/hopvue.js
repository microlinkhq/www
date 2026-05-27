import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Hopvue',
  slug: 'hopvue',
  color: '#666666',
  exampleUrl: 'https://hopvue.com',
  metaTitle: 'Hopvue Embed Code Generator — Embed Hopvue Content',
  metaDescription:
    'Free Hopvue embed code generator. Paste any Hopvue URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed hopvue', 'hopvue embed code', 'hopvue embed generator'],
  heroTitle: 'Hopvue Embed Code Generator',
  heroSubtitle:
    'Paste any Hopvue URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Hopvue content',
  howItWorksSteps: [
    { title: 'Paste a Hopvue link', description: 'Copy any hopvue.com URL.' },
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
  explanationHeading: 'Why use our Hopvue embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Hopvue link and get working embed HTML.'
    },
    {
      title: 'Hopvue content',
      description: 'The tool handles all Hopvue URL formats.'
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
        'Get the real Hopvue embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Hopvue URL formats and content types.'
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
      question: 'How do I embed Hopvue content on my website?',
      answer: 'Paste any Hopvue URL into the tool and click Generate.'
    },
    {
      question: 'Is the Hopvue embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Hopvue content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
