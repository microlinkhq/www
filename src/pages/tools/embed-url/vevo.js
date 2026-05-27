import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Vevo',
  slug: 'vevo',
  color: '#ED1439',
  exampleUrl: 'https://vevo.com',
  metaTitle: 'Vevo Embed Code Generator — Embed Music videos',
  metaDescription:
    'Free Vevo embed code generator. Paste any Vevo URL — get a ready-to-paste embed for music videos. No signup.',
  keywords: ['embed vevo', 'vevo embed code', 'vevo music video embed'],
  heroTitle: 'Vevo Embed Code Generator',
  heroSubtitle:
    'Paste any Vevo URL — get a ready-to-paste embed for music videos.',
  howItWorksHeading: 'How to embed Vevo content',
  howItWorksSteps: [
    {
      title: 'Paste a Vevo link',
      description: 'Copy any vevo.com URL — music videos.'
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
  explanationHeading: 'Why use our Vevo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Vevo link and get working embed HTML.'
    },
    {
      title: 'All Vevo content',
      description:
        'Works with music videos — the tool handles all Vevo URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Vevo embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Vevo embed with full interactivity when available.'
    },
    {
      title: 'All music videos',
      description: 'Works with music videos — all Vevo content types.'
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
      question: 'How do I embed Vevo content on my website?',
      answer:
        'Paste any Vevo URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Vevo embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Vevo content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
