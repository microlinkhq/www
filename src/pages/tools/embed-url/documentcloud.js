import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'DocumentCloud',
  slug: 'documentcloud',
  color: '#4294F0',
  exampleUrl:
    'https://www.documentcloud.org/documents/1507315-epstein-flight-manifests/',
  metaTitle: 'DocumentCloud Embed Code Generator — Embed Documents & Pages',
  metaDescription:
    'Free DocumentCloud embed code generator. Paste a document URL — get a ready-to-paste embed for primary source documents, pages, and notes. No signup.',
  keywords: [
    'embed documentcloud',
    'documentcloud embed code',
    'documentcloud embed code generator',
    'embed documentcloud document',
    'documentcloud iframe code',
    'embed primary source document',
    'documentcloud page embed'
  ],
  heroTitle: 'DocumentCloud Embed Code Generator',
  heroSubtitle:
    'Paste a DocumentCloud URL — get a ready-to-paste embed for primary source documents, individual pages, and notes.',
  howItWorksHeading: 'How to embed DocumentCloud content',
  howItWorksSteps: [
    {
      title: 'Paste a DocumentCloud link',
      description:
        'Copy any documentcloud.org URL — full documents, single pages, or annotated notes.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the document and generates the right embed HTML with the viewer.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our DocumentCloud embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual embed snippet. Paste any DocumentCloud link and get working embed HTML.'
    },
    {
      title: 'Built for journalists',
      description:
        'Share the primary source documents behind your reporting with annotations and notes intact.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 DocumentCloud embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native document viewer',
      description:
        'Get the real DocumentCloud viewer with the full document, attribution, notes, and navigation sidebar.'
    },
    {
      title: 'Documents, pages & notes',
      description:
        'Embed a complete document, a single page, or an individual annotated note — all DocumentCloud URLs work.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/scribd',
      label: 'Scribd'
    },
    {
      href: '/tools/embed-url/docdroid',
      label: 'DocDroid'
    },
    {
      href: '/tools/embed-url/issuu',
      label: 'Issuu'
    }
  ],
  faq: [
    {
      question: 'How do I embed a DocumentCloud document on my website?',
      answer:
        'Paste any DocumentCloud URL into the tool and click Generate. You will get a ready-to-paste embed with the document viewer.'
    },
    {
      question: 'Can I embed a single page or a note?',
      answer:
        'Yes. Full documents, individual pages, and annotated notes are all supported.'
    },
    {
      question: 'Does the document need to be public?',
      answer:
        'Yes. The document must be set to public on DocumentCloud for the embed to display for your readers.'
    },
    {
      question: 'What if the document cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the title and image so you can still link out to the source.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const DocumentCloudPage = () => <ProviderSubtool {...data} />

export default DocumentCloudPage
