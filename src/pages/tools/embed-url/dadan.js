import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Dadan',
  slug: 'dadan',
  color: '#7065FA',
  exampleUrl: 'https://app.dadan.io/share/sample-video',
  metaTitle: 'Dadan Embed Code Generator — Embed Screen & Webcam Videos',
  metaDescription:
    'Free Dadan embed code generator. Paste a Dadan share link — get a ready-to-paste responsive player for screen recordings and webcam video messages. No signup.',
  keywords: [
    'embed dadan',
    'dadan embed code',
    'dadan embed code generator',
    'embed dadan video',
    'dadan iframe code',
    'dadan screen recording embed',
    'embed dadan video message'
  ],
  heroTitle: 'Dadan Embed Code Generator',
  heroSubtitle:
    'Paste a Dadan share link — get a ready-to-paste responsive player for screen recordings and webcam video messages.',
  howItWorksHeading: 'How to embed a Dadan video',
  howItWorksSteps: [
    {
      title: 'Paste a Dadan link',
      description:
        'Copy a Dadan share link from app.dadan.io — screen recordings, webcam captures, and video messages.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the shared Dadan video and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Dadan embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the embed dialog. Paste any Dadan share link and get working embed HTML.'
    },
    {
      title: 'Async video messages',
      description:
        'Drop screen recordings and webcam video messages straight into knowledge bases, docs, and pages.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Dadan embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Dadan player',
      description:
        'Get the real Dadan player with playback controls for screen and webcam recordings.'
    },
    {
      title: 'Responsive embeds',
      description:
        'The player scales to fit your layout, looking right on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/loom',
      label: 'Loom'
    },
    {
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    },
    {
      href: '/tools/embed-url/wistia',
      label: 'Wistia'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Dadan video on my website?',
      answer:
        'Paste your Dadan share link into the tool and click Generate. You will get a ready-to-paste embed for the video.'
    },
    {
      question: 'What kind of Dadan videos can I embed?',
      answer:
        'Screen recordings, webcam captures, and async video messages shared from Dadan are all supported.'
    },
    {
      question: 'Can I embed a private or password-protected Dadan video?',
      answer:
        'Only videos shared with a public link can be embedded. Password-protected or expired links will not render.'
    },
    {
      question: 'What if the video cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the video title and thumbnail that you can customize before copying.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const DadanPage = () => <ProviderSubtool {...data} />

export default DadanPage
