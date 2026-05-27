import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Wistia',
  slug: 'wistia',
  color: '#54BBFF',
  exampleUrl: 'https://wistia.com',
  metaTitle: 'Wistia Embed Code Generator — Embed Videos and channels',
  metaDescription:
    'Free Wistia embed code generator. Paste any Wistia URL — get a ready-to-paste embed for videos and channels. No signup.',
  keywords: ['embed wistia', 'wistia embed code', 'wistia video embed'],
  heroTitle: 'Wistia Embed Code Generator',
  heroSubtitle:
    'Paste any Wistia URL — get a ready-to-paste embed for videos and channels.',
  howItWorksHeading: 'How to embed Wistia content',
  howItWorksSteps: [
    {
      title: 'Paste a Wistia link',
      description: 'Copy any wistia.com URL — videos and channels.'
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
  explanationHeading: 'Why use our Wistia embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Wistia link and get working embed HTML.'
    },
    {
      title: 'All Wistia content',
      description:
        'Works with videos and channels — the tool handles all Wistia URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Wistia embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Wistia embed with full interactivity when available.'
    },
    {
      title: 'All videos and channels',
      description: 'Works with videos and channels — all Wistia content types.'
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
      question: 'How do I embed Wistia content on my website?',
      answer:
        'Paste any Wistia URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Wistia embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Wistia content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
