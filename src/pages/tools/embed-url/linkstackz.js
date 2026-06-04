import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'LinkStackz',
  slug: 'linkstackz',
  color: '#6C5CE7',
  exampleUrl: 'https://linkstackz.com',
  metaTitle: 'LinkStackz Embed Code Generator — Embed Link-in-Bio Pages',
  metaDescription:
    'Free LinkStackz embed code generator. Paste any LinkStackz URL — get a ready-to-paste embed or preview card for your link-in-bio page. No signup.',
  keywords: [
    'embed linkstackz',
    'linkstackz embed code',
    'linkstackz embed code generator',
    'embed link in bio page',
    'linkstackz iframe code',
    'linkstackz page embed',
    'linkstackz preview card'
  ],
  heroTitle: 'LinkStackz Embed Code Generator',
  heroSubtitle:
    'Paste any LinkStackz URL — get a ready-to-paste embed or preview card for your link-in-bio page.',
  howItWorksHeading: 'How to embed LinkStackz content',
  howItWorksSteps: [
    {
      title: 'Paste a LinkStackz link',
      description:
        'Copy your linkstackz.com link-in-bio URL and paste it into the tool.'
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
  explanationHeading: 'Why use our LinkStackz embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste your LinkStackz link and get working embed HTML — no copying snippets by hand.'
    },
    {
      title: 'Built for link-in-bio pages',
      description:
        'Recognizes LinkStackz page URLs and pulls the title, avatar, and links so the embed mirrors your page.'
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
      title: 'Link-in-bio page detection',
      description:
        'Identifies LinkStackz pages and builds an embed that shows your stacked links.'
    },
    {
      title: 'Avatar & title metadata',
      description:
        'Pulls your page title, avatar, and description so the embed represents your profile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/curated', label: 'Curated' },
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' },
    { href: '/tools/embed-url/behance', label: 'Behance' }
  ],
  faq: [
    {
      question: 'How do I embed my LinkStackz page on my website?',
      answer:
        'Paste your LinkStackz URL from linkstackz.com into the tool and click Generate to get the embed HTML.'
    },
    {
      question: 'Will the embed show all of my links?',
      answer:
        'When your page exposes that data, the embed shows your stacked links along with the title and avatar.'
    },
    {
      question: 'Can I embed any public LinkStackz page?',
      answer:
        'Yes — paste any public LinkStackz link-in-bio URL and the tool generates the matching embed.'
    },
    {
      question: 'What if a LinkStackz page cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the available title and image.'
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
