import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Quiz.biz',
  slug: 'quiz-biz',
  color: '#666666',
  exampleUrl: 'https://quiz.biz',
  metaTitle: 'Quiz.biz Embed Code Generator — Embed Quiz.biz Content',
  metaDescription:
    'Free Quiz.biz embed code generator. Paste any Quiz.biz URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed quiz.biz',
    'quiz.biz embed code',
    'quiz.biz embed generator'
  ],
  heroTitle: 'Quiz.biz Embed Code Generator',
  heroSubtitle:
    'Paste any Quiz.biz URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Quiz.biz content',
  howItWorksSteps: [
    { title: 'Paste a Quiz.biz link', description: 'Copy any quiz.biz URL.' },
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
  explanationHeading: 'Why use our Quiz.biz embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Quiz.biz link and get working embed HTML.'
    },
    {
      title: 'Quiz.biz content',
      description: 'The tool handles all Quiz.biz URL formats.'
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
        'Get the real Quiz.biz embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Quiz.biz URL formats and content types.'
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
      question: 'How do I embed Quiz.biz content on my website?',
      answer: 'Paste any Quiz.biz URL into the tool and click Generate.'
    },
    {
      question: 'Is the Quiz.biz embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Quiz.biz content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
