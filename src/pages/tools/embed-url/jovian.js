import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Jovian',
  slug: 'jovian',
  color: '#1A73E8',
  exampleUrl: 'https://jovian.com',
  metaTitle: 'Jovian Embed Code Generator — Embed Jupyter Notebooks',
  metaDescription:
    'Free Jovian embed code generator. Paste any Jovian URL — get a ready-to-paste embed for shared Jupyter notebooks and data science projects. No signup.',
  keywords: [
    'embed jovian',
    'jovian embed code',
    'jovian embed code generator',
    'embed jupyter notebook',
    'jovian iframe code',
    'jovian notebook embed',
    'embed data science notebook'
  ],
  heroTitle: 'Jovian Embed Code Generator',
  heroSubtitle:
    'Paste any Jovian URL — get a ready-to-paste embed for shared Jupyter notebooks and data science projects.',
  howItWorksHeading: 'How to embed Jovian content',
  howItWorksSteps: [
    {
      title: 'Paste a Jovian link',
      description: 'Copy any Jovian URL — a shared notebook or project.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the notebook and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Jovian embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Jovian link and get working embed HTML — no exporting the notebook by hand.'
    },
    {
      title: 'Notebooks & projects',
      description:
        'Works with shared Jupyter notebooks and the data science projects hosted on Jovian.'
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
      title: 'Rendered notebook',
      description:
        'Embed the Jovian notebook with its code cells, outputs, and charts kept intact.'
    },
    {
      title: 'Notebooks & data projects',
      description:
        'Shared Jupyter notebooks and data science projects from Jovian all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/codesandbox',
      label: 'CodeSandbox'
    },
    {
      href: '/tools/embed-url/codepen',
      label: 'CodePen'
    },
    {
      href: '/tools/embed-url/codehs',
      label: 'CodeHS'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Jovian notebook on my website?',
      answer:
        'Paste any Jovian URL into the tool and click Generate. You will get a ready-to-paste embed for the notebook.'
    },
    {
      question: 'What is Jovian?',
      answer:
        'Jovian is a data science platform for hosting and sharing Jupyter notebooks and projects.'
    },
    {
      question: 'Does the embed keep the notebook outputs?',
      answer:
        'When the notebook supports embedding, its code cells, outputs, and charts are preserved.'
    },
    {
      question: 'What if the notebook cannot be embedded?',
      answer:
        'Switch to Card mode to get a styled preview card with the title and image instead.'
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
