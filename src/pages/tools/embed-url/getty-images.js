import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Getty Images',
  slug: 'getty-images',
  color: '#000000',
  exampleUrl: 'https://www.gettyimages.com',
  metaTitle:
    'Getty Images Embed Code Generator — Embed Stock & Editorial Photos',
  metaDescription:
    'Free Getty Images embed code generator. Paste any Getty Images URL — get a ready-to-paste, watermark-free embed for editorial photos, illustrations, and stock imagery. No signup.',
  keywords: [
    'embed getty images',
    'getty images embed code',
    'getty images embed code generator',
    'embed getty photo',
    'getty images iframe code',
    'getty images html embed',
    'getty embed photo'
  ],
  heroTitle: 'Getty Images Embed Code Generator',
  heroSubtitle:
    'Paste any Getty Images URL — get a ready-to-paste embed for editorial photos, illustrations, and stock imagery.',
  howItWorksHeading: 'How to embed Getty Images content',
  howItWorksSteps: [
    {
      title: 'Paste a Getty Images link',
      description:
        'Copy any gettyimages.com URL — editorial photos, illustrations, or creative stock.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the asset and generates the right Getty embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Getty Images embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        "Skip Getty's embed dialog. Paste any Getty Images link and get working embed HTML instantly."
    },
    {
      title: 'Editorial & stock imagery',
      description:
        'Works with editorial photos, illustrations, and creative stock — the tool handles every Getty Images URL.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Getty Images embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Getty viewer',
      description:
        "Get Getty's official embeddable viewer with the photographer credit and caption kept intact."
    },
    {
      title: 'Photos, editorial & illustrations',
      description:
        'Editorial news photos, creative stock, and illustrations — every embeddable Getty asset works.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and thumbnail when an image is not cleared for embedding.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/behance',
      label: 'Behance'
    },
    {
      href: '/tools/embed-url/smugmug',
      label: 'SmugMug'
    },
    {
      href: '/tools/embed-url/abraia',
      label: 'Abraia'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Getty Images photo on my website?',
      answer:
        'Paste any Getty Images URL into the tool and click Generate. You will get a ready-to-paste embed for the image.'
    },
    {
      question: 'Which Getty Images content can I embed?',
      answer:
        'Editorial photos, illustrations, and creative stock images that Getty makes available for embedding.'
    },
    {
      question: 'Is it legal to embed Getty Images photos?',
      answer:
        'Getty offers a free embed feature for eligible editorial images on non-commercial sites. The generated viewer keeps Getty attribution and licensing intact.'
    },
    {
      question: 'What if an image cannot be embedded?',
      answer:
        'Some images are not cleared for embedding. Switch to Card mode to get a styled preview card with the title and thumbnail.'
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
