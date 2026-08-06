import React from 'react'
import { colors } from 'theme'
import {
  Video as VideoIcon,
  Film as FilmIcon,
  Link2 as Link2Icon,
  Zap as ZapIcon,
  Monitor as MonitorIcon,
  Share2 as Share2Icon
} from 'react-feather'

import { Link } from 'components/elements/Link'

export const ACCENT = colors.violet7
export const TILE_BG = colors.violet0

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.indigo9} 0%,
  ${colors.indigo9} 48%,
  ${colors.violet9} 48%,
  ${colors.violet9} 52%,
  ${colors.violet8} 52%,
  ${colors.violet8} 65%,
  ${colors.grape7} 65%,
  ${colors.grape7} 79%,
  ${ACCENT} 79%,
  ${ACCENT} 100%
)`

export const HERO = {
  title: 'Video extraction API for developers',
  description:
    'Find the playable video behind any URL. Microlink resolves the direct file, its dimensions, duration and type, so you can embed or process it without scraping player markup.',
  ctaHref: '/docs/api/parameters/video',
  ctaLabel: 'Get Started',
  mqlCode: { url: 'https://vimeo.com/571394002', video: true }
}

export const TIMINGS = {
  title: 'Send the URL',
  subtitle: 'Get the video file back',
  stats: [
    { healthcheckKey: 'video', label: 'P95 cold response' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const CAPABILITIES = {
  title: 'The file, not the player.',
  caption:
    'Every platform hides its media behind a different player, a different embed shape and a different set of scripts. Microlink normalises all of them into one predictable response.',
  items: [
    {
      icon: Link2Icon,
      title: 'Direct file URL',
      description:
        'The response carries a playable URL, not an iframe or a player widget, so you can hand it straight to a video element or a processing job.'
    },
    {
      icon: FilmIcon,
      title: 'Dimensions and duration',
      description:
        'Width, height, duration and media type come back with the URL, so you can lay out a player without a layout shift or a probe request.'
    },
    {
      icon: MonitorIcon,
      title: 'Works across platforms',
      description:
        'One request shape covers social posts, video hosts, news sites and blogs, instead of a bespoke integration for each provider.'
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
          description and poster image in the same call as the video.
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
  'No signup, no API key, no credit card. The video extraction API is free to start — just call the endpoint.'

export const CTA = {
  caption:
    'Get 25 requests/day with zero commitment. The video extraction API is free to use, with no account and no credit card. Send a URL and get a playable file back in seconds.',
  ctaHref: '/docs/api/parameters/video',
  ctaLabel: 'Get started free'
}

export const FAQ_CAPTION =
  'Everything you need to know about the Microlink video extraction API.'

export const FAQ_ITEMS = [
  {
    question: 'What does the API return for a video?',
    text: 'A direct, playable file URL together with the media type and, when the source exposes them, the width, height and duration. That is enough to render a player or queue a processing job without touching the original page.'
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
    question: 'Does it work when the player loads via JavaScript?',
    text: 'Yes. Detection runs in a real browser after the page has settled, so players that only mount client-side are still found. A plain HTTP fetch would miss them entirely.'
  },
  {
    question: 'Can I get the poster image and title at the same time?',
    text: 'Yes. Request metadata alongside video and a single call returns the title, description and preview image together with the video file, so you pay for one render instead of two.'
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
  title: 'Video Extraction API - Direct Video File URL',
  description:
    'Extract the direct video file URL, dimensions, duration and type from any web page. Real browser detection, proxy support and edge caching. 25 free requests/day.',
  structuredName: 'Microlink Video API',
  structuredDescription:
    'A developer-first API that resolves the direct playable video file behind any URL, returning media type, dimensions and duration, with real browser detection, residential proxy resolution and global edge caching.',
  keywords: [
    'video extraction api',
    'get video url from webpage',
    'video scraping api',
    'extract video from url',
    'video metadata api',
    'direct video file api'
  ],
  about: [
    {
      name: 'Video',
      sameAs: 'https://en.wikipedia.org/wiki/Video'
    },
    {
      name: 'Web scraping',
      sameAs: 'https://en.wikipedia.org/wiki/Web_scraping'
    },
    {
      name: 'Headless browser',
      sameAs: 'https://en.wikipedia.org/wiki/Headless_browser'
    }
  ]
}
