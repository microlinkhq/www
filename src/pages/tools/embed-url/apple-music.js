import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Apple Music',
  slug: 'apple-music',
  color: '#FC3C44',
  exampleUrl:
    'https://music.apple.com/us/playlist/rap-life/pl.abe8ba42278f4ef490e3a9fc5ec8e8c5',
  metaTitle:
    'Apple Music Embed Code Generator — Embed Songs, Albums & Playlists',
  metaDescription:
    'Free Apple Music embed code generator. Paste any music.apple.com URL — get a ready-to-paste player for songs, albums, playlists, and music videos. No signup.',
  keywords: [
    'embed apple music',
    'apple music embed code',
    'apple music embed code generator',
    'embed apple music playlist',
    'embed apple music album',
    'apple music iframe code',
    'apple music player embed',
    'embed apple music song'
  ],
  heroTitle: 'Apple Music Embed Code Generator',
  heroSubtitle:
    'Paste any Apple Music URL — get a ready-to-paste player for songs, albums, playlists, and music videos.',
  howItWorksHeading: 'How to embed Apple Music content',
  howItWorksSteps: [
    {
      title: 'Paste an Apple Music link',
      description:
        'Copy any music.apple.com URL — songs, albums, playlists, or music videos.'
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
        'Skip digging through the Share menu for embed code. Paste any Apple Music link and get working embed HTML.'
    },
    {
      title: 'All Apple Music content',
      description:
        'Works with songs, albums, playlists, and music videos — the tool handles every music.apple.com URL format.'
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
        'Get the real Apple Music player with album art, track list, and play controls.'
    },
    {
      title: 'Songs, albums & playlists',
      description:
        'Individual songs, full albums, curated playlists, and music videos — all Apple Music content types work.'
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
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    },
    {
      href: '/tools/embed-url/mixcloud',
      label: 'Mixcloud'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Apple Music playlist on my website?',
      answer:
        'Paste any music.apple.com URL into the tool and click Generate. You will get a ready-to-paste player you can drop into any page.'
    },
    {
      question: 'What Apple Music content can I embed?',
      answer:
        'Songs, albums, playlists, and music videos are all supported — paste any Apple Music link and the tool handles the rest.'
    },
    {
      question: 'Does the embed play full songs?',
      answer:
        'The embed plays roughly 30-second previews for non-subscribers. Apple Music subscribers who are signed in get full playback.'
    },
    {
      question: 'What if a link cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the title and artwork, which you can customize in Card mode before copying.'
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
