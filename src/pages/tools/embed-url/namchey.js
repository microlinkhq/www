import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Namchey',
  slug: 'namchey',
  color: '#666666',
  exampleUrl: 'https://namchey.com',
  metaTitle: 'Namchey Embed Code Generator — Embed Namchey Pages',
  metaDescription:
    'Free Namchey embed code generator. Paste any Namchey URL — get a ready-to-paste embed or preview card for pages and shared content. No signup.',
  keywords: [
    'embed namchey',
    'namchey embed code',
    'namchey embed code generator',
    'embed namchey page',
    'namchey iframe code',
    'namchey embed widget',
    'embed namchey content'
  ],
  heroTitle: 'Namchey Embed Code Generator',
  heroSubtitle:
    'Paste any Namchey URL — get a ready-to-paste embed or preview card for pages and shared content.',
  howItWorksHeading: 'How to embed Namchey content',
  howItWorksSteps: [
    {
      title: 'Paste a Namchey link',
      description: 'Copy the URL of any Namchey page or shared item.'
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
  explanationHeading: 'Why use our Namchey embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Namchey link and get working embed HTML in one step.'
    },
    {
      title: 'Works with any Namchey URL',
      description:
        'Point the tool at a Namchey page and it builds the embed for you automatically.'
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
      title: 'Embed shared pages',
      description:
        'Turn a Namchey page link into clean, embeddable HTML you can drop anywhere.'
    },
    {
      title: 'Consistent output',
      description:
        'Get the same reliable embed HTML for every Namchey link you paste.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/behance', label: 'Behance' },
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' },
    { href: '/tools/embed-url/curated', label: 'Curated' }
  ],
  faq: [
    {
      question: 'How do I embed Namchey content on my website?',
      answer:
        'Paste the Namchey URL into the tool and click Generate to get embeddable HTML.'
    },
    {
      question: 'What kind of Namchey links can I embed?',
      answer:
        'Any public Namchey page or shared content link will produce an embed or preview card.'
    },
    {
      question: 'Do I need a Namchey account to embed a link?',
      answer:
        'No account is required — just paste a public Namchey URL and generate the code.'
    },
    {
      question: 'What if the Namchey page is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
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
