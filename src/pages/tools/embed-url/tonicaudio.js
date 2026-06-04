import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Tonic Audio',
  slug: 'tonicaudio',
  color: '#666666',
  exampleUrl: 'https://tonicaudio.com',
  metaTitle: 'Tonic Audio Embed Code Generator — Embed Audio Tracks',
  metaDescription:
    'Free Tonic Audio embed code generator. Paste any Tonic Audio URL — get a ready-to-paste audio player or preview card. No signup.',
  keywords: [
    'embed tonic audio',
    'tonic audio embed code',
    'tonic audio embed code generator',
    'embed tonic audio track',
    'tonic audio iframe code',
    'tonic audio player embed',
    'embed audio track'
  ],
  heroTitle: 'Tonic Audio Embed Code Generator',
  heroSubtitle:
    'Paste any Tonic Audio URL — get a ready-to-paste audio player for tracks, or a styled preview card.',
  howItWorksHeading: 'How to embed Tonic Audio content',
  howItWorksSteps: [
    {
      title: 'Paste a Tonic Audio link',
      description: 'Copy the URL of any Tonic Audio track and paste it in.'
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
  explanationHeading: 'Why use our Tonic Audio embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the dashboard. Paste a Tonic Audio link and get working embed HTML in one step.'
    },
    {
      title: 'Audio playback',
      description:
        'Generate a player that streams Tonic Audio tracks directly inside your page.'
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
      title: 'Inline audio player',
      description:
        'Embed a player so visitors can listen to Tonic Audio tracks without leaving your page.'
    },
    {
      title: 'Responsive layout',
      description:
        'The generated player scales to fit any column width across desktop and mobile.'
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
      question: 'How do I embed a Tonic Audio track on my website?',
      answer:
        'Paste the Tonic Audio URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can visitors play the audio directly on my page?',
      answer:
        'Yes. The embedded player streams the track inline so visitors can listen without leaving.'
    },
    {
      question: 'Is the embedded player responsive?',
      answer:
        'Yes. The player adapts to the width of its container on both desktop and mobile.'
    },
    {
      question: 'What if the Tonic Audio content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
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
