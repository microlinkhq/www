import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Buttondown',
  slug: 'buttondown',
  color: '#0069FF',
  exampleUrl: 'https://buttondown.com',
  metaTitle: 'Buttondown Embed Code Generator — Embed Newsletters and archives',
  metaDescription:
    'Free Buttondown embed code generator. Paste any Buttondown URL — get a ready-to-paste embed for newsletters and archives. No signup.',
  keywords: [
    'embed buttondown',
    'buttondown embed code',
    'buttondown newsletter embed'
  ],
  heroTitle: 'Buttondown Embed Code Generator',
  heroSubtitle:
    'Paste any Buttondown URL — get a ready-to-paste embed for newsletters and archives.',
  howItWorksHeading: 'How to embed Buttondown content',
  howItWorksSteps: [
    {
      title: 'Paste a Buttondown link',
      description: 'Copy any buttondown.com URL — newsletters and archives.'
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
  explanationHeading: 'Why use our Buttondown embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Buttondown link and get working embed HTML.'
    },
    {
      title: 'All Buttondown content',
      description:
        'Works with newsletters and archives — the tool handles all Buttondown URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Buttondown embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Buttondown embed with full interactivity when available.'
    },
    {
      title: 'All newsletters and archives',
      description:
        'Works with newsletters and archives — all Buttondown content types.'
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
      question: 'How do I embed Buttondown content on my website?',
      answer:
        'Paste any Buttondown URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Buttondown embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Buttondown content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
