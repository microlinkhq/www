import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Znipe.tv',
  slug: 'znipe',
  color: '#00E5C5',
  exampleUrl: 'https://znipe.tv',
  metaTitle: 'Znipe.tv Embed Code Generator — Embed Esports Video Streams',
  metaDescription:
    'Free Znipe.tv embed code generator. Paste any Znipe.tv URL — get a ready-to-paste embed for multi-angle and on-demand esports video streams. No signup.',
  keywords: [
    'embed znipe',
    'znipe embed code',
    'znipe embed code generator',
    'embed znipe stream',
    'znipe iframe code',
    'znipe tv video embed',
    'embed esports stream'
  ],
  heroTitle: 'Znipe.tv Embed Code Generator',
  heroSubtitle:
    'Paste any Znipe.tv URL — get a ready-to-paste embed for multi-angle and on-demand esports video streams.',
  howItWorksHeading: 'How to embed Znipe.tv streams',
  howItWorksSteps: [
    {
      title: 'Paste a Znipe.tv link',
      description:
        'Copy the URL of any esports stream or video on demand from znipe.tv and paste it above.'
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
  explanationHeading: 'Why use our Znipe.tv embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the player menu for share options. Paste a Znipe.tv link and get working embed HTML.'
    },
    {
      title: 'Multi-angle esports playback',
      description:
        'The embed keeps the Znipe.tv player intact so viewers can switch angles and watch on-demand content in place.'
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
      title: 'Esports video embed',
      description:
        'Embed the Znipe.tv player so esports streams and replays play directly inside your page.'
    },
    {
      title: 'On-demand support',
      description:
        'Works with both live esports streams and on-demand video so past matches stay watchable.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/sooplive', label: 'SOOP' },
    { href: '/tools/embed-url/toornament', label: 'Toornament' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' }
  ],
  faq: [
    {
      question: 'How do I embed a Znipe.tv stream on my website?',
      answer:
        'Paste the stream URL into the tool, click Generate, then copy the HTML into your page or CMS.'
    },
    {
      question: 'Can viewers switch camera angles in the embed?',
      answer:
        'Yes. The embed keeps the Znipe.tv player intact, so multi-angle controls remain available to viewers.'
    },
    {
      question: 'Does it work with on-demand esports videos?',
      answer:
        'It does. The tool embeds both live streams and on-demand esports content from Znipe.tv.'
    },
    {
      question: 'What if the stream is restricted?',
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
