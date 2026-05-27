import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Whimsical',
  slug: 'whimsical',
  color: '#7B57DF',
  exampleUrl: 'https://whimsical.com',
  metaTitle: 'Whimsical Embed Code Generator — Embed Flowcharts',
  metaDescription:
    'Free Whimsical embed code generator. Paste any Whimsical URL — get a ready-to-paste embed for flowcharts, wireframes, and mind maps. No signup.',
  keywords: [
    'embed whimsical',
    'whimsical embed code',
    'whimsical flowchart embed'
  ],
  heroTitle: 'Whimsical Embed Code Generator',
  heroSubtitle:
    'Paste any Whimsical URL — get a ready-to-paste embed for flowcharts, wireframes, and mind maps.',
  howItWorksHeading: 'How to embed Whimsical content',
  howItWorksSteps: [
    {
      title: 'Paste a Whimsical link',
      description:
        'Copy any whimsical.com URL — flowcharts, wireframes, and mind maps.'
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
  explanationHeading: 'Why use our Whimsical embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Whimsical link and get working embed HTML.'
    },
    {
      title: 'All Whimsical content',
      description:
        'Works with flowcharts, wireframes, and mind maps — the tool handles all Whimsical URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Whimsical embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Whimsical embed with full interactivity when available.'
    },
    {
      title: 'All flowcharts',
      description:
        'Works with flowcharts, wireframes, and mind maps — all Whimsical content types.'
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
      question: 'How do I embed Whimsical content on my website?',
      answer:
        'Paste any Whimsical URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Whimsical embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Whimsical content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
