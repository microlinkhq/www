import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'HubSpot Bynder',
  slug: 'hubspot-bynder',
  color: '#666666',
  exampleUrl: 'https://bynder.com',
  metaTitle:
    'HubSpot Bynder Embed Code Generator — Embed HubSpot Bynder Content',
  metaDescription:
    'Free HubSpot Bynder embed code generator. Paste any HubSpot Bynder URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed hubspot bynder',
    'hubspot bynder embed code',
    'hubspot bynder embed generator'
  ],
  heroTitle: 'HubSpot Bynder Embed Code Generator',
  heroSubtitle:
    'Paste any HubSpot Bynder URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed HubSpot Bynder content',
  howItWorksSteps: [
    {
      title: 'Paste a HubSpot Bynder link',
      description: 'Copy any bynder.com URL.'
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
  explanationHeading: 'Why use our HubSpot Bynder embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any HubSpot Bynder link and get working embed HTML.'
    },
    {
      title: 'HubSpot Bynder content',
      description: 'The tool handles all HubSpot Bynder URL formats.'
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
        'Get the real HubSpot Bynder embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description:
        'Works with all HubSpot Bynder URL formats and content types.'
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
      question: 'How do I embed HubSpot Bynder content on my website?',
      answer: 'Paste any HubSpot Bynder URL into the tool and click Generate.'
    },
    {
      question: 'Is the HubSpot Bynder embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the HubSpot Bynder content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
