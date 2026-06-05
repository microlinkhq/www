import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Wistia',
  slug: 'wistia',
  color: '#2949E5',
  exampleUrl: 'https://home.wistia.com/medias/e4a27b971d',
  metaTitle: 'Wistia Embed Code Generator — Embed Wistia Videos',
  metaDescription:
    'Free Wistia embed code generator. Paste any Wistia video URL — get a ready-to-paste player for your business videos, webinars, and demos. No signup.',
  keywords: [
    'embed wistia',
    'wistia embed code',
    'wistia embed code generator',
    'embed wistia video',
    'wistia iframe code',
    'wistia video player embed',
    'embed wistia video in website'
  ],
  heroTitle: 'Wistia Embed Code Generator',
  heroSubtitle:
    'Paste any Wistia video URL — get a ready-to-paste player for your business videos, webinars, and product demos.',
  howItWorksHeading: 'How to embed a Wistia video',
  howItWorksSteps: [
    {
      title: 'Paste a Wistia link',
      description:
        'Copy a Wistia media page URL from wistia.com — including custom channel domains and share links.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Wistia video and generates the right embed HTML for you.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Wistia embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Wistia embed settings. Paste any Wistia link and get working embed HTML.'
    },
    {
      title: 'Built for business video',
      description:
        'Works with Wistia videos hosted for marketing, webinars, tutorials, and product demos.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Wistia embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Wistia player',
      description:
        'Get the real Wistia player with playback controls, captions, and thumbnail preview.'
    },
    {
      title: 'Responsive video embed',
      description:
        'The player scales to fit your layout, staying sharp across desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    },
    {
      href: '/tools/embed-url/loom',
      label: 'Loom'
    },
    {
      href: '/tools/embed-url/brightcove',
      label: 'Brightcove'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Wistia video on my website?',
      answer:
        'Paste your Wistia media page URL into the tool and click Generate. You will get a ready-to-paste video embed.'
    },
    {
      question: 'What kinds of Wistia content can I embed?',
      answer:
        'Wistia videos hosted for marketing, webinars, tutorials, and product demos are all supported.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The Wistia player scales to fit your container and looks sharp on desktop and mobile.'
    },
    {
      question: 'What if the video cannot be embedded natively?',
      answer:
        'When native embedding is restricted, switch to Card mode to generate a styled preview card with the title and thumbnail.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const WistiaPage = () => <ProviderSubtool {...data} />

export default WistiaPage
