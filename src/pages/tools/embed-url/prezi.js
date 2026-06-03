import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Prezi',
  slug: 'prezi',
  color: '#318BFF',
  exampleUrl: 'https://prezi.com/p/z6gvlbcs_pkb/public-presentations/',
  metaTitle: 'Prezi Embed Code Generator — Embed Zooming Presentations',
  metaDescription:
    'Free Prezi embed code generator. Paste any Prezi URL — get a ready-to-paste embed for zooming presentations and Prezi Video. No signup.',
  keywords: [
    'embed prezi',
    'prezi embed code',
    'prezi embed code generator',
    'embed prezi presentation',
    'prezi iframe code',
    'embed prezi video',
    'prezi presentation embed'
  ],
  heroTitle: 'Prezi Embed Code Generator',
  heroSubtitle:
    'Paste any Prezi URL — get a ready-to-paste embed for zooming presentations and Prezi Video.',
  howItWorksHeading: 'How to embed a Prezi presentation',
  howItWorksSteps: [
    {
      title: 'Paste a Prezi link',
      description:
        'Copy any prezi.com link — zooming presentations and Prezi Video both work.'
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
  explanationHeading: 'Why use our Prezi embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Prezi link and get working embed HTML.'
    },
    {
      title: 'All Prezi content',
      description:
        'Works with zooming presentations and Prezi Video — the tool handles all Prezi URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Prezi embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Prezi embed',
      description:
        'Get the real interactive Prezi player, so viewers can pan and zoom through the canvas.'
    },
    {
      title: 'Presentations & Prezi Video',
      description:
        'Zooming presentations and Prezi Video both embed responsively, scaling to fit your layout.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/slideshare',
      label: 'SlideShare'
    },
    {
      href: '/tools/embed-url/speakerdeck',
      label: 'Speaker Deck'
    },
    {
      href: '/tools/embed-url/canva',
      label: 'Canva'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Prezi presentation on my website?',
      answer:
        'Paste any Prezi URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Can I embed Prezi Video too?',
      answer:
        'Yes. Both zooming presentations and Prezi Video are supported — paste either kind of prezi.com link.'
    },
    {
      question: 'Is the embedded Prezi interactive?',
      answer:
        'Yes. The native embed keeps the pan-and-zoom navigation, so viewers can move through the canvas inline.'
    },
    {
      question: 'What if the Prezi is private or unlisted?',
      answer:
        'Private or restricted Prezis fall back to a styled preview card with the available title and image.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const PreziPage = () => <ProviderSubtool {...data} />

export default PreziPage
