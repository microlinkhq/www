import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'GTChannel',
  slug: 'gtchannel',
  color: '#111111',
  exampleUrl: 'https://gtchannel.com/videos/',
  metaTitle: 'GTChannel Embed Code Generator — Embed Automotive Videos',
  metaDescription:
    'Free GTChannel embed code generator. Paste a GTChannel URL — get ready-to-paste HTML for automotive and car culture videos, or a styled preview card. No signup.',
  keywords: [
    'embed gtchannel',
    'gtchannel embed code',
    'gtchannel embed code generator',
    'embed gtchannel video',
    'gtchannel iframe code',
    'gtchannel video embed',
    'embed automotive video gtchannel'
  ],
  heroTitle: 'GTChannel Embed Code Generator',
  heroSubtitle:
    'Paste a GTChannel URL — get ready-to-paste embed HTML for automotive and car culture videos.',
  howItWorksHeading: 'How to embed a GTChannel video',
  howItWorksSteps: [
    {
      title: 'Paste a GTChannel link',
      description:
        'Copy any gtchannel.com URL — automotive videos and car culture clips.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our GTChannel embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing iframe markup by hand. Paste any GTChannel link and get working embed HTML.'
    },
    {
      title: 'Built for car content',
      description:
        'Share automotive videos and car culture clips from GTChannel directly in your posts.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 GTChannel embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native video player',
      description:
        'Get the real GTChannel video player so visitors can watch automotive content in place.'
    },
    {
      title: 'Responsive embed',
      description:
        'The embed adapts to your layout so videos look right on desktop and mobile.'
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
      href: '/tools/embed-url/dailymotion',
      label: 'Dailymotion'
    },
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    }
  ],
  faq: [
    {
      question: 'How do I embed a GTChannel video on my website?',
      answer:
        'Paste a GTChannel URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What kind of content does GTChannel host?',
      answer:
        'GTChannel is an automotive video network featuring car culture, performance, and motorsport videos.'
    },
    {
      question: 'What if the video cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the title and image that links to the original video.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The embed scales to fit your layout so it works on desktop and mobile.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const GTChannelPage = () => <ProviderSubtool {...data} />

export default GTChannelPage
