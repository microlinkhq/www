import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Show by Animaker',
  slug: 'getshow',
  color: '#AA71FF',
  exampleUrl: 'https://app.getshow.io/share/Mcm3a3YBgj8xrtrWURYz',
  metaTitle: 'Show by Animaker Embed Code Generator — Embed Videos',
  metaDescription:
    'Free Show by Animaker embed code generator. Paste a getshow.io video URL — get a ready-to-paste iframe player or a styled preview card. No signup.',
  keywords: [
    'embed show by animaker',
    'getshow embed code',
    'getshow embed code generator',
    'embed getshow video',
    'getshow iframe code',
    'show by animaker video embed',
    'getshow oembed'
  ],
  heroTitle: 'Show by Animaker Embed Code Generator',
  heroSubtitle:
    'Paste a Show by Animaker video URL — get a ready-to-paste iframe player or a styled preview card.',
  howItWorksHeading: 'How to embed a Show by Animaker video',
  howItWorksSteps: [
    {
      title: 'Paste a Show by Animaker link',
      description:
        'Copy a getshow.io video link — both share links and iframe player links are supported.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the video and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Show by Animaker embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste a getshow.io video link and get working embed HTML.'
    },
    {
      title: 'Share and iframe links',
      description:
        'Works with Show by Animaker share URLs and iframe player URLs — the tool handles both formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Show by Animaker embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native video player',
      description:
        'Get the real Show by Animaker player with the hosted video and its playback controls.'
    },
    {
      title: 'Responsive embed',
      description:
        'The iframe player scales to fit your layout across desktop and mobile.'
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
    { href: '/tools/embed-url/behance', label: 'Behance' }
  ],
  faq: [
    {
      question: 'How do I embed a Show by Animaker video on my website?',
      answer:
        'Paste a getshow.io video URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Which Show by Animaker links work?',
      answer:
        'Both share links (app.getshow.io/share/...) and iframe player links are supported.'
    },
    {
      question: 'What if the video is private or cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card built from the available title and thumbnail.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The iframe player adapts to the width of its container on desktop and mobile.'
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
