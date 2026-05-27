import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Animoto',
  slug: 'animoto',
  color: '#3781F6',
  exampleUrl: 'https://animoto.com',
  metaTitle: 'Animoto Embed Code Generator — Embed Videos and slideshows',
  metaDescription:
    'Free Animoto embed code generator. Paste any Animoto URL — get a ready-to-paste embed for videos and slideshows. No signup.',
  keywords: ['embed animoto', 'animoto embed code', 'animoto video embed'],
  heroTitle: 'Animoto Embed Code Generator',
  heroSubtitle:
    'Paste any Animoto URL — get a ready-to-paste embed for videos and slideshows.',
  howItWorksHeading: 'How to embed Animoto content',
  howItWorksSteps: [
    {
      title: 'Paste a Animoto link',
      description: 'Copy any animoto.com URL — videos and slideshows.'
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
  explanationHeading: 'Why use our Animoto embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Animoto link and get working embed HTML.'
    },
    {
      title: 'All Animoto content',
      description:
        'Works with videos and slideshows — the tool handles all Animoto URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Animoto embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Animoto embed with full interactivity when available.'
    },
    {
      title: 'All videos and slideshows',
      description:
        'Works with videos and slideshows — all Animoto content types.'
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
      question: 'How do I embed Animoto content on my website?',
      answer:
        'Paste any Animoto URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Animoto embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Animoto content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
