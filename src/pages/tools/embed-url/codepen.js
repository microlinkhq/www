import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'CodePen',
  slug: 'codepen',
  color: '#131417',
  exampleUrl: 'https://codepen.io/Mamboleoo/pen/XWJPxpZ',
  metaTitle:
    'CodePen Embed Code Generator — Embed Pens, Projects & Collections',
  metaDescription:
    'Free CodePen embed code generator. Paste any CodePen URL — get a ready-to-paste iframe for Pens, Projects, and Collections with a live preview. No signup.',
  keywords: [
    'embed codepen',
    'embed codepen pen',
    'codepen embed code',
    'codepen embed code generator',
    'codepen iframe code',
    'embed codepen collection',
    'codepen embed html'
  ],
  heroTitle: 'CodePen Embed Code Generator',
  heroSubtitle:
    'Paste any CodePen URL — get a ready-to-paste iframe for Pens, Projects, and Collections with a live, interactive preview.',
  howItWorksHeading: 'How to embed CodePen content',
  howItWorksSteps: [
    {
      title: 'Paste a CodePen link',
      description:
        'Copy any codepen.io URL — a Pen, a Project, or a Collection.'
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
  explanationHeading: 'Why use our CodePen embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip opening the Embed Builder on CodePen. Paste any Pen link and get working embed HTML.'
    },
    {
      title: 'Live, interactive preview',
      description:
        'The embed runs the actual Pen — readers can see the HTML, CSS, and JS result and tweak the code inline.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 CodePen embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Editable, runnable Pens',
      description:
        'The embed shows the rendered result plus the HTML, CSS, and JS tabs, so readers can run and edit the code.'
    },
    {
      title: 'Pens, Projects & Collections',
      description:
        'Individual Pens, full Projects, and Collections of Pens — the tool handles all CodePen URL formats.'
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
      href: '/tools/embed-url/replit',
      label: 'Replit'
    },
    {
      href: '/tools/embed-url/observable',
      label: 'Observable'
    }
  ],
  faq: [
    {
      question: 'How do I embed a CodePen Pen on my website?',
      answer:
        'Paste any codepen.io Pen URL into the tool and click Generate. You will get a ready-to-paste iframe with a live preview.'
    },
    {
      question: 'Can I embed CodePen Projects and Collections?',
      answer:
        'Yes. Pens, Projects, and Collections are all supported — the tool detects the type from the URL.'
    },
    {
      question: 'Is the embedded Pen editable?',
      answer:
        'Yes. The embed shows the live result alongside the HTML, CSS, and JS tabs, so readers can run and edit the code inline.'
    },
    {
      question: 'What happens if a Pen cannot be embedded directly?',
      answer:
        'If native embedding is restricted, the tool falls back to a styled preview card with the title and image that links to the Pen.'
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
