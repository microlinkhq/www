import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Assemblrworld',
  slug: 'assemblrworld',
  color: '#666666',
  exampleUrl: 'https://assemblrworld.com',
  metaTitle: 'Assemblrworld Embed Code Generator — Embed Assemblrworld Content',
  metaDescription:
    'Free Assemblrworld embed code generator. Paste any Assemblrworld URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed assemblrworld',
    'assemblrworld embed code',
    'assemblrworld embed generator'
  ],
  heroTitle: 'Assemblrworld Embed Code Generator',
  heroSubtitle:
    'Paste any Assemblrworld URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Assemblrworld content',
  howItWorksSteps: [
    {
      title: 'Paste a Assemblrworld link',
      description: 'Copy any assemblrworld.com URL.'
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
  explanationHeading: 'Why use our Assemblrworld embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Assemblrworld link and get working embed HTML.'
    },
    {
      title: 'Assemblrworld content',
      description: 'The tool handles all Assemblrworld URL formats.'
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
        'Get the real Assemblrworld embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Assemblrworld URL formats and content types.'
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
      question: 'How do I embed Assemblrworld content on my website?',
      answer: 'Paste any Assemblrworld URL into the tool and click Generate.'
    },
    {
      question: 'Is the Assemblrworld embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Assemblrworld content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
