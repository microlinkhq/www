import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Omny Studio',
  slug: 'omnystudio',
  color: '#43A9E0',
  exampleUrl:
    'https://omny.fm/shows/fun-kids/kaye-umansky-author-of-witch-in-winter-chats-to-be',
  metaTitle:
    'Omny Studio Embed Code Generator — Embed Podcast Clips & Playlists',
  metaDescription:
    'Free Omny Studio embed code generator. Paste any omny.fm URL — get a ready-to-paste audio player for podcast clips, episodes, and playlists. No signup.',
  keywords: [
    'embed omny studio',
    'omny studio embed code',
    'omny studio embed code generator',
    'embed omny.fm player',
    'omny studio iframe code',
    'embed omny studio podcast',
    'embed omny studio playlist'
  ],
  heroTitle: 'Omny Studio Embed Code Generator',
  heroSubtitle:
    'Paste any omny.fm URL — get a ready-to-paste audio player for podcast clips, episodes, and playlists.',
  howItWorksHeading: 'How to embed Omny Studio content',
  howItWorksSteps: [
    {
      title: 'Paste an Omny Studio link',
      description:
        'Copy any omny.fm URL — a podcast clip, episode, or playlist from a show page.'
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
  explanationHeading: 'Why use our Omny Studio embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Omny Studio share menu. Paste any omny.fm link and get working embed HTML.'
    },
    {
      title: 'Clips, episodes & playlists',
      description:
        'Works with individual clips, full episodes, and curated playlists — the tool handles all omny.fm URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Omny Studio embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Omny Studio player',
      description:
        'Get the real omny.fm audio player with cover art, playback controls, and scrubbing.'
    },
    {
      title: 'Clips, episodes & playlists',
      description:
        'Single clips, full episodes, and multi-episode playlists all generate the matching embed player.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/podbean',
      label: 'Podbean'
    },
    {
      href: '/tools/embed-url/spreaker',
      label: 'Spreaker'
    },
    {
      href: '/tools/embed-url/acast',
      label: 'Acast'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Omny Studio podcast on my website?',
      answer:
        'Paste any omny.fm URL into the tool and click Generate. You will get a ready-to-paste audio player.'
    },
    {
      question: 'Can I embed an Omny Studio playlist?',
      answer:
        'Yes. Single clips, full episodes, and playlists from a show page are all supported.'
    },
    {
      question: 'What if the Omny Studio episode is unlisted or restricted?',
      answer:
        'Restricted or private content cannot be embedded, so the tool falls back to a styled preview card with the available metadata.'
    },
    {
      question: 'Is the embedded player responsive?',
      answer:
        'Yes. The omny.fm player adapts to its container, so it scales to fit your page layout.'
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
