import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Infogram',
  slug: 'infogram',
  color: '#00C9A2',
  exampleUrl: 'https://infogram.com',
  metaTitle: 'Infogram Embed Code Generator — Embed Infographics',
  metaDescription:
    'Free Infogram embed code generator. Paste any Infogram URL — get a ready-to-paste embed for infographics, charts, and dashboards. No signup.',
  keywords: ['embed infogram', 'infogram embed code', 'infogram chart embed'],
  heroTitle: 'Infogram Embed Code Generator',
  heroSubtitle:
    'Paste any Infogram URL — get a ready-to-paste embed for infographics, charts, and dashboards.',
  howItWorksHeading: 'How to embed Infogram content',
  howItWorksSteps: [
    {
      title: 'Paste a Infogram link',
      description:
        'Copy any infogram.com URL — infographics, charts, and dashboards.'
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
  explanationHeading: 'Why use our Infogram embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Infogram link and get working embed HTML.'
    },
    {
      title: 'All Infogram content',
      description:
        'Works with infographics, charts, and dashboards — the tool handles all Infogram URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Infogram embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Infogram embed with full interactivity when available.'
    },
    {
      title: 'All infographics',
      description:
        'Works with infographics, charts, and dashboards — all Infogram content types.'
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
      question: 'How do I embed Infogram content on my website?',
      answer:
        'Paste any Infogram URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Infogram embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Infogram content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
