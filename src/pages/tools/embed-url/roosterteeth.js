import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Rooster Teeth',
  slug: 'roosterteeth',
  color: '#F04C23',
  exampleUrl: 'https://roosterteeth.com',
  metaTitle:
    'Rooster Teeth Embed Code Generator — Embed Videos, Series & Podcasts',
  metaDescription:
    'Free Rooster Teeth embed code generator. Paste any Rooster Teeth URL — get a ready-to-paste embed for videos, series, and podcasts. No signup.',
  keywords: [
    'embed rooster teeth',
    'rooster teeth embed code',
    'rooster teeth embed code generator',
    'embed rooster teeth video',
    'rooster teeth iframe code',
    'rooster teeth podcast embed',
    'embed rooster teeth series'
  ],
  heroTitle: 'Rooster Teeth Embed Code Generator',
  heroSubtitle:
    'Paste any Rooster Teeth URL — get a ready-to-paste embed for videos, series, and podcasts.',
  howItWorksHeading: 'How to embed Rooster Teeth content',
  howItWorksSteps: [
    {
      title: 'Paste a Rooster Teeth link',
      description: 'Copy any roosterteeth.com video, series, or podcast URL.'
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
  explanationHeading: 'Why use our Rooster Teeth embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Rooster Teeth link and get working embed HTML in one click — no markup to write by hand.'
    },
    {
      title: 'Videos, series, and podcasts',
      description:
        'One tool handles Rooster Teeth original videos, full series, and podcast episodes from a single link.'
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
      title: 'Video player embeds',
      description:
        'Embed Rooster Teeth videos and series episodes with a responsive player that scales to your layout.'
    },
    {
      title: 'Podcast embeds',
      description:
        'Drop in Rooster Teeth podcast episodes so visitors can listen without leaving your page.'
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
      question: 'How do I embed a Rooster Teeth video on my website?',
      answer:
        'Paste the roosterteeth.com URL into the tool, click Generate, then copy the embed HTML into your page.'
    },
    {
      question: 'Can I embed Rooster Teeth podcasts as well as videos?',
      answer:
        'Yes. The tool detects videos, series, and podcast episodes and builds the right embed for each.'
    },
    {
      question: 'Is the embedded player responsive?',
      answer:
        'Yes. The player scales to fit your container so it looks right on desktop and mobile.'
    },
    {
      question: 'What if the content cannot be embedded directly?',
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
