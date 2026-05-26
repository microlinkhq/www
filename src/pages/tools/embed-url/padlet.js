import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Padlet',
  slug: 'padlet',
  color: '#E03997',
  exampleUrl: 'https://padlet.com',
  metaTitle: 'Padlet Embed Code Generator — Embed Boards and walls',
  metaDescription:
    'Free Padlet embed code generator. Paste any Padlet URL — get a ready-to-paste embed for boards and walls. No signup.',
  keywords: ['embed padlet', 'padlet embed code', 'padlet board embed'],
  heroTitle: 'Padlet Embed Code Generator',
  heroSubtitle:
    'Paste any Padlet URL — get a ready-to-paste embed for boards and walls.',
  howItWorksHeading: 'How to embed Padlet content',
  howItWorksSteps: [
    {
      title: 'Paste a Padlet link',
      description: 'Copy any padlet.com URL — boards and walls.'
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
  explanationHeading: 'Why use our Padlet embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Padlet link and get working embed HTML.'
    },
    {
      title: 'All Padlet content',
      description:
        'Works with boards and walls — the tool handles all Padlet URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Padlet embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Padlet embed with full interactivity when available.'
    },
    {
      title: 'All boards and walls',
      description: 'Works with boards and walls — all Padlet content types.'
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
      question: 'How do I embed Padlet content on my website?',
      answer:
        'Paste any Padlet URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Padlet embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Padlet content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
