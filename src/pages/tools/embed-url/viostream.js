import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Viostream',
  slug: 'viostream',
  color: '#00AEEF',
  exampleUrl: 'https://viostream.com',
  metaTitle: 'Viostream Embed Code Generator — Embed Business Videos',
  metaDescription:
    'Free Viostream embed code generator. Paste any Viostream URL — get a ready-to-paste player for your hosted business video. No signup.',
  keywords: [
    'embed viostream',
    'viostream embed code',
    'viostream embed code generator',
    'embed viostream video',
    'viostream iframe code',
    'viostream player embed',
    'viostream business video embed'
  ],
  heroTitle: 'Viostream Embed Code Generator',
  heroSubtitle:
    'Paste any Viostream URL — get a ready-to-paste player for your hosted business video, ready for any page.',
  howItWorksHeading: 'How to embed Viostream videos',
  howItWorksSteps: [
    {
      title: 'Paste a Viostream link',
      description:
        'Copy the URL of any Viostream video and paste it into the box.'
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
  explanationHeading: 'Why use our Viostream embed code generator',
  reasons: [
    {
      title: 'Built for business video',
      description:
        'Generate clean embeds for Viostream-hosted corporate, training, and event video without touching the admin console.'
    },
    {
      title: 'Works with secure delivery',
      description:
        'Output plays the hosted Viostream player so your enterprise streaming and access controls stay in place.'
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
      title: 'Native business video embed',
      description:
        'Get the real Viostream player with full playback controls when embedding is supported.'
    },
    {
      title: 'Intranet and CMS ready',
      description:
        'Lightweight iframe HTML drops cleanly into corporate sites, intranets, and CMS editors.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/brightcove', label: 'Brightcove' },
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' }
  ],
  faq: [
    {
      question: 'How do I embed a Viostream video on my website?',
      answer:
        'Paste the Viostream video URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Does this work with secured Viostream video?',
      answer:
        'The embed loads the hosted Viostream player, so any access controls configured on the video still apply.'
    },
    {
      question: 'Can I use the embed on a corporate intranet?',
      answer:
        'Yes. The output is standard iframe HTML that drops into intranets, corporate sites, and most CMS editors.'
    },
    {
      question: 'What if the Viostream video cannot be embedded?',
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
