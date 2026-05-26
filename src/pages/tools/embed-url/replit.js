import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Replit',
  slug: 'replit',
  color: '#F26207',
  exampleUrl: 'https://replit.com',
  metaTitle: 'Replit Embed Code Generator — Embed Repls and code projects',
  metaDescription:
    'Free Replit embed code generator. Paste any Replit URL — get a ready-to-paste embed for repls and code projects. No signup.',
  keywords: [
    'embed replit',
    'replit embed code',
    'replit repl embed',
    'replit iframe'
  ],
  heroTitle: 'Replit Embed Code Generator',
  heroSubtitle:
    'Paste any Replit URL — get a ready-to-paste embed for repls and code projects.',
  howItWorksHeading: 'How to embed Replit content',
  howItWorksSteps: [
    {
      title: 'Paste a Replit link',
      description: 'Copy any replit.com URL — repls and code projects.'
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
  explanationHeading: 'Why use our Replit embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Replit link and get working embed HTML.'
    },
    {
      title: 'All Replit content',
      description:
        'Works with repls and code projects — the tool handles all Replit URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Replit embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Replit embed with full interactivity when available.'
    },
    {
      title: 'All repls and code projects',
      description:
        'Works with repls and code projects — all Replit content types.'
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
      question: 'How do I embed Replit content on my website?',
      answer:
        'Paste any Replit URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Replit embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Replit content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
