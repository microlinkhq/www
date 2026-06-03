import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Huffduffer',
  slug: 'huffduffer',
  color: '#456789',
  exampleUrl: 'https://huffduffer.com/adactio',
  metaTitle: 'Huffduffer Embed Code Generator — Embed Audio Feeds & Profiles',
  metaDescription:
    'Free Huffduffer embed code generator. Paste a Huffduffer profile, tag, or audio URL and get ready-to-paste embed HTML for your personal podcast feed. No signup.',
  keywords: [
    'embed huffduffer',
    'huffduffer embed code',
    'huffduffer embed code generator',
    'embed huffduffer feed',
    'huffduffer profile embed',
    'huffduffer audio embed',
    'embed huffduffer podcast'
  ],
  heroTitle: 'Huffduffer Embed Code Generator',
  heroSubtitle:
    'Paste a Huffduffer profile, tag, or audio link and get ready-to-paste embed HTML for your personal podcast feed.',
  howItWorksHeading: 'How to embed Huffduffer audio',
  howItWorksSteps: [
    {
      title: 'Paste a Huffduffer link',
      description:
        'Copy any huffduffer.com URL — a user profile, a tag feed, or an individual huffduffed audio item.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page and generates the right embed HTML or a styled preview card.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Huffduffer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing markup by hand. Paste any Huffduffer link and get working embed HTML.'
    },
    {
      title: 'Profiles, tags & items',
      description:
        'Works with user profiles, per-tag podcast feeds, and single huffduffed audio items.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Huffduffer embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Share found sounds',
      description:
        'Embed a curated Huffduffer collection so readers can play the audio you bookmarked.'
    },
    {
      title: 'Tag-based feeds',
      description:
        'Huffduffer creates a podcast feed for every tag — embed any of them on your page.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    },
    {
      href: '/tools/embed-url/podbean',
      label: 'Podbean'
    },
    {
      href: '/tools/embed-url/clyp',
      label: 'Clyp'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Huffduffer profile on my website?',
      answer:
        'Paste any huffduffer.com URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Can I embed a single huffduffed audio item?',
      answer:
        'Yes. Individual audio items, user profiles, and per-tag podcast feeds are all supported.'
    },
    {
      question: 'What if Huffduffer cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card showing the title and image that links to the original page.'
    },
    {
      question: 'Does the embed play the audio?',
      answer:
        'Huffduffer points to audio hosted elsewhere on the web, so playback depends on the original source allowing it.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const HuffdufferPage = () => <ProviderSubtool {...data} />

export default HuffdufferPage
