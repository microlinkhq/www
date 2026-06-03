import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Issuu',
  slug: 'issuu',
  color: '#F36D5D',
  exampleUrl:
    'https://issuu.com/digital.magazine/docs/arts-collections-volume-1-2024',
  metaTitle: 'Issuu Embed Code Generator — Embed Flipbooks & Magazines',
  metaDescription:
    'Free Issuu embed code generator. Paste any Issuu URL — get a ready-to-paste flipbook reader for magazines, catalogs, and digital publications. No signup.',
  keywords: [
    'embed issuu',
    'issuu embed code',
    'issuu embed code generator',
    'embed issuu publication',
    'issuu flipbook embed',
    'issuu iframe code',
    'embed issuu magazine'
  ],
  heroTitle: 'Issuu Embed Code Generator',
  heroSubtitle:
    'Paste any Issuu URL — get a ready-to-paste flipbook reader for magazines, catalogs, and digital publications.',
  howItWorksHeading: 'How to embed an Issuu publication',
  howItWorksSteps: [
    {
      title: 'Paste an Issuu link',
      description:
        'Copy any issuu.com publication URL — magazines, catalogs, brochures, and reports.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the publication and generates the flipbook reader embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Issuu embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Issuu share menus. Paste any publication link and get working embed HTML.'
    },
    {
      title: 'Interactive flipbook reader',
      description:
        'Embed the real page-flip reader so visitors can browse the full publication without leaving your page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Issuu embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native flipbook reader',
      description:
        'Get the real Issuu reader with page-flip navigation, zoom, and fullscreen.'
    },
    {
      title: 'Magazines, catalogs & brochures',
      description:
        'Works with any public Issuu publication — magazines, catalogs, brochures, and reports.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and cover image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/scribd',
      label: 'Scribd'
    },
    {
      href: '/tools/embed-url/slideshare',
      label: 'SlideShare'
    },
    {
      href: '/tools/embed-url/yumpu',
      label: 'Yumpu'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Issuu publication on my website?',
      answer:
        'Paste any Issuu publication URL into the tool and click Generate. You will get a ready-to-paste flipbook reader embed.'
    },
    {
      question: 'What content can I embed from Issuu?',
      answer:
        'Any public Issuu publication — magazines, catalogs, brochures, reports, and other flipbooks.'
    },
    {
      question: 'Is the embedded reader interactive?',
      answer:
        'Yes. The native embed keeps page-flip navigation, zoom, and fullscreen so readers can browse the whole publication.'
    },
    {
      question: 'What if the publication is private or unlisted?',
      answer:
        'Private publications cannot be embedded. The tool falls back to a styled preview card with the available title and cover image.'
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
