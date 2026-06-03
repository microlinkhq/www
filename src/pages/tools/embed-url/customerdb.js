import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'CustomerDB',
  slug: 'customerdb',
  color: '#1A1A1A',
  exampleUrl: 'https://customerdb.com',
  metaTitle: 'CustomerDB Embed Code Generator — Embed CustomerDB Links',
  metaDescription:
    'Free CustomerDB embed code generator. Paste a customerdb.com URL — get a ready-to-paste embed or a styled preview card with title and image. No signup.',
  keywords: [
    'embed customerdb',
    'customerdb embed code',
    'customerdb embed code generator',
    'customerdb link preview',
    'customerdb preview card',
    'embed customerdb link',
    'customerdb iframe code'
  ],
  heroTitle: 'CustomerDB Embed Code Generator',
  heroSubtitle:
    'Paste a CustomerDB URL — get a ready-to-paste embed, or a styled preview card when native embedding is not available.',
  howItWorksHeading: 'How to embed a CustomerDB link',
  howItWorksSteps: [
    {
      title: 'Paste a CustomerDB link',
      description:
        'Copy a customerdb.com URL from your browser and paste it into the tool.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool checks the link and generates the embed HTML, or a styled preview card if no native embed is available.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our CustomerDB embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste a CustomerDB link and get ready-to-paste HTML — no markup to write by hand.'
    },
    {
      title: 'Always renders something',
      description:
        'When a link cannot be embedded natively, you still get a clean preview card with title and image.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 CustomerDB embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Paste-and-go embed HTML',
      description:
        'Drop in a CustomerDB URL and copy the generated HTML — no manual iframe editing required.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated embed and preview card scale to fit the width of your page or container.'
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
    { href: '/tools/embed-url/hubspot', label: 'HubSpot' }
  ],
  faq: [
    {
      question: 'How do I embed a CustomerDB link on my website?',
      answer:
        'Paste a CustomerDB URL into the tool and click Generate. You will get ready-to-paste HTML to drop into your page.'
    },
    {
      question: 'What if CustomerDB does not support a native embed?',
      answer:
        'The tool falls back to a styled preview card built from the link metadata, such as its title and image.'
    },
    {
      question: 'What if the CustomerDB link is private?',
      answer:
        'Private or restricted links may not expose embeddable content. In that case the tool returns the best available preview card from public metadata.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The generated embed and preview card scale to fit the width of their container on desktop and mobile.'
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
