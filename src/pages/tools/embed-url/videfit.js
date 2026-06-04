import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Videfit',
  slug: 'videfit',
  color: '#666666',
  exampleUrl: 'https://videfit.com',
  metaTitle: 'Videfit Embed Code Generator — Embed Videfit Videos',
  metaDescription:
    'Free Videfit embed code generator. Paste any Videfit URL — get a ready-to-paste video player you can drop into any page. No signup.',
  keywords: [
    'embed videfit',
    'videfit embed code',
    'videfit embed code generator',
    'embed videfit video',
    'videfit iframe code',
    'videfit player embed',
    'videfit video embed'
  ],
  heroTitle: 'Videfit Embed Code Generator',
  heroSubtitle:
    'Paste any Videfit URL — get a ready-to-paste video player you can drop into a blog, docs, or any CMS.',
  howItWorksHeading: 'How to embed Videfit videos',
  howItWorksSteps: [
    {
      title: 'Paste a Videfit link',
      description:
        'Copy the URL of any Videfit video and paste it into the box.'
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
  explanationHeading: 'Why use our Videfit embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through page source for an embed tag. Paste a link and get working HTML instantly.'
    },
    {
      title: 'Responsive video player',
      description:
        'The generated player scales to fit any column width so videos look right on desktop and mobile.'
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
        'Get the real Videfit player with full playback controls when embedding is supported.'
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
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed a Videfit video on my website?',
      answer:
        'Paste the Videfit video URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Will the Videfit player be responsive?',
      answer:
        'Yes. The generated embed scales to its container so it stays readable on phones and desktops.'
    },
    {
      question: 'Can I customize how the embed looks?',
      answer:
        'Use Card mode to adjust colors, fonts, and layout, or use the native player for full playback controls.'
    },
    {
      question: 'What if the Videfit video cannot be embedded?',
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
