import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Kakao TV',
  slug: 'kakaotv',
  color: '#FEE500',
  exampleUrl: 'https://tv.kakao.com/channel/3089974/cliplink/406384573',
  metaTitle: 'Kakao TV Embed Code Generator — Embed Videos, Live & Clips',
  metaDescription:
    'Free Kakao TV embed code generator. Paste any tv.kakao.com URL — get a ready-to-paste player for videos, live streams, and clips, or a preview card. No signup.',
  keywords: [
    'embed kakao tv',
    'kakao tv embed code',
    'kakao tv embed code generator',
    'embed kakao tv video',
    'kakao tv iframe code',
    'embed kakao tv clip',
    'kakao tv player embed'
  ],
  heroTitle: 'Kakao TV Embed Code Generator',
  heroSubtitle:
    'Paste any Kakao TV URL — get a ready-to-paste player for videos, live streams, and clips.',
  howItWorksHeading: 'How to embed a Kakao TV video',
  howItWorksSteps: [
    {
      title: 'Paste a Kakao TV link',
      description:
        'Copy any tv.kakao.com URL — channel videos, live streams, and clip links.'
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
  explanationHeading: 'Why use our Kakao TV embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Kakao TV link and get working embed HTML.'
    },
    {
      title: 'Videos, live & clips',
      description:
        'Works with Kakao TV original shows, live broadcasts, and clip links — the tool handles the tv.kakao.com URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Kakao TV embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Kakao TV player',
      description:
        'Get the real Kakao TV player with playback controls when the video allows embedding.'
    },
    {
      title: 'Responsive video embed',
      description:
        'The player scales to fit your layout, from inline placement to full-width feature spots.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/naver-tv',
      label: 'Naver TV'
    },
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/afreecatv',
      label: 'AfreecaTV'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Kakao TV video on my website?',
      answer:
        'Paste any tv.kakao.com URL into the tool and click Generate. You will get a ready-to-paste player embed.'
    },
    {
      question: 'Can I embed Kakao TV live streams and clips?',
      answer:
        'Yes. Channel videos, live broadcasts, and clip links from tv.kakao.com are all supported.'
    },
    {
      question: 'What if the Kakao TV video cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the title and thumbnail when native embedding is restricted.'
    },
    {
      question: 'Does the embed work on mobile?',
      answer:
        'Yes. The Kakao TV player is responsive and scales to fit phones, tablets, and desktop layouts.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const KakaoTVPage = () => <ProviderSubtool {...data} />

export default KakaoTVPage
