import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SoopLive',
  slug: 'sooplive',
  color: '#666666',
  exampleUrl: 'https://sooplive.co.kr',
  metaTitle: 'SoopLive Embed Code Generator — Embed SoopLive Content',
  metaDescription:
    'Free SoopLive embed code generator. Paste any SoopLive URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed sooplive',
    'sooplive embed code',
    'sooplive embed generator'
  ],
  heroTitle: 'SoopLive Embed Code Generator',
  heroSubtitle:
    'Paste any SoopLive URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed SoopLive content',
  howItWorksSteps: [
    {
      title: 'Paste a SoopLive link',
      description: 'Copy any sooplive.co.kr URL.'
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
  explanationHeading: 'Why use our SoopLive embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any SoopLive link and get working embed HTML.'
    },
    {
      title: 'SoopLive content',
      description: 'The tool handles all SoopLive URL formats.'
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
        'Get the real SoopLive embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all SoopLive URL formats and content types.'
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
      question: 'How do I embed SoopLive content on my website?',
      answer: 'Paste any SoopLive URL into the tool and click Generate.'
    },
    {
      question: 'Is the SoopLive embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the SoopLive content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
