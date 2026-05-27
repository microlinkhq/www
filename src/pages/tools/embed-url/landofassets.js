import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Landofassets',
  slug: 'landofassets',
  color: '#666666',
  exampleUrl: 'https://landofassets.com',
  metaTitle: 'Landofassets Embed Code Generator — Embed Landofassets Content',
  metaDescription:
    'Free Landofassets embed code generator. Paste any Landofassets URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed landofassets',
    'landofassets embed code',
    'landofassets embed generator'
  ],
  heroTitle: 'Landofassets Embed Code Generator',
  heroSubtitle:
    'Paste any Landofassets URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Landofassets content',
  howItWorksSteps: [
    {
      title: 'Paste a Landofassets link',
      description: 'Copy any landofassets.com URL.'
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
  explanationHeading: 'Why use our Landofassets embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Landofassets link and get working embed HTML.'
    },
    {
      title: 'Landofassets content',
      description: 'The tool handles all Landofassets URL formats.'
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
        'Get the real Landofassets embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Landofassets URL formats and content types.'
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
      question: 'How do I embed Landofassets content on my website?',
      answer: 'Paste any Landofassets URL into the tool and click Generate.'
    },
    {
      question: 'Is the Landofassets embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Landofassets content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
