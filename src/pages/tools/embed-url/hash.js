import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'HASH',
  slug: 'hash',
  color: '#0A9EC0',
  exampleUrl: 'https://core.hash.ai/@hash/wildfires-regrowth',
  metaTitle: 'HASH Embed Code Generator — Embed HASH Simulations',
  metaDescription:
    'Free HASH embed code generator. Paste a core.hash.ai simulation URL — get a ready-to-paste embed or styled preview card. No signup.',
  keywords: [
    'embed hash',
    'hash embed code',
    'hash embed code generator',
    'embed hash simulation',
    'hash ai embed',
    'core.hash.ai embed',
    'hash simulation iframe'
  ],
  heroTitle: 'HASH Embed Code Generator',
  heroSubtitle:
    'Paste a HASH simulation URL — get a ready-to-paste embed or styled preview card.',
  howItWorksHeading: 'How to embed a HASH simulation',
  howItWorksSteps: [
    {
      title: 'Paste a HASH link',
      description:
        'Copy a core.hash.ai simulation URL, such as a published @user/project page.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the HASH page and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our HASH embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste a HASH simulation link and get working embed HTML in one step.'
    },
    {
      title: 'Built for HASH simulations',
      description:
        'Handles core.hash.ai simulation URLs so you can share interactive models inline.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 HASH embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native HASH embed',
      description:
        'Get the real HASH embed so visitors can view the simulation directly on your page.'
    },
    {
      title: 'Responsive layout',
      description:
        'The embed adapts to your page width for clean placement on any site.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/twitter-or-x', label: 'Twitter / X' },
    { href: '/tools/embed-url/codepen', label: 'CodePen' }
  ],
  faq: [
    {
      question: 'How do I embed a HASH simulation on my website?',
      answer:
        'Paste a core.hash.ai simulation URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Which HASH URLs are supported?',
      answer:
        'Public HASH simulation pages on core.hash.ai, including @user/project URLs.'
    },
    {
      question: 'What if the HASH page cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card built from the available title and image metadata.'
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
