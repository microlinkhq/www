import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Firework',
  slug: 'fireworktv',
  color: '#006AFF',
  exampleUrl: 'https://firework.fw.tv/',
  metaTitle: 'Firework Embed Code Generator — Embed Shoppable Videos',
  metaDescription:
    'Free Firework embed code generator. Paste any Firework video or channel URL — get a ready-to-paste embed for short-form shoppable videos. No signup.',
  keywords: [
    'embed firework',
    'firework embed code',
    'firework embed code generator',
    'embed firework video',
    'embed fireworktv video',
    'firework shoppable video embed',
    'fw.tv embed code'
  ],
  heroTitle: 'Firework Embed Code Generator',
  heroSubtitle:
    'Paste any Firework video or channel URL — get a ready-to-paste embed for short-form shoppable videos.',
  howItWorksHeading: 'How to embed a Firework video',
  howItWorksSteps: [
    {
      title: 'Paste a Firework link',
      description:
        'Copy any firework.com or fw.tv URL — individual short-form videos and channels.'
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
  explanationHeading: 'Why use our Firework embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the business portal export. Paste any Firework link and get working embed HTML.'
    },
    {
      title: 'Short-form shoppable video',
      description:
        'Built for Firework video commerce — vertical, short-form clips and channels with in-video shopping.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Firework embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Firework player',
      description:
        'Get the real Firework player with autoplay short-form video and interactive shoppable elements when available.'
    },
    {
      title: 'Videos and channels',
      description:
        'Works with individual fw.tv videos and brand channels — vertical, mobile-first clips that adapt to your layout.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/tiktok', label: 'TikTok' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed a Firework video on my website?',
      answer:
        'Paste any Firework video or channel URL into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'What Firework links work?',
      answer:
        'Short-form shoppable videos and brand channels from firework.com and fw.tv are all supported.'
    },
    {
      question: 'What if native embedding is restricted?',
      answer:
        'The tool falls back to a styled preview card with the available title and image so you can still share the content.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. Firework videos are vertical and mobile-first, and the embed adapts to fit your page layout.'
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
