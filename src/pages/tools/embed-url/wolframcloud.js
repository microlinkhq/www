import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Wolfram Cloud',
  slug: 'wolframcloud',
  color: '#DD1100',
  exampleUrl: 'https://wolframcloud.com',
  metaTitle:
    'Wolfram Cloud Embed Code Generator — Embed Notebooks & Computations',
  metaDescription:
    'Free Wolfram Cloud embed code generator. Paste any Wolfram Cloud URL — get a ready-to-paste embed for interactive Wolfram Notebooks and computations. No signup.',
  keywords: [
    'embed wolfram cloud',
    'wolfram cloud embed code',
    'wolfram cloud embed code generator',
    'embed wolfram notebook',
    'wolfram cloud iframe code',
    'wolfram notebook embed',
    'embed wolfram computation'
  ],
  heroTitle: 'Wolfram Cloud Embed Code Generator',
  heroSubtitle:
    'Paste any Wolfram Cloud URL — get a ready-to-paste embed for interactive Wolfram Notebooks and computations.',
  howItWorksHeading: 'How to embed Wolfram Cloud notebooks',
  howItWorksSteps: [
    {
      title: 'Paste a Wolfram Cloud link',
      description:
        'Copy the URL of any notebook or computation hosted on wolframcloud.com and paste it above.'
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
  explanationHeading: 'Why use our Wolfram Cloud embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'No need to wire up the cloud object yourself. Paste a Wolfram Cloud link and get working embed HTML.'
    },
    {
      title: 'Keeps computations live',
      description:
        'The embed preserves interactive, computable documents so readers can run and explore the notebook in place.'
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
      title: 'Interactive notebook embed',
      description:
        'Embed Wolfram Notebooks so the interactive, computable content stays usable inside your page.'
    },
    {
      title: 'Computation support',
      description:
        'Works with hosted Wolfram computations as well as full notebooks deployed to the cloud.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/marimo', label: 'marimo' },
    { href: '/tools/embed-url/jovian', label: 'Jovian' },
    { href: '/tools/embed-url/codesandbox', label: 'CodeSandbox' }
  ],
  faq: [
    {
      question: 'How do I embed a Wolfram Notebook on my website?',
      answer:
        'Paste the Wolfram Cloud URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Will the embedded notebook stay interactive?',
      answer:
        'Yes. The embed keeps the computable document live so readers can interact with and run it in place.'
    },
    {
      question: 'Can I embed a single computation instead of a full notebook?',
      answer:
        'You can. The tool works with both hosted Wolfram computations and complete cloud notebooks.'
    },
    {
      question: 'What if the cloud object is private?',
      answer:
        'The tool falls back to a styled preview card built from the available metadata.'
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
