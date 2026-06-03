import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'CodeHS',
  slug: 'codehs',
  color: '#04A7E8',
  exampleUrl: 'https://codehs.com/sandbox/jkeesh/turn-around',
  metaTitle: 'CodeHS Embed Code Generator — Embed Sandbox Programs',
  metaDescription:
    'Free CodeHS embed code generator. Paste any CodeHS Sandbox URL — get a ready-to-paste iframe of your running program, or a preview card. No signup.',
  keywords: [
    'embed codehs',
    'codehs embed code',
    'codehs embed code generator',
    'embed codehs sandbox',
    'embed codehs program',
    'codehs iframe code',
    'codehs sandbox embed'
  ],
  heroTitle: 'CodeHS Embed Code Generator',
  heroSubtitle:
    'Paste any CodeHS Sandbox URL — get a ready-to-paste iframe of your running program, or a styled preview card.',
  howItWorksHeading: 'How to embed a CodeHS program',
  howItWorksSteps: [
    {
      title: 'Paste a CodeHS link',
      description:
        'Copy any codehs.com Sandbox program URL — like a JavaScript, Karel, or HTML project.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the program and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our CodeHS embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Share menu. Paste any CodeHS Sandbox link and get working embed HTML.'
    },
    {
      title: 'Runs the live program',
      description:
        'Embed the interactive Sandbox so readers can run and see the output right on your page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 CodeHS embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Sandbox embed',
      description:
        'Get the real CodeHS iframe so the running program stays interactive inside your post.'
    },
    {
      title: 'Karel, JavaScript & HTML',
      description:
        'Works with Sandbox programs across languages — Karel, JavaScript, Python, and HTML projects.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/replit',
      label: 'Replit'
    },
    {
      href: '/tools/embed-url/codepen',
      label: 'CodePen'
    },
    {
      href: '/tools/embed-url/codesandbox',
      label: 'CodeSandbox'
    }
  ],
  faq: [
    {
      question: 'How do I embed a CodeHS program on my website?',
      answer:
        'Paste any CodeHS Sandbox URL into the tool and click Generate. You will get a ready-to-paste iframe of your running program.'
    },
    {
      question: 'Which CodeHS programs can I embed?',
      answer:
        'Sandbox programs work best — Karel, JavaScript, Python, and HTML projects all generate an interactive embed.'
    },
    {
      question: 'Does the embedded program stay interactive?',
      answer:
        'Yes. The native iframe runs the live Sandbox, so readers can run the program and see its output on your page.'
    },
    {
      question: 'What if the program is private or cannot be embedded?',
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

const CodeHSPage = () => <ProviderSubtool {...data} />

export default CodeHSPage
