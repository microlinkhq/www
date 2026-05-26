import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'LearningApps',
  slug: 'learningapps-org',
  color: '#666666',
  exampleUrl: 'https://learningapps.org',
  metaTitle: 'LearningApps Embed Code Generator — Embed LearningApps Content',
  metaDescription:
    'Free LearningApps embed code generator. Paste any LearningApps URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed learningapps',
    'learningapps embed code',
    'learningapps embed generator'
  ],
  heroTitle: 'LearningApps Embed Code Generator',
  heroSubtitle:
    'Paste any LearningApps URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed LearningApps content',
  howItWorksSteps: [
    {
      title: 'Paste a LearningApps link',
      description: 'Copy any learningapps.org URL.'
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
  explanationHeading: 'Why use our LearningApps embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any LearningApps link and get working embed HTML.'
    },
    {
      title: 'LearningApps content',
      description: 'The tool handles all LearningApps URL formats.'
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
        'Get the real LearningApps embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all LearningApps URL formats and content types.'
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
      question: 'How do I embed LearningApps content on my website?',
      answer: 'Paste any LearningApps URL into the tool and click Generate.'
    },
    {
      question: 'Is the LearningApps embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the LearningApps content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
