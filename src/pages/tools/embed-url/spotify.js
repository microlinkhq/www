import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Spotify',
  slug: 'spotify',
  color: '#1ED760',
  exampleUrl: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
  metaTitle: 'Spotify Embed Code Generator — Embed Tracks & Playlists',
  metaDescription:
    'Free Spotify embed code generator. Paste any Spotify URL — get a ready-to-paste iframe player for tracks, albums, playlists, and podcasts. No signup.',
  keywords: [
    'embed spotify',
    'spotify embed code',
    'spotify embed code generator',
    'embed spotify playlist',
    'spotify iframe code',
    'spotify player embed',
    'embed spotify track'
  ],
  heroTitle: 'Spotify Embed Code Generator',
  heroSubtitle:
    'Paste any Spotify URL — get a ready-to-paste iframe player for tracks, albums, playlists, and podcasts.',
  howItWorksHeading: 'How to embed Spotify content',
  howItWorksSteps: [
    {
      title: 'Paste a Spotify link',
      description:
        'Copy any Spotify URL — tracks, albums, playlists, and podcasts.'
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
  explanationHeading: 'Why use our Spotify embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Spotify link and get working embed HTML.'
    },
    {
      title: 'All Spotify content',
      description:
        'Works with tracks, albums, playlists, and podcasts — the tool handles all Spotify URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Spotify embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Spotify player',
      description:
        'Get the real Spotify player with album art, playback controls, and preview clips.'
    },
    {
      title: 'Tracks, albums & playlists',
      description:
        'Individual tracks, full albums, playlists, and podcast episodes — all Spotify content types work.'
    },
    {
      title: 'Compact and full sizes',
      description:
        'The embed adapts to your layout — compact for inline use or full-size for feature placement.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/apple-music',
      label: 'Apple Music'
    },
    {
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    },
    {
      href: '/tools/embed-url/bandcamp',
      label: 'Bandcamp'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Spotify track on my website?',
      answer:
        'Paste any Spotify URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Can I embed Spotify playlists?',
      answer:
        'Yes. Playlists, albums, tracks, and podcast episodes are all supported.'
    },
    {
      question: 'Does the embed play full songs?',
      answer:
        'The embed plays 30-second previews for non-logged-in users. Logged-in Spotify users get full playback.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const SpotifyPage = () => <ProviderSubtool {...data} />

export default SpotifyPage
