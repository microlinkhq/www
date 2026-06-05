import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'ideaMapper',
  slug: 'ideamapper',
  color: '#F26B21',
  exampleUrl: 'https://ideamapper.com',
  metaTitle: 'ideaMapper Embed Code Generator — Embed Mind Maps',
  metaDescription:
    'Free ideaMapper embed code generator. Paste any ideaMapper URL — get a ready-to-paste embed for interactive mind maps and structured documents. No signup.',
  keywords: [
    'embed ideamapper',
    'ideamapper embed code',
    'ideamapper embed code generator',
    'embed mind map',
    'ideamapper iframe code',
    'mind map embed',
    'ideamapper html embed'
  ],
  heroTitle: 'ideaMapper Embed Code Generator',
  heroSubtitle:
    'Paste any ideaMapper URL — get a ready-to-paste embed for interactive mind maps and structured documents.',
  howItWorksHeading: 'How to embed ideaMapper content',
  howItWorksSteps: [
    {
      title: 'Paste an ideaMapper link',
      description:
        'Copy any ideamapper.com URL — a shared mind map or document.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the mind map and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our ideaMapper embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any ideaMapper link and get working embed HTML — no exporting to an image required.'
    },
    {
      title: 'Mind maps & documents',
      description:
        'Works with ideaMapper mind maps and the structured documents they generate from them.'
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
      title: 'Interactive mind map',
      description:
        'Keep the live ideaMapper map so readers can expand and explore branches in place.'
    },
    {
      title: 'Maps & structured docs',
      description:
        'ideaMapper turns a mind map into a document — both views embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when the map cannot be embedded.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/whimsical',
      label: 'Whimsical'
    },
    {
      href: '/tools/embed-url/mermaid-ink',
      label: 'Mermaid'
    },
    {
      href: '/tools/embed-url/cacoo',
      label: 'Cacoo'
    }
  ],
  faq: [
    {
      question: 'How do I embed an ideaMapper mind map on my website?',
      answer:
        'Paste any ideaMapper URL into the tool and click Generate. You will get a ready-to-paste embed for the map.'
    },
    {
      question: 'What is ideaMapper?',
      answer:
        'ideaMapper is mind-mapping software that turns your maps into structured, shareable documents.'
    },
    {
      question: 'Can readers interact with the embedded map?',
      answer:
        'When the map supports live embedding, readers can expand and explore branches directly in the page.'
    },
    {
      question: 'What if the map cannot be embedded?',
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
