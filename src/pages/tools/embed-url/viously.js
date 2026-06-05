import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Viously',
  slug: 'viously',
  color: '#FF5252',
  exampleUrl: 'https://viously.com',
  metaTitle: 'Viously Embed Code Generator — Embed Viously Videos',
  metaDescription:
    'Free Viously embed code generator. Paste any Viously URL — get a ready-to-paste player for your hosted video. No signup.',
  keywords: [
    'embed viously',
    'viously embed code',
    'viously embed code generator',
    'embed viously video',
    'viously iframe code',
    'viously player embed',
    'viously video embed'
  ],
  heroTitle: 'Viously Embed Code Generator',
  heroSubtitle:
    'Paste any Viously URL — get a ready-to-paste player for your hosted video, ready for any page.',
  howItWorksHeading: 'How to embed Viously videos',
  howItWorksSteps: [
    {
      title: 'Paste a Viously link',
      description:
        'Copy the URL of any Viously video and paste it into the box.'
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
  explanationHeading: 'Why use our Viously embed code generator',
  reasons: [
    {
      title: 'Built for publishers',
      description:
        'Generate clean embeds for Viously-hosted video so you can drop player units into articles and pages fast.'
    },
    {
      title: 'Keeps the native player',
      description:
        'Output uses the hosted Viously player, so playback and any monetization stay handled by Viously.'
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
        'Get the real Viously player with full playback controls when embedding is supported.'
    },
    {
      title: 'Publisher and CMS ready',
      description:
        'Lightweight iframe HTML drops cleanly into editorial sites, blogs, and CMS editors.'
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
    { href: '/tools/embed-url/brightcove', label: 'Brightcove' }
  ],
  faq: [
    {
      question: 'How do I embed a Viously video on my website?',
      answer:
        'Paste the Viously video URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Does the embed keep the Viously player?',
      answer:
        'Yes. The output loads the hosted Viously player, so playback and monetization remain handled by Viously.'
    },
    {
      question: 'Can I customize how the embed looks?',
      answer:
        'Use Card mode to adjust colors, fonts, and layout, or use the native player for full playback controls.'
    },
    {
      question: 'What if the Viously video cannot be embedded?',
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
