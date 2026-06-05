import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Børnetube',
  slug: 'bornetube',
  color: '#0072C6',
  exampleUrl: 'https://www.bornetube.dk',
  metaTitle: 'Børnetube Embed Code Generator — Embed Børnetube Videos',
  metaDescription:
    'Free Børnetube embed code generator. Paste a bornetube.dk link — get a ready-to-paste embed or a styled preview card for the video. No signup.',
  keywords: [
    'embed bornetube',
    'bornetube embed code',
    'bornetube embed generator',
    'embed bornetube video',
    'bornetube video embed',
    'bornetube.dk embed',
    'embed bornetube link'
  ],
  heroTitle: 'Børnetube Embed Code Generator',
  heroSubtitle:
    'Paste a Børnetube link — get a ready-to-paste embed or a styled preview card for the video.',
  howItWorksHeading: 'How to embed a Børnetube video',
  howItWorksSteps: [
    {
      title: 'Paste a Børnetube link',
      description:
        'Copy a bornetube.dk URL — a shared video, production, or channel link.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the link and generates the right embed HTML, or a preview card when embedding is restricted.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Børnetube embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip hand-writing iframe HTML. Paste a Børnetube link and get a ready-to-paste embed.'
    },
    {
      title: 'Works with shared links',
      description:
        'Børnetube is a Danish educational media platform — paste a shared video or production link and the tool handles the rest.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Børnetube embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native video embed',
      description:
        'Get the real Børnetube player when the video is shared with a public embed link.'
    },
    {
      title: 'Built for shared productions',
      description:
        'Børnetube content — videos, stop-motion, and other productions — shared via secure links and channels.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/dailymotion', label: 'Dailymotion' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed a Børnetube video on my website?',
      answer:
        'Paste a Børnetube (bornetube.dk) link into the tool and click Generate. You will get ready-to-paste embed HTML or a preview card.'
    },
    {
      question: 'What is Børnetube?',
      answer:
        'Børnetube is a Danish educational media platform for daycares and schools where children and educators create and share videos, images, and other productions.'
    },
    {
      question: 'What if the Børnetube video is private?',
      answer:
        'Much Børnetube content is shared through secure links or channels. When native embedding is not allowed, the tool falls back to a styled preview card with the available metadata.'
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
