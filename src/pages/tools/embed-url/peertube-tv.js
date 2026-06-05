import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'PeerTube',
  slug: 'peertube-tv',
  color: '#F1680D',
  exampleUrl: 'https://peertube.tv',
  metaTitle: 'PeerTube Embed Code Generator — Embed Videos & Channels',
  metaDescription:
    'Free PeerTube embed code generator. Paste any PeerTube URL — get a ready-to-paste player for videos and channels across the federated network. No signup.',
  keywords: [
    'embed peertube',
    'peertube embed code',
    'peertube embed code generator',
    'embed peertube video',
    'peertube iframe code',
    'peertube player embed',
    'embed peertube channel'
  ],
  heroTitle: 'PeerTube Embed Code Generator',
  heroSubtitle:
    'Paste any PeerTube URL — get a ready-to-paste player for videos and channels across the federated network.',
  howItWorksHeading: 'How to embed PeerTube content',
  howItWorksSteps: [
    {
      title: 'Paste a PeerTube link',
      description:
        'Copy any PeerTube video or channel URL from any instance and drop it into the field.'
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
  explanationHeading: 'Why use our PeerTube embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any PeerTube link and get working embed HTML without opening the share dialog on each instance.'
    },
    {
      title: 'Works across instances',
      description:
        'PeerTube is decentralized and federated, and the tool generates the right player for videos and channels on any instance.'
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
      title: 'Privacy-friendly player',
      description:
        'Embed videos from the free, open PeerTube network without the tracking that comes with mainstream video hosts.'
    },
    {
      title: 'Videos and channels',
      description:
        'Generate embeds for single videos or full channels, keeping the correct aspect ratio for playback.'
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
    { href: '/tools/embed-url/dailymotion', label: 'Dailymotion' }
  ],
  faq: [
    {
      question: 'How do I embed a PeerTube video on my website?',
      answer:
        'Paste the PeerTube video URL into the tool and click Generate. Copy the resulting HTML and paste it wherever you want the player to appear.'
    },
    {
      question: 'Does it work with any PeerTube instance?',
      answer:
        'Yes. PeerTube is federated, so the tool generates the right embed for videos and channels hosted on any instance.'
    },
    {
      question: 'Can I embed a whole channel?',
      answer:
        'Yes. Paste a channel URL to embed the channel, or a single video URL to embed just that video.'
    },
    {
      question: 'Is PeerTube embedding privacy-friendly?',
      answer:
        'PeerTube is an open, decentralized platform, so embeds avoid the ad and tracking layers common to mainstream video hosts.'
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
