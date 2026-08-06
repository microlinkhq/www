import React from 'react'
import { colors } from 'theme'
import {
  Music as MusicIcon,
  Mic as MicIcon,
  Link2 as Link2Icon,
  Zap as ZapIcon,
  Radio as RadioIcon,
  Share2 as Share2Icon
} from 'react-feather'

import { Link } from 'components/elements/Link'

export const ACCENT = colors.pink6
export const TILE_BG = colors.pink0

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.grape9} 0%,
  ${colors.grape9} 48%,
  ${colors.pink9} 48%,
  ${colors.pink9} 52%,
  ${colors.pink8} 52%,
  ${colors.pink8} 65%,
  ${colors.pink7} 65%,
  ${colors.pink7} 79%,
  ${ACCENT} 79%,
  ${ACCENT} 100%
)`

export const HERO = {
  title: 'Audio extraction API for developers',
  description:
    'Find the playable audio behind any URL. Microlink resolves the direct file, its duration and type, so you can stream, transcribe or process it without scraping player markup.',
  ctaHref: '/docs/api/parameters/audio',
  ctaLabel: 'Get Started',
  mqlCode: { url: 'https://soundcloud.com/tycho/tycho-awake', audio: true }
}

export const TIMINGS = {
  title: 'Send the URL',
  subtitle: 'Get the audio file back',
  stats: [
    { healthcheckKey: 'audio', label: 'P95 cold response' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const CAPABILITIES = {
  title: 'A file you can pipe somewhere.',
  caption:
    'Podcast hosts, music platforms and news sites each wrap their audio in a different player. Microlink resolves all of them to one predictable response you can hand to a transcription or processing job.',
  items: [
    {
      icon: Link2Icon,
      title: 'Direct file URL',
      description:
        'A playable audio URL, not an embedded widget, so it can go straight into an audio element, a transcription queue or a storage bucket.'
    },
    {
      icon: MicIcon,
      title: 'Ready for transcription',
      description:
        'Because you get the media rather than the page, the output drops directly into a speech-to-text pipeline with no intermediate scraping step.'
    },
    {
      icon: RadioIcon,
      title: 'Works across platforms',
      description:
        'Podcast feeds, music platforms, news articles and blogs all return the same response shape instead of a bespoke integration each.'
    },
    {
      icon: MusicIcon,
      title: 'Rendered before detection',
      description:
        'Players that mount only after JavaScript runs are still detected, because the page is fully rendered before audio is resolved.'
    },
    {
      icon: Share2Icon,
      title: 'Pairs with metadata',
      description: (
        <>
          Combine with <Link href='/metadata'>metadata</Link> to get the title,
          author and artwork in the same call as the audio file.
        </>
      )
    },
    {
      icon: ZapIcon,
      title: 'Cached at the edge',
      description: (
        <>
          Set a <Link href='/features/ttl'>ttl</Link> and repeat lookups return
          instantly from cache — free, with no browser boot.
        </>
      )
    }
  ]
}

export const PRICING_CAPTION =
  'No signup, no API key, no credit card. The audio extraction API is free to start — just call the endpoint.'

export const CTA = {
  caption:
    'Get 25 requests/day with zero commitment. The audio extraction API is free to use, with no account and no credit card. Send a URL and get a playable file back in seconds.',
  ctaHref: '/docs/api/parameters/audio',
  ctaLabel: 'Get started free'
}

export const FAQ_CAPTION =
  'Everything you need to know about the Microlink audio extraction API.'

export const FAQ_ITEMS = [
  {
    question: 'What does the API return for audio?',
    text: 'A direct, playable file URL together with the media type and, when the source exposes it, the duration. That is enough to stream the audio, queue a transcription job, or archive the file.'
  },
  {
    question: 'Can I feed the result straight into a transcription service?',
    text: 'Yes. Because the response is the media file rather than the page that hosts it, it drops directly into a speech-to-text pipeline without an intermediate scraping or download step.'
  },
  {
    question: 'Does it work when the player loads via JavaScript?',
    text: 'Yes. Detection runs in a real browser after the page has settled, so players that only mount client-side are still found. A plain HTTP fetch would miss them entirely.'
  },
  {
    question: 'Can I get the title and artwork at the same time?',
    text: 'Yes. Request metadata alongside audio and a single call returns the title, author and artwork together with the audio file, so you pay for one render instead of two.'
  },
  {
    question: 'What if a site blocks automated requests?',
    text: 'Enable proxy resolution to route through residential IPs. Antibot detection reports which provider blocked a request if one still does, so you know whether to retry or escalate.'
  },
  {
    question: 'Is every lookup billed?',
    text: 'No. Set a ttl and repeat lookups for the same URL inside that window are served from the edge cache instantly, at no cost and without booting a browser.'
  }
]

export const META = {
  title: 'Audio Extraction API - Direct Audio File URL',
  description:
    'Extract the direct audio file URL, duration and type from any web page. Real browser detection, transcription-ready output, proxy support. 25 free requests/day.',
  structuredName: 'Microlink Audio API',
  structuredDescription:
    'A developer-first API that resolves the direct playable audio file behind any URL, returning media type and duration, with real browser detection, residential proxy resolution and global edge caching.',
  keywords: [
    'audio extraction api',
    'get audio url from webpage',
    'podcast audio api',
    'extract audio from url',
    'audio metadata api',
    'direct audio file api'
  ],
  about: [
    {
      name: 'Digital audio',
      sameAs: 'https://en.wikipedia.org/wiki/Digital_audio'
    },
    {
      name: 'Web scraping',
      sameAs: 'https://en.wikipedia.org/wiki/Web_scraping'
    },
    {
      name: 'Speech recognition',
      sameAs: 'https://en.wikipedia.org/wiki/Speech_recognition'
    }
  ]
}
