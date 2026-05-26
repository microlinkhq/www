import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Viostream',
  slug: 'viostream',
  color: '#666666',
  exampleUrl: 'https://viostream.com',
  metaTitle: 'Viostream Embed Code Generator — Embed Viostream Content',
  metaDescription:
    'Free Viostream embed code generator. Paste any Viostream URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed viostream',
    'viostream embed code',
    'viostream embed generator'
  ],
  heroTitle: 'Viostream Embed Code Generator',
  heroSubtitle:
    'Paste any Viostream URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Viostream content',
  howItWorksSteps: [
    {
      title: 'Paste a Viostream link',
      description: 'Copy any viostream.com URL.'
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
  explanationHeading: 'Why use our Viostream embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Viostream link and get working embed HTML.'
    },
    {
      title: 'Viostream content',
      description: 'The tool handles all Viostream URL formats.'
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
        'Get the real Viostream embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Viostream URL formats and content types.'
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
      question: 'How do I embed Viostream content on my website?',
      answer: 'Paste any Viostream URL into the tool and click Generate.'
    },
    {
      question: 'Is the Viostream embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Viostream content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
