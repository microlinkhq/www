import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SoundCloud',
  slug: 'soundcloud',
  color: '#FF5500',
  exampleUrl: 'https://soundcloud.com/artist/track-name',
  metaTitle: 'SoundCloud Embed Code Generator — Embed Tracks & Playlists',
  metaDescription:
    'Free SoundCloud embed code generator. Paste any SoundCloud URL — get a ready-to-paste iframe player for tracks, playlists, and profiles. No signup.',
  keywords: [
    'embed soundcloud',
    'soundcloud embed code',
    'soundcloud embed generator',
    'soundcloud iframe',
    'embed soundcloud track',
    'soundcloud player embed'
  ],
  heroTitle: 'SoundCloud Embed Code Generator',
  heroSubtitle:
    'Paste any SoundCloud URL — get a ready-to-paste iframe player for tracks, playlists, and profiles.',
  howItWorksHeading: 'How to embed SoundCloud content',
  howItWorksSteps: [
    {
      title: 'Paste a SoundCloud link',
      description: 'Copy any SoundCloud URL — tracks, playlists, and profiles.'
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
  explanationHeading: 'Why use our SoundCloud embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any SoundCloud link and get working embed HTML.'
    },
    {
      title: 'All SoundCloud content',
      description:
        'Works with tracks, playlists, and profiles — the tool handles all SoundCloud URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 SoundCloud embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native SoundCloud player',
      description:
        'Get the real SoundCloud waveform player with playback controls and comments.'
    },
    {
      title: 'Tracks, sets & profiles',
      description:
        'Individual tracks, playlists/sets, and artist profiles — all SoundCloud content types work.'
    },
    {
      title: 'Waveform visualization',
      description:
        'The embedded player shows the interactive waveform — click to seek, see peak levels.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/spotify',
      label: 'Spotify'
    },
    {
      href: '/tools/embed-url/bandcamp',
      label: 'Bandcamp'
    },
    {
      href: '/tools/embed-url/apple-music',
      label: 'Apple Music'
    }
  ],
  faq: [
    {
      question: 'How do I embed a SoundCloud track?',
      answer: 'Paste any SoundCloud URL into the tool and click Generate.'
    },
    {
      question: 'Can I embed SoundCloud playlists?',
      answer:
        'Yes. Playlists, individual tracks, and artist profiles are all supported.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const SoundcloudPage = () => <ProviderSubtool {...data} />

export default SoundcloudPage
