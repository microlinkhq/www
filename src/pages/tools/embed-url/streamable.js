import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Streamable',
  slug: 'streamable',
  color: '#0F90FA',
  exampleUrl: 'https://streamable.com/hn8hq',
  metaTitle: 'Streamable Embed Code Generator — Embed Videos & Clips',
  metaDescription:
    'Free Streamable embed code generator. Paste any Streamable URL — get a ready-to-paste iframe player for uploaded videos and clips. No signup.',
  keywords: [
    'embed streamable',
    'streamable embed code',
    'streamable embed code generator',
    'embed streamable video',
    'streamable iframe code',
    'streamable video player embed',
    'embed streamable clip'
  ],
  heroTitle: 'Streamable Embed Code Generator',
  heroSubtitle:
    'Paste any Streamable URL — get a ready-to-paste iframe player for your uploaded videos and clips.',
  howItWorksHeading: 'How to embed a Streamable video',
  howItWorksSteps: [
    {
      title: 'Paste a Streamable link',
      description:
        'Copy any streamable.com video link — short share URLs like streamable.com/abc123 all work.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the video and generates the right responsive iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Streamable embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the player menu. Paste any Streamable link and get working embed HTML.'
    },
    {
      title: 'Works with every clip',
      description:
        'Handles Streamable share URLs automatically, so any uploaded video or clip embeds cleanly.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Streamable embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Streamable player',
      description:
        'Get the real Streamable video player with playback controls and fullscreen support.'
    },
    {
      title: 'Responsive video embed',
      description:
        'The iframe scales to fit your layout so your clips look right on desktop and mobile.'
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
    { href: '/tools/embed-url/coub', label: 'Coub' }
  ],
  faq: [
    {
      question: 'How do I embed a Streamable video on my website?',
      answer:
        'Paste any Streamable URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'What Streamable links can I embed?',
      answer:
        'Any public Streamable video share link works, such as streamable.com/abc123.'
    },
    {
      question: 'Is the video player responsive?',
      answer:
        'Yes. The generated iframe scales to fit your container so the video looks right on any screen size.'
    },
    {
      question: 'What if the Streamable video is private?',
      answer:
        'Private or restricted videos cannot be embedded natively, so the tool falls back to a styled preview card with the available metadata.'
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
