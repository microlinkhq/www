import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Heyzine',
  slug: 'heyzine',
  color: '#19A975',
  exampleUrl: 'https://heyzine.com/flip-book/c220f02c6b.html',
  metaTitle: 'Heyzine Embed Code Generator — Embed Flipbooks',
  metaDescription:
    'Free Heyzine embed code generator. Paste any Heyzine flipbook URL — get a ready-to-paste iframe for your page-flip PDF publications. No signup.',
  keywords: [
    'embed heyzine',
    'heyzine embed code',
    'heyzine embed code generator',
    'embed heyzine flipbook',
    'heyzine iframe code',
    'embed flipbook',
    'heyzine flipbook embed'
  ],
  heroTitle: 'Heyzine Embed Code Generator',
  heroSubtitle:
    'Paste any Heyzine flipbook URL — get a ready-to-paste iframe for your interactive page-flip PDF publications.',
  howItWorksHeading: 'How to embed a Heyzine flipbook',
  howItWorksSteps: [
    {
      title: 'Paste a Heyzine link',
      description:
        'Copy any heyzine.com flip-book URL — the public reader link to your published flipbook.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the flipbook and generates the right embed HTML for your page.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Heyzine embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the share menu. Paste any Heyzine link and get working embed HTML.'
    },
    {
      title: 'Interactive page-flip reader',
      description:
        'Embeds the real Heyzine reader with realistic page-turn, slide, and cover-flow effects.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Heyzine embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native flipbook reader',
      description:
        'Get the real Heyzine reader so visitors can flip through your PDF pages right on your site.'
    },
    {
      title: 'Responsive embed',
      description:
        'The flipbook adapts to all device sizes and screen orientations for desktop and mobile readers.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/issuu',
      label: 'Issuu'
    },
    {
      href: '/tools/embed-url/yumpu',
      label: 'Yumpu'
    },
    {
      href: '/tools/embed-url/scribd',
      label: 'Scribd'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Heyzine flipbook on my website?',
      answer:
        'Paste your Heyzine flip-book URL into the tool and click Generate. You will get a ready-to-paste iframe for your page.'
    },
    {
      question: 'What content does Heyzine embed?',
      answer:
        'Heyzine turns PDFs into interactive page-flip flipbooks and can include videos, audio, images, and links inside the publication.'
    },
    {
      question: 'Is the embedded flipbook responsive?',
      answer:
        'Yes. The Heyzine reader adapts to all screen sizes, so it works on desktop, tablet, and mobile.'
    },
    {
      question: 'What if the flipbook cannot be embedded?',
      answer:
        'If a flipbook is password-protected or domain-restricted, switch to Card mode to get a styled preview card with the title and cover image.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const HeyzinePage = () => <ProviderSubtool {...data} />

export default HeyzinePage
