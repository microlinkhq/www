import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Gw2fashions',
  slug: 'gw2fashions',
  color: '#666666',
  exampleUrl: 'https://gw2fashions.com',
  metaTitle: 'Gw2fashions Embed Code Generator — Embed Gw2fashions Content',
  metaDescription:
    'Free Gw2fashions embed code generator. Paste any Gw2fashions URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed gw2fashions',
    'gw2fashions embed code',
    'gw2fashions embed generator'
  ],
  heroTitle: 'Gw2fashions Embed Code Generator',
  heroSubtitle:
    'Paste any Gw2fashions URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Gw2fashions content',
  howItWorksSteps: [
    {
      title: 'Paste a Gw2fashions link',
      description: 'Copy any gw2fashions.com URL.'
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
  explanationHeading: 'Why use our Gw2fashions embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Gw2fashions link and get working embed HTML.'
    },
    {
      title: 'Gw2fashions content',
      description: 'The tool handles all Gw2fashions URL formats.'
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
        'Get the real Gw2fashions embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Gw2fashions URL formats and content types.'
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
      question: 'How do I embed Gw2fashions content on my website?',
      answer: 'Paste any Gw2fashions URL into the tool and click Generate.'
    },
    {
      question: 'Is the Gw2fashions embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Gw2fashions content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
