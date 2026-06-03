import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Behance',
  slug: 'behance',
  color: '#1769FF',
  exampleUrl: 'https://www.behance.net/gallery/250416249/Japan-Revisited',
  metaTitle: 'Behance Embed Code Generator — Embed Projects & Portfolios',
  metaDescription:
    'Free Behance embed code generator. Paste any Behance URL — get a ready-to-paste embed for creative projects and portfolios. No signup.',
  keywords: [
    'embed behance',
    'behance embed code',
    'behance embed code generator',
    'embed behance project',
    'behance portfolio embed',
    'behance project embed',
    'behance embed html'
  ],
  heroTitle: 'Behance Embed Code Generator',
  heroSubtitle:
    'Paste any Behance URL — get a ready-to-paste embed for creative projects and portfolios.',
  howItWorksHeading: 'How to embed a Behance project',
  howItWorksSteps: [
    {
      title: 'Paste a Behance link',
      description:
        'Copy any behance.net URL — project galleries and creative portfolios.'
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
  explanationHeading: 'Why use our Behance embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Behance link and get working embed HTML.'
    },
    {
      title: 'Projects & portfolios',
      description:
        'Works with project galleries and creative portfolios — the tool handles Behance URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Behance embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Rich project previews',
      description:
        'Get a preview card with the project cover image, title, and creator name.'
    },
    {
      title: 'Projects & portfolios',
      description:
        'Project galleries and creative portfolios from behance.net are supported.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/deviantart-com',
      label: 'DeviantArt'
    },
    {
      href: '/tools/embed-url/sketchfab',
      label: 'Sketchfab'
    },
    {
      href: '/tools/embed-url/figma',
      label: 'Figma'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Behance project on my website?',
      answer:
        'Paste any Behance project URL into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'Can I embed a Behance portfolio?',
      answer:
        'Yes. Project gallery and creative portfolio URLs from behance.net are both supported.'
    },
    {
      question: 'What does the preview card show?',
      answer:
        'When native embedding is restricted, the tool generates a styled card with the project cover image, title, and creator name.'
    },
    {
      question: 'Are private or draft projects supported?',
      answer:
        'No. Only public, published Behance projects can be embedded, since private and draft work is not accessible.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const BehancePage = () => <ProviderSubtool {...data} />

export default BehancePage
