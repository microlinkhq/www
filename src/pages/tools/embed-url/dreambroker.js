import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Dream Broker',
  slug: 'dreambroker',
  color: '#175EEB',
  exampleUrl: 'https://references.dreambroker.com/channel/git8d4fc/bh1t9nkm',
  metaTitle: 'Dream Broker Embed Code Generator — Embed Studio Videos',
  metaDescription:
    'Free Dream Broker embed code generator. Paste any Dream Broker Studio video URL — get a ready-to-paste iframe player or preview card. No signup.',
  keywords: [
    'embed dream broker',
    'dream broker embed code',
    'dream broker embed code generator',
    'embed dream broker video',
    'dream broker studio embed',
    'dream broker iframe code',
    'dream broker video embed'
  ],
  heroTitle: 'Dream Broker Embed Code Generator',
  heroSubtitle:
    'Paste any Dream Broker Studio video URL — get a ready-to-paste iframe player or preview card.',
  howItWorksHeading: 'How to embed a Dream Broker video',
  howItWorksSteps: [
    {
      title: 'Paste a Dream Broker link',
      description:
        'Copy any dreambroker.com channel video URL — the /channel/ links Dream Broker Studio generates for sharing.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Dream Broker video and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Dream Broker embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Studio for share settings. Paste any Dream Broker link and get working embed HTML.'
    },
    {
      title: 'Built for Studio videos',
      description:
        'Works with the channel video URLs Dream Broker Studio produces for websites, intranets, and LMS pages.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Dream Broker embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Dream Broker player',
      description:
        'Get the real Dream Broker Studio HTML5 player with full playback controls when the video is shareable.'
    },
    {
      title: 'Responsive iframe',
      description:
        'The embed scales to its container, so Dream Broker videos stay sharp on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/brightcove',
      label: 'Brightcove'
    },
    {
      href: '/tools/embed-url/wistia',
      label: 'Wistia'
    },
    {
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Dream Broker video on my website?',
      answer:
        'Paste any Dream Broker channel video URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Which Dream Broker links work?',
      answer:
        'Dream Broker Studio channel video URLs from dreambroker.com (and subdomains like references.dreambroker.com) are supported.'
    },
    {
      question: 'What if the Dream Broker video is private or restricted?',
      answer:
        'Studio videos can be locked with passwords, sign-in, or IP rules. When native embedding is restricted, the tool falls back to a styled preview card with the available metadata.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The generated iframe scales to its container so the video looks right on any screen size.'
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
