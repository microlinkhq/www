import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Overflow',
  slug: 'overflow-io',
  color: '#7C4DFF',
  exampleUrl: 'https://overflow.io',
  metaTitle: 'Overflow Embed Code Generator — Embed User Flow Diagrams',
  metaDescription:
    'Free Overflow embed code generator. Paste any overflow.io URL — get a ready-to-paste player for interactive, playable user-flow diagrams. No signup.',
  keywords: [
    'embed overflow',
    'overflow embed code',
    'overflow embed code generator',
    'embed overflow user flow',
    'overflow iframe code',
    'overflow flow diagram embed',
    'embed overflow.io'
  ],
  heroTitle: 'Overflow Embed Code Generator',
  heroSubtitle:
    'Paste any overflow.io URL — get a ready-to-paste player for interactive, playable user-flow diagrams.',
  howItWorksHeading: 'How to embed Overflow user flows',
  howItWorksSteps: [
    {
      title: 'Paste an Overflow link',
      description: 'Copy the share URL of any overflow.io user-flow diagram.'
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
  explanationHeading: 'Why use our Overflow embed code generator',
  reasons: [
    {
      title: 'Keep flows interactive',
      description:
        'Embed playable Overflow user-flow diagrams so readers can click through the journey instead of viewing a flat screenshot.'
    },
    {
      title: 'Perfect for design handoff',
      description:
        'Drop live flows into specs, design docs, and case studies so stakeholders explore the full path on their own.'
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
      title: 'Playable flow embeds',
      description:
        'Render shared Overflow diagrams as an interactive player your audience can navigate end to end.'
    },
    {
      title: 'Responsive sizing',
      description:
        'Embeds scale to fit articles, documentation, and design portfolios on any screen.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/whimsical', label: 'Whimsical' },
    { href: '/tools/embed-url/cacoo', label: 'Cacoo' },
    { href: '/tools/embed-url/balsamiq', label: 'Balsamiq' }
  ],
  faq: [
    {
      question: 'How do I embed an Overflow user flow on my website?',
      answer:
        'Paste the overflow.io share URL into the tool and click Generate to get ready-to-paste embed HTML.'
    },
    {
      question: 'Can people interact with the embedded flow?',
      answer:
        'Yes — when the diagram supports native embedding, viewers can click through the user flow directly inside your page.'
    },
    {
      question: 'What if my Overflow flow is private?',
      answer:
        'Private or restricted flows fall back to a styled preview card built from the available metadata.'
    },
    {
      question: 'Where can I paste the Overflow embed code?',
      answer:
        'Anywhere that accepts HTML — blog posts, design docs, CMS pages, knowledge bases, and portfolio sites.'
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
