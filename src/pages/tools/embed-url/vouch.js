import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Vouch',
  slug: 'vouch',
  color: '#3BD2C1',
  exampleUrl: 'https://vouchfor.com',
  metaTitle: 'Vouch Embed Code Generator — Embed Video testimonials',
  metaDescription:
    'Free Vouch embed code generator. Paste any Vouch URL — get a ready-to-paste embed for video testimonials. No signup.',
  keywords: ['embed vouch', 'vouch embed code', 'vouch video embed'],
  heroTitle: 'Vouch Embed Code Generator',
  heroSubtitle:
    'Paste any Vouch URL — get a ready-to-paste embed for video testimonials.',
  howItWorksHeading: 'How to embed Vouch content',
  howItWorksSteps: [
    {
      title: 'Paste a Vouch link',
      description: 'Copy any vouchfor.com URL — video testimonials.'
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
  explanationHeading: 'Why use our Vouch embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Vouch link and get working embed HTML.'
    },
    {
      title: 'All Vouch content',
      description:
        'Works with video testimonials — the tool handles all Vouch URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Vouch embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Vouch embed with full interactivity when available.'
    },
    {
      title: 'All video testimonials',
      description: 'Works with video testimonials — all Vouch content types.'
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
      question: 'How do I embed Vouch content on my website?',
      answer:
        'Paste any Vouch URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Vouch embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Vouch content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
