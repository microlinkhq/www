import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Clueso',
  slug: 'clueso',
  color: '#171717',
  exampleUrl: 'https://help.clueso.io/getting-started/quickstart',
  metaTitle: 'Clueso Embed Code Generator — Embed Product Videos & Guides',
  metaDescription:
    'Free Clueso embed code generator. Paste any Clueso URL — get a ready-to-paste embed for AI product videos and step-by-step how-to guides. No signup.',
  keywords: [
    'embed clueso',
    'clueso embed code',
    'clueso embed code generator',
    'embed clueso video',
    'embed clueso guide',
    'clueso iframe code',
    'clueso product video embed'
  ],
  heroTitle: 'Clueso Embed Code Generator',
  heroSubtitle:
    'Paste any Clueso URL — get a ready-to-paste embed for AI product videos and step-by-step how-to guides.',
  howItWorksHeading: 'How to embed a Clueso video',
  howItWorksSteps: [
    {
      title: 'Paste a Clueso link',
      description:
        'Copy any clueso.io URL — product videos, how-to guides, and shared view-only links.'
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
  explanationHeading: 'Why use our Clueso embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Clueso export settings. Paste any link and get working embed HTML.'
    },
    {
      title: 'Videos and guides',
      description:
        'Works with Clueso product videos and step-by-step documentation generated from your recordings.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Clueso embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Clueso player',
      description:
        'Get the real Clueso embed with playback controls for your AI-generated product videos.'
    },
    {
      title: 'Videos and how-to guides',
      description:
        'Embed polished product videos or the step-by-step guides Clueso builds from screen recordings.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/loom',
      label: 'Loom'
    },
    {
      href: '/tools/embed-url/synthesia',
      label: 'Synthesia'
    },
    {
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Clueso video on my website?',
      answer:
        'Paste any Clueso URL into the tool and click Generate. You will get a ready-to-paste embed for your video or guide.'
    },
    {
      question: 'Can I embed Clueso step-by-step guides?',
      answer:
        'Yes. Both Clueso product videos and the how-to guides generated from your recordings are supported.'
    },
    {
      question: 'What if the Clueso content is private?',
      answer:
        'Native embedding needs a public or shared view-only link. For restricted content the tool falls back to a styled preview card with the available metadata.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The generated embed adapts to its container so it looks right on desktop and mobile.'
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
