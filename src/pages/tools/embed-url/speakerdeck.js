import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Speaker Deck',
  slug: 'speakerdeck',
  color: '#009287',
  exampleUrl: 'https://speakerdeck.com',
  metaTitle:
    'Speaker Deck Embed Code Generator — Embed Slide decks and presentations',
  metaDescription:
    'Free Speaker Deck embed code generator. Paste any Speaker Deck URL — get a ready-to-paste embed for slide decks and presentations. No signup.',
  keywords: [
    'embed speakerdeck',
    'speaker deck embed code',
    'speakerdeck presentation embed'
  ],
  heroTitle: 'Speaker Deck Embed Code Generator',
  heroSubtitle:
    'Paste any Speaker Deck URL — get a ready-to-paste embed for slide decks and presentations.',
  howItWorksHeading: 'How to embed Speaker Deck content',
  howItWorksSteps: [
    {
      title: 'Paste a Speaker Deck link',
      description:
        'Copy any speakerdeck.com URL — slide decks and presentations.'
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
  explanationHeading: 'Why use our Speaker Deck embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Speaker Deck link and get working embed HTML.'
    },
    {
      title: 'All Speaker Deck content',
      description:
        'Works with slide decks and presentations — the tool handles all Speaker Deck URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Speaker Deck embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Speaker Deck embed with full interactivity when available.'
    },
    {
      title: 'All slide decks and presentations',
      description:
        'Works with slide decks and presentations — all Speaker Deck content types.'
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
      question: 'How do I embed Speaker Deck content on my website?',
      answer:
        'Paste any Speaker Deck URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Speaker Deck embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Speaker Deck content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
