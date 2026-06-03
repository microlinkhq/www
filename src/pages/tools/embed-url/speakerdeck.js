import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Speaker Deck',
  slug: 'speakerdeck',
  color: '#009287',
  exampleUrl:
    'https://speakerdeck.com/badams/crawling-and-indexing-and-ranking-in-google-in-2024',
  metaTitle: 'Speaker Deck Embed Code Generator — Embed Slide Decks',
  metaDescription:
    'Free Speaker Deck embed code generator. Paste any Speaker Deck URL — get a ready-to-paste iframe player for slide decks and presentations. No signup.',
  keywords: [
    'embed speakerdeck',
    'speakerdeck embed code',
    'speaker deck embed code generator',
    'embed speakerdeck presentation',
    'speakerdeck iframe code',
    'embed speaker deck slides',
    'speakerdeck player embed'
  ],
  heroTitle: 'Speaker Deck Embed Code Generator',
  heroSubtitle:
    'Paste any Speaker Deck URL — get a ready-to-paste iframe player for slide decks and presentations.',
  howItWorksHeading: 'How to embed a Speaker Deck presentation',
  howItWorksSteps: [
    {
      title: 'Paste a Speaker Deck link',
      description:
        'Copy any speakerdeck.com presentation URL — the link to a published slide deck.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the deck and generates the right iframe player embed HTML.'
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
        'Skip digging through the Share menu. Paste any Speaker Deck link and get working embed HTML.'
    },
    {
      title: 'Slide-perfect player',
      description:
        'The embed keeps the deck readable with arrow navigation and the original slide aspect ratio.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Speaker Deck embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Speaker Deck player',
      description:
        'Get the real Speaker Deck iframe player so visitors can flip through every slide inline.'
    },
    {
      title: 'Responsive embed',
      description:
        'The player keeps the deck aspect ratio and scales to fit your page on any screen size.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/slideshare', label: 'SlideShare' },
    { href: '/tools/embed-url/scribd', label: 'Scribd' },
    { href: '/tools/embed-url/prezi', label: 'Prezi' }
  ],
  faq: [
    {
      question: 'How do I embed a Speaker Deck presentation on my website?',
      answer:
        'Paste any Speaker Deck presentation URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Can visitors navigate through the slides?',
      answer:
        'Yes. The native Speaker Deck player lets visitors move through every slide with the arrow controls inline on your page.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The player keeps the original slide aspect ratio and scales to fit the width of your page.'
    },
    {
      question: 'What if the presentation is private or unlisted?',
      answer:
        'When native embedding is restricted, the tool falls back to a styled preview card with the available title and image.'
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
