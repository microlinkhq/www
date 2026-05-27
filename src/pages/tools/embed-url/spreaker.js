import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Spreaker',
  slug: 'spreaker',
  color: '#F5C910',
  exampleUrl: 'https://spreaker.com',
  metaTitle: 'Spreaker Embed Code Generator — Embed Podcast episodes and shows',
  metaDescription:
    'Free Spreaker embed code generator. Paste any Spreaker URL — get a ready-to-paste embed for podcast episodes and shows. No signup.',
  keywords: ['embed spreaker', 'spreaker embed code', 'spreaker podcast embed'],
  heroTitle: 'Spreaker Embed Code Generator',
  heroSubtitle:
    'Paste any Spreaker URL — get a ready-to-paste embed for podcast episodes and shows.',
  howItWorksHeading: 'How to embed Spreaker content',
  howItWorksSteps: [
    {
      title: 'Paste a Spreaker link',
      description: 'Copy any spreaker.com URL — podcast episodes and shows.'
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
  explanationHeading: 'Why use our Spreaker embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Spreaker link and get working embed HTML.'
    },
    {
      title: 'All Spreaker content',
      description:
        'Works with podcast episodes and shows — the tool handles all Spreaker URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Spreaker embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Spreaker embed with full interactivity when available.'
    },
    {
      title: 'All podcast episodes and shows',
      description:
        'Works with podcast episodes and shows — all Spreaker content types.'
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
      question: 'How do I embed Spreaker content on my website?',
      answer:
        'Paste any Spreaker URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Spreaker embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Spreaker content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
