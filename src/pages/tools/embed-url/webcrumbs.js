import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Webcrumbs',
  slug: 'webcrumbs',
  color: '#111827',
  exampleUrl: 'https://webcrumbs.org',
  metaTitle: 'Webcrumbs Embed Code Generator — Embed Web Components & Code',
  metaDescription:
    'Free Webcrumbs embed code generator. Paste any Webcrumbs URL — get a ready-to-paste embed for open-source web components and frontend code. No signup.',
  keywords: [
    'embed webcrumbs',
    'webcrumbs embed code',
    'webcrumbs embed code generator',
    'embed webcrumbs component',
    'webcrumbs iframe code',
    'webcrumbs code embed',
    'embed web component'
  ],
  heroTitle: 'Webcrumbs Embed Code Generator',
  heroSubtitle:
    'Paste any Webcrumbs URL — get a ready-to-paste embed for open-source web components and frontend code.',
  howItWorksHeading: 'How to embed Webcrumbs content',
  howItWorksSteps: [
    {
      title: 'Paste a Webcrumbs link',
      description:
        'Copy the URL of any Webcrumbs component or code snippet and drop it into the field.'
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
  explanationHeading: 'Why use our Webcrumbs embed code generator',
  reasons: [
    {
      title: 'Built for web components',
      description:
        'Turn a Webcrumbs component or frontend snippet into an embeddable preview you can show in docs and tutorials.'
    },
    {
      title: 'No manual setup',
      description:
        'Skip copying markup by hand. Paste a Webcrumbs link and get working embed HTML in one step.'
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
      title: 'Component preview embed',
      description:
        'Embed a live preview of a Webcrumbs web component so readers can see the UI on your page.'
    },
    {
      title: 'Code snippet support',
      description:
        'Works with shared Webcrumbs frontend code, handy for write-ups, documentation, and demos.'
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
    { href: '/tools/embed-url/codehs', label: 'CodeHS' }
  ],
  faq: [
    {
      question: 'How do I embed a Webcrumbs component on my site?',
      answer:
        'Paste the Webcrumbs URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Can I embed Webcrumbs code snippets?',
      answer:
        'Yes. Paste the link to a shared component or snippet and the tool generates the matching embed.'
    },
    {
      question: 'Where can I paste the Webcrumbs embed?',
      answer:
        'Anywhere that accepts HTML — blog posts, documentation, tutorials, or your CMS.'
    },
    {
      question: 'What if the Webcrumbs content is unavailable?',
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
