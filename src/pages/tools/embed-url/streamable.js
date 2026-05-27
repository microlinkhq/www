import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Streamable',
  slug: 'streamable',
  color: '#0B79E3',
  exampleUrl: 'https://streamable.com',
  metaTitle: 'Streamable Embed Code Generator — Embed Videos and clips',
  metaDescription:
    'Free Streamable embed code generator. Paste any Streamable URL — get a ready-to-paste embed for videos and clips. No signup.',
  keywords: [
    'embed streamable',
    'streamable embed code',
    'streamable video embed'
  ],
  heroTitle: 'Streamable Embed Code Generator',
  heroSubtitle:
    'Paste any Streamable URL — get a ready-to-paste embed for videos and clips.',
  howItWorksHeading: 'How to embed Streamable content',
  howItWorksSteps: [
    {
      title: 'Paste a Streamable link',
      description: 'Copy any streamable.com URL — videos and clips.'
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
  explanationHeading: 'Why use our Streamable embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Streamable link and get working embed HTML.'
    },
    {
      title: 'All Streamable content',
      description:
        'Works with videos and clips — the tool handles all Streamable URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Streamable embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Streamable embed with full interactivity when available.'
    },
    {
      title: 'All videos and clips',
      description: 'Works with videos and clips — all Streamable content types.'
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
      question: 'How do I embed Streamable content on my website?',
      answer:
        'Paste any Streamable URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Streamable embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Streamable content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
