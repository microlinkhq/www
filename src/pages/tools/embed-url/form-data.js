import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Form-Data',
  slug: 'form-data',
  color: '#14B8A6',
  exampleUrl: 'https://form-data.com',
  metaTitle: 'Form-Data Embed Code Generator — Embed Forms',
  metaDescription:
    'Free Form-Data embed code generator. Paste a Form-Data URL — get a ready-to-paste embed for forms, or a styled preview card. No signup.',
  keywords: [
    'embed form-data',
    'form-data embed code',
    'form-data embed code generator',
    'embed form-data form',
    'form-data iframe code',
    'form-data form embed',
    'embed online form'
  ],
  heroTitle: 'Form-Data Embed Code Generator',
  heroSubtitle:
    'Paste a Form-Data URL — get a ready-to-paste embed for your form, or a styled preview card.',
  howItWorksHeading: 'How to embed a Form-Data form',
  howItWorksSteps: [
    {
      title: 'Paste a Form-Data link',
      description:
        'Copy a form-data.com link to the form or page you want to embed.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Form-Data embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip hand-writing embed markup. Paste a Form-Data link and get working HTML.'
    },
    {
      title: 'Drop forms anywhere',
      description:
        'Add a Form-Data form to a page that has no native form builder of its own.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Form-Data embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native form embed',
      description:
        'Get the real Form-Data embed so visitors can fill out and submit the form in place.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated embed adapts to your layout for both desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/poll-daddy', label: 'Polldaddy' },
    { href: '/tools/embed-url/embedery', label: 'Embedery' },
    { href: '/tools/embed-url/pinpoll', label: 'Pinpoll' }
  ],
  faq: [
    {
      question: 'How do I embed a Form-Data form on my website?',
      answer:
        'Paste a Form-Data URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Can visitors submit the form from the embed?',
      answer:
        'When the native embed is available, the form stays fully interactive so visitors can fill it out and submit in place.'
    },
    {
      question: 'What if the link cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card built from the available title and image metadata.'
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
