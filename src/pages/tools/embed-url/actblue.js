import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'ActBlue',
  slug: 'actblue',
  color: '#049CDB',
  exampleUrl: 'https://secure.actblue.com/donate/supportactblue',
  metaTitle: 'ActBlue Embed Code Generator — Embed Donation Pages',
  metaDescription:
    'Free ActBlue embed code generator. Paste any ActBlue contribution page URL — get a ready-to-paste preview card linking to your donation form. No signup.',
  keywords: [
    'embed actblue',
    'actblue embed code',
    'actblue embed code generator',
    'embed actblue donation page',
    'actblue contribution form embed',
    'actblue donate link card',
    'embed actblue fundraising page'
  ],
  heroTitle: 'ActBlue Embed Code Generator',
  heroSubtitle:
    'Paste an ActBlue contribution page URL — get a ready-to-paste preview card that links to your donation form.',
  howItWorksHeading: 'How to embed an ActBlue donation page',
  howItWorksSteps: [
    {
      title: 'Paste an ActBlue link',
      description:
        'Copy a secure.actblue.com or actblue.com contribution page or donation form URL.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page title and image and generates a styled preview card you can paste anywhere.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our ActBlue embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building a card by hand. Paste any ActBlue link and get clean, ready-to-paste HTML.'
    },
    {
      title: 'Drives donations',
      description:
        'A clear preview card with the page title and image gives supporters a confident link to your contribution form.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 ActBlue embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Donation page preview',
      description:
        'Turn any ActBlue contribution page into a clean card with its title and image, linking straight to the form.'
    },
    {
      title: 'Works with any ActBlue URL',
      description:
        'Contribution pages, donation forms, and fundraising links on secure.actblue.com and actblue.com.'
    },
    {
      title: 'Preview card fallback',
      description:
        'ActBlue does not offer a public iframe embed, so the tool generates a styled preview card with the title and image instead.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/kickstarter', label: 'Kickstarter' },
    { href: '/tools/embed-url/buttondown', label: 'Buttondown' },
    { href: '/tools/embed-url/wordpress-com', label: 'WordPress.com' }
  ],
  faq: [
    {
      question: 'How do I embed an ActBlue donation page on my website?',
      answer:
        'Paste your ActBlue contribution page URL into the tool and click Generate. You will get a preview card that links to the donation form.'
    },
    {
      question:
        'Can I embed the ActBlue contribution form directly with an iframe?',
      answer:
        'ActBlue does not offer a public iframe embed for contribution pages. The tool instead generates a styled preview card that links to your live form.'
    },
    {
      question: 'What does the preview card show?',
      answer:
        'It pulls the page title and image from your ActBlue link so supporters see a clear, clickable card.'
    },
    {
      question: 'Does it work with any ActBlue link?',
      answer:
        'Yes. It works with secure.actblue.com and actblue.com contribution pages, donation forms, and fundraising links.'
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
