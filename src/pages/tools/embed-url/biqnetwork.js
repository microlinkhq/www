import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'biQ Network',
  slug: 'biqnetwork',
  color: '#1E4F61',
  exampleUrl: 'https://biq.network/',
  metaTitle: 'biQ Network Embed Code Generator — Embed a biQ Network Page',
  metaDescription:
    'Free biQ Network embed code generator. Paste a biQ Network URL — get a clean, ready-to-paste preview card with title, description, and image. No signup.',
  keywords: [
    'embed biq network',
    'biq network embed code',
    'biq network embed generator',
    'biq network link preview',
    'biq network preview card',
    'embed biq.network page',
    'biq network card embed'
  ],
  heroTitle: 'biQ Network Embed Code Generator',
  heroSubtitle:
    'Paste a biQ Network URL — get a clean, ready-to-paste preview card with the page title, description, and image.',
  howItWorksHeading: 'How to embed a biQ Network page',
  howItWorksSteps: [
    {
      title: 'Paste a biQ Network link',
      description: 'Copy any biq.network URL — a page, post, or resource link.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and generates a styled preview card you can paste anywhere.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our biQ Network embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing markup by hand. Paste a biQ Network link and get a ready-to-paste preview card.'
    },
    {
      title: 'Clean link previews',
      description:
        'The card pulls the page title, description, and image so your biQ Network link looks polished.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 biQ Network embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Metadata-rich preview',
      description:
        'The card surfaces the page title, description, and thumbnail pulled straight from the biQ Network URL.'
    },
    {
      title: 'Responsive by default',
      description:
        'The preview card adapts to your layout and looks right on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/twitter-or-x', label: 'Twitter / X' }
  ],
  faq: [
    {
      question: 'How do I embed a biQ Network page on my website?',
      answer:
        'Paste a biq.network URL into the tool and click Generate. You will get a ready-to-paste preview card.'
    },
    {
      question: 'Does biQ Network offer a native embed?',
      answer:
        'biQ Network is a membership community rather than a media host, so the tool generates a styled preview card from the page metadata instead of a native player.'
    },
    {
      question: 'What does the preview card show?',
      answer:
        'The card displays the page title, description, and image pulled from the biQ Network URL you paste.'
    },
    {
      question: 'What if the biQ Network page is private?',
      answer:
        'Member-only pages may expose limited metadata, so the card falls back to whatever public title and image are available.'
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
