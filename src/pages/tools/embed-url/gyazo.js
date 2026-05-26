import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Gyazo',
  slug: 'gyazo',
  color: '#6AC2E7',
  exampleUrl: 'https://gyazo.com/1234567890abcdef',
  metaTitle: 'Gyazo Embed Code Generator — Embed Screenshots & GIFs',
  metaDescription:
    'Free Gyazo embed code generator. Paste any Gyazo URL — get a ready-to-paste embed for screenshots and GIFs. No signup.',
  keywords: [
    'embed gyazo',
    'gyazo embed code',
    'gyazo embed generator',
    'gyazo image embed',
    'embed gyazo screenshot',
    'gyazo embed html'
  ],
  heroTitle: 'Gyazo Embed Code Generator',
  heroSubtitle:
    'Paste any Gyazo URL — get a ready-to-paste embed for screenshots and GIFs.',
  howItWorksHeading: 'How to embed Gyazo content',
  howItWorksSteps: [
    {
      title: 'Paste a Gyazo link',
      description: 'Copy any Gyazo URL — screenshots, GIFs, and videos.'
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
  explanationHeading: 'Why use our Gyazo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Gyazo link and get working embed HTML.'
    },
    {
      title: 'All Gyazo content',
      description:
        'Works with screenshots, GIFs, and videos — the tool handles all Gyazo URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Gyazo embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Instant image embeds',
      description:
        'Get an embed with the full-resolution Gyazo screenshot or GIF.'
    },
    {
      title: 'Screenshots, GIFs & video',
      description:
        'Static screenshots, animated GIFs, and video captures — all Gyazo types work.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled card with image thumbnail when direct embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/imgur',
      label: 'Imgur'
    },
    {
      href: '/tools/embed-url/zight',
      label: 'Zight'
    },
    {
      href: '/tools/embed-url/loom',
      label: 'Loom'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Gyazo screenshot?',
      answer: 'Paste any Gyazo URL into the tool and click Generate.'
    },
    {
      question: 'Does this work with Gyazo GIFs?',
      answer: 'Yes. Animated GIFs and video captures are supported.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const GyazoPage = () => <ProviderSubtool {...data} />

export default GyazoPage
