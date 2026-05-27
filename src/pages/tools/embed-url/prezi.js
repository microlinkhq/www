import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Prezi',
  slug: 'prezi',
  color: '#3181FF',
  exampleUrl: 'https://prezi.com',
  metaTitle: 'Prezi Embed Code Generator — Embed Presentations and videos',
  metaDescription:
    'Free Prezi embed code generator. Paste any Prezi URL — get a ready-to-paste embed for presentations and videos. No signup.',
  keywords: ['embed prezi', 'prezi embed code', 'prezi presentation embed'],
  heroTitle: 'Prezi Embed Code Generator',
  heroSubtitle:
    'Paste any Prezi URL — get a ready-to-paste embed for presentations and videos.',
  howItWorksHeading: 'How to embed Prezi content',
  howItWorksSteps: [
    {
      title: 'Paste a Prezi link',
      description: 'Copy any prezi.com URL — presentations and videos.'
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
  explanationHeading: 'Why use our Prezi embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Prezi link and get working embed HTML.'
    },
    {
      title: 'All Prezi content',
      description:
        'Works with presentations and videos — the tool handles all Prezi URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Prezi embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Prezi embed with full interactivity when available.'
    },
    {
      title: 'All presentations and videos',
      description:
        'Works with presentations and videos — all Prezi content types.'
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
      question: 'How do I embed Prezi content on my website?',
      answer:
        'Paste any Prezi URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Prezi embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Prezi content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
