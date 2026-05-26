import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Matterport',
  slug: 'matterport',
  color: '#000000',
  exampleUrl: 'https://matterport.com',
  metaTitle:
    'Matterport Embed Code Generator — Embed 3D spaces and virtual tours',
  metaDescription:
    'Free Matterport embed code generator. Paste any Matterport URL — get a ready-to-paste embed for 3D spaces and virtual tours. No signup.',
  keywords: [
    'embed matterport',
    'matterport embed code',
    'matterport 3d tour embed'
  ],
  heroTitle: 'Matterport Embed Code Generator',
  heroSubtitle:
    'Paste any Matterport URL — get a ready-to-paste embed for 3D spaces and virtual tours.',
  howItWorksHeading: 'How to embed Matterport content',
  howItWorksSteps: [
    {
      title: 'Paste a Matterport link',
      description: 'Copy any matterport.com URL — 3D spaces and virtual tours.'
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
  explanationHeading: 'Why use our Matterport embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Matterport link and get working embed HTML.'
    },
    {
      title: 'All Matterport content',
      description:
        'Works with 3D spaces and virtual tours — the tool handles all Matterport URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Matterport embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Matterport embed with full interactivity when available.'
    },
    {
      title: 'All 3D spaces and virtual tours',
      description:
        'Works with 3D spaces and virtual tours — all Matterport content types.'
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
      question: 'How do I embed Matterport content on my website?',
      answer:
        'Paste any Matterport URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Matterport embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Matterport content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
