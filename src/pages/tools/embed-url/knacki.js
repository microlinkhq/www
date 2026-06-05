import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Knacki',
  slug: 'knacki',
  color: '#E63946',
  exampleUrl: 'https://knacki.info',
  metaTitle: 'Knacki Embed Code Generator — Embed Knacki Content',
  metaDescription:
    'Free Knacki embed code generator. Paste any Knacki URL — get a ready-to-paste embed for pages, posts, and shared content. No signup.',
  keywords: [
    'embed knacki',
    'knacki embed code',
    'knacki embed code generator',
    'embed knacki page',
    'knacki iframe code',
    'knacki post embed',
    'knacki html embed'
  ],
  heroTitle: 'Knacki Embed Code Generator',
  heroSubtitle:
    'Paste any Knacki URL — get a ready-to-paste embed for pages, posts, and shared content.',
  howItWorksHeading: 'How to embed Knacki content',
  howItWorksSteps: [
    {
      title: 'Paste a Knacki link',
      description: 'Copy any knacki.info URL — a page, post, or shared item.'
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
  explanationHeading: 'Why use our Knacki embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Knacki link and get working embed HTML instantly.'
    },
    {
      title: 'Pages & posts',
      description:
        'Works with Knacki pages, posts, and shared content — the tool handles every Knacki URL.'
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
      title: 'Native Knacki embed',
      description:
        'Get the real Knacki embed with its layout and media kept intact when supported.'
    },
    {
      title: 'Pages, posts & media',
      description:
        'Pages, posts, and shared media from Knacki all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/raindrop',
      label: 'Raindrop'
    },
    {
      href: '/tools/embed-url/curated',
      label: 'Curated'
    },
    {
      href: '/tools/embed-url/pastery',
      label: 'Pastery'
    }
  ],
  faq: [
    {
      question: 'How do I embed Knacki content on my website?',
      answer:
        'Paste any Knacki URL into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'What Knacki content can I embed?',
      answer: 'Pages, posts, and shared content published on Knacki.'
    },
    {
      question: 'Does the embed keep the original layout?',
      answer:
        'When the content supports embedding, the native Knacki layout and media are preserved.'
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
