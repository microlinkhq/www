import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Loom',
  slug: 'loom',
  color: '#625DF5',
  exampleUrl: 'https://www.loom.com/share/e41353f2fe1c43eba6c6829693e0f2c5',
  metaTitle: 'Loom Embed Code Generator — Embed Screen Recordings & Videos',
  metaDescription:
    'Free Loom embed code generator. Paste any Loom share link — get a ready-to-paste iframe player for screen recordings and video messages. No signup.',
  keywords: [
    'embed loom video',
    'loom embed code',
    'loom embed code generator',
    'loom iframe embed',
    'embed loom recording',
    'loom video embed html',
    'embed loom screen recording'
  ],
  heroTitle: 'Loom Embed Code Generator',
  heroSubtitle:
    'Paste any Loom share link — get a ready-to-paste iframe player for screen recordings and video messages.',
  howItWorksHeading: 'How to embed a Loom video',
  howItWorksSteps: [
    {
      title: 'Paste a Loom link',
      description:
        'Copy any loom.com share URL — screen recordings, video messages, or shared workspace videos.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool extracts the video ID and generates the native Loom player iframe HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Loom embed code generator',
  reasons: [
    {
      title: 'No manual conversion',
      description:
        'Paste the share link as-is. The tool turns it into working embed HTML without editing the URL by hand.'
    },
    {
      title: 'Screen recordings & video messages',
      description:
        'Works with screen recordings, camera video messages, and shared videos — any Loom share link is supported.'
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
      title: 'Native Loom player',
      description:
        'The real Loom player with playback controls, speed settings, and chapters — not a screenshot or thumbnail.'
    },
    {
      title: 'Responsive iframe',
      description:
        'The embed scales to fit its container, so the video looks right on desktop and mobile layouts.'
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
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Loom video on my website?',
      answer:
        'Paste any Loom share URL into the tool and click Generate. You will get a ready-to-paste iframe player to add to your HTML, blog, CMS, or MDX file.'
    },
    {
      question: 'Do chapters and playback controls work in the embed?',
      answer:
        'Yes. The embed uses the native Loom player, so chapters, timestamps, playback speed, and captions all work as they do on loom.com.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The generated iframe scales to fit its container, so the video stays correctly sized on desktop and mobile.'
    },
    {
      question: 'Can I embed private or password-protected Loom videos?',
      answer:
        'Only videos shared with public or link-access settings can be embedded. Private or password-protected videos will not load in the iframe, so the tool falls back to a preview card when possible.'
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
