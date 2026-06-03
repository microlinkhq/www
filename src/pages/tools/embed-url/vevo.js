import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Vevo',
  slug: 'vevo',
  color: '#000000',
  exampleUrl: 'https://www.youtube.com/watch?v=kPa7bsKwL-c',
  metaTitle: 'Vevo Embed Code Generator — Embed Official Music Videos',
  metaDescription:
    'Free Vevo embed code generator. Paste a Vevo music video link — get a ready-to-paste player for official music videos, or a styled preview card. No signup.',
  keywords: [
    'embed vevo',
    'vevo embed code',
    'vevo embed code generator',
    'embed vevo video',
    'embed vevo music video',
    'vevo iframe code',
    'vevo video embed'
  ],
  heroTitle: 'Vevo Embed Code Generator',
  heroSubtitle:
    'Paste a Vevo music video link — get a ready-to-paste embed for official music videos, or a styled preview card.',
  howItWorksHeading: 'How to embed a Vevo video',
  howItWorksSteps: [
    {
      title: 'Paste a Vevo link',
      description:
        'Copy a Vevo music video URL from vevo.com or the Vevo video on YouTube where it is hosted.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the video and generates a player embed, or a preview card when a native embed is not available.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Vevo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual embed lookup. Paste a Vevo music video link and get working embed HTML.'
    },
    {
      title: 'Official music videos',
      description:
        'Vevo distributes official music videos mostly through YouTube, and the tool handles those video links.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Vevo embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Music video player',
      description:
        'Get a ready-to-paste player for the official music video, with playback controls in your page.'
    },
    {
      title: 'Responsive output',
      description:
        'The embed adapts to your layout so the music video stays watchable on any screen size.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    },
    {
      href: '/tools/embed-url/dailymotion',
      label: 'Dailymotion'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Vevo music video on my website?',
      answer:
        'Paste a Vevo music video link into the tool and click Generate. You will get a ready-to-paste player, or a preview card if a native embed is not available.'
    },
    {
      question: 'Does Vevo provide its own embed player?',
      answer:
        'Vevo distributes most official music videos through YouTube, so the embed is usually the YouTube-hosted Vevo video rather than a separate Vevo player.'
    },
    {
      question: 'What if the video cannot be embedded directly?',
      answer:
        'When native embedding is restricted, the tool falls back to a styled preview card with the title and thumbnail that links to the video.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The generated embed adapts to your layout so the music video stays watchable on desktop and mobile.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const VevoPage = () => <ProviderSubtool {...data} />

export default VevoPage
