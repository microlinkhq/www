import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Mixcloud',
  slug: 'mixcloud',
  color: '#5000FF',
  exampleUrl: 'https://mixcloud.com',
  metaTitle: 'Mixcloud Embed Code Generator — Embed Mixes',
  metaDescription:
    'Free Mixcloud embed code generator. Paste any Mixcloud URL — get a ready-to-paste embed for mixes, shows, and podcasts. No signup.',
  keywords: ['embed mixcloud', 'mixcloud embed code', 'mixcloud player embed'],
  heroTitle: 'Mixcloud Embed Code Generator',
  heroSubtitle:
    'Paste any Mixcloud URL — get a ready-to-paste embed for mixes, shows, and podcasts.',
  howItWorksHeading: 'How to embed Mixcloud content',
  howItWorksSteps: [
    {
      title: 'Paste a Mixcloud link',
      description: 'Copy any mixcloud.com URL — mixes, shows, and podcasts.'
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
  explanationHeading: 'Why use our Mixcloud embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Mixcloud link and get working embed HTML.'
    },
    {
      title: 'All Mixcloud content',
      description:
        'Works with mixes, shows, and podcasts — the tool handles all Mixcloud URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Mixcloud embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Mixcloud embed with full interactivity when available.'
    },
    {
      title: 'All mixes',
      description:
        'Works with mixes, shows, and podcasts — all Mixcloud content types.'
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
      question: 'How do I embed Mixcloud content on my website?',
      answer:
        'Paste any Mixcloud URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Mixcloud embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Mixcloud content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
