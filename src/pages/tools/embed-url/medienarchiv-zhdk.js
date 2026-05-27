import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Medienarchiv ZHdK',
  slug: 'medienarchiv-zhdk',
  color: '#666666',
  exampleUrl: 'https://medienarchiv.zhdk.ch',
  metaTitle:
    'Medienarchiv ZHdK Embed Code Generator — Embed Medienarchiv ZHdK Content',
  metaDescription:
    'Free Medienarchiv ZHdK embed code generator. Paste any Medienarchiv ZHdK URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed medienarchiv zhdk',
    'medienarchiv zhdk embed code',
    'medienarchiv zhdk embed generator'
  ],
  heroTitle: 'Medienarchiv ZHdK Embed Code Generator',
  heroSubtitle:
    'Paste any Medienarchiv ZHdK URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Medienarchiv ZHdK content',
  howItWorksSteps: [
    {
      title: 'Paste a Medienarchiv ZHdK link',
      description: 'Copy any medienarchiv.zhdk.ch URL.'
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
  explanationHeading: 'Why use our Medienarchiv ZHdK embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Medienarchiv ZHdK link and get working embed HTML.'
    },
    {
      title: 'Medienarchiv ZHdK content',
      description: 'The tool handles all Medienarchiv ZHdK URL formats.'
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
        'Get the real Medienarchiv ZHdK embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description:
        'Works with all Medienarchiv ZHdK URL formats and content types.'
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
      question: 'How do I embed Medienarchiv ZHdK content on my website?',
      answer:
        'Paste any Medienarchiv ZHdK URL into the tool and click Generate.'
    },
    {
      question: 'Is the Medienarchiv ZHdK embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Medienarchiv ZHdK content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
