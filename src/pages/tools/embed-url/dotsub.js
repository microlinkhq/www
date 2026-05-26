import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Dotsub',
  slug: 'dotsub',
  color: '#666666',
  exampleUrl: 'https://dotsub.com',
  metaTitle: 'Dotsub Embed Code Generator — Embed Dotsub Content',
  metaDescription:
    'Free Dotsub embed code generator. Paste any Dotsub URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed dotsub', 'dotsub embed code', 'dotsub embed generator'],
  heroTitle: 'Dotsub Embed Code Generator',
  heroSubtitle:
    'Paste any Dotsub URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Dotsub content',
  howItWorksSteps: [
    { title: 'Paste a Dotsub link', description: 'Copy any dotsub.com URL.' },
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
  explanationHeading: 'Why use our Dotsub embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Dotsub link and get working embed HTML.'
    },
    {
      title: 'Dotsub content',
      description: 'The tool handles all Dotsub URL formats.'
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
        'Get the real Dotsub embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Dotsub URL formats and content types.'
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
      question: 'How do I embed Dotsub content on my website?',
      answer: 'Paste any Dotsub URL into the tool and click Generate.'
    },
    {
      question: 'Is the Dotsub embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Dotsub content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
