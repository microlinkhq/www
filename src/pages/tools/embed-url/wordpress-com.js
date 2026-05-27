import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'WordPress',
  slug: 'wordpress-com',
  color: '#21759B',
  exampleUrl: 'https://wordpress.com',
  metaTitle: 'WordPress Embed Code Generator — Embed Posts',
  metaDescription:
    'Free WordPress embed code generator. Paste any WordPress URL — get a ready-to-paste embed for posts, pages, and blogs. No signup.',
  keywords: ['embed wordpress', 'wordpress embed code', 'wordpress post embed'],
  heroTitle: 'WordPress Embed Code Generator',
  heroSubtitle:
    'Paste any WordPress URL — get a ready-to-paste embed for posts, pages, and blogs.',
  howItWorksHeading: 'How to embed WordPress content',
  howItWorksSteps: [
    {
      title: 'Paste a WordPress link',
      description: 'Copy any wordpress.com URL — posts, pages, and blogs.'
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
  explanationHeading: 'Why use our WordPress embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any WordPress link and get working embed HTML.'
    },
    {
      title: 'All WordPress content',
      description:
        'Works with posts, pages, and blogs — the tool handles all WordPress URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 WordPress embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real WordPress embed with full interactivity when available.'
    },
    {
      title: 'All posts',
      description:
        'Works with posts, pages, and blogs — all WordPress content types.'
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
      question: 'How do I embed WordPress content on my website?',
      answer:
        'Paste any WordPress URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the WordPress embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the WordPress content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
