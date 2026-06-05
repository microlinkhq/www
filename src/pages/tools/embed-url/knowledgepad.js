import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Knowledgepad',
  slug: 'knowledgepad',
  color: '#2D6CDF',
  exampleUrl: 'https://knowledgepad.co',
  metaTitle: 'Knowledgepad Embed Code Generator — Embed Notes & Articles',
  metaDescription:
    'Free Knowledgepad embed code generator. Paste any Knowledgepad URL — get a ready-to-paste embed for notes, articles, and knowledge pages. No signup.',
  keywords: [
    'embed knowledgepad',
    'knowledgepad embed code',
    'knowledgepad embed code generator',
    'embed knowledge base',
    'knowledgepad iframe code',
    'knowledgepad note embed',
    'embed knowledge page'
  ],
  heroTitle: 'Knowledgepad Embed Code Generator',
  heroSubtitle:
    'Paste any Knowledgepad URL — get a ready-to-paste embed for notes, articles, and knowledge pages.',
  howItWorksHeading: 'How to embed Knowledgepad content',
  howItWorksSteps: [
    {
      title: 'Paste a Knowledgepad link',
      description: 'Copy any knowledgepad.co URL — a note, article, or page.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Knowledgepad embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Knowledgepad link and get working embed HTML instantly.'
    },
    {
      title: 'Notes & articles',
      description:
        'Works with Knowledgepad notes, articles, and knowledge pages — the tool handles every URL.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Knowledgepad embed',
      description:
        'Get the real Knowledgepad embed with its formatting and media kept intact when supported.'
    },
    {
      title: 'Notes, articles & pages',
      description:
        'Notes, articles, and knowledge pages from Knowledgepad all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/pastery',
      label: 'Pastery'
    },
    {
      href: '/tools/embed-url/raindrop',
      label: 'Raindrop'
    },
    {
      href: '/tools/embed-url/curated',
      label: 'Curated'
    }
  ],
  faq: [
    {
      question: 'How do I embed Knowledgepad content on my website?',
      answer:
        'Paste any Knowledgepad URL into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'What Knowledgepad content can I embed?',
      answer: 'Notes, articles, and knowledge pages published on Knowledgepad.'
    },
    {
      question: 'Does the embed keep the formatting?',
      answer:
        'When the content supports embedding, the native Knowledgepad formatting and media are preserved.'
    },
    {
      question: 'What if the content cannot be embedded?',
      answer:
        'Switch to Card mode to get a styled preview card with the title and image instead.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
