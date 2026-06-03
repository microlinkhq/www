import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Digiteka',
  slug: 'digiteka',
  color: '#C70D56',
  exampleUrl: 'https://www.ultimedia.com/default/index/videogeneric/id/z5k5rk',
  metaTitle: 'Digiteka Embed Code Generator — Embed Premium Videos',
  metaDescription:
    'Free Digiteka embed code generator. Paste an Ultimedia by Digiteka video URL — get a ready-to-paste player for premium news, sports, and entertainment videos. No signup.',
  keywords: [
    'embed digiteka',
    'digiteka embed code',
    'digiteka embed code generator',
    'embed digiteka video',
    'ultimedia embed code',
    'digiteka video player embed',
    'embed ultimedia video'
  ],
  heroTitle: 'Digiteka Embed Code Generator',
  heroSubtitle:
    'Paste an Ultimedia by Digiteka video URL — get a ready-to-paste player for premium news, sports, and entertainment videos.',
  howItWorksHeading: 'How to embed a Digiteka video',
  howItWorksSteps: [
    {
      title: 'Paste a Digiteka link',
      description:
        'Copy any Ultimedia by Digiteka video URL from ultimedia.com or a publisher page that hosts the player.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the video and generates the right embed HTML for the Digiteka player.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Digiteka embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through publisher pages for the player code. Paste a Digiteka link and get working embed HTML.'
    },
    {
      title: 'Premium video catalog',
      description:
        'Works with Digiteka premium video distribution — news, sports, entertainment, music, and lifestyle clips.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Digiteka embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Digiteka player',
      description:
        'Get the real Ultimedia by Digiteka video player with playback controls.'
    },
    {
      title: 'Responsive video',
      description:
        'The player scales to your layout so videos look right on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/dailymotion', label: 'Dailymotion' },
    { href: '/tools/embed-url/brightcove', label: 'Brightcove' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' }
  ],
  faq: [
    {
      question: 'How do I embed a Digiteka video on my website?',
      answer:
        'Paste an Ultimedia by Digiteka video URL into the tool and click Generate. You will get a ready-to-paste player you can drop into any page.'
    },
    {
      question: 'What kind of videos does Digiteka distribute?',
      answer:
        'Digiteka is a French premium video distribution and monetization platform offering news, sports, entertainment, music, and lifestyle videos through its Ultimedia network.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The generated player scales with its container so videos display correctly on desktop and mobile.'
    },
    {
      question: 'What if the video cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the title and image so you always get something to paste.'
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
