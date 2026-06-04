import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Kirim.Email',
  slug: 'kirimemail',
  color: '#FF6B00',
  exampleUrl: 'https://kirim.email',
  metaTitle: 'Kirim.Email Embed Code Generator — Embed Newsletters & Forms',
  metaDescription:
    'Free Kirim.Email embed code generator. Paste any Kirim.Email URL — get a ready-to-paste embed for newsletters and subscription forms. No signup.',
  keywords: [
    'embed kirim email',
    'kirim email embed code',
    'kirim email embed code generator',
    'embed newsletter signup',
    'kirim email iframe code',
    'kirim email form embed',
    'embed subscription form'
  ],
  heroTitle: 'Kirim.Email Embed Code Generator',
  heroSubtitle:
    'Paste any Kirim.Email URL — get a ready-to-paste embed for newsletters and subscription forms.',
  howItWorksHeading: 'How to embed Kirim.Email content',
  howItWorksSteps: [
    {
      title: 'Paste a Kirim.Email link',
      description:
        'Copy any Kirim.Email URL — a newsletter or subscription form.'
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
  explanationHeading: 'Why use our Kirim.Email embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Kirim.Email link and get working embed HTML instantly.'
    },
    {
      title: 'Newsletters & forms',
      description:
        'Works with Kirim.Email newsletters and the subscription forms you build on the platform.'
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
      title: 'Live subscription form',
      description:
        'Embed a Kirim.Email signup form so visitors can subscribe without leaving your page.'
    },
    {
      title: 'Newsletters & forms',
      description:
        'Published newsletters and subscription forms from Kirim.Email both embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/buttondown',
      label: 'Buttondown'
    },
    {
      href: '/tools/embed-url/curated',
      label: 'Curated'
    },
    {
      href: '/tools/embed-url/subscribi',
      label: 'Subscribi'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Kirim.Email form on my website?',
      answer:
        'Paste any Kirim.Email URL into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'What is Kirim.Email?',
      answer:
        'Kirim.Email is an email marketing platform for sending newsletters and collecting subscribers.'
    },
    {
      question: 'What Kirim.Email content can I embed?',
      answer: 'Published newsletters and subscription forms.'
    },
    {
      question: 'What if the content cannot be embedded?',
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
