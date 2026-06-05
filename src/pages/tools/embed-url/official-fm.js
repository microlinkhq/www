import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Official.fm',
  slug: 'official-fm',
  color: '#E91E63',
  exampleUrl: 'https://official.fm',
  metaTitle: 'Official.fm Embed Code Generator — Embed Tracks & Playlists',
  metaDescription:
    'Free Official.fm embed code generator. Paste any Official.fm URL — get a ready-to-paste player for tracks, playlists, and artist pages. No signup.',
  keywords: [
    'embed official.fm',
    'official.fm embed code',
    'official.fm embed code generator',
    'embed official.fm track',
    'official.fm iframe code',
    'official.fm player embed',
    'embed official.fm playlist'
  ],
  heroTitle: 'Official.fm Embed Code Generator',
  heroSubtitle:
    'Paste any Official.fm URL — get a ready-to-paste player for tracks, playlists, and artist pages.',
  howItWorksHeading: 'How to embed Official.fm content',
  howItWorksSteps: [
    {
      title: 'Paste an Official.fm link',
      description:
        'Copy the URL of any Official.fm track, playlist, or artist page and drop it into the field.'
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
  explanationHeading: 'Why use our Official.fm embed code generator',
  reasons: [
    {
      title: 'Tracks and playlists in one tool',
      description:
        'Paste a single track or a full playlist link and get a working player without touching any code.'
    },
    {
      title: 'Handles every Official.fm URL format',
      description:
        'Works with track pages, playlist links, and artist profiles so you never have to hunt for embed settings.'
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
      title: 'Streaming track player',
      description:
        'Embed an inline player so visitors can listen to Official.fm tracks without leaving your page.'
    },
    {
      title: 'Playlist and artist support',
      description:
        'Share full playlists or an artist page and let listeners browse the whole collection in place.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' },
    { href: '/tools/embed-url/spotify', label: 'Spotify' },
    { href: '/tools/embed-url/audiomack', label: 'Audiomack' }
  ],
  faq: [
    {
      question: 'How do I embed an Official.fm track on my website?',
      answer:
        'Paste the track URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can I embed a full Official.fm playlist?',
      answer:
        'Yes. Paste a playlist link and the tool builds a player that plays the entire set.'
    },
    {
      question: 'Does the embedded player keep working on mobile?',
      answer:
        'Yes. The generated player is responsive and plays back on phones, tablets, and desktops.'
    },
    {
      question: 'What if an Official.fm track is private or removed?',
      answer:
        'The tool falls back to a styled preview card with whatever metadata is still available.'
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
