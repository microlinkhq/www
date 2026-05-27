import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Bluesky',
  slug: 'bluesky',
  color: '#0085FF',
  exampleUrl: 'https://bsky.app',
  metaTitle: 'Bluesky Embed Code Generator — Embed Posts and profiles',
  metaDescription:
    'Free Bluesky embed code generator. Paste any Bluesky URL — get a ready-to-paste embed for posts and profiles. No signup.',
  keywords: [
    'embed bluesky',
    'bluesky embed code',
    'bluesky post embed',
    'embed bsky post'
  ],
  heroTitle: 'Bluesky Embed Code Generator',
  heroSubtitle:
    'Paste any Bluesky URL — get a ready-to-paste embed for posts and profiles.',
  howItWorksHeading: 'How to embed Bluesky content',
  howItWorksSteps: [
    {
      title: 'Paste a Bluesky link',
      description: 'Copy any bsky.app URL — posts and profiles.'
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
  explanationHeading: 'Why use our Bluesky embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Bluesky link and get working embed HTML.'
    },
    {
      title: 'All Bluesky content',
      description:
        'Works with posts and profiles — the tool handles all Bluesky URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Bluesky embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Bluesky embed with full interactivity when available.'
    },
    {
      title: 'All posts and profiles',
      description: 'Works with posts and profiles — all Bluesky content types.'
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
      question: 'How do I embed Bluesky content on my website?',
      answer:
        'Paste any Bluesky URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Bluesky embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Bluesky content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
