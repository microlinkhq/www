import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Clipland',
  slug: 'clipland',
  color: '#1A2B3C',
  exampleUrl: 'https://www.clipland.com/Summary/800006693/',
  metaTitle:
    'Clipland Embed Code Generator — Embed Music Videos, Short Films & Commercials',
  metaDescription:
    'Free Clipland embed code generator. Paste any Clipland URL — get a ready-to-paste embed or preview card for music videos, short films, trailers, and TV commercials. No signup.',
  keywords: [
    'embed clipland',
    'clipland embed code',
    'clipland embed code generator',
    'embed clipland music video',
    'embed clipland short film',
    'embed clipland commercial',
    'clipland video embed'
  ],
  heroTitle: 'Clipland Embed Code Generator',
  heroSubtitle:
    'Paste any Clipland URL — get a ready-to-paste embed or preview card for music videos, short films, trailers, and TV commercials.',
  howItWorksHeading: 'How to embed Clipland content',
  howItWorksSteps: [
    {
      title: 'Paste a Clipland link',
      description:
        'Copy any clipland.com title URL — music videos, short films, movie trailers, and TV commercials.'
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
  explanationHeading: 'Why use our Clipland embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through page source. Paste any Clipland link and get working embed HTML.'
    },
    {
      title: 'All Clipland content',
      description:
        'Works with music videos, short films, movie trailers, and TV commercials from the Clipland archive.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Clipland embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Clipland player',
      description:
        'Get the real Clipland video player with the clip and its title when embedding is available.'
    },
    {
      title: 'Videos, films & commercials',
      description:
        'Music videos, short films, movie trailers, and TV commercials from the Clipland database all work.'
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
      question: 'How do I embed a Clipland video on my website?',
      answer:
        'Paste any Clipland title URL into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'What types of Clipland content can I embed?',
      answer:
        'Music videos, short films, movie trailers, and TV commercials from the Clipland archive are all supported.'
    },
    {
      question: 'What if the clip cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the available title and image metadata.'
    },
    {
      question: 'Does the embed adapt to my layout?',
      answer:
        'Yes. The generated embed is responsive and fits the width of the container you paste it into.'
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
