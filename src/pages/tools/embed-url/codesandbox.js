import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'CodeSandbox',
  slug: 'codesandbox',
  color: '#151515',
  exampleUrl: 'https://codesandbox.io',
  metaTitle: 'CodeSandbox Embed Code Generator — Embed Sandboxes and devboxes',
  metaDescription:
    'Free CodeSandbox embed code generator. Paste any CodeSandbox URL — get a ready-to-paste embed for sandboxes and devboxes. No signup.',
  keywords: [
    'embed codesandbox',
    'codesandbox embed code',
    'codesandbox iframe embed'
  ],
  heroTitle: 'CodeSandbox Embed Code Generator',
  heroSubtitle:
    'Paste any CodeSandbox URL — get a ready-to-paste embed for sandboxes and devboxes.',
  howItWorksHeading: 'How to embed CodeSandbox content',
  howItWorksSteps: [
    {
      title: 'Paste a CodeSandbox link',
      description: 'Copy any codesandbox.io URL — sandboxes and devboxes.'
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
  explanationHeading: 'Why use our CodeSandbox embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any CodeSandbox link and get working embed HTML.'
    },
    {
      title: 'All CodeSandbox content',
      description:
        'Works with sandboxes and devboxes — the tool handles all CodeSandbox URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 CodeSandbox embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real CodeSandbox embed with full interactivity when available.'
    },
    {
      title: 'All sandboxes and devboxes',
      description:
        'Works with sandboxes and devboxes — all CodeSandbox content types.'
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
      question: 'How do I embed CodeSandbox content on my website?',
      answer:
        'Paste any CodeSandbox URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the CodeSandbox embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the CodeSandbox content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
