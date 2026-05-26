import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Odysee',
  slug: 'odysee',
  color: '#F1583A',
  exampleUrl: 'https://odysee.com',
  metaTitle: 'Odysee Embed Code Generator — Embed Videos and channels',
  metaDescription:
    'Free Odysee embed code generator. Paste any Odysee URL — get a ready-to-paste embed for videos and channels. No signup.',
  keywords: ['embed odysee', 'odysee embed code', 'odysee video embed'],
  heroTitle: 'Odysee Embed Code Generator',
  heroSubtitle:
    'Paste any Odysee URL — get a ready-to-paste embed for videos and channels.',
  howItWorksHeading: 'How to embed Odysee content',
  howItWorksSteps: [
    {
      title: 'Paste a Odysee link',
      description: 'Copy any odysee.com URL — videos and channels.'
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
  explanationHeading: 'Why use our Odysee embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Odysee link and get working embed HTML.'
    },
    {
      title: 'All Odysee content',
      description:
        'Works with videos and channels — the tool handles all Odysee URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Odysee embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Odysee embed with full interactivity when available.'
    },
    {
      title: 'All videos and channels',
      description: 'Works with videos and channels — all Odysee content types.'
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
      question: 'How do I embed Odysee content on my website?',
      answer:
        'Paste any Odysee URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Odysee embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Odysee content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
