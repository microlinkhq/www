import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'They Said So',
  slug: 'they-said-so',
  color: '#34495E',
  exampleUrl: 'https://theysaidso.com',
  metaTitle: 'They Said So Embed Code Generator — Embed Quotes',
  metaDescription:
    'Free They Said So embed code generator. Paste any They Said So URL — get a ready-to-paste embed for famous and inspirational quotes. No signup.',
  keywords: [
    'embed they said so',
    'they said so embed code',
    'they said so embed code generator',
    'embed quote',
    'embed inspirational quote',
    'they said so iframe code',
    'they said so quote embed'
  ],
  heroTitle: 'They Said So Embed Code Generator',
  heroSubtitle:
    'Paste any They Said So URL — get a ready-to-paste embed for famous and inspirational quotes.',
  howItWorksHeading: 'How to embed They Said So quotes',
  howItWorksSteps: [
    {
      title: 'Paste a They Said So link',
      description:
        'Copy the URL of any quote from theysaidso.com and drop it into the field.'
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
  explanationHeading: 'Why use our They Said So embed code generator',
  reasons: [
    {
      title: 'Built for quotes',
      description:
        'Turn any They Said So quote link into a clean, shareable block you can drop into a page.'
    },
    {
      title: 'Perfect for blogs and footers',
      description:
        'Add a famous or inspirational quote to a post, sidebar, or page footer with one paste.'
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
      title: 'Quote embed',
      description:
        'Embed famous and inspirational quotes from They Said So in a tidy, readable layout.'
    },
    {
      title: 'Lightweight and fast',
      description:
        'A compact embed that adds a quote without slowing your page down.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/pastery', label: 'Pastery' },
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' },
    { href: '/tools/embed-url/curated', label: 'Curated' }
  ],
  faq: [
    {
      question: 'How do I embed a They Said So quote on my website?',
      answer:
        'Paste the quote URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can I add a quote to my blog sidebar or footer?',
      answer:
        'Yes. The generated block drops into any HTML area, including sidebars and footers.'
    },
    {
      question: 'Will the quote keep its attribution?',
      answer:
        'The embed shows the quote text along with the author when that detail is available.'
    },
    {
      question: 'Can I restyle the quote before copying?',
      answer:
        'Switch to Card mode to adjust colors, fonts, and layout before you copy the code.'
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
