import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Music Box Maniacs',
  slug: 'musicboxmaniacs-com',
  color: '#666666',
  exampleUrl: 'https://musicboxmaniacs.com',
  metaTitle:
    'Music Box Maniacs Embed Code Generator — Embed Music Box Maniacs Content',
  metaDescription:
    'Free Music Box Maniacs embed code generator. Paste any Music Box Maniacs URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed music box maniacs',
    'music box maniacs embed code',
    'music box maniacs embed generator'
  ],
  heroTitle: 'Music Box Maniacs Embed Code Generator',
  heroSubtitle:
    'Paste any Music Box Maniacs URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Music Box Maniacs content',
  howItWorksSteps: [
    {
      title: 'Paste a Music Box Maniacs link',
      description: 'Copy any musicboxmaniacs.com URL.'
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
  explanationHeading: 'Why use our Music Box Maniacs embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Music Box Maniacs link and get working embed HTML.'
    },
    {
      title: 'Music Box Maniacs content',
      description: 'The tool handles all Music Box Maniacs URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description: 'Generate up to 50 embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Music Box Maniacs embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description:
        'Works with all Music Box Maniacs URL formats and content types.'
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
      question: 'How do I embed Music Box Maniacs content on my website?',
      answer:
        'Paste any Music Box Maniacs URL into the tool and click Generate.'
    },
    {
      question: 'Is the Music Box Maniacs embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Music Box Maniacs content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
