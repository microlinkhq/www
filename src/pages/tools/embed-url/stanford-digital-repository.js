import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Stanford Digital Repository',
  slug: 'stanford-digital-repository',
  color: '#666666',
  exampleUrl: 'https://purl.stanford.edu',
  metaTitle:
    'Stanford Digital Repository Embed Code Generator — Embed Stanford Digital Repository Content',
  metaDescription:
    'Free Stanford Digital Repository embed code generator. Paste any Stanford Digital Repository URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed stanford digital repository',
    'stanford digital repository embed code',
    'stanford digital repository embed generator'
  ],
  heroTitle: 'Stanford Digital Repository Embed Code Generator',
  heroSubtitle:
    'Paste any Stanford Digital Repository URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Stanford Digital Repository content',
  howItWorksSteps: [
    {
      title: 'Paste a Stanford Digital Repository link',
      description: 'Copy any purl.stanford.edu URL.'
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
  explanationHeading:
    'Why use our Stanford Digital Repository embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Stanford Digital Repository link and get working embed HTML.'
    },
    {
      title: 'Stanford Digital Repository content',
      description:
        'The tool handles all Stanford Digital Repository URL formats.'
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
        'Get the real Stanford Digital Repository embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description:
        'Works with all Stanford Digital Repository URL formats and content types.'
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
      question:
        'How do I embed Stanford Digital Repository content on my website?',
      answer:
        'Paste any Stanford Digital Repository URL into the tool and click Generate.'
    },
    {
      question: 'Is the Stanford Digital Repository embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Stanford Digital Repository content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
