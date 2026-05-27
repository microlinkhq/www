import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Blogcast',
  slug: 'blogcast',
  color: '#666666',
  exampleUrl: 'https://blogcast.host',
  metaTitle: 'Blogcast Embed Code Generator — Embed Blogcast Content',
  metaDescription:
    'Free Blogcast embed code generator. Paste any Blogcast URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed blogcast',
    'blogcast embed code',
    'blogcast embed generator'
  ],
  heroTitle: 'Blogcast Embed Code Generator',
  heroSubtitle:
    'Paste any Blogcast URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Blogcast content',
  howItWorksSteps: [
    {
      title: 'Paste a Blogcast link',
      description: 'Copy any blogcast.host URL.'
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
  explanationHeading: 'Why use our Blogcast embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Blogcast link and get working embed HTML.'
    },
    {
      title: 'Blogcast content',
      description: 'The tool handles all Blogcast URL formats.'
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
        'Get the real Blogcast embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Blogcast URL formats and content types.'
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
      question: 'How do I embed Blogcast content on my website?',
      answer: 'Paste any Blogcast URL into the tool and click Generate.'
    },
    {
      question: 'Is the Blogcast embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Blogcast content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
