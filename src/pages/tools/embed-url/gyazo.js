import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Gyazo',
  slug: 'gyazo',
  color: '#4884E7',
  exampleUrl: 'https://gyazo.com/1586a12ff40e832692e4e60da86b1966',
  metaTitle: 'Gyazo Embed Code Generator — Embed Screenshots, GIFs & Video',
  metaDescription:
    'Free Gyazo embed code generator. Paste any Gyazo URL — get a ready-to-paste embed for screenshots, animated GIFs, and screen-capture video. No signup.',
  keywords: [
    'embed gyazo',
    'gyazo embed code',
    'gyazo embed code generator',
    'embed gyazo screenshot',
    'embed gyazo gif',
    'gyazo embed html',
    'gyazo image embed',
    'embed gyazo video'
  ],
  heroTitle: 'Gyazo Embed Code Generator',
  heroSubtitle:
    'Paste any Gyazo capture URL — get a ready-to-paste embed for screenshots, animated GIFs, and screen-capture video.',
  howItWorksHeading: 'How to embed a Gyazo capture',
  howItWorksSteps: [
    {
      title: 'Paste a Gyazo link',
      description:
        'Copy a gyazo.com capture link — screenshots, animated GIFs, and screen-recording video all work.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the capture type and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Gyazo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip copying raw image URLs and writing tags by hand. Paste any Gyazo link and get working embed HTML.'
    },
    {
      title: 'All Gyazo captures',
      description:
        'Works with screenshots, animated GIFs, and screen-capture video — the tool handles every Gyazo URL format.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Gyazo embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Instant capture embeds',
      description:
        'Get an embed that shows the full Gyazo screenshot, GIF, or video straight from the capture link.'
    },
    {
      title: 'Screenshots, GIFs & video',
      description:
        'Static screenshots, animated GIFs, and screen-recording clips all embed cleanly and scale to your layout.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/giphy',
      label: 'Giphy'
    },
    {
      href: '/tools/embed-url/gifnote',
      label: 'Gifnote'
    },
    {
      href: '/tools/embed-url/flickr',
      label: 'Flickr'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Gyazo screenshot on my website?',
      answer:
        'Paste any gyazo.com capture URL into the tool and click Generate. You will get a ready-to-paste embed for the screenshot.'
    },
    {
      question: 'Does this work with Gyazo GIFs and video?',
      answer:
        'Yes. Animated GIFs and screen-capture video are supported alongside static screenshots.'
    },
    {
      question: 'Can I embed a private or unlisted Gyazo capture?',
      answer:
        'Only captures that are publicly viewable by link will embed. Private captures restricted to your account cannot be embedded.'
    },
    {
      question: 'What if the capture cannot be embedded directly?',
      answer:
        'Switch to Card mode and the tool builds a styled preview card with the title and image instead.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const GyazoPage = () => <ProviderSubtool {...data} />

export default GyazoPage
