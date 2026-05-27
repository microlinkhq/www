import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'iHeartRadio',
  slug: 'iheartradio',
  color: '#C6002B',
  exampleUrl: 'https://iheart.com',
  metaTitle: 'iHeartRadio Embed Code Generator — Embed Stations',
  metaDescription:
    'Free iHeartRadio embed code generator. Paste any iHeartRadio URL — get a ready-to-paste embed for stations, podcasts, and playlists. No signup.',
  keywords: [
    'embed iheartradio',
    'iheartradio embed code',
    'iheartradio player embed'
  ],
  heroTitle: 'iHeartRadio Embed Code Generator',
  heroSubtitle:
    'Paste any iHeartRadio URL — get a ready-to-paste embed for stations, podcasts, and playlists.',
  howItWorksHeading: 'How to embed iHeartRadio content',
  howItWorksSteps: [
    {
      title: 'Paste a iHeartRadio link',
      description:
        'Copy any iheart.com URL — stations, podcasts, and playlists.'
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
        'Skip the manual URL conversion. Paste any iHeartRadio link and get working embed HTML.'
    },
    {
      title: 'All iHeartRadio content',
      description:
        'Works with stations, podcasts, and playlists — the tool handles all iHeartRadio URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 iHeartRadio embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real iHeartRadio embed with full interactivity when available.'
    },
    {
      title: 'All stations',
      description:
        'Works with stations, podcasts, and playlists — all iHeartRadio content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/embed/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed iHeartRadio content on my website?',
      answer:
        'Paste any iHeartRadio URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the iHeartRadio embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the iHeartRadio content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
