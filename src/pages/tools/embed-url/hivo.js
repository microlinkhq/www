import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'HIVO',
  slug: 'hivo',
  color: '#1F42FB',
  exampleUrl: 'https://hivo.co/product/digital-asset-management',
  metaTitle: 'HIVO Embed Code Generator — Embed Assets & Brand Pages',
  metaDescription:
    'Free HIVO embed code generator. Paste a HIVO shared asset or brand page URL — get a ready-to-paste preview card for your site. No signup.',
  keywords: [
    'embed hivo',
    'hivo embed code',
    'hivo embed code generator',
    'embed hivo asset',
    'hivo shared link embed',
    'hivo brand page embed',
    'hivo digital asset management embed'
  ],
  heroTitle: 'HIVO Embed Code Generator',
  heroSubtitle:
    'Paste a HIVO shared asset or brand page URL — get a ready-to-paste preview card for your site.',
  howItWorksHeading: 'How to embed a HIVO asset',
  howItWorksSteps: [
    {
      title: 'Paste a HIVO link',
      description:
        'Copy a public hivo.co URL — a shared asset link, public CDN link, or brand guidelines page.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and builds a clean preview card you can drop anywhere.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our HIVO embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building markup by hand. Paste a HIVO link and get working embed HTML.'
    },
    {
      title: 'Works with shared links',
      description:
        'Turn HIVO shared asset links, public CDN links, and brand pages into a tidy on-page preview.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 HIVO embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Brand & asset previews',
      description:
        'Surface the title and preview image from HIVO brand pages and shared digital assets.'
    },
    {
      title: 'Responsive layout',
      description:
        'The preview card scales to fit your content column on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/hubspot-bynder',
      label: 'HubSpot Bynder'
    },
    {
      href: '/tools/embed-url/filestage',
      label: 'Filestage'
    },
    {
      href: '/tools/embed-url/getty-images',
      label: 'Getty Images'
    }
  ],
  faq: [
    {
      question: 'How do I embed a HIVO asset on my website?',
      answer:
        'Paste a public HIVO URL into the tool and click Generate. You will get a ready-to-paste preview card linking back to the asset.'
    },
    {
      question: 'What HIVO links work?',
      answer:
        'Public hivo.co links work best — shared asset links, public CDN links, and brand guidelines pages.'
    },
    {
      question: 'Does HIVO have a native embed?',
      answer:
        'HIVO is mainly a private, login-based asset library, so the tool builds a styled preview card from public page metadata rather than a native player.'
    },
    {
      question: 'What about private or password-protected assets?',
      answer:
        'Assets behind a login or password cannot be read. Use a public shared link or public CDN link so the tool can generate a preview.'
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
