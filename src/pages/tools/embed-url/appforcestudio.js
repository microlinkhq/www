import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'AppForce Studio',
  slug: 'appforcestudio',
  color: '#5BBE01',
  exampleUrl: 'https://appforcestudio.com',
  metaTitle:
    'AppForce Studio Embed Code Generator — Embed AppForce Studio Links',
  metaDescription:
    'Free AppForce Studio embed code generator. Paste any appforcestudio.com URL — get a clean preview card with title, image, and description. No signup.',
  keywords: [
    'embed appforcestudio',
    'appforcestudio embed code',
    'appforcestudio embed generator',
    'embed appforcestudio link',
    'appforcestudio preview card',
    'appforcestudio link card',
    'appforce studio embed'
  ],
  heroTitle: 'AppForce Studio Embed Code Generator',
  heroSubtitle:
    'Paste an AppForce Studio URL — get a clean preview card with the page title, image, and description.',
  howItWorksHeading: 'How to embed an AppForce Studio link',
  howItWorksSteps: [
    {
      title: 'Paste an AppForce Studio link',
      description:
        'Copy any appforcestudio.com URL — a page, post, or shared link.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and builds a preview card with the title, image, and description.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our AppForce Studio embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any AppForce Studio link and get a ready-to-paste preview card — no markup to write by hand.'
    },
    {
      title: 'Clean link previews',
      description:
        'The tool pulls the page title, image, and description so the link looks polished wherever you paste it.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 AppForce Studio embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Title, image & description',
      description:
        'The preview card surfaces the page metadata so readers see what the link is before they click.'
    },
    {
      title: 'Responsive layout',
      description:
        'The card adapts to your layout — inline in a paragraph or full-width as a feature block.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/figma', label: 'Figma' },
    { href: '/tools/embed-url/framer', label: 'Framer' },
    { href: '/tools/embed-url/canva', label: 'Canva' }
  ],
  faq: [
    {
      question: 'How do I embed an AppForce Studio link on my website?',
      answer:
        'Paste any appforcestudio.com URL into the tool and click Generate. You will get a ready-to-paste preview card.'
    },
    {
      question: 'What does the AppForce Studio embed look like?',
      answer:
        'It is a styled preview card built from the page metadata — title, image, and description — that links back to the original page.'
    },
    {
      question: 'Can I customize the AppForce Studio preview card?',
      answer:
        'Yes. Switch to Card mode to adjust colors, fonts, and layout before you copy the embed code.'
    },
    {
      question: 'What if the AppForce Studio page is private?',
      answer:
        'If a page is not publicly accessible, the tool can only use the metadata it can reach, so private pages may not generate a full preview.'
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
