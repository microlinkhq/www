import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Replit',
  slug: 'replit',
  color: '#F26207',
  exampleUrl: 'https://replit.com/@replit/Python',
  metaTitle: 'Replit Embed Code Generator — Embed Repls & Code',
  metaDescription:
    'Free Replit embed code generator. Paste any Replit URL — get a ready-to-paste iframe with a live, runnable code editor for your repls. No signup.',
  keywords: [
    'embed replit',
    'replit embed code',
    'replit embed code generator',
    'embed replit repl',
    'replit iframe code',
    'embed replit code',
    'replit editor embed'
  ],
  heroTitle: 'Replit Embed Code Generator',
  heroSubtitle:
    'Paste any Replit URL — get a ready-to-paste iframe with a live, runnable code editor for your repls.',
  howItWorksHeading: 'How to embed a Replit repl',
  howItWorksSteps: [
    {
      title: 'Paste a Replit link',
      description:
        'Copy any replit.com URL — a repl in any language, from Python and Node.js to HTML and Rust.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the repl and generates the right iframe HTML for an interactive editor.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Replit embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip appending embed parameters by hand. Paste any Replit link and get working embed HTML.'
    },
    {
      title: 'Live, runnable code',
      description:
        'Embed the real Replit editor so readers can read, edit, and run the code right on your page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Replit embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive code editor',
      description:
        'Get the real Replit IDE with a live editor and console output, runnable directly in the embed.'
    },
    {
      title: 'Any programming language',
      description:
        'Works with repls in Python, JavaScript, Node.js, HTML/CSS, Java, C++, and dozens more languages.'
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
    { href: '/tools/embed-url/wokwi', label: 'Wokwi' }
  ],
  faq: [
    {
      question: 'How do I embed a Replit repl on my website?',
      answer:
        'Paste any Replit URL into the tool and click Generate. You will get a ready-to-paste iframe with the live code editor.'
    },
    {
      question: 'Can visitors run the code in the embed?',
      answer:
        'Yes. The native Replit embed includes a runnable editor and console, so readers can edit and execute the code without leaving your page.'
    },
    {
      question: 'Which programming languages are supported?',
      answer:
        'Any language Replit supports — Python, JavaScript, Node.js, HTML/CSS, Java, C++, Go, Rust, and many more.'
    },
    {
      question: 'What if the repl is private?',
      answer:
        'Private repls cannot be embedded. The tool falls back to a styled preview card with the available metadata.'
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
