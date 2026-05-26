import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Tumblr',
  slug: 'tumblr',
  color: '#36465D',
  exampleUrl: 'https://tumblr.com',
  metaTitle: 'Tumblr Embed Code Generator — Embed Posts',
  metaDescription:
    'Free Tumblr embed code generator. Paste any Tumblr URL — get a ready-to-paste embed for posts, photos, and blogs. No signup.',
  keywords: ['embed tumblr', 'tumblr embed code', 'tumblr post embed'],
  heroTitle: 'Tumblr Embed Code Generator',
  heroSubtitle:
    'Paste any Tumblr URL — get a ready-to-paste embed for posts, photos, and blogs.',
  howItWorksHeading: 'How to embed Tumblr content',
  howItWorksSteps: [
    {
      title: 'Paste a Tumblr link',
      description: 'Copy any tumblr.com URL — posts, photos, and blogs.'
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
  explanationHeading: 'Why use our Tumblr embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Tumblr link and get working embed HTML.'
    },
    {
      title: 'All Tumblr content',
      description:
        'Works with posts, photos, and blogs — the tool handles all Tumblr URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Tumblr embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Tumblr embed with full interactivity when available.'
    },
    {
      title: 'All posts',
      description:
        'Works with posts, photos, and blogs — all Tumblr content types.'
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
      question: 'How do I embed Tumblr content on my website?',
      answer:
        'Paste any Tumblr URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Tumblr embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Tumblr content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
