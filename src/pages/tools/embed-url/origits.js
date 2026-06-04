import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Origits',
  slug: 'origits',
  color: '#1E88E5',
  exampleUrl: 'https://origits.com',
  metaTitle: 'Origits Embed Code Generator — Embed Interactive Videos',
  metaDescription:
    'Free Origits embed code generator. Paste any Origits URL — get a ready-to-paste embed for interactive, clickable videos. No signup.',
  keywords: [
    'embed origits',
    'origits embed code',
    'origits embed code generator',
    'embed origits video',
    'origits iframe code',
    'origits interactive video embed',
    'origits player embed'
  ],
  heroTitle: 'Origits Embed Code Generator',
  heroSubtitle:
    'Paste any Origits URL — get a ready-to-paste embed for interactive, clickable videos.',
  howItWorksHeading: 'How to embed Origits content',
  howItWorksSteps: [
    {
      title: 'Paste an Origits link',
      description:
        'Copy the URL of an Origits interactive video and paste it into the field.'
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
  explanationHeading: 'Why use our Origits embed code generator',
  reasons: [
    {
      title: 'Interactive videos, no setup',
      description:
        'Paste an Origits link and get an embed that keeps the clickable hotspots working on your page.'
    },
    {
      title: 'Handles every Origits video URL',
      description:
        'Works with Origits interactive video links so you never have to dig through embed settings.'
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
      title: 'Clickable video player',
      description:
        'Embed an Origits video so viewers can interact with its clickable elements without leaving your page.'
    },
    {
      title: 'Responsive playback',
      description:
        'The generated player scales to its container and plays back on desktop and mobile.'
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
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed an Origits video on my website?',
      answer:
        'Paste the video URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Do the interactive elements still work in the embed?',
      answer:
        'Yes. The embed preserves the clickable elements so viewers can interact with the video in place.'
    },
    {
      question: 'Does the Origits player work on mobile?',
      answer:
        'Yes. The generated player is responsive and plays back on phones, tablets, and desktops.'
    },
    {
      question: 'What if the Origits video is private or removed?',
      answer:
        'The tool falls back to a styled preview card with whatever metadata is still available.'
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
