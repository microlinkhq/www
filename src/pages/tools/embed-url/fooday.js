import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Fooday',
  slug: 'fooday',
  color: '#17213B',
  exampleUrl: 'https://fooday.app/en/reviews/93XJgo4Z9LYPD5iUz2oaCP',
  metaTitle: 'Fooday Embed Code Generator — Embed Restaurant Reviews',
  metaDescription:
    'Free Fooday embed code generator. Paste a Fooday review URL — get a ready-to-paste preview card for restaurant reviews and dining spots. No signup.',
  keywords: [
    'embed fooday',
    'fooday embed code',
    'fooday embed code generator',
    'embed fooday review',
    'fooday review embed',
    'fooday restaurant embed',
    'fooday preview card'
  ],
  heroTitle: 'Fooday Embed Code Generator',
  heroSubtitle:
    'Paste a Fooday review URL — get a ready-to-paste preview card for restaurant reviews and dining spots.',
  howItWorksHeading: 'How to embed a Fooday review',
  howItWorksSteps: [
    {
      title: 'Paste a Fooday link',
      description:
        'Copy a fooday.app review or dining-spot URL from the Fooday food guide.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and generates a styled preview card.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Fooday embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Fooday review link and get clean, working embed HTML in one click.'
    },
    {
      title: 'Built for restaurant reviews',
      description:
        'Surfaces the review title, rating, and photo so readers see the dining spot at a glance.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Fooday embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Review preview card',
      description:
        'A styled card built from the Fooday page — title, image, and link back to the full review.'
    },
    {
      title: 'Works with any Fooday URL',
      description:
        'Paste review or dining-spot pages from fooday.app and the tool handles the rest.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/instagram',
      label: 'Instagram'
    },
    {
      href: '/tools/embed-url/twitter-or-x',
      label: 'X (Twitter)'
    },
    {
      href: '/tools/embed-url/tumblr',
      label: 'Tumblr'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Fooday review on my website?',
      answer:
        'Paste a Fooday review URL into the tool and click Generate. You will get a ready-to-paste preview card.'
    },
    {
      question: 'What does the Fooday embed show?',
      answer:
        'It builds a preview card from the page metadata, typically the review title, an image, and a link to the full review on Fooday.'
    },
    {
      question: 'Does Fooday provide a native embed?',
      answer:
        'When native embedding is not available, the tool falls back to a styled preview card with the available metadata.'
    },
    {
      question: 'What if the Fooday page is private or unavailable?',
      answer:
        'If the page cannot be read, only the metadata that is publicly available will appear in the preview card.'
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
