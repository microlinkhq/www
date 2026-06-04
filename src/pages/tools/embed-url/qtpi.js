import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'QtPi',
  slug: 'qtpi',
  color: '#666666',
  exampleUrl: 'https://qtpi.gg',
  metaTitle: 'QtPi Embed Code Generator — Embed Pages & Shared Content',
  metaDescription:
    'Free QtPi embed code generator. Paste any QtPi URL — get a ready-to-paste embed for pages and shared content. No signup.',
  keywords: [
    'embed qtpi',
    'qtpi embed code',
    'qtpi embed code generator',
    'embed qtpi page',
    'qtpi iframe code',
    'qtpi link embed',
    'qtpi shared content embed'
  ],
  heroTitle: 'QtPi Embed Code Generator',
  heroSubtitle:
    'Paste any QtPi URL — get a ready-to-paste embed for pages and shared content.',
  howItWorksHeading: 'How to embed QtPi content',
  howItWorksSteps: [
    {
      title: 'Paste a QtPi link',
      description: 'Copy any QtPi page or shared content URL and drop it in.'
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
  explanationHeading: 'Why use our QtPi embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any QtPi link and get working embed HTML in seconds.'
    },
    {
      title: 'Works with any QtPi link',
      description:
        'Handles QtPi pages and shared content across the supported URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Page embeds',
      description:
        'Embed QtPi pages directly into your articles, docs, or website.'
    },
    {
      title: 'Shared content support',
      description:
        'Turn any shared QtPi link into a clean, ready-to-paste embed.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/raindrop', label: 'Raindrop.io' },
    { href: '/tools/embed-url/curated', label: 'Curated' },
    { href: '/tools/embed-url/pastery', label: 'Pastery' }
  ],
  faq: [
    {
      question: 'How do I embed QtPi content on my website?',
      answer:
        'Paste any QtPi URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Which QtPi links can I embed?',
      answer:
        'You can embed QtPi pages and shared content links across the supported URL formats.'
    },
    {
      question: 'Where can I paste the embed code?',
      answer:
        'Anywhere that accepts HTML — your blog, docs, CMS, or a custom HTML editor.'
    },
    {
      question: 'What if the QtPi content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
