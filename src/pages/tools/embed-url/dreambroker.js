import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Dreambroker',
  slug: 'dreambroker',
  color: '#666666',
  exampleUrl: 'https://dreambroker.com',
  metaTitle: 'Dreambroker Embed Code Generator — Embed Dreambroker Content',
  metaDescription:
    'Free Dreambroker embed code generator. Paste any Dreambroker URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed dreambroker',
    'dreambroker embed code',
    'dreambroker embed generator'
  ],
  heroTitle: 'Dreambroker Embed Code Generator',
  heroSubtitle:
    'Paste any Dreambroker URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Dreambroker content',
  howItWorksSteps: [
    {
      title: 'Paste a Dreambroker link',
      description: 'Copy any dreambroker.com URL.'
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
  explanationHeading: 'Why use our Dreambroker embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Dreambroker link and get working embed HTML.'
    },
    {
      title: 'Dreambroker content',
      description: 'The tool handles all Dreambroker URL formats.'
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
        'Get the real Dreambroker embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Dreambroker URL formats and content types.'
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
      question: 'How do I embed Dreambroker content on my website?',
      answer: 'Paste any Dreambroker URL into the tool and click Generate.'
    },
    {
      question: 'Is the Dreambroker embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Dreambroker content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
