import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Ignite',
  slug: 'ignite',
  color: '#E8420A',
  exampleUrl: 'https://ignite.com',
  metaTitle: 'Ignite Embed Code Generator — Embed Ignite Content',
  metaDescription:
    'Free Ignite embed code generator. Paste any Ignite URL — get a ready-to-paste embed for talks, slides, and shared content. No signup.',
  keywords: [
    'embed ignite',
    'ignite embed code',
    'ignite embed code generator',
    'embed ignite talk',
    'ignite iframe code',
    'ignite slides embed',
    'ignite html embed'
  ],
  heroTitle: 'Ignite Embed Code Generator',
  heroSubtitle:
    'Paste any Ignite URL — get a ready-to-paste embed for talks, slides, and shared content.',
  howItWorksHeading: 'How to embed Ignite content',
  howItWorksSteps: [
    {
      title: 'Paste an Ignite link',
      description: 'Copy any Ignite URL — a talk, slide deck, or shared page.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Ignite embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Ignite link and get working embed HTML instantly.'
    },
    {
      title: 'Talks & slides',
      description:
        'Works with Ignite talks, slide decks, and shared content pages.'
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
      title: 'Native Ignite embed',
      description:
        'Get the real Ignite embed with its player or viewer kept intact.'
    },
    {
      title: 'Talks & decks',
      description:
        'Ignite talks, slide decks, and shared pages all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/speakerdeck',
      label: 'Speaker Deck'
    },
    {
      href: '/tools/embed-url/beautiful',
      label: 'Beautiful.ai'
    },
    {
      href: '/tools/embed-url/canva',
      label: 'Canva'
    }
  ],
  faq: [
    {
      question: 'How do I embed Ignite content on my website?',
      answer:
        'Paste any Ignite URL into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'What Ignite content can I embed?',
      answer: 'Talks, slide decks, and shared content pages from Ignite.'
    },
    {
      question: 'Does the embed keep the original player?',
      answer:
        'Yes. When the content supports embedding, the native Ignite player or viewer is preserved.'
    },
    {
      question: 'What if the content cannot be embedded?',
      answer:
        'Switch to Card mode to get a styled preview card with the title and image instead.'
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
