import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Behance',
  slug: 'behance',
  color: '#1769FF',
  exampleUrl: 'https://www.behance.net/gallery/1234567/Project-Name',
  metaTitle: 'Behance Embed Code Generator — Embed Projects & Portfolios',
  metaDescription:
    'Free Behance embed code generator. Paste any Behance URL — get a ready-to-paste embed for design projects and portfolios. No signup.',
  keywords: [
    'embed behance',
    'behance embed code',
    'behance embed generator',
    'embed behance project',
    'behance portfolio embed',
    'behance embed html'
  ],
  heroTitle: 'Behance Embed Code Generator',
  heroSubtitle:
    'Paste any Behance URL — get a ready-to-paste embed for design projects and portfolios.',
  howItWorksHeading: 'How to embed Behance content',
  howItWorksSteps: [
    {
      title: 'Paste a Behance link',
      description:
        'Copy any Behance URL — projects, portfolios, and moodboards.'
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
      title: 'All Behance content',
      description:
        'Works with projects, portfolios, and moodboards — the tool handles all Behance URL formats.'
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
        'Get a preview card with project cover image, title, and creator info.'
    },
    {
      title: 'Projects & portfolios',
      description:
        'Individual projects, portfolios, and moodboard links — all Behance content types work.'
    },
    {
      title: 'High-quality images',
      description:
        'Preview images are pulled at the highest available resolution from Behance.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/figma',
      label: 'Figma'
    },
    {
      href: '/tools/embed-url/canva',
      label: 'Canva'
    },
    {
      href: '/tools/embed-url/pinterest',
      label: 'Pinterest'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Behance project?',
      answer: 'Paste any Behance project URL into the tool and click Generate.'
    },
    {
      question: 'Can I embed Behance portfolios?',
      answer: 'Yes. Project and portfolio URLs are both supported.'
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
