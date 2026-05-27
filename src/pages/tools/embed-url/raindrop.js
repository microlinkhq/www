import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Raindrop.io',
  slug: 'raindrop',
  color: '#3290EC',
  exampleUrl: 'https://raindrop.io',
  metaTitle:
    'Raindrop.io Embed Code Generator — Embed Bookmarks and collections',
  metaDescription:
    'Free Raindrop.io embed code generator. Paste any Raindrop.io URL — get a ready-to-paste embed for bookmarks and collections. No signup.',
  keywords: [
    'embed raindrop',
    'raindrop embed code',
    'raindrop collection embed'
  ],
  heroTitle: 'Raindrop.io Embed Code Generator',
  heroSubtitle:
    'Paste any Raindrop.io URL — get a ready-to-paste embed for bookmarks and collections.',
  howItWorksHeading: 'How to embed Raindrop.io content',
  howItWorksSteps: [
    {
      title: 'Paste a Raindrop.io link',
      description: 'Copy any raindrop.io URL — bookmarks and collections.'
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
  explanationHeading: 'Why use our Raindrop.io embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Raindrop.io link and get working embed HTML.'
    },
    {
      title: 'All Raindrop.io content',
      description:
        'Works with bookmarks and collections — the tool handles all Raindrop.io URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Raindrop.io embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Raindrop.io embed with full interactivity when available.'
    },
    {
      title: 'All bookmarks and collections',
      description:
        'Works with bookmarks and collections — all Raindrop.io content types.'
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
      question: 'How do I embed Raindrop.io content on my website?',
      answer:
        'Paste any Raindrop.io URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Raindrop.io embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Raindrop.io content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
