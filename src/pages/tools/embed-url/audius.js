import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Audius',
  slug: 'audius',
  color: '#7e1bcc',
  exampleUrl: 'https://audius.co/paulineherr/true-colors',
  metaTitle: 'Audius Embed Code Generator — Embed Tracks & Playlists',
  metaDescription:
    'Free Audius embed code generator. Paste any Audius URL — get a ready-to-paste player for tracks, albums, playlists, and artist profiles. No signup.',
  keywords: [
    'embed audius',
    'audius embed code',
    'audius embed code generator',
    'embed audius track',
    'embed audius playlist',
    'audius iframe code',
    'audius player embed',
    'embed audius album'
  ],
  heroTitle: 'Audius Embed Code Generator',
  heroSubtitle:
    'Paste any Audius URL — get a ready-to-paste player for tracks, albums, playlists, and artist profiles.',
  howItWorksHeading: 'How to embed Audius content',
  howItWorksSteps: [
    {
      title: 'Paste an Audius link',
      description:
        'Copy any audius.co URL — a track, album, playlist, or artist profile.'
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
  explanationHeading: 'Why use our Audius embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Audius share menu. Paste any link and get working embed HTML instantly.'
    },
    {
      title: 'All Audius content',
      description:
        'Works with tracks, albums, playlists, and artist profiles — the tool handles every audius.co URL format.'
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
      title: 'Native Audius player',
      description:
        'Get the real Audius player with artwork and streaming playback straight from the decentralized network.'
    },
    {
      title: 'Tracks, albums & playlists',
      description:
        'Individual tracks, full albums, playlists, and artist profiles — every Audius content type works.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    },
    {
      href: '/tools/embed-url/spotify',
      label: 'Spotify'
    },
    {
      href: '/tools/embed-url/audiomack',
      label: 'Audiomack'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Audius track on my website?',
      answer:
        'Paste any audius.co URL into the tool and click Generate. You will get a ready-to-paste player you can drop into any page.'
    },
    {
      question: 'Can I embed Audius playlists and albums?',
      answer:
        'Yes. Tracks, albums, playlists, and artist profiles are all supported.'
    },
    {
      question: 'Why does Audius work well for embedding music?',
      answer:
        'Audius is a decentralized, artist-owned streaming platform, so embeds stream directly from the network with takedown protection and no third-party gatekeeping.'
    },
    {
      question: 'What happens if a track cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card showing the title and artwork, with a link back to the original Audius page.'
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
