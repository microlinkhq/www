import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Cacoo',
  slug: 'cacoo',
  color: '#57C2A7',
  exampleUrl: 'https://cacoo.com',
  metaTitle: 'Cacoo Embed Code Generator — Embed Diagrams and flowcharts',
  metaDescription:
    'Free Cacoo embed code generator. Paste any Cacoo URL — get a ready-to-paste embed for diagrams and flowcharts. No signup.',
  keywords: ['embed cacoo', 'cacoo embed code', 'cacoo diagram embed'],
  heroTitle: 'Cacoo Embed Code Generator',
  heroSubtitle:
    'Paste any Cacoo URL — get a ready-to-paste embed for diagrams and flowcharts.',
  howItWorksHeading: 'How to embed Cacoo content',
  howItWorksSteps: [
    {
      title: 'Paste a Cacoo link',
      description: 'Copy any cacoo.com URL — diagrams and flowcharts.'
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
  explanationHeading: 'Why use our Cacoo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Cacoo link and get working embed HTML.'
    },
    {
      title: 'All Cacoo content',
      description:
        'Works with diagrams and flowcharts — the tool handles all Cacoo URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Cacoo embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Cacoo embed with full interactivity when available.'
    },
    {
      title: 'All diagrams and flowcharts',
      description:
        'Works with diagrams and flowcharts — all Cacoo content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed Cacoo content on my website?',
      answer:
        'Paste any Cacoo URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Cacoo embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Cacoo content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
