import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Egliseinfo',
  slug: 'egliseinfo',
  color: '#666666',
  exampleUrl: 'https://egliseinfo.catholique.fr',
  metaTitle: 'Egliseinfo Embed Code Generator — Embed Egliseinfo Content',
  metaDescription:
    'Free Egliseinfo embed code generator. Paste any Egliseinfo URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed egliseinfo',
    'egliseinfo embed code',
    'egliseinfo embed generator'
  ],
  heroTitle: 'Egliseinfo Embed Code Generator',
  heroSubtitle:
    'Paste any Egliseinfo URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Egliseinfo content',
  howItWorksSteps: [
    {
      title: 'Paste a Egliseinfo link',
      description: 'Copy any egliseinfo.catholique.fr URL.'
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
  explanationHeading: 'Why use our Egliseinfo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Egliseinfo link and get working embed HTML.'
    },
    {
      title: 'Egliseinfo content',
      description: 'The tool handles all Egliseinfo URL formats.'
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
        'Get the real Egliseinfo embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Egliseinfo URL formats and content types.'
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
      question: 'How do I embed Egliseinfo content on my website?',
      answer: 'Paste any Egliseinfo URL into the tool and click Generate.'
    },
    {
      question: 'Is the Egliseinfo embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Egliseinfo content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
