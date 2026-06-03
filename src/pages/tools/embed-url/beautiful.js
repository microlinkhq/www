import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Beautiful.ai',
  slug: 'beautiful',
  color: '#001A24',
  exampleUrl: 'https://www.beautiful.ai/presentations/startup-pitch-deck',
  metaTitle: 'Beautiful.ai Embed Code Generator — Embed Slides & Decks',
  metaDescription:
    'Free Beautiful.ai embed code generator. Paste a Beautiful.ai presentation URL — get a ready-to-paste preview card for your slides and decks. No signup.',
  keywords: [
    'embed beautiful.ai',
    'beautiful.ai embed code',
    'beautiful.ai embed code generator',
    'embed beautiful.ai presentation',
    'beautiful.ai slides embed',
    'embed beautiful.ai deck',
    'beautiful.ai presentation preview'
  ],
  heroTitle: 'Beautiful.ai Embed Code Generator',
  heroSubtitle:
    'Paste a Beautiful.ai presentation URL — get a ready-to-paste preview card for your slides and decks.',
  howItWorksHeading: 'How to embed a Beautiful.ai presentation',
  howItWorksSteps: [
    {
      title: 'Paste a Beautiful.ai link',
      description:
        'Copy any beautiful.ai URL — presentation pages, player links, and template decks.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the deck title and cover image and generates a styled preview card.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Beautiful.ai embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Beautiful.ai share menus. Paste any link and get a ready-to-paste card.'
    },
    {
      title: 'Works without a player URL',
      description:
        'Beautiful.ai only exposes native iframe embeds for public decks. Our card works from any presentation link.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Beautiful.ai embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Deck preview card',
      description:
        'A clean card with the presentation title and cover slide that links straight to the live deck.'
    },
    {
      title: 'Slides, decks & templates',
      description:
        'Works with Beautiful.ai presentation pages, shared player links, and template galleries.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/prezi', label: 'Prezi' },
    { href: '/tools/embed-url/slideshare', label: 'SlideShare' },
    { href: '/tools/embed-url/canva', label: 'Canva' }
  ],
  faq: [
    {
      question: 'How do I embed a Beautiful.ai presentation on my website?',
      answer:
        'Paste a Beautiful.ai URL into the tool and click Generate. You will get a ready-to-paste preview card linking to the deck.'
    },
    {
      question: 'Does this generate a native Beautiful.ai embed?',
      answer:
        'Beautiful.ai only provides native iframe embeds for public decks shared through its player. When one is not available, the tool generates a styled preview card instead.'
    },
    {
      question: 'What if my Beautiful.ai deck is private?',
      answer:
        'Private and secured decks cannot be read. Set the deck permission to public, or the tool falls back to a preview card with whatever metadata is available.'
    },
    {
      question: 'Can I embed Beautiful.ai templates?',
      answer:
        'Yes. Template and presentation pages on beautiful.ai work — the tool builds a card from the page title and cover image.'
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
