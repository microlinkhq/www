import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'BitChute',
  slug: 'bitchute',
  color: '#EF4137',
  exampleUrl: 'https://bitchute.com',
  metaTitle: 'BitChute Embed Code Generator — Embed Videos and channels',
  metaDescription:
    'Free BitChute embed code generator. Paste any BitChute URL — get a ready-to-paste embed for videos and channels. No signup.',
  keywords: ['embed bitchute', 'bitchute embed code', 'bitchute video embed'],
  heroTitle: 'BitChute Embed Code Generator',
  heroSubtitle:
    'Paste any BitChute URL — get a ready-to-paste embed for videos and channels.',
  howItWorksHeading: 'How to embed BitChute content',
  howItWorksSteps: [
    {
      title: 'Paste a BitChute link',
      description: 'Copy any bitchute.com URL — videos and channels.'
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
  explanationHeading: 'Why use our BitChute embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any BitChute link and get working embed HTML.'
    },
    {
      title: 'All BitChute content',
      description:
        'Works with videos and channels — the tool handles all BitChute URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 BitChute embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real BitChute embed with full interactivity when available.'
    },
    {
      title: 'All videos and channels',
      description:
        'Works with videos and channels — all BitChute content types.'
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
      question: 'How do I embed BitChute content on my website?',
      answer:
        'Paste any BitChute URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the BitChute embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the BitChute content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
