import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Bunny.net',
  slug: 'bunnynet',
  color: '#FF7A53',
  exampleUrl:
    'https://player.mediadelivery.net/embed/256380/d9d9ab1f-fc9f-4488-9c26-4ffc653c0024',
  metaTitle: 'Bunny.net Embed Code Generator — Embed Bunny Stream Videos',
  metaDescription:
    'Free Bunny.net embed code generator. Paste a Bunny Stream video URL — get a ready-to-paste responsive iframe player for your site. No signup.',
  keywords: [
    'embed bunny.net',
    'bunny.net embed code',
    'bunny stream embed code',
    'embed bunny stream video',
    'bunny.net iframe code',
    'bunny stream player embed',
    'mediadelivery embed'
  ],
  heroTitle: 'Bunny.net Embed Code Generator',
  heroSubtitle:
    'Paste a Bunny Stream video URL — get a ready-to-paste iframe player you can drop into any page.',
  howItWorksHeading: 'How to embed a Bunny.net video',
  howItWorksSteps: [
    {
      title: 'Paste a Bunny.net link',
      description:
        'Copy a Bunny Stream player URL from player.mediadelivery.net or iframe.mediadelivery.net.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Bunny Stream player and generates the right iframe HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Bunny.net embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the iframe by hand. Paste a Bunny Stream link and get working embed HTML.'
    },
    {
      title: 'Responsive by default',
      description:
        'The generated player scales to fit your layout instead of locking to a fixed pixel size.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Bunny.net embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Bunny Stream player',
      description:
        'Get the real Bunny Stream HTML5 player with adaptive bitrate playback and standard controls.'
    },
    {
      title: 'Works on any site',
      description:
        'The iframe drops into static sites, blogs, and CMS platforms without extra scripts.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    },
    {
      href: '/tools/embed-url/wistia',
      label: 'Wistia'
    },
    {
      href: '/tools/embed-url/brightcove',
      label: 'Brightcove'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Bunny Stream video on my website?',
      answer:
        'Paste your Bunny Stream player URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'What Bunny.net URLs are supported?',
      answer:
        'Bunny Stream player links on player.mediadelivery.net and the legacy iframe.mediadelivery.net are supported.'
    },
    {
      question: 'Is the embedded player responsive?',
      answer:
        'Yes. The generated iframe is set to scale with its container so the video fits any screen size.'
    },
    {
      question: 'What if a video cannot be embedded natively?',
      answer:
        'If native embedding is restricted, switch to Card mode to generate a styled preview card with the title and thumbnail.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const BunnynetPage = () => <ProviderSubtool {...data} />

export default BunnynetPage
