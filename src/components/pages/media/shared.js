import React from 'react'
import { colors } from 'theme'
import {
  Film as FilmIcon,
  Link2 as Link2Icon,
  Mic as MicIcon,
  Video as VideoIcon,
  Share2 as Share2Icon
} from 'react-feather'

import { Link } from 'components/elements/Link'

export const ACCENT = colors.grape7
export const TILE_BG = colors.grape0

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.violet9} 0%,
  ${colors.violet9} 48%,
  ${colors.grape9} 48%,
  ${colors.grape9} 52%,
  ${colors.grape8} 52%,
  ${colors.grape8} 65%,
  ${colors.pink7} 65%,
  ${colors.pink7} 79%,
  ${ACCENT} 79%,
  ${ACCENT} 100%
)`

export const HERO = {
  title: 'Media extraction API for developers',
  description:
    'Find the playable video or audio behind any URL. Microlink resolves the direct file, its dimensions, duration and type, so you can embed, transcribe or process it without scraping player markup.',
  ctaHref: '/docs/api/parameters/video',
  ctaLabel: 'Get Started',
  examples: [
    {
      label: 'Video',
      mqlCode: { url: 'https://vimeo.com/571394002', video: true }
    },
    {
      label: 'Audio',
      mqlCode: { url: 'https://soundcloud.com/tycho/tycho-awake', audio: true }
    }
  ]
}

export const TIMINGS = {
  title: 'Send the URL',
  subtitle: 'Get the media file back',
  stats: [
    { healthcheckKey: 'video', label: 'P95 video response' },
    { healthcheckKey: 'audio', label: 'P95 audio response' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const CAPABILITIES = {
  title: 'The file,',
  titleAccent: 'not the player.',
  titleBreak: false,
  caption:
    'Every platform hides its media behind a different player, a different embed shape and a different set of scripts. Microlink resolves video and audio alike into one predictable response you can render, transcribe or process.',
  items: [
    {
      icon: Link2Icon,
      title: 'Direct file URL',
      description:
        'The response carries a playable URL — video or audio — not an iframe or a player widget, so it goes straight to a media element, a pipeline or a storage bucket.'
    },
    {
      icon: FilmIcon,
      title: 'Dimensions and duration',
      description:
        'Width, height, duration and media type come back with the URL, so you can lay out a player without a layout shift or a probe request.'
    },
    {
      icon: MicIcon,
      title: 'Ready for transcription',
      description:
        'Because you get the media rather than the page, audio drops directly into a speech-to-text pipeline with no intermediate scraping step.'
    },
    {
      icon: VideoIcon,
      title: 'Rendered before detection',
      description:
        'Players that only mount after JavaScript runs are still found, because detection happens in a real browser after the page settles.'
    },
    {
      icon: Share2Icon,
      title: 'Pairs with metadata',
      description: (
        <>
          Combine with <Link href='/metadata'>metadata</Link> to get the title,
          description, artwork or poster image in the same call as the media
          file.
        </>
      )
    }
  ]
}

export const PRICING_CAPTION =
  'No signup, no API key, no credit card. The media extraction API is free to start — just call the endpoint.'

export const CTA = {
  caption:
    'Get 25 requests/day with zero commitment. The media extraction API is free to use, with no account and no credit card. Send a URL and get a playable file back in seconds.',
  ctaHref: '/docs/api/parameters/video',
  ctaLabel: 'Get started free'
}

export const FAQ_CAPTION =
  'Everything you need to know about the Microlink media extraction API.'

export const FAQ_ITEMS = [
  {
    question: 'What does the API return for a video or an audio file?',
    text: 'A direct, playable file URL together with the media type and, when the source exposes them, the duration and — for video — the width and height. That is enough to render a player, queue a transcription job or archive the file without touching the original page.'
  },
  {
    question: 'Do I get an embed code or an actual file?',
    text: 'An actual file URL. If you want embeddable player markup instead, the embed product returns a ready-to-drop iframe for the same URL.',
    answer: (
      <>
        <div>
          An actual file URL. That is the difference between this and an oEmbed
          style integration — you get media you can process, not markup you have
          to trust.
        </div>
        <div>
          If you want embeddable player markup instead,{' '}
          <Link href='/embed'>embed</Link> returns a ready-to-drop iframe for
          the same URL.
        </div>
      </>
    )
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
    question: 'Can I get the title, artwork or poster image at the same time?',
    text: 'Yes. Request metadata alongside video or audio and a single call returns the title, description and imagery together with the media file, so you pay for one render instead of two.'
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
  title: 'Media Extraction API - Video & Audio File URLs',
  description:
    'Extract direct video and audio file URLs from any web page, with dimensions, duration and type. Real browser detection, proxy support, edge caching. 25 free requests/day.',
  structuredName: 'Microlink Media API',
  structuredDescription:
    'A developer-first API that resolves the direct playable video or audio file behind any URL, returning media type, dimensions and duration, with real browser detection, residential proxy resolution and global edge caching.',
  keywords: [
    'media extraction api',
    'video extraction api',
    'audio extraction api',
    'get video url from webpage',
    'extract audio from url',
    'direct media file api'
  ],
  about: [
    {
      name: 'Video',
      sameAs: 'https://en.wikipedia.org/wiki/Video'
    },
    {
      name: 'Digital audio',
      sameAs: 'https://en.wikipedia.org/wiki/Digital_audio'
    },
    {
      name: 'Headless browser',
      sameAs: 'https://en.wikipedia.org/wiki/Headless_browser'
    }
  ]
}
