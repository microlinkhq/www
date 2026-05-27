import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Huffduffer',
  slug: 'huffduffer',
  color: '#666666',
  exampleUrl: 'https://huffduffer.com',
  metaTitle: 'Huffduffer Embed Code Generator — Embed Huffduffer Content',
  metaDescription:
    'Free Huffduffer embed code generator. Paste any Huffduffer URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed huffduffer',
    'huffduffer embed code',
    'huffduffer embed generator'
  ],
  heroTitle: 'Huffduffer Embed Code Generator',
  heroSubtitle:
    'Paste any Huffduffer URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Huffduffer content',
  howItWorksSteps: [
    {
      title: 'Paste a Huffduffer link',
      description: 'Copy any huffduffer.com URL.'
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
  explanationHeading: 'Why use our Huffduffer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Huffduffer link and get working embed HTML.'
    },
    {
      title: 'Huffduffer content',
      description: 'The tool handles all Huffduffer URL formats.'
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
        'Get the real Huffduffer embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Huffduffer URL formats and content types.'
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
      question: 'How do I embed Huffduffer content on my website?',
      answer: 'Paste any Huffduffer URL into the tool and click Generate.'
    },
    {
      question: 'Is the Huffduffer embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Huffduffer content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
