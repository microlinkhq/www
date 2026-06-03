import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Annie Music',
  slug: 'anniemusic',
  color: '#D4F23F',
  exampleUrl: 'https://anniemusic.app/t/820',
  metaTitle: 'Annie Music Embed Code Generator — Embed Song Smart Links',
  metaDescription:
    'Free Annie Music embed code generator. Paste an anniemusic.app smart link — get a clean preview card linking to Spotify, Apple Music, Deezer, and more. No signup.',
  keywords: [
    'embed annie music',
    'annie music embed code',
    'anniemusic embed generator',
    'embed anniemusic smart link',
    'annie music link embed',
    'anniemusic.app embed',
    'embed song smart link'
  ],
  heroTitle: 'Annie Music Embed Code Generator',
  heroSubtitle:
    'Paste an Annie Music smart link — get a clean preview card you can drop into any page.',
  howItWorksHeading: 'How to embed an Annie Music smart link',
  howItWorksSteps: [
    {
      title: 'Paste an Annie Music link',
      description:
        'Copy any anniemusic.app smart link — the single URL that opens a song across Spotify, Apple Music, Deezer, and other services.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the link metadata — track title, artist, and cover art — and builds a preview card.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Annie Music embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Annie Music does not publish an iframe player, so we read the link metadata and build the embed for you.'
    },
    {
      title: 'Smart link aware',
      description:
        'Designed for anniemusic.app share links that fan out to Spotify, Apple Music, Deezer, and more from one URL.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Annie Music embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Smart link preview',
      description:
        'Surfaces the song title, artist, and cover art behind an Annie Music share link in one tidy card.'
    },
    {
      title: 'Responsive card',
      description:
        'The preview card scales to fit your column width and links back to the Annie Music page on click.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/songlink', label: 'Songlink' },
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' },
    { href: '/tools/embed-url/audiomack', label: 'Audiomack' }
  ],
  faq: [
    {
      question: 'How do I embed an Annie Music link on my website?',
      answer:
        'Paste any anniemusic.app smart link into the tool and click Generate. You will get a preview card you can copy and paste.'
    },
    {
      question: 'Does Annie Music have a native embed player?',
      answer:
        'No. Annie Music is a smart-link service that routes a single URL to Spotify, Apple Music, Deezer, and other platforms, so the tool builds a preview card instead of an inline player.'
    },
    {
      question: 'What does the preview card show?',
      answer:
        'It pulls the available metadata — track title, artist, and cover art — and links back to the Annie Music page so visitors can open the song on their preferred service.'
    },
    {
      question: 'What if the Annie Music link has limited metadata?',
      answer:
        'The tool falls back to a styled preview card with whatever title and image are available for the link.'
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
