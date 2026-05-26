import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Vimeo',
  slug: 'vimeo',
  color: '#1AB7EA',
  exampleUrl: 'https://vimeo.com/148751763',
  metaTitle: 'Vimeo Embed Code Generator — Embed Any Vimeo Video',
  metaDescription:
    'Free Vimeo embed code generator. Paste any Vimeo URL — get a ready-to-paste iframe or preview card. Works with videos, showcases, and channels. No signup.',
  keywords: [
    'embed vimeo video',
    'vimeo embed code',
    'vimeo embed code generator',
    'vimeo iframe code',
    'embed vimeo on website',
    'vimeo player embed',
    'vimeo embed html'
  ],
  heroTitle: 'Vimeo Embed Code Generator',
  heroSubtitle:
    'Paste any Vimeo URL — get a ready-to-paste iframe or preview card. Works with videos, showcases, and channels.',
  howItWorksHeading: 'How to embed Vimeo content',
  howItWorksSteps: [
    {
      title: 'Paste a Vimeo link',
      description: 'Copy any Vimeo URL — videos, showcases, and channels.'
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
  explanationHeading: 'Why use our Vimeo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Vimeo link and get working embed HTML.'
    },
    {
      title: 'All Vimeo content',
      description:
        'Works with videos, showcases, and channels — the tool handles all Vimeo URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Vimeo embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Vimeo player',
      description:
        "Get Vimeo's real interactive player — not a screenshot. Play, pause, fullscreen, and quality settings all work."
    },
    {
      title: 'Responsive iframe',
      description:
        'The generated iframe uses a 16:9 aspect ratio wrapper that adapts to any container width.'
    },
    {
      title: 'Showcases & channels',
      description:
        'Videos, showcases, and channel URLs all work — the tool detects the content type automatically.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/loom',
      label: 'Loom'
    },
    {
      href: '/tools/embed-url/tiktok',
      label: 'TikTok'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Vimeo video on my website?',
      answer:
        'Paste any Vimeo URL into the tool and click Generate. You will get a ready-to-paste iframe HTML snippet.'
    },
    {
      question: 'Does the embed include Vimeo controls?',
      answer:
        'Yes. The native Vimeo player includes play/pause, volume, fullscreen, quality, and speed controls.'
    },
    {
      question: 'Can I embed private Vimeo videos?',
      answer:
        'If the video has a shareable link, the embed will work. Fully private videos will show a preview card instead.'
    },
    {
      question: 'Is the Vimeo embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const VimeoPage = () => <ProviderSubtool {...data} />

export default VimeoPage
