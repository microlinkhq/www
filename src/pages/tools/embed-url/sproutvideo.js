import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SproutVideo',
  slug: 'sproutvideo',
  color: '#4BAC77',
  exampleUrl:
    'https://videos.sproutvideo.com/embed/709adcb31f19e5c6f8/cd8cf2e796aa69d3',
  metaTitle: 'SproutVideo Embed Code Generator — Embed Business Videos',
  metaDescription:
    'Free SproutVideo embed code generator. Paste any SproutVideo URL — get a ready-to-paste iframe player for hosted business videos and live streams. No signup.',
  keywords: [
    'embed sproutvideo',
    'sproutvideo embed code',
    'sproutvideo embed code generator',
    'embed sproutvideo video',
    'sproutvideo iframe code',
    'sproutvideo player embed',
    'embed sproutvideo live stream'
  ],
  heroTitle: 'SproutVideo Embed Code Generator',
  heroSubtitle:
    'Paste a SproutVideo URL — get a ready-to-paste iframe player for hosted business videos and live streams.',
  howItWorksHeading: 'How to embed a SproutVideo video',
  howItWorksSteps: [
    {
      title: 'Paste a SproutVideo link',
      description:
        'Copy a SproutVideo video URL from sproutvideo.com/videos, a vids.io page, or a videos.sproutvideo.com/embed link.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the SproutVideo player and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our SproutVideo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the SproutVideo dashboard for embed codes. Paste any link and get working embed HTML.'
    },
    {
      title: 'Built for business video',
      description:
        'Works with SproutVideo on-demand videos and live streams hosted for business and training use.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 SproutVideo embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native SproutVideo player',
      description:
        'Get the real SproutVideo player with adaptive playback, full-screen, and the player controls from your account.'
    },
    {
      title: 'Videos and live streams',
      description:
        'On-demand business videos and live streams both work, and the embed stays responsive across screen sizes.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/wistia',
      label: 'Wistia'
    },
    {
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    },
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    }
  ],
  faq: [
    {
      question: 'How do I embed a SproutVideo video on my website?',
      answer:
        'Paste your SproutVideo URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Does it work with SproutVideo live streams?',
      answer:
        'Yes. Both on-demand videos and live streams hosted on SproutVideo are supported.'
    },
    {
      question: 'Can I embed private or login-protected SproutVideo videos?',
      answer:
        'Private, password-protected, and signed videos may block embedding outside their allowed domains. The tool falls back to a preview card when the native player is restricted.'
    },
    {
      question: 'What if the video cannot be embedded?',
      answer:
        'Switch to Card mode to get a styled preview card with the title and thumbnail that links back to the video.'
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
