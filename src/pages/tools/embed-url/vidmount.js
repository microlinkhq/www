import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'VidMount',
  slug: 'vidmount',
  color: '#666666',
  exampleUrl: 'https://vidmount.com',
  metaTitle: 'VidMount Embed Code Generator — Embed VidMount Videos',
  metaDescription:
    'Free VidMount embed code generator. Paste any VidMount URL — get a ready-to-paste video player you can drop into any page. No signup.',
  keywords: [
    'embed vidmount',
    'vidmount embed code',
    'vidmount embed code generator',
    'embed vidmount video',
    'vidmount iframe code',
    'vidmount player embed',
    'vidmount video embed'
  ],
  heroTitle: 'VidMount Embed Code Generator',
  heroSubtitle:
    'Paste any VidMount URL — get a ready-to-paste video player you can drop into a blog, docs, or any CMS.',
  howItWorksHeading: 'How to embed VidMount videos',
  howItWorksSteps: [
    {
      title: 'Paste a VidMount link',
      description:
        'Copy the URL of any VidMount video and paste it into the box.'
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
  explanationHeading: 'Why use our VidMount embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'No need to hunt for an embed snippet. Paste a VidMount link and get working HTML right away.'
    },
    {
      title: 'Responsive video player',
      description:
        'The generated player resizes to fit any layout so videos look good on every screen.'
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
        'Get the real VidMount player with full playback controls when embedding is supported.'
    },
    {
      title: 'Clean responsive markup',
      description:
        'Output is lightweight iframe HTML that works in static sites, blogs, and CMS editors.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/streamable', label: 'Streamable' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed a VidMount video on my website?',
      answer:
        'Paste the VidMount video URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Will the VidMount player be responsive?',
      answer:
        'Yes. The generated embed scales to its container so it stays readable on phones and desktops.'
    },
    {
      question: 'Can I customize how the embed looks?',
      answer:
        'Use Card mode to adjust colors, fonts, and layout, or use the native player for full playback controls.'
    },
    {
      question: 'What if the VidMount video cannot be embedded?',
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
