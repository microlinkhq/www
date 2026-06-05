import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Hulu',
  slug: 'hulu',
  color: '#1CE783',
  exampleUrl:
    'https://www.hulu.com/series/only-murders-in-the-building-ef31c7e1-cd0f-4e07-848d-1cbfedb50ddf',
  metaTitle: 'Hulu Embed Code Generator — Embed Show & Movie Link Cards',
  metaDescription:
    'Free Hulu embed code generator. Paste a Hulu series or movie URL — get a styled preview card with title, image, and description. No signup.',
  keywords: [
    'embed hulu',
    'hulu embed code',
    'hulu embed code generator',
    'embed hulu show',
    'embed hulu link',
    'hulu preview card',
    'share hulu link'
  ],
  heroTitle: 'Hulu Embed Code Generator',
  heroSubtitle:
    'Paste a Hulu series or movie URL — get a styled preview card with the title, artwork, and description ready to paste.',
  howItWorksHeading: 'How to embed a Hulu link',
  howItWorksSteps: [
    {
      title: 'Paste a Hulu link',
      description:
        'Copy any hulu.com URL — series, movie, or episode pages all work.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and builds a styled preview card with the title, image, and description.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Hulu embed code generator',
  reasons: [
    {
      title: 'Preview card, not a player',
      description:
        'Hulu does not offer public iframe embeds of its shows, so the tool generates a clean link preview card instead of a playable video.'
    },
    {
      title: 'Works with any Hulu URL',
      description:
        'Paste a series, movie, or episode link from hulu.com and get a card built from the page title, artwork, and description.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Hulu embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Rich link preview',
      description:
        'A styled card pulls the show or movie title, poster image, and description straight from the Hulu page.'
    },
    {
      title: 'Responsive layout',
      description:
        'The card scales to fit your content width, from inline placement to full-width feature blocks.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    },
    {
      href: '/tools/embed-url/dailymotion',
      label: 'Dailymotion'
    }
  ],
  faq: [
    {
      question: 'Can I embed a playable Hulu video on my website?',
      answer:
        'No. Hulu does not provide public iframe embeds for its shows or movies, so playback is not possible outside Hulu. The tool generates a styled preview card that links back to Hulu instead.'
    },
    {
      question: 'What does the Hulu embed actually produce?',
      answer:
        'A preview card built from the page metadata — the title, poster image, and description — with a link to the Hulu page where viewers can watch.'
    },
    {
      question: 'Which Hulu URLs are supported?',
      answer:
        'Any public hulu.com link works, including series, movie, and episode pages. Paste the URL and the tool reads the available metadata.'
    },
    {
      question: 'Can I customize how the card looks?',
      answer:
        'Yes. Switch to Card mode to adjust colors, fonts, and layout before copying the HTML.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const HuluPage = () => <ProviderSubtool {...data} />

export default HuluPage
