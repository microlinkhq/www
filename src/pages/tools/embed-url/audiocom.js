import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Audio.com',
  slug: 'audiocom',
  color: '#F59E0B',
  exampleUrl:
    'https://audio.com/ilya-korzh/audio/empower-starter-class-audio-track-03-17',
  metaTitle: 'Audio.com Embed Code Generator — Embed Tracks & Collections',
  metaDescription:
    'Free Audio.com embed code generator. Paste any Audio.com URL — get a ready-to-paste player for tracks and collections from Muse Group. No signup.',
  keywords: [
    'embed audio.com',
    'audio.com embed code',
    'audio.com embed code generator',
    'embed audio.com track',
    'audio.com iframe code',
    'audio.com player embed',
    'embed audio.com collection'
  ],
  heroTitle: 'Audio.com Embed Code Generator',
  heroSubtitle:
    'Paste any Audio.com URL — get a ready-to-paste player for tracks and collections hosted on Muse Group’s Audio.com.',
  howItWorksHeading: 'How to embed Audio.com content',
  howItWorksSteps: [
    {
      title: 'Paste an Audio.com link',
      description:
        'Copy any audio.com URL — individual tracks or shared collections.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the audio.com content and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Audio.com embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Share menu. Paste any audio.com link and get working embed HTML.'
    },
    {
      title: 'Tracks and collections',
      description:
        'Works with individual audio.com tracks and shared collections — the tool handles the URL format for you.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Audio.com embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Audio.com player',
      description:
        'Get the real audio.com player with waveform, title, and playback controls.'
    },
    {
      title: 'Tracks & collections',
      description:
        'Single tracks and shared collections both embed with the same paste-and-go flow.'
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
      href: '/tools/embed-url/clyp',
      label: 'Clyp'
    },
    {
      href: '/tools/embed-url/mixcloud',
      label: 'Mixcloud'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Audio.com track on my website?',
      answer:
        'Paste any audio.com URL into the tool and click Generate. You will get a ready-to-paste player you can drop into any page.'
    },
    {
      question: 'Can I embed Audio.com collections?',
      answer:
        'Yes. Both individual tracks and shared collections from audio.com are supported.'
    },
    {
      question: 'Does it work with unlisted Audio.com tracks?',
      answer:
        'Audio.com embeds work with public and unlisted content, but unlisted tracks only play for viewers who have the link.'
    },
    {
      question: 'What if a track cannot be embedded natively?',
      answer:
        'Switch to Card mode and the tool generates a styled preview card with the title and artwork instead.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const AudiocomPage = () => <ProviderSubtool {...data} />

export default AudiocomPage
