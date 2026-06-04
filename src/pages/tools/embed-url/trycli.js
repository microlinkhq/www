import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'TryCLI',
  slug: 'trycli',
  color: '#666666',
  exampleUrl: 'https://trycli.com',
  metaTitle: 'TryCLI Embed Code Generator — Embed TryCLI Pages',
  metaDescription:
    'Free TryCLI embed code generator. Paste any TryCLI URL — get a ready-to-paste embed or preview card for pages and shared content. No signup.',
  keywords: [
    'embed trycli',
    'trycli embed code',
    'trycli embed code generator',
    'embed trycli page',
    'trycli iframe code',
    'trycli link embed',
    'embed trycli content'
  ],
  heroTitle: 'TryCLI Embed Code Generator',
  heroSubtitle:
    'Paste any TryCLI URL — get a ready-to-paste embed or preview card for pages and shared content.',
  howItWorksHeading: 'How to embed TryCLI content',
  howItWorksSteps: [
    {
      title: 'Paste a TryCLI link',
      description: 'Copy any TryCLI URL for a page or shared content.'
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
  explanationHeading: 'Why use our TryCLI embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the dashboard. Paste a TryCLI link and get working embed HTML in one step.'
    },
    {
      title: 'Pages and shared content',
      description:
        'Works with TryCLI pages and shared content links without extra configuration.'
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
      title: 'One-step embed',
      description:
        'Paste a TryCLI URL and get ready-to-paste embed HTML without touching any settings.'
    },
    {
      title: 'Responsive layout',
      description:
        'The generated embed scales to fit any column width across desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/pastery', label: 'Pastery' },
    { href: '/tools/embed-url/codepen', label: 'CodePen' },
    { href: '/tools/embed-url/codesandbox', label: 'CodeSandbox' }
  ],
  faq: [
    {
      question: 'How do I embed TryCLI content on my website?',
      answer:
        'Paste the TryCLI URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'What kinds of TryCLI links can I embed?',
      answer:
        'You can embed TryCLI pages and shared content links that are publicly accessible.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The generated embed adapts to the width of its container on desktop and mobile.'
    },
    {
      question: 'What if the TryCLI content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
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
