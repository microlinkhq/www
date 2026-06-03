import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SoundCloud',
  slug: 'soundcloud',
  color: '#FF5500',
  exampleUrl: 'https://soundcloud.com/postmalone/white-iverson',
  metaTitle: 'SoundCloud Embed Code Generator — Embed Tracks & Playlists',
  metaDescription:
    'Free SoundCloud embed code generator. Paste any SoundCloud URL — get a ready-to-paste widget player for tracks, sets, playlists, and profiles. No signup.',
  keywords: [
    'embed soundcloud',
    'soundcloud embed code',
    'soundcloud embed code generator',
    'embed soundcloud track',
    'embed soundcloud playlist',
    'soundcloud iframe code',
    'soundcloud player embed'
  ],
  heroTitle: 'SoundCloud Embed Code Generator',
  heroSubtitle:
    'Paste any SoundCloud URL — get a ready-to-paste widget player for tracks, sets, playlists, and user profiles.',
  howItWorksHeading: 'How to embed SoundCloud content',
  howItWorksSteps: [
    {
      title: 'Paste a SoundCloud link',
      description:
        'Copy any SoundCloud URL — individual tracks, sets, playlists, or a user profile.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content type and generates the right SoundCloud widget HTML.'
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
        'Skip digging through the Share menu for embed code. Paste any SoundCloud link and get working HTML.'
    },
    {
      title: 'All SoundCloud content',
      description:
        'Works with tracks, sets, playlists, and user profiles — the tool handles every SoundCloud URL format.'
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
      title: 'Native SoundCloud widget',
      description:
        'Get the real SoundCloud player with the interactive waveform, artwork, and playback controls.'
    },
    {
      title: 'Tracks, sets & profiles',
      description:
        'Single tracks, full sets and playlists, and entire user profiles — all SoundCloud content types work.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/spotify',
      label: 'Spotify'
    },
    {
      href: '/tools/embed-url/mixcloud',
      label: 'Mixcloud'
    },
    {
      href: '/tools/embed-url/audiomack',
      label: 'Audiomack'
    }
  ],
  faq: [
    {
      question: 'How do I embed a SoundCloud track on my website?',
      answer:
        'Paste any SoundCloud track URL into the tool and click Generate. You will get a ready-to-paste widget player.'
    },
    {
      question: 'Can I embed SoundCloud playlists and sets?',
      answer:
        'Yes. Tracks, sets, playlists, and user profiles are all supported — just paste the link.'
    },
    {
      question: 'What if a track cannot be embedded?',
      answer:
        'Some uploaders disable embedding. When that happens, switch to Card mode to get a styled preview card with title and artwork.'
    },
    {
      question: 'Does the embed use the real SoundCloud player?',
      answer:
        'Yes. You get the native SoundCloud widget with the interactive waveform, artwork, and playback controls.'
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
