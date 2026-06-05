import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Insight Timer',
  slug: 'insighttimer',
  color: '#00A0B0',
  exampleUrl: 'https://insighttimer.com',
  metaTitle: 'Insight Timer Embed Code Generator — Embed Guided Meditations',
  metaDescription:
    'Free Insight Timer embed code generator. Paste any Insight Timer URL — get a ready-to-paste player for guided meditations, tracks, and talks. No signup.',
  keywords: [
    'embed insight timer',
    'insight timer embed code',
    'insight timer embed code generator',
    'embed guided meditation',
    'insight timer iframe code',
    'insight timer player embed',
    'embed meditation audio'
  ],
  heroTitle: 'Insight Timer Embed Code Generator',
  heroSubtitle:
    'Paste any Insight Timer URL — get a ready-to-paste player for guided meditations, tracks, and talks.',
  howItWorksHeading: 'How to embed Insight Timer content',
  howItWorksSteps: [
    {
      title: 'Paste an Insight Timer link',
      description:
        'Copy any insighttimer.com URL — a guided meditation, track, or talk.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content and generates the right player embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Insight Timer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Insight Timer link and get working player embed HTML instantly.'
    },
    {
      title: 'Meditations & tracks',
      description:
        'Works with guided meditations, music tracks, and talks from Insight Timer.'
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
      title: 'Native audio player',
      description:
        'Get the Insight Timer player with artwork and playback controls so visitors can listen in place.'
    },
    {
      title: 'Meditations, music & talks',
      description:
        'Guided meditations, music tracks, and teacher talks from Insight Timer all embed cleanly.'
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
      href: '/tools/embed-url/audiomack',
      label: 'Audiomack'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Insight Timer meditation on my website?',
      answer:
        'Paste any Insight Timer URL into the tool and click Generate. You will get a ready-to-paste player.'
    },
    {
      question: 'What is Insight Timer?',
      answer:
        'Insight Timer is a meditation app with a large free library of guided meditations, music tracks, and talks.'
    },
    {
      question: 'What Insight Timer content can I embed?',
      answer:
        'Guided meditations, music tracks, and talks that are shared publicly on Insight Timer.'
    },
    {
      question: 'What if a track cannot be embedded?',
      answer:
        'Switch to Card mode to get a styled preview card with the title and image instead.'
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
