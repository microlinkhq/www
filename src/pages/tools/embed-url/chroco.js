import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Chroco',
  slug: 'chroco',
  color: '#619989',
  exampleUrl: 'https://chroco.ooo/u/blue_islands/t/mwukgmoqugiaw',
  metaTitle: 'Chroco Embed Code Generator — Embed Timelines',
  metaDescription:
    'Free Chroco embed code generator. Paste a chroco.ooo timeline URL — get a ready-to-paste embed or styled preview card. No signup.',
  keywords: [
    'embed chroco',
    'chroco embed code',
    'chroco embed code generator',
    'embed chroco timeline',
    'chroco iframe code',
    'chroco timeline embed',
    'chroco.ooo embed'
  ],
  heroTitle: 'Chroco Embed Code Generator',
  heroSubtitle:
    'Paste a Chroco timeline URL — get a ready-to-paste embed or a styled preview card.',
  howItWorksHeading: 'How to embed a Chroco timeline',
  howItWorksSteps: [
    {
      title: 'Paste a Chroco link',
      description:
        'Copy a chroco.ooo timeline or story URL from your browser address bar.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the timeline and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Chroco embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the iframe by hand. Paste a Chroco link and get working embed HTML.'
    },
    {
      title: 'Share your timeline',
      description:
        'Put a Chroco portfolio or story timeline directly on your own page or blog.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Chroco embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native timeline embed',
      description:
        'Get the interactive Chroco timeline view rendered inline on your page.'
    },
    {
      title: 'Timelines & stories',
      description:
        'Works with chroco.ooo timeline and story URLs that arrange bookmarks chronologically.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/figma', label: 'Figma' }
  ],
  faq: [
    {
      question: 'How do I embed a Chroco timeline on my website?',
      answer:
        'Paste a chroco.ooo timeline URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What kind of Chroco content can I embed?',
      answer:
        'Chroco timelines and stories, which arrange bookmarked links and records into a chronological view.'
    },
    {
      question: 'What if the Chroco timeline is private?',
      answer:
        'The tool falls back to a styled preview card built from the available metadata.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The embed fits its container, and the preview card adapts to your page layout.'
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
