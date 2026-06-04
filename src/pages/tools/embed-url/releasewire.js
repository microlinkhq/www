import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'ReleaseWire',
  slug: 'releasewire',
  color: '#C0392B',
  exampleUrl: 'https://releasewire.com',
  metaTitle: 'ReleaseWire Embed Code Generator — Embed Press Releases & News',
  metaDescription:
    'Free ReleaseWire embed code generator. Paste any ReleaseWire URL — get a ready-to-paste embed or preview card for press releases and news. No signup.',
  keywords: [
    'embed releasewire',
    'releasewire embed code',
    'releasewire embed code generator',
    'embed press release',
    'releasewire iframe code',
    'embed news release',
    'press release embed'
  ],
  heroTitle: 'ReleaseWire Embed Code Generator',
  heroSubtitle:
    'Paste any ReleaseWire URL — get a ready-to-paste embed or preview card for press releases and news.',
  howItWorksHeading: 'How to embed ReleaseWire content',
  howItWorksSteps: [
    {
      title: 'Paste a ReleaseWire link',
      description: 'Copy any releasewire.com press release or news URL.'
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
  explanationHeading: 'Why use our ReleaseWire embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any ReleaseWire link and get working embed HTML in one click — no markup to write by hand.'
    },
    {
      title: 'Share press coverage anywhere',
      description:
        'Embed a ReleaseWire press release on your newsroom, blog, or media page so readers can read it in context.'
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
      title: 'Press release embeds',
      description:
        'Embed full ReleaseWire press releases with their headline, body, and media in a clean frame.'
    },
    {
      title: 'News headline cards',
      description:
        'Pull the title, summary, and image from any ReleaseWire news link for a tidy linkable card.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/curated', label: 'Curated' },
    { href: '/tools/embed-url/buttondown', label: 'Buttondown' },
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' }
  ],
  faq: [
    {
      question: 'How do I embed a ReleaseWire press release on my website?',
      answer:
        'Paste the releasewire.com URL into the tool, click Generate, then copy the embed HTML into your page.'
    },
    {
      question: 'Can I embed ReleaseWire news as a compact card?',
      answer:
        'Yes. Switch to Card mode to get a styled card with the headline, summary, and image instead of a full embed.'
    },
    {
      question: 'Which ReleaseWire content types are supported?',
      answer: 'Press releases and news items published on ReleaseWire.'
    },
    {
      question: 'What if a release cannot be embedded directly?',
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
