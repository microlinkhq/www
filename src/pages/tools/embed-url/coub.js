import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Coub',
  slug: 'coub',
  color: '#2BA9E1',
  exampleUrl: 'https://coub.com',
  metaTitle: 'Coub Embed Code Generator — Embed Looping videos',
  metaDescription:
    'Free Coub embed code generator. Paste any Coub URL — get a ready-to-paste embed for looping videos. No signup.',
  keywords: ['embed coub', 'coub embed code', 'coub video embed'],
  heroTitle: 'Coub Embed Code Generator',
  heroSubtitle:
    'Paste any Coub URL — get a ready-to-paste embed for looping videos.',
  howItWorksHeading: 'How to embed Coub content',
  howItWorksSteps: [
    {
      title: 'Paste a Coub link',
      description: 'Copy any coub.com URL — looping videos.'
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
  explanationHeading: 'Why use our Coub embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Coub link and get working embed HTML.'
    },
    {
      title: 'All Coub content',
      description:
        'Works with looping videos — the tool handles all Coub URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Coub embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Coub embed with full interactivity when available.'
    },
    {
      title: 'All looping videos',
      description: 'Works with looping videos — all Coub content types.'
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
      question: 'How do I embed Coub content on my website?',
      answer:
        'Paste any Coub URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Coub embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Coub content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
