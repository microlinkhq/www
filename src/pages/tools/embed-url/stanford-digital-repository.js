import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Stanford Digital Repository',
  slug: 'stanford-digital-repository',
  color: '#8C1515',
  exampleUrl: 'https://purl.stanford.edu',
  metaTitle:
    'Stanford Digital Repository Embed Code Generator — Embed Archived Documents & Media',
  metaDescription:
    'Free Stanford Digital Repository embed code generator. Paste any purl.stanford.edu URL — get a ready-to-paste embed for digitized documents, images, maps, and media. No signup.',
  keywords: [
    'embed stanford digital repository',
    'stanford digital repository embed code',
    'stanford digital repository embed code generator',
    'embed purl.stanford.edu',
    'stanford digital repository iframe code',
    'embed stanford archive',
    'stanford digital repository image embed'
  ],
  heroTitle: 'Stanford Digital Repository Embed Code Generator',
  heroSubtitle:
    'Paste any purl.stanford.edu URL — get a ready-to-paste embed for archived documents, images, maps, and media.',
  howItWorksHeading: 'How to embed Stanford Digital Repository content',
  howItWorksSteps: [
    {
      title: 'Paste a Stanford Digital Repository link',
      description: 'Copy the purl.stanford.edu URL of any archived item.'
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
  explanationHeading:
    'Why use our Stanford Digital Repository embed code generator',
  reasons: [
    {
      title: 'Surface scholarly materials',
      description:
        'Embed digitized documents, images, maps, and media from the repository directly into your research or coursework.'
    },
    {
      title: 'Stable, citable links',
      description:
        'Built around persistent purl.stanford.edu identifiers, so embedded items stay reliable for citations and references.'
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
      title: 'Document & image embeds',
      description:
        'Render archived documents, images, and maps inline so readers can view them without leaving your page.'
    },
    {
      title: 'Media playback',
      description:
        'Embed audio and video items from the repository alongside your narrative and analysis.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/smugmug', label: 'SmugMug' },
    { href: '/tools/embed-url/behance', label: 'Behance' },
    {
      href: '/tools/embed-url/nasjonalbiblioteket',
      label: 'Nasjonalbiblioteket'
    }
  ],
  faq: [
    {
      question:
        'How do I embed Stanford Digital Repository content on my website?',
      answer:
        'Paste any purl.stanford.edu URL into the tool and click Generate to get ready-to-paste embed HTML.'
    },
    {
      question: 'What types of items can I embed?',
      answer:
        'Digitized documents, images, maps, and audio or video media held in the repository.'
    },
    {
      question: 'Will the embed link stay stable over time?',
      answer:
        'Yes — embeds use persistent purl.stanford.edu identifiers, which are designed for long-term citation and access.'
    },
    {
      question: 'What if an item is restricted?',
      answer:
        'Restricted items fall back to a styled preview card built from the available metadata.'
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
