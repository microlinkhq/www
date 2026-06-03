import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Codepoints',
  slug: 'codepoints',
  color: '#222222',
  exampleUrl: 'https://codepoints.net/U+1F600',
  metaTitle: 'Codepoints Embed Code Generator — Embed Unicode Characters',
  metaDescription:
    'Free Codepoints embed code generator. Paste any codepoints.net URL — get a ready-to-paste preview card for a Unicode character or block. No signup.',
  keywords: [
    'embed codepoints',
    'codepoints embed code',
    'codepoints embed code generator',
    'embed unicode character',
    'codepoints.net embed',
    'embed codepoint',
    'unicode character preview'
  ],
  heroTitle: 'Codepoints Embed Code Generator',
  heroSubtitle:
    'Paste any codepoints.net URL — get a ready-to-paste preview card for a Unicode character, block, or plane.',
  howItWorksHeading: 'How to embed Codepoints content',
  howItWorksSteps: [
    {
      title: 'Paste a Codepoints link',
      description:
        'Copy any codepoints.net URL — a single code point like U+1F600, a Unicode block, or a search result.'
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
  explanationHeading: 'Why use our Codepoints embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any codepoints.net link and get clean preview-card HTML — no screenshots, no markup by hand.'
    },
    {
      title: 'Unicode reference at a glance',
      description:
        'Share a code point, character name, or Unicode block without sending readers off your page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Codepoints embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Code point preview',
      description:
        'Surfaces the character, its U+ code point, and name pulled from the codepoints.net page title and metadata.'
    },
    {
      title: 'Works across the catalog',
      description:
        'Single code points, Unicode blocks, planes, and search pages all resolve to a clean preview card.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/codepen', label: 'CodePen' },
    { href: '/tools/embed-url/codesandbox', label: 'CodeSandbox' },
    { href: '/tools/embed-url/replit', label: 'Replit' }
  ],
  faq: [
    {
      question: 'How do I embed a Codepoints page on my website?',
      answer:
        'Paste any codepoints.net URL into the tool and click Generate. You will get a ready-to-paste preview card.'
    },
    {
      question: 'What Codepoints URLs are supported?',
      answer:
        'Single code points such as codepoints.net/U+1F600, Unicode blocks, planes, and search result pages all work.'
    },
    {
      question: 'Does Codepoints provide a native embed?',
      answer:
        'Codepoints.net is a Unicode reference and does not offer a native embed, so the tool generates a styled preview card from the page metadata instead.'
    },
    {
      question: 'Can I customize the preview card?',
      answer:
        'Yes. Switch to Card mode to adjust colors, fonts, and layout before you copy the embed code.'
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
