import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Programmingly',
  slug: 'programmingly-dev',
  color: '#1F6FEB',
  exampleUrl: 'https://programmingly.dev',
  metaTitle:
    'Programmingly Embed Code Generator — Embed Code Snippets & Tutorials',
  metaDescription:
    'Free Programmingly embed code generator. Paste any Programmingly URL — get a ready-to-paste embed for code snippets and coding tutorials. No signup.',
  keywords: [
    'embed programmingly',
    'programmingly embed code',
    'programmingly embed code generator',
    'embed code snippet',
    'programmingly iframe code',
    'embed coding tutorial',
    'programmingly snippet embed'
  ],
  heroTitle: 'Programmingly Embed Code Generator',
  heroSubtitle:
    'Paste any Programmingly URL — get a ready-to-paste embed for code snippets and coding tutorials.',
  howItWorksHeading: 'How to embed Programmingly content',
  howItWorksSteps: [
    {
      title: 'Paste a Programmingly link',
      description:
        'Copy the URL of any Programmingly code snippet or tutorial and drop it in.'
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
  explanationHeading: 'Why use our Programmingly embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Programmingly link and get working embed HTML in seconds.'
    },
    {
      title: 'Built for developer content',
      description:
        'Handles code snippets and coding tutorials so readers can follow along right inside your page.'
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
      title: 'Code snippet embeds',
      description:
        'Embed Programmingly code snippets with readable syntax so visitors can study the source in context.'
    },
    {
      title: 'Tutorial embeds',
      description:
        'Drop full coding tutorials into your articles, courses, or documentation pages.'
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
      question: 'How do I embed a Programmingly code snippet on my site?',
      answer:
        'Paste the snippet URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Can I embed Programmingly coding tutorials?',
      answer:
        'Yes. Paste the tutorial URL and the generator produces an embed you can drop into any page.'
    },
    {
      question: 'Will the embedded code keep its syntax formatting?',
      answer:
        'When a native embed is available, the snippet renders with its original formatting intact.'
    },
    {
      question: 'What if the Programmingly content is private?',
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
