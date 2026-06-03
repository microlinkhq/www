import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'IFTTT',
  slug: 'ifttt',
  color: '#000000',
  exampleUrl: 'https://ifttt.com/applets/GZfEAKpW-help-me-build-an-applet',
  metaTitle: 'IFTTT Embed Code Generator — Embed Applets & Services',
  metaDescription:
    'Free IFTTT embed code generator. Paste a public Applet or service URL — get a styled preview card with the Applet title, description, and image. No signup.',
  keywords: [
    'embed ifttt',
    'ifttt embed code',
    'ifttt embed code generator',
    'embed ifttt applet',
    'ifttt applet preview',
    'ifttt link preview',
    'embed ifttt service'
  ],
  heroTitle: 'IFTTT Embed Code Generator',
  heroSubtitle:
    'Paste a public IFTTT Applet or service URL — get a clean preview card you can paste anywhere.',
  howItWorksHeading: 'How to embed an IFTTT Applet',
  howItWorksSteps: [
    {
      title: 'Paste an IFTTT link',
      description:
        'Copy a public ifttt.com URL — an Applet page (ifttt.com/applets/…) or a service page like ifttt.com/google_sheets.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and builds a preview card with the Applet title, description, and image.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our IFTTT embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any public IFTTT Applet or service link and get a ready-to-paste preview card — no metadata wrangling.'
    },
    {
      title: 'Applets and services',
      description:
        'Works with Applet pages and service pages alike, pulling the title, description, and artwork from the page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 IFTTT embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Applet preview card',
      description:
        'IFTTT does not offer a native iframe embed, so the tool generates a styled card linking back to the Applet.'
    },
    {
      title: 'Title, description & image',
      description:
        'The card surfaces the Applet name, summary, and cover image scraped from the public IFTTT page.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/totango', label: 'Totango' },
    { href: '/tools/embed-url/mixpanel', label: 'Mixpanel' },
    { href: '/tools/embed-url/microsoft', label: 'Microsoft' }
  ],
  faq: [
    {
      question: 'How do I embed an IFTTT Applet on my website?',
      answer:
        'Paste a public IFTTT Applet URL (for example ifttt.com/applets/…) into the tool and click Generate. You will get a ready-to-paste preview card.'
    },
    {
      question: 'Does IFTTT have a native embed player?',
      answer:
        'No. IFTTT does not provide an iframe embed, so the tool builds a styled preview card from the public page metadata instead.'
    },
    {
      question: 'Can I embed an IFTTT service page?',
      answer:
        'Yes. Service pages such as ifttt.com/google_sheets work too — the card uses the service name, description, and icon.'
    },
    {
      question: 'What if the Applet is private?',
      answer:
        'Only public, published Applets can be previewed. Private Applets are not reachable, so there is no metadata to build a card from.'
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
