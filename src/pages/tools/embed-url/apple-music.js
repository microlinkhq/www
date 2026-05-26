import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Apple Music',
  slug: 'apple-music',
  color: '#FA243C',
  exampleUrl: 'https://music.apple.com/album/1440833098',
  metaTitle: 'Apple Music Embed Code Generator — Embed Songs & Albums',
  metaDescription:
    'Free Apple Music embed code generator. Paste any Apple Music URL — get a ready-to-paste iframe player for songs, albums, and playlists. No signup.',
  keywords: [
    'embed apple music',
    'apple music embed code',
    'apple music embed generator',
    'apple music iframe',
    'embed apple music playlist',
    'apple music player embed'
  ],
  heroTitle: 'Apple Music Embed Code Generator',
  heroSubtitle:
    'Free Apple Music embed code generator. Paste any Apple Music URL — get a ready-to-paste iframe player for songs, albums, and playlists.',
  howItWorksHeading: 'How to embed Apple Music content',
  howItWorksSteps: [
    {
      title: 'Paste a Apple Music link',
      description: 'Copy any Apple Music URL — songs, albums, and playlists.'
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
  explanationHeading: 'Why use our Apple Music embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Apple Music link and get working embed HTML.'
    },
    {
      title: 'All Apple Music content',
      description:
        'Works with songs, albums, and playlists — the tool handles all Apple Music URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Apple Music embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Apple Music player',
      description:
        'Get the real Apple Music player with album art and playback controls.'
    },
    {
      title: 'Songs, albums & playlists',
      description:
        'Individual songs, full albums, and curated playlists — all Apple Music content types work.'
    },
    {
      title: 'Preview clips',
      description:
        'The embedded player plays preview clips for non-subscribers.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/spotify',
      label: 'Spotify'
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
      question: 'How do I embed Apple Music on my website?',
      answer: 'Paste any Apple Music URL into the tool and click Generate.'
    },
    {
      question: 'Can I embed Apple Music playlists?',
      answer: 'Yes. Songs, albums, and playlists are all supported.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const ApplemusicPage = () => <ProviderSubtool {...data} />

export default ApplemusicPage
