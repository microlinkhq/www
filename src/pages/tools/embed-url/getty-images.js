import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Getty Images',
  slug: 'getty-images',
  color: '#000000',
  exampleUrl: 'https://gettyimages.com',
  metaTitle:
    'Getty Images Embed Code Generator — Embed Photos and editorial images',
  metaDescription:
    'Free Getty Images embed code generator. Paste any Getty Images URL — get a ready-to-paste embed for photos and editorial images. No signup.',
  keywords: ['embed getty images', 'getty images embed code', 'getty embed'],
  heroTitle: 'Getty Images Embed Code Generator',
  heroSubtitle:
    'Paste any Getty Images URL — get a ready-to-paste embed for photos and editorial images.',
  howItWorksHeading: 'How to embed Getty Images content',
  howItWorksSteps: [
    {
      title: 'Paste a Getty Images link',
      description: 'Copy any gettyimages.com URL — photos and editorial images.'
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
  explanationHeading: 'Why use our Getty Images embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Getty Images link and get working embed HTML.'
    },
    {
      title: 'All Getty Images content',
      description:
        'Works with photos and editorial images — the tool handles all Getty Images URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Getty Images embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Getty Images embed with full interactivity when available.'
    },
    {
      title: 'All photos and editorial images',
      description:
        'Works with photos and editorial images — all Getty Images content types.'
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
      question: 'How do I embed Getty Images content on my website?',
      answer:
        'Paste any Getty Images URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Getty Images embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Getty Images content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
