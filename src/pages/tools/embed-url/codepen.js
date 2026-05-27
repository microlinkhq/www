import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'CodePen',
  slug: 'codepen',
  color: '#000000',
  exampleUrl: 'https://codepen.io',
  metaTitle: 'CodePen Embed Code Generator — Embed Pens',
  metaDescription:
    'Free CodePen embed code generator. Paste any CodePen URL — get a ready-to-paste embed for pens, collections, and projects. No signup.',
  keywords: [
    'embed codepen',
    'codepen embed code',
    'codepen pen embed',
    'codepen iframe'
  ],
  heroTitle: 'CodePen Embed Code Generator',
  heroSubtitle:
    'Paste any CodePen URL — get a ready-to-paste embed for pens, collections, and projects.',
  howItWorksHeading: 'How to embed CodePen content',
  howItWorksSteps: [
    {
      title: 'Paste a CodePen link',
      description: 'Copy any codepen.io URL — pens, collections, and projects.'
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
  explanationHeading: 'Why use our CodePen embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any CodePen link and get working embed HTML.'
    },
    {
      title: 'All CodePen content',
      description:
        'Works with pens, collections, and projects — the tool handles all CodePen URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 CodePen embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real CodePen embed with full interactivity when available.'
    },
    {
      title: 'All pens',
      description:
        'Works with pens, collections, and projects — all CodePen content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/embed/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed CodePen content on my website?',
      answer:
        'Paste any CodePen URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the CodePen embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the CodePen content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
