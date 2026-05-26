import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Anniemusic',
  slug: 'anniemusic',
  color: '#666666',
  exampleUrl: 'https://anniemusic.app',
  metaTitle: 'Anniemusic Embed Code Generator — Embed Anniemusic Content',
  metaDescription:
    'Free Anniemusic embed code generator. Paste any Anniemusic URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed anniemusic',
    'anniemusic embed code',
    'anniemusic embed generator'
  ],
  heroTitle: 'Anniemusic Embed Code Generator',
  heroSubtitle:
    'Paste any Anniemusic URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Anniemusic content',
  howItWorksSteps: [
    {
      title: 'Paste a Anniemusic link',
      description: 'Copy any anniemusic.app URL.'
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
  explanationHeading: 'Why use our Anniemusic embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Anniemusic link and get working embed HTML.'
    },
    {
      title: 'Anniemusic content',
      description: 'The tool handles all Anniemusic URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description: 'Generate up to 50 embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Anniemusic embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Anniemusic URL formats and content types.'
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
      question: 'How do I embed Anniemusic content on my website?',
      answer: 'Paste any Anniemusic URL into the tool and click Generate.'
    },
    {
      question: 'Is the Anniemusic embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Anniemusic content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
