import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'iHeartRadio',
  slug: 'iheartradio',
  color: '#C6002B',
  exampleUrl: 'https://www.iheart.com/podcast/51-the-breakfast-club-24992238/',
  metaTitle:
    'iHeartRadio Embed Code Generator — Embed Stations, Podcasts & Playlists',
  metaDescription:
    'Free iHeartRadio embed code generator. Paste any iHeart URL — get a ready-to-paste widget for live stations, podcasts, and playlists. No signup.',
  keywords: [
    'embed iheartradio',
    'iheartradio embed code',
    'iheartradio embed code generator',
    'embed iheartradio podcast',
    'embed iheartradio station',
    'iheartradio widget embed',
    'iheartradio player embed'
  ],
  heroTitle: 'iHeartRadio Embed Code Generator',
  heroSubtitle:
    'Paste any iHeartRadio URL — get a ready-to-paste widget for live stations, podcasts, and playlists.',
  howItWorksHeading: 'How to embed iHeartRadio content',
  howItWorksSteps: [
    {
      title: 'Paste an iHeartRadio link',
      description:
        'Copy any iheart.com URL — live stations, artist stations, podcasts, and playlists.'
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
  explanationHeading: 'Why use our iHeartRadio embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip hunting for the share icon on the player. Paste any iHeart link and get working embed HTML.'
    },
    {
      title: 'All iHeartRadio content',
      description:
        'Works with live stations, artist stations, podcasts, and playlists — the tool handles all iHeart URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 iHeartRadio embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native iHeart widget',
      description:
        'Get the real iHeartRadio web widget with playback controls for stations, podcasts, and playlists.'
    },
    {
      title: 'Responsive player',
      description:
        'The iHeart widget is fully responsive and adapts its size to fit any space on the page.'
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
      href: '/tools/embed-url/podbean',
      label: 'Podbean'
    }
  ],
  faq: [
    {
      question: 'How do I embed an iHeartRadio podcast on my website?',
      answer:
        'Paste any iHeart.com URL into the tool and click Generate. You will get a ready-to-paste widget snippet.'
    },
    {
      question: 'Can I embed iHeartRadio live stations and playlists?',
      answer:
        'Yes. Live stations, artist stations, podcasts, and playlists are all supported.'
    },
    {
      question: 'Is the iHeart widget responsive?',
      answer:
        'Yes. The iHeart widget is fully responsive and you can adjust the width and height to fit your layout.'
    },
    {
      question: 'What if the iHeartRadio content cannot be embedded?',
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
