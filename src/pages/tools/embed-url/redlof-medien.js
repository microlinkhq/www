import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Redlof Medien',
  slug: 'redlof-medien',
  color: '#666666',
  exampleUrl: 'https://redlof.de',
  metaTitle:
    'Redlof Medien Embed Code Generator — Embed Pages & Shared Content',
  metaDescription:
    'Free Redlof Medien embed code generator. Paste any Redlof Medien URL — get a ready-to-paste embed or preview card for pages and shared content. No signup.',
  keywords: [
    'embed redlof medien',
    'redlof medien embed code',
    'redlof medien embed code generator',
    'redlof medien iframe code',
    'embed redlof.de',
    'redlof medien page embed',
    'redlof medien link embed'
  ],
  heroTitle: 'Redlof Medien Embed Code Generator',
  heroSubtitle:
    'Paste any Redlof Medien URL — get a ready-to-paste embed or preview card for pages and shared content.',
  howItWorksHeading: 'How to embed Redlof Medien content',
  howItWorksSteps: [
    {
      title: 'Paste a Redlof Medien link',
      description: 'Copy any redlof.de page or shared content URL.'
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
  explanationHeading: 'Why use our Redlof Medien embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Redlof Medien link and get working embed HTML in one click — no markup to write by hand.'
    },
    {
      title: 'Works with any shared link',
      description:
        'Point the tool at a Redlof Medien page or shared content URL and it figures out the best way to display it.'
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
      title: 'Page embeds',
      description:
        'Embed Redlof Medien pages and shared content with a clean, responsive frame.'
    },
    {
      title: 'Automatic metadata',
      description:
        'The tool pulls the title, description, and image from the link so the embed looks right out of the box.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' },
    { href: '/tools/embed-url/curated', label: 'Curated' },
    { href: '/tools/embed-url/pastery', label: 'Pastery' }
  ],
  faq: [
    {
      question: 'How do I embed Redlof Medien content on my website?',
      answer:
        'Paste the Redlof Medien URL into the tool, click Generate, then copy the embed HTML into your page.'
    },
    {
      question: 'What kind of Redlof Medien links can I embed?',
      answer:
        'Any Redlof Medien page or shared content link. The tool detects what is behind the URL and builds the embed for you.'
    },
    {
      question: 'Will the embed stay up to date with the source page?',
      answer:
        'The native embed reflects the live page, so it updates as the source content changes.'
    },
    {
      question: 'What if the link cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card built from the available metadata.'
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
