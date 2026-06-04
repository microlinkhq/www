import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'iMenuPro',
  slug: 'imenupro',
  color: '#C0392B',
  exampleUrl: 'https://www.imenupro.com',
  metaTitle: 'iMenuPro Embed Code Generator — Embed Restaurant Menus',
  metaDescription:
    'Free iMenuPro embed code generator. Paste any iMenuPro URL — get a ready-to-paste embed for your restaurant menu. No signup.',
  keywords: [
    'embed imenupro',
    'imenupro embed code',
    'imenupro embed code generator',
    'embed restaurant menu',
    'imenupro iframe code',
    'online menu embed',
    'imenupro menu embed'
  ],
  heroTitle: 'iMenuPro Embed Code Generator',
  heroSubtitle:
    'Paste any iMenuPro URL — get a ready-to-paste embed for your restaurant menu.',
  howItWorksHeading: 'How to embed iMenuPro content',
  howItWorksSteps: [
    {
      title: 'Paste an iMenuPro link',
      description: 'Copy any iMenuPro URL — your published online menu.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the menu and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our iMenuPro embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste your iMenuPro link and get working embed HTML for your restaurant website.'
    },
    {
      title: 'Online restaurant menus',
      description:
        'Works with the digital menus you design and publish in iMenuPro.'
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
      title: 'Live online menu',
      description:
        'Embed the live iMenuPro menu so updates you publish show up automatically.'
    },
    {
      title: 'Menus & specials',
      description:
        'Full menus, drink lists, and daily specials designed in iMenuPro all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/canva',
      label: 'Canva'
    },
    {
      href: '/tools/embed-url/beautiful',
      label: 'Beautiful.ai'
    },
    {
      href: '/tools/embed-url/whimsical',
      label: 'Whimsical'
    }
  ],
  faq: [
    {
      question: 'How do I embed my iMenuPro menu on my website?',
      answer:
        'Paste your iMenuPro URL into the tool and click Generate. You will get a ready-to-paste embed for the menu.'
    },
    {
      question: 'What is iMenuPro?',
      answer:
        'iMenuPro is menu-design software that lets restaurants create and publish online menus.'
    },
    {
      question: 'Will the embedded menu stay up to date?',
      answer:
        'When the live menu supports embedding, changes you publish in iMenuPro appear automatically in the embed.'
    },
    {
      question: 'What if the menu cannot be embedded?',
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
