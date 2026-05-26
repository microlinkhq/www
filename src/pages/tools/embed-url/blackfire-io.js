import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Blackfire Io',
  slug: 'blackfire-io',
  color: '#25282B',
  exampleUrl: 'https://blackfire.io',
  metaTitle: 'Blackfire Io Embed Code Generator — Embed Performance profiles',
  metaDescription:
    'Free Blackfire Io embed code generator. Paste any Blackfire Io URL — get a ready-to-paste embed for performance profiles. No signup.',
  keywords: [
    'embed blackfire',
    'blackfire embed code',
    'blackfire profile embed'
  ],
  heroTitle: 'Blackfire Io Embed Code Generator',
  heroSubtitle:
    'Paste any Blackfire Io URL — get a ready-to-paste embed for performance profiles.',
  howItWorksHeading: 'How to embed Blackfire Io content',
  howItWorksSteps: [
    {
      title: 'Paste a Blackfire Io link',
      description: 'Copy any blackfire.io URL — performance profiles.'
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
  explanationHeading: 'Why use our Blackfire Io embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Blackfire Io link and get working embed HTML.'
    },
    {
      title: 'All Blackfire Io content',
      description:
        'Works with performance profiles — the tool handles all Blackfire Io URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Blackfire Io embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Blackfire Io embed with full interactivity when available.'
    },
    {
      title: 'All performance profiles',
      description:
        'Works with performance profiles — all Blackfire Io content types.'
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
      question: 'How do I embed Blackfire Io content on my website?',
      answer:
        'Paste any Blackfire Io URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Blackfire Io embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Blackfire Io content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
