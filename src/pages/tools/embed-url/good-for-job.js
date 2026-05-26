import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Good for Job',
  slug: 'good-for-job',
  color: '#666666',
  exampleUrl: 'https://good-for-job.com',
  metaTitle: 'Good for Job Embed Code Generator — Embed Good for Job Content',
  metaDescription:
    'Free Good for Job embed code generator. Paste any Good for Job URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed good for job',
    'good for job embed code',
    'good for job embed generator'
  ],
  heroTitle: 'Good for Job Embed Code Generator',
  heroSubtitle:
    'Paste any Good for Job URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Good for Job content',
  howItWorksSteps: [
    {
      title: 'Paste a Good for Job link',
      description: 'Copy any good-for-job.com URL.'
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
  explanationHeading: 'Why use our Good for Job embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Good for Job link and get working embed HTML.'
    },
    {
      title: 'Good for Job content',
      description: 'The tool handles all Good for Job URL formats.'
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
        'Get the real Good for Job embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Good for Job URL formats and content types.'
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
      question: 'How do I embed Good for Job content on my website?',
      answer: 'Paste any Good for Job URL into the tool and click Generate.'
    },
    {
      question: 'Is the Good for Job embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Good for Job content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
