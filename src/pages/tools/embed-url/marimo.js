import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'marimo',
  slug: 'marimo',
  color: '#1F6FEB',
  exampleUrl: 'https://marimo.io',
  metaTitle: 'marimo Embed Code Generator — Embed Interactive Python Notebooks',
  metaDescription:
    'Free marimo embed code generator. Paste any marimo URL — get a ready-to-paste embed for interactive, runnable Python notebooks. No signup.',
  keywords: [
    'embed marimo',
    'marimo embed code',
    'marimo embed code generator',
    'embed marimo notebook',
    'marimo notebook embed',
    'marimo iframe code',
    'python notebook embed'
  ],
  heroTitle: 'marimo Embed Code Generator',
  heroSubtitle:
    'Paste any marimo URL — get a ready-to-paste embed for interactive, runnable Python notebooks.',
  howItWorksHeading: 'How to embed marimo notebooks',
  howItWorksSteps: [
    {
      title: 'Paste a marimo link',
      description: 'Copy the URL of any shared marimo notebook.'
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
  explanationHeading: 'Why use our marimo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing the iframe by hand. Paste any marimo link and get working embed HTML instantly.'
    },
    {
      title: 'Interactive notebooks',
      description:
        'marimo notebooks embed as reactive, runnable Python so readers can explore the code in place.'
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
      title: 'Runnable Python in place',
      description:
        'Embed the live marimo notebook so visitors can run cells and see reactive outputs without leaving your page.'
    },
    {
      title: 'Responsive sizing',
      description:
        'The notebook embed scales to its container and stays readable on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/codesandbox', label: 'CodeSandbox' },
    { href: '/tools/embed-url/codepen', label: 'CodePen' },
    { href: '/tools/embed-url/codehs', label: 'CodeHS' }
  ],
  faq: [
    {
      question: 'How do I embed a marimo notebook on my website?',
      answer:
        'Paste the marimo notebook URL into the tool and click Generate, then copy the embed HTML into your site.'
    },
    {
      question: 'Can readers run the Python code in the embed?',
      answer:
        'Yes. The native embed renders the reactive marimo notebook, so visitors can run cells and see live outputs in place.'
    },
    {
      question: 'Do I need a marimo account to embed a notebook?',
      answer:
        'No account is required. A public marimo notebook URL is enough to generate the embed code.'
    },
    {
      question: 'What if the marimo notebook is private?',
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
