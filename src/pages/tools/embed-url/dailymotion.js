import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Dailymotion',
  slug: 'dailymotion',
  color: '#00AAFF',
  exampleUrl: 'https://www.dailymotion.com/video/x7tgad0',
  metaTitle: 'Dailymotion Embed Code Generator — Embed Videos & Playlists',
  metaDescription:
    'Free Dailymotion embed code generator. Paste any Dailymotion URL — get a ready-to-paste iframe player for videos, playlists, and channels. No signup.',
  keywords: [
    'embed dailymotion',
    'dailymotion embed code',
    'dailymotion embed code generator',
    'embed dailymotion video',
    'dailymotion iframe code',
    'dailymotion player embed',
    'embed dailymotion playlist'
  ],
  heroTitle: 'Dailymotion Embed Code Generator',
  heroSubtitle:
    'Paste any Dailymotion URL — get a ready-to-paste iframe player for videos, playlists, and channels.',
  howItWorksHeading: 'How to embed a Dailymotion video',
  howItWorksSteps: [
    {
      title: 'Paste a Dailymotion link',
      description:
        'Copy any dailymotion.com URL — videos, playlists, and channels all work.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content type and generates the right iframe player HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Dailymotion embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging for the embed snippet. Paste any Dailymotion link and get working iframe HTML.'
    },
    {
      title: 'All Dailymotion content',
      description:
        'Works with videos, playlists, and channels — the tool handles every Dailymotion URL format.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Dailymotion embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Dailymotion player',
      description:
        'Get the real Dailymotion player with playback controls, captions, and quality settings.'
    },
    {
      title: 'Responsive video embed',
      description:
        'The iframe player scales to fit your layout, staying watchable on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/rumble', label: 'Rumble' }
  ],
  faq: [
    {
      question: 'How do I embed a Dailymotion video on my website?',
      answer:
        'Paste any Dailymotion URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Can I embed Dailymotion playlists and channels?',
      answer:
        'Yes. Individual videos, full playlists, and channel pages are all supported.'
    },
    {
      question: 'What if the Dailymotion video is private or geo-restricted?',
      answer:
        'The tool falls back to a styled preview card with the available title and thumbnail.'
    },
    {
      question: 'Is the embedded player responsive?',
      answer:
        'Yes. The iframe player adapts to its container so it stays watchable on any screen size.'
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
