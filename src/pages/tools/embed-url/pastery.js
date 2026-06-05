import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pastery',
  slug: 'pastery',
  color: '#2D2D2D',
  exampleUrl: 'https://www.pastery.net',
  metaTitle: 'Pastery Embed Code Generator — Embed Code & Text Pastes',
  metaDescription:
    'Free Pastery embed code generator. Paste any Pastery URL — get a ready-to-paste embed for code and text snippets with syntax highlighting. No signup.',
  keywords: [
    'embed pastery',
    'pastery embed code',
    'pastery embed code generator',
    'embed pastery paste',
    'pastery iframe code',
    'embed code snippet',
    'pastery paste embed'
  ],
  heroTitle: 'Pastery Embed Code Generator',
  heroSubtitle:
    'Paste any Pastery URL — get a ready-to-paste embed for code and text snippets with syntax highlighting.',
  howItWorksHeading: 'How to embed Pastery pastes',
  howItWorksSteps: [
    {
      title: 'Paste a Pastery link',
      description:
        'Copy the URL of any Pastery paste and drop it into the field.'
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
  explanationHeading: 'Why use our Pastery embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Pastery link and get a working embed for your snippet without writing iframe markup by hand.'
    },
    {
      title: 'Syntax-highlighted snippets',
      description:
        'Show code and text pastes with their syntax highlighting so readers can scan and copy them easily.'
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
      title: 'Code and text pastes',
      description:
        'Embed any Pastery paste — source code or plain text — directly into your page.'
    },
    {
      title: 'Preserved formatting',
      description:
        'Whitespace, line breaks, and highlighting are kept so the snippet reads exactly as on Pastery.'
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
    { href: '/tools/embed-url/mysqlexplain', label: 'MySQLExplain' }
  ],
  faq: [
    {
      question: 'How do I embed a Pastery paste on my website?',
      answer:
        'Paste the Pastery URL into the tool and click Generate. Copy the resulting HTML and paste it wherever you want the snippet to appear.'
    },
    {
      question: 'Does the embed keep syntax highlighting?',
      answer:
        'Yes. Code and text pastes are shown with their syntax highlighting and original formatting preserved.'
    },
    {
      question: 'Can I embed plain text pastes too?',
      answer:
        'Yes. Both source code and plain text pastes work — the tool handles either kind of Pastery link.'
    },
    {
      question: 'What if the paste has expired or is private?',
      answer:
        'If the paste cannot be embedded, the tool falls back to a styled preview card built from the available metadata.'
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
