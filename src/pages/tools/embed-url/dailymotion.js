import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Dailymotion',
  slug: 'dailymotion',
  color: '#0D0D64',
  exampleUrl: 'https://dailymotion.com',
  metaTitle: 'Dailymotion Embed Code Generator — Embed Videos and channels',
  metaDescription:
    'Free Dailymotion embed code generator. Paste any Dailymotion URL — get a ready-to-paste embed for videos and channels. No signup.',
  keywords: [
    'embed dailymotion',
    'dailymotion embed code',
    'dailymotion video embed',
    'dailymotion iframe'
  ],
  heroTitle: 'Dailymotion Embed Code Generator',
  heroSubtitle:
    'Paste any Dailymotion URL — get a ready-to-paste embed for videos and channels.',
  howItWorksHeading: 'How to embed Dailymotion content',
  howItWorksSteps: [
    {
      title: 'Paste a Dailymotion link',
      description: 'Copy any dailymotion.com URL — videos and channels.'
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
  explanationHeading: 'Why use our Dailymotion embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Dailymotion link and get working embed HTML.'
    },
    {
      title: 'All Dailymotion content',
      description:
        'Works with videos and channels — the tool handles all Dailymotion URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Dailymotion embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Dailymotion embed with full interactivity when available.'
    },
    {
      title: 'All videos and channels',
      description:
        'Works with videos and channels — all Dailymotion content types.'
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
      question: 'How do I embed Dailymotion content on my website?',
      answer:
        'Paste any Dailymotion URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Dailymotion embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Dailymotion content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
