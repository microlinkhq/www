import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Balsamiq',
  slug: 'balsamiq',
  color: '#CC0000',
  exampleUrl: 'https://balsamiq.cloud',
  metaTitle: 'Balsamiq Embed Code Generator — Embed Wireframes and mockups',
  metaDescription:
    'Free Balsamiq embed code generator. Paste any Balsamiq URL — get a ready-to-paste embed for wireframes and mockups. No signup.',
  keywords: [
    'embed balsamiq',
    'balsamiq embed code',
    'balsamiq wireframe embed'
  ],
  heroTitle: 'Balsamiq Embed Code Generator',
  heroSubtitle:
    'Paste any Balsamiq URL — get a ready-to-paste embed for wireframes and mockups.',
  howItWorksHeading: 'How to embed Balsamiq content',
  howItWorksSteps: [
    {
      title: 'Paste a Balsamiq link',
      description: 'Copy any balsamiq.cloud URL — wireframes and mockups.'
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
  explanationHeading: 'Why use our Balsamiq embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Balsamiq link and get working embed HTML.'
    },
    {
      title: 'All Balsamiq content',
      description:
        'Works with wireframes and mockups — the tool handles all Balsamiq URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Balsamiq embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Balsamiq embed with full interactivity when available.'
    },
    {
      title: 'All wireframes and mockups',
      description:
        'Works with wireframes and mockups — all Balsamiq content types.'
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
      question: 'How do I embed Balsamiq content on my website?',
      answer:
        'Paste any Balsamiq URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Balsamiq embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Balsamiq content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
