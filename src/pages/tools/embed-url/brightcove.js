import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Brightcove',
  slug: 'brightcove',
  color: '#000000',
  exampleUrl:
    'https://players.brightcove.net/1486906377/default_default/index.html?videoId=1700308830799244866',
  metaTitle: 'Brightcove Embed Code Generator — Embed Videos & Playlists',
  metaDescription:
    'Free Brightcove embed code generator. Paste a Brightcove player URL — get a ready-to-paste iframe for videos and playlists, or a styled preview card. No signup.',
  keywords: [
    'embed brightcove',
    'brightcove embed code',
    'brightcove embed code generator',
    'embed brightcove video',
    'brightcove iframe code',
    'brightcove player embed',
    'embed brightcove playlist'
  ],
  heroTitle: 'Brightcove Embed Code Generator',
  heroSubtitle:
    'Paste a Brightcove player URL — get a ready-to-paste iframe for videos and playlists.',
  howItWorksHeading: 'How to embed a Brightcove video',
  howItWorksSteps: [
    {
      title: 'Paste a Brightcove link',
      description:
        'Copy a players.brightcove.net player URL — the iframe or in-page embed link for a video or playlist.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the account, player, and video IDs and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Brightcove embed code generator',
  reasons: [
    {
      title: 'No console digging',
      description:
        'Skip exporting the publish code from Video Cloud. Paste the player URL and get working embed HTML.'
    },
    {
      title: 'Videos and playlists',
      description:
        'Works with single-video players and playlist players — the tool handles the account, player, and video IDs.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Brightcove embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Brightcove player',
      description:
        'Get the real Brightcove Player iframe with playback controls when the player is publicly published.'
    },
    {
      title: 'Responsive iframe',
      description:
        'The player iframe scales to fit your layout, so it stays watchable on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed a Brightcove video on my website?',
      answer:
        'Paste a Brightcove player URL (players.brightcove.net) into the tool and click Generate. You will get a ready-to-paste iframe embed.'
    },
    {
      question: 'Which Brightcove URLs work?',
      answer:
        'Player URLs that include the account ID, player ID, and a videoId or playlistId — the iframe link Brightcove gives you in the publishing dialog.'
    },
    {
      question: 'Can I embed a Brightcove playlist?',
      answer:
        'Yes. Playlist players work as long as the player is publicly published; the embed loads the same player you configured in Video Cloud.'
    },
    {
      question: 'What if the video is private or the player is restricted?',
      answer:
        'When Brightcove blocks native embedding, the tool falls back to a styled preview card built from the available title and image.'
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
