import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Audiomack',
  slug: 'audiomack',
  color: '#FFA200',
  exampleUrl:
    'https://audiomack.com/djbabygolo-golo-nation/song/nigerian-afrobeats-summer-mixtape-2024',
  metaTitle: 'Audiomack Embed Code Generator — Embed Songs, Albums & Playlists',
  metaDescription:
    'Free Audiomack embed code generator. Paste any Audiomack URL — get a ready-to-paste player for songs, albums, and playlists. No signup.',
  keywords: [
    'embed audiomack',
    'audiomack embed code',
    'audiomack embed code generator',
    'embed audiomack song',
    'embed audiomack playlist',
    'audiomack player embed',
    'audiomack iframe code',
    'embed audiomack album'
  ],
  heroTitle: 'Audiomack Embed Code Generator',
  heroSubtitle:
    'Paste any Audiomack URL — get a ready-to-paste player for hip-hop and afrobeats songs, albums, and playlists.',
  howItWorksHeading: 'How to embed Audiomack content',
  howItWorksSteps: [
    {
      title: 'Paste an Audiomack link',
      description: 'Copy any audiomack.com URL — songs, albums, and playlists.'
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
  explanationHeading: 'Why use our Audiomack embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Audiomack link and get working embed HTML.'
    },
    {
      title: 'All Audiomack content',
      description:
        'Works with songs, albums, and playlists — the tool handles all Audiomack URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Audiomack embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Audiomack player',
      description:
        'Get the real Audiomack player with artwork and playback controls for full-length streaming.'
    },
    {
      title: 'Songs, albums & playlists',
      description:
        'Hip-hop, afrobeats, and more — individual songs, full albums, and playlists all work.'
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
      href: '/tools/embed-url/audius',
      label: 'Audius'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Audiomack song on my website?',
      answer:
        'Paste any Audiomack URL into the tool and click Generate. You will get a ready-to-paste player you can drop into any page.'
    },
    {
      question: 'Can I embed Audiomack albums and playlists?',
      answer:
        'Yes. Songs, albums, and playlists are all supported — the tool detects the URL type automatically.'
    },
    {
      question: 'Does the embed play full songs?',
      answer:
        'Yes. The native Audiomack player streams full-length tracks with artwork and standard playback controls.'
    },
    {
      question: 'What if the Audiomack content is private or unavailable?',
      answer:
        'The tool falls back to a styled preview card with the available title and image.'
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
