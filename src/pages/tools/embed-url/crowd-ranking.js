import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Crowd Ranking',
  slug: 'crowd-ranking',
  color: '#666666',
  exampleUrl: 'https://crowdranking.com',
  metaTitle: 'Crowd Ranking Embed Code Generator — Embed Crowd Ranking Content',
  metaDescription:
    'Free Crowd Ranking embed code generator. Paste any Crowd Ranking URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed crowd ranking',
    'crowd ranking embed code',
    'crowd ranking embed generator'
  ],
  heroTitle: 'Crowd Ranking Embed Code Generator',
  heroSubtitle:
    'Paste any Crowd Ranking URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Crowd Ranking content',
  howItWorksSteps: [
    {
      title: 'Paste a Crowd Ranking link',
      description: 'Copy any crowdranking.com URL.'
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
  explanationHeading: 'Why use our Crowd Ranking embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Crowd Ranking link and get working embed HTML.'
    },
    {
      title: 'Crowd Ranking content',
      description: 'The tool handles all Crowd Ranking URL formats.'
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
        'Get the real Crowd Ranking embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Crowd Ranking URL formats and content types.'
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
      question: 'How do I embed Crowd Ranking content on my website?',
      answer: 'Paste any Crowd Ranking URL into the tool and click Generate.'
    },
    {
      question: 'Is the Crowd Ranking embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Crowd Ranking content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
