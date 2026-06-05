import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'DTube',
  slug: 'dtube',
  color: '#F01A30',
  exampleUrl: 'https://d.tube/watch/XSZsGcPNdoAEraL8FNq3uF',
  metaTitle: 'DTube Embed Code Generator — Embed Videos & Channels',
  metaDescription:
    'Free DTube embed code generator. Paste any d.tube URL — get a ready-to-paste embed for decentralized videos and channels, or a preview card. No signup.',
  keywords: [
    'embed dtube',
    'dtube embed code',
    'dtube embed code generator',
    'embed dtube video',
    'dtube iframe code',
    'dtube video embed',
    'embed dtube channel',
    'decentralized video embed'
  ],
  heroTitle: 'DTube Embed Code Generator',
  heroSubtitle:
    'Paste any DTube URL — get a ready-to-paste embed for decentralized videos and channels.',
  howItWorksHeading: 'How to embed a DTube video',
  howItWorksSteps: [
    {
      title: 'Paste a DTube link',
      description:
        'Copy any d.tube URL — individual videos and channel pages both work.'
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
  explanationHeading: 'Why use our DTube embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the emb.d.tube player URL by hand. Paste any DTube link and get working embed HTML.'
    },
    {
      title: 'Videos and channels',
      description:
        'Works with individual DTube videos and channel pages — the tool handles the d.tube URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 DTube embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native DTube player',
      description:
        'Get the real DTube video player with playback controls when an embed is available.'
    },
    {
      title: 'Decentralized video',
      description:
        'DTube videos are hosted on a peer-to-peer network — the generated embed loads the same player viewers see on d.tube.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/odysee', label: 'Odysee' },
    { href: '/tools/embed-url/rumble', label: 'Rumble' }
  ],
  faq: [
    {
      question: 'How do I embed a DTube video on my website?',
      answer:
        'Paste any d.tube video URL into the tool and click Generate. You will get a ready-to-paste embed for the DTube player.'
    },
    {
      question: 'Can I embed a DTube channel?',
      answer:
        'Yes. Both individual videos and channel pages are supported — paste the d.tube URL and the tool detects the content type.'
    },
    {
      question: 'What is DTube?',
      answer:
        'DTube is a decentralized video platform where videos are stored on a peer-to-peer network rather than central servers, with content surfaced through the Hive and Steem blockchains.'
    },
    {
      question: 'What if the video has no native embed?',
      answer:
        'The tool falls back to a styled preview card with the title and image, which you can customize before copying.'
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
