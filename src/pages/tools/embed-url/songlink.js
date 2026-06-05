import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Songlink',
  slug: 'songlink',
  color: '#5C67F2',
  exampleUrl: 'https://song.link',
  metaTitle: 'Songlink Embed Code Generator — Embed Smart Music Links',
  metaDescription:
    'Free Songlink embed code generator. Paste any Songlink (Odesli) URL — get a ready-to-paste embed for smart music links to songs and albums. No signup.',
  keywords: [
    'embed songlink',
    'songlink embed code',
    'songlink embed code generator',
    'embed odesli',
    'songlink iframe code',
    'smart music link embed',
    'embed song.link'
  ],
  heroTitle: 'Songlink Embed Code Generator',
  heroSubtitle:
    'Paste any Songlink URL — get a ready-to-paste embed for smart links that open a song or album in any streaming service.',
  howItWorksHeading: 'How to embed Songlink content',
  howItWorksSteps: [
    {
      title: 'Paste a Songlink link',
      description:
        'Copy any song.link or album.link URL from Songlink (Odesli).'
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
  explanationHeading: 'Why use our Songlink embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Songlink URL and get working embed HTML — no copy-pasting markup by hand.'
    },
    {
      title: 'One link, every service',
      description:
        'Let visitors open the track or album in Spotify, Apple Music, or whatever streaming app they prefer.'
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
      title: 'Smart song links',
      description:
        'Embed a single-track smart link that routes each listener to their chosen music service.'
    },
    {
      title: 'Album smart links',
      description:
        'Works with full album smart links so fans can stream the whole release anywhere.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/spotify', label: 'Spotify' },
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' },
    { href: '/tools/embed-url/apple-music', label: 'Apple Music' }
  ],
  faq: [
    {
      question: 'How do I embed a Songlink smart link on my website?',
      answer:
        'Paste the song.link or album.link URL into the tool and click Generate. You get ready-to-paste embed HTML.'
    },
    {
      question: 'Does it work for both songs and albums?',
      answer:
        'Yes. Both single-track and album smart links are detected and embedded correctly.'
    },
    {
      question: 'Why use a Songlink instead of a single streaming link?',
      answer:
        'A smart link lets every visitor open the music in their preferred service rather than forcing one platform.'
    },
    {
      question: 'What if Songlink cannot match a streaming service?',
      answer:
        'The tool falls back to a styled preview card built from the available metadata.'
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
