import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Carbon',
  slug: 'carbon',
  color: '#121212',
  exampleUrl: 'https://carbon.now.sh/MCojkuzwoNJO8QUyPCQI',
  metaTitle: 'Carbon Embed Code Generator — Embed Source Code Snippets',
  metaDescription:
    'Free Carbon embed code generator. Paste any carbon.now.sh URL — get a ready-to-paste iframe of your beautiful source code snippet or a preview card. No signup.',
  keywords: [
    'embed carbon',
    'carbon embed code',
    'carbon embed code generator',
    'embed carbon.now.sh',
    'carbon iframe code',
    'embed code snippet image',
    'carbon now sh embed'
  ],
  heroTitle: 'Carbon Embed Code Generator',
  heroSubtitle:
    'Paste any carbon.now.sh URL — get a ready-to-paste iframe of your beautiful source code snippet.',
  howItWorksHeading: 'How to embed a Carbon snippet',
  howItWorksSteps: [
    {
      title: 'Paste a Carbon link',
      description:
        'Copy any carbon.now.sh URL — a shared snippet or an /embed link.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the snippet and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Carbon embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the iframe by hand. Paste any Carbon link and get working embed HTML.'
    },
    {
      title: 'Beautiful code images',
      description:
        'Embed the polished, syntax-highlighted code snippet exactly as it looks on carbon.now.sh.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Carbon embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Carbon embed',
      description:
        'Get the real carbon.now.sh embed with the styled, syntax-highlighted snippet when available.'
    },
    {
      title: 'Snippets & gists',
      description:
        'Works with saved Carbon snippets and embedded GitHub gists rendered as code images.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/codepen',
      label: 'CodePen'
    },
    {
      href: '/tools/embed-url/codesandbox',
      label: 'CodeSandbox'
    },
    {
      href: '/tools/embed-url/replit',
      label: 'Replit'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Carbon snippet on my website?',
      answer:
        'Paste any carbon.now.sh URL into the tool and click Generate. You will get a ready-to-paste iframe of your code snippet.'
    },
    {
      question: 'Can I embed a Carbon snippet or a GitHub gist?',
      answer:
        'Yes. Saved Carbon snippets and snippets created from a GitHub gist both work via the carbon.now.sh/embed URL.'
    },
    {
      question: 'Is the embedded code selectable?',
      answer:
        'Carbon embeds render the snippet as a styled code image, so readers see the highlighted code and can copy it from the embed.'
    },
    {
      question: 'What if the snippet cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the title and image so you can still share it.'
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
