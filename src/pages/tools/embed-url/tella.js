import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Tella',
  slug: 'tella',
  color: '#6E29F7',
  exampleUrl: 'https://www.tella.tv',
  metaTitle: 'Tella Embed Code Generator — Embed Demo & Screen Recordings',
  metaDescription:
    'Free Tella embed code generator. Paste any Tella URL — get a ready-to-paste player for screen recordings, demos, and explainer videos. No signup.',
  keywords: [
    'embed tella',
    'tella embed code',
    'tella embed code generator',
    'embed tella video',
    'embed screen recording',
    'tella iframe code',
    'tella demo video embed'
  ],
  heroTitle: 'Tella Embed Code Generator',
  heroSubtitle:
    'Paste any Tella URL — get a ready-to-paste player for screen recordings, demos, and explainer videos.',
  howItWorksHeading: 'How to embed Tella videos',
  howItWorksSteps: [
    {
      title: 'Paste a Tella link',
      description:
        'Copy the share URL of any Tella recording and drop it into the field.'
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
  explanationHeading: 'Why use our Tella embed code generator',
  reasons: [
    {
      title: 'Built for demo videos',
      description:
        'Turn any Tella screen or camera recording into an inline player for product demos and explainers.'
    },
    {
      title: 'Great for landing pages and docs',
      description:
        'Embed a polished walkthrough next to your copy without sending visitors off-site.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Screen recording player',
      description:
        'Embed Tella screen and camera recordings with native playback controls.'
    },
    {
      title: 'Responsive video frame',
      description:
        'The player keeps its aspect ratio and resizes cleanly across desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' },
    { href: '/tools/embed-url/dadan', label: 'Dadan' }
  ],
  faq: [
    {
      question: 'How do I embed a Tella video on my website?',
      answer:
        'Paste the Tella share URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can I embed a Tella demo on a landing page?',
      answer:
        'Yes. The generated iframe drops into landing pages, docs, and most CMS templates.'
    },
    {
      question: 'Is the Tella player responsive?',
      answer:
        'The embed keeps its aspect ratio and resizes to fit the container it sits in.'
    },
    {
      question: 'What if a Tella recording is private?',
      answer:
        'The tool falls back to a styled preview card built from the available metadata.'
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
