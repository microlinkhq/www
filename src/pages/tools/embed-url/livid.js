import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Livid',
  slug: 'livid',
  color: '#666666',
  exampleUrl: 'https://livid.com',
  metaTitle: 'Livid Embed Code Generator — Embed Pages & Shared Content',
  metaDescription:
    'Free Livid embed code generator. Paste any Livid URL — get a ready-to-paste embed or preview card for pages and shared content. No signup.',
  keywords: [
    'embed livid',
    'livid embed code',
    'livid embed code generator',
    'livid iframe code',
    'livid embed generator',
    'embed livid page',
    'livid link embed'
  ],
  heroTitle: 'Livid Embed Code Generator',
  heroSubtitle:
    'Paste any Livid URL — get a ready-to-paste embed or preview card for pages and shared content.',
  howItWorksHeading: 'How to embed Livid content',
  howItWorksSteps: [
    {
      title: 'Paste a Livid link',
      description: 'Copy any Livid URL for a page or shared content.'
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
  explanationHeading: 'Why use our Livid embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the markup by hand. Paste any Livid link and get working embed HTML instantly.'
    },
    {
      title: 'Any Livid URL',
      description:
        'Point it at any Livid page or shared link and the tool resolves the right embed for you.'
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
      title: 'Native embed',
      description:
        'Get the real Livid embed with full interactivity whenever the page allows it.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated HTML scales to its container so it looks right on any screen.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' },
    { href: '/tools/embed-url/curated', label: 'Curated' },
    { href: '/tools/embed-url/pastery', label: 'Pastery' }
  ],
  faq: [
    {
      question: 'How do I embed Livid content on my website?',
      answer:
        'Paste any Livid URL into the tool and click Generate, then copy the ready-to-paste embed HTML into your site.'
    },
    {
      question: 'What kind of Livid links can I embed?',
      answer:
        'Any public Livid page or shared link works. The tool detects the content and builds the matching embed.'
    },
    {
      question: 'Do I need a Livid account to use this?',
      answer:
        'No account is required. You only need a public Livid URL to generate the embed code.'
    },
    {
      question: 'What if the Livid content is private?',
      answer:
        'The tool falls back to a styled preview card with whatever metadata is available.'
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
