import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Fireworktv',
  slug: 'fireworktv',
  color: '#666666',
  exampleUrl: 'https://fireworktv.com',
  metaTitle: 'Fireworktv Embed Code Generator — Embed Fireworktv Content',
  metaDescription:
    'Free Fireworktv embed code generator. Paste any Fireworktv URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed fireworktv',
    'fireworktv embed code',
    'fireworktv embed generator'
  ],
  heroTitle: 'Fireworktv Embed Code Generator',
  heroSubtitle:
    'Paste any Fireworktv URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Fireworktv content',
  howItWorksSteps: [
    {
      title: 'Paste a Fireworktv link',
      description: 'Copy any fireworktv.com URL.'
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
  explanationHeading: 'Why use our Fireworktv embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Fireworktv link and get working embed HTML.'
    },
    {
      title: 'Fireworktv content',
      description: 'The tool handles all Fireworktv URL formats.'
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
        'Get the real Fireworktv embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Fireworktv URL formats and content types.'
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
      question: 'How do I embed Fireworktv content on my website?',
      answer: 'Paste any Fireworktv URL into the tool and click Generate.'
    },
    {
      question: 'Is the Fireworktv embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Fireworktv content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
