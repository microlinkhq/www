import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Filestage',
  slug: 'filestage',
  color: '#00C261',
  exampleUrl: 'https://filestage.io/file-proofing/',
  metaTitle:
    'Filestage Embed Code Generator — Embed Video, Document & Image Review Links',
  metaDescription:
    'Free Filestage embed code generator. Paste a Filestage review link — get a ready-to-paste embed or a styled preview card for video, document, image, and audio proofs. No signup.',
  keywords: [
    'embed filestage',
    'filestage embed code',
    'filestage embed code generator',
    'embed filestage review link',
    'filestage preview card',
    'filestage proofing embed',
    'embed filestage video'
  ],
  heroTitle: 'Filestage Embed Code Generator',
  heroSubtitle:
    'Paste a Filestage review link — get a ready-to-paste embed or a styled preview card for your video, document, image, and audio proofs.',
  howItWorksHeading: 'How to embed a Filestage review link',
  howItWorksSteps: [
    {
      title: 'Paste a Filestage link',
      description:
        'Copy any filestage.io URL — review links for videos, documents, images, audio, and live websites.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the link and generates a preview card with the title and image so you can drop it anywhere.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Filestage embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building markup by hand. Paste a Filestage review link and get clean, ready-to-paste HTML.'
    },
    {
      title: 'Built for proofing links',
      description:
        'Filestage review links are private by design, so the tool renders a tidy preview card you can share publicly.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Filestage embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Clean preview card',
      description:
        'A styled card with the page title, description, and thumbnail that links straight to your Filestage proof.'
    },
    {
      title: 'All proof types',
      description:
        'Works with review links for video, documents, images, audio, and interactive HTML on filestage.io.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' },
    { href: '/tools/embed-url/scribd', label: 'Scribd' }
  ],
  faq: [
    {
      question: 'How do I embed a Filestage review link on my website?',
      answer:
        'Paste any filestage.io URL into the tool and click Generate. You will get a ready-to-paste preview card that links to the proof.'
    },
    {
      question: 'What Filestage content types are supported?',
      answer:
        'Filestage handles video, documents, images, audio, and interactive HTML proofs, and the tool builds a preview card for any of them.'
    },
    {
      question: 'Can I embed a private Filestage review link?',
      answer:
        'Filestage review links are private and may be password protected. The tool builds a preview card from the available metadata rather than exposing the proof itself.'
    },
    {
      question: 'What if no native Filestage embed is available?',
      answer:
        'The tool falls back to a styled preview card with the title and image, which you can customize in Card mode.'
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
