import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Wave.video',
  slug: 'wavevideo',
  color: '#2D9CDB',
  exampleUrl: 'https://wave.video',
  metaTitle: 'Wave.video Embed Code Generator — Embed Videos & Live Streams',
  metaDescription:
    'Free Wave.video embed code generator. Paste any Wave.video URL — get a ready-to-paste player for hosted videos and live streams. No signup.',
  keywords: [
    'embed wave video',
    'wave video embed code',
    'wave video embed code generator',
    'embed wave video stream',
    'wave video iframe code',
    'wave video player embed',
    'embed wave video live stream'
  ],
  heroTitle: 'Wave.video Embed Code Generator',
  heroSubtitle:
    'Paste any Wave.video URL — get a ready-to-paste player for hosted videos and live streams.',
  howItWorksHeading: 'How to embed Wave.video content',
  howItWorksSteps: [
    {
      title: 'Paste a Wave.video link',
      description:
        'Copy the URL of any Wave.video video or live stream and drop it into the field.'
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
  explanationHeading: 'Why use our Wave.video embed code generator',
  reasons: [
    {
      title: 'Video and live stream ready',
      description:
        'Whether the link is a hosted Wave.video clip or a live stream, the tool builds the matching player embed.'
    },
    {
      title: 'No manual setup',
      description:
        'Skip the share-menu steps. Paste a Wave.video link and get working embed HTML in one go.'
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
      title: 'Hosted video player',
      description:
        'Embed the Wave.video player so visitors can watch your hosted videos inline on any page.'
    },
    {
      title: 'Live stream embedding',
      description:
        'Works with Wave.video live streams, letting your audience tune in directly from your site.'
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
    { href: '/tools/embed-url/synthesia', label: 'Synthesia' }
  ],
  faq: [
    {
      question: 'How do I embed a Wave.video video on my site?',
      answer:
        'Paste the Wave.video URL into the tool and click Generate. You will get a ready-to-paste player snippet.'
    },
    {
      question: 'Can I embed a Wave.video live stream?',
      answer:
        'Yes. Paste the live stream link and the tool generates an embed that plays the stream inline.'
    },
    {
      question: 'Where can I paste the Wave.video embed?',
      answer:
        'Anywhere that accepts HTML — blog posts, landing pages, documentation, or your CMS.'
    },
    {
      question: 'What if the Wave.video content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
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
