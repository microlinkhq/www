import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Tuxx',
  slug: 'tuxx-be',
  color: '#666666',
  exampleUrl: 'https://tuxx.be',
  metaTitle: 'Tuxx Embed Code Generator — Embed Pages & Shared Content',
  metaDescription:
    'Free Tuxx embed code generator. Paste any Tuxx URL — get a ready-to-paste embed or preview card for pages and shared content. No signup.',
  keywords: [
    'embed tuxx',
    'tuxx embed code',
    'tuxx embed code generator',
    'embed tuxx page',
    'tuxx iframe code',
    'tuxx link embed',
    'embed tuxx content'
  ],
  heroTitle: 'Tuxx Embed Code Generator',
  heroSubtitle:
    'Paste any Tuxx URL — get a ready-to-paste embed or preview card for pages and shared content.',
  howItWorksHeading: 'How to embed Tuxx content',
  howItWorksSteps: [
    {
      title: 'Paste a Tuxx link',
      description: 'Copy any tuxx.be URL from your browser address bar.'
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
  explanationHeading: 'Why use our Tuxx embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Tuxx link and get working embed HTML in seconds — no markup to write by hand.'
    },
    {
      title: 'Handles every Tuxx URL',
      description:
        'The tool reads each Tuxx page and builds the right embed for the content it finds.'
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
      title: 'Native embed when available',
      description:
        'Get the real Tuxx embed with full interactivity whenever the page supports it.'
    },
    {
      title: 'Clean responsive output',
      description:
        'Embed code adapts to the width of your page so Tuxx content looks right on any device.'
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
      question: 'How do I embed a Tuxx page on my website?',
      answer:
        'Paste the Tuxx URL into the tool, click Generate, then copy the HTML it produces into your page.'
    },
    {
      question: 'Which Tuxx links work with this tool?',
      answer:
        'Any public tuxx.be URL works. The tool reads the page and builds an embed from what it finds.'
    },
    {
      question: 'Can I customize how the Tuxx embed looks?',
      answer:
        'Yes. Use Card mode to adjust colors, fonts, and layout before copying the code.'
    },
    {
      question: 'What if the Tuxx page cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card built from the available page metadata.'
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
