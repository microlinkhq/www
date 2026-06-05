import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'TVCF',
  slug: 'tvcf',
  color: '#666666',
  exampleUrl: 'https://tvcf.co.kr',
  metaTitle: 'TVCF Embed Code Generator — Embed TVCF Videos',
  metaDescription:
    'Free TVCF embed code generator. Paste any TVCF URL — get a ready-to-paste video embed or preview card. No signup.',
  keywords: [
    'embed tvcf',
    'tvcf embed code',
    'tvcf embed code generator',
    'embed tvcf video',
    'tvcf iframe code',
    'tvcf video player embed',
    'tvcf video embed'
  ],
  heroTitle: 'TVCF Embed Code Generator',
  heroSubtitle:
    'Paste any TVCF URL — get a ready-to-paste video embed or preview card.',
  howItWorksHeading: 'How to embed TVCF videos',
  howItWorksSteps: [
    {
      title: 'Paste a TVCF link',
      description: 'Copy any tvcf.co.kr video URL from your browser.'
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
  explanationHeading: 'Why use our TVCF embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any TVCF link and get a working video embed in seconds — no markup to write by hand.'
    },
    {
      title: 'Built for video links',
      description:
        'The tool reads each TVCF page and builds a player embed for the video it finds.'
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
      title: 'Native video embed',
      description:
        'Get the real TVCF player with full playback controls whenever the video supports it.'
    },
    {
      title: 'Responsive player',
      description:
        'The embed scales to fit your layout so TVCF videos play cleanly on desktop and mobile.'
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
    { href: '/tools/embed-url/dailymotion', label: 'Dailymotion' }
  ],
  faq: [
    {
      question: 'How do I embed a TVCF video on my website?',
      answer:
        'Paste the TVCF URL into the tool, click Generate, then copy the HTML it produces into your page.'
    },
    {
      question: 'Which TVCF links work with this tool?',
      answer:
        'Any public tvcf.co.kr video URL works. The tool reads the page and builds an embed from what it finds.'
    },
    {
      question: 'Will the TVCF video stay responsive on mobile?',
      answer:
        'Yes. The generated embed scales to the width of your page so the player works on any screen size.'
    },
    {
      question: 'What if the TVCF video cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card built from the available video metadata.'
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
