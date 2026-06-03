import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'BitChute',
  slug: 'bitchute',
  color: '#EF4138',
  exampleUrl: 'https://www.bitchute.com/video/NaAv9dGN1JtI/',
  metaTitle: 'BitChute Embed Code Generator — Embed Videos & Channels',
  metaDescription:
    'Free BitChute embed code generator. Paste any BitChute URL — get a ready-to-paste iframe player for videos and channels. No signup.',
  keywords: [
    'embed bitchute',
    'bitchute embed code',
    'bitchute embed code generator',
    'embed bitchute video',
    'bitchute iframe code',
    'bitchute video embed',
    'embed bitchute channel'
  ],
  heroTitle: 'BitChute Embed Code Generator',
  heroSubtitle:
    'Paste any BitChute URL — get a ready-to-paste iframe player for videos and channels.',
  howItWorksHeading: 'How to embed a BitChute video',
  howItWorksSteps: [
    {
      title: 'Paste a BitChute link',
      description:
        'Copy any bitchute.com URL — video pages and channel links both work.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the video and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our BitChute embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip swapping the URL path by hand. Paste any BitChute link and get working embed HTML.'
    },
    {
      title: 'Videos and channels',
      description:
        'Works with individual video pages and channel links — the tool handles BitChute URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 BitChute embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native BitChute player',
      description:
        'Get the real BitChute iframe player with playback controls, straight from bitchute.com.'
    },
    {
      title: 'Responsive embed',
      description:
        'The iframe adapts to your layout so the video scales cleanly on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/rumble',
      label: 'Rumble'
    },
    {
      href: '/tools/embed-url/odysee',
      label: 'Odysee'
    }
  ],
  faq: [
    {
      question: 'How do I embed a BitChute video on my website?',
      answer:
        'Paste any BitChute video URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Can I embed a BitChute channel?',
      answer:
        'You can paste channel links, but BitChute provides a native iframe player for individual videos. For best results, use a specific video URL.'
    },
    {
      question: 'What if the video cannot be embedded?',
      answer:
        'If native embedding is restricted, switch to Card mode to generate a styled preview card with the video title and thumbnail instead.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The iframe scales to fit your container so the video looks right on desktop and mobile.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const BitChutePage = () => <ProviderSubtool {...data} />

export default BitChutePage
