import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Injurymap',
  slug: 'injurymap',
  color: '#00A99D',
  exampleUrl: 'https://www.injurymap.com',
  metaTitle: 'Injurymap Embed Code Generator — Embed Exercise Videos',
  metaDescription:
    'Free Injurymap embed code generator. Paste any Injurymap URL — get a ready-to-paste embed for guided exercise videos and recovery programs. No signup.',
  keywords: [
    'embed injurymap',
    'injurymap embed code',
    'injurymap embed code generator',
    'embed exercise video',
    'injurymap iframe code',
    'physiotherapy video embed',
    'injurymap exercise embed'
  ],
  heroTitle: 'Injurymap Embed Code Generator',
  heroSubtitle:
    'Paste any Injurymap URL — get a ready-to-paste embed for guided exercise videos and recovery programs.',
  howItWorksHeading: 'How to embed Injurymap content',
  howItWorksSteps: [
    {
      title: 'Paste an Injurymap link',
      description:
        'Copy any injurymap.com URL — a guided exercise or recovery program.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the exercise and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Injurymap embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Injurymap link and get working embed HTML instantly.'
    },
    {
      title: 'Exercises & programs',
      description:
        'Works with Injurymap guided exercises and the recovery programs that group them.'
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
      title: 'Guided exercise video',
      description:
        'Embed the Injurymap exercise demonstration so readers can follow the movement along.'
    },
    {
      title: 'Exercises & recovery plans',
      description:
        'Individual exercises and full recovery programs from Injurymap both embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/wistia',
      label: 'Wistia'
    },
    {
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    },
    {
      href: '/tools/embed-url/synthesia',
      label: 'Synthesia'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Injurymap exercise on my website?',
      answer:
        'Paste any Injurymap URL into the tool and click Generate. You will get a ready-to-paste embed for the exercise.'
    },
    {
      question: 'What is Injurymap?',
      answer:
        'Injurymap is a physiotherapy app that provides guided exercise videos and recovery programs for pain and injury.'
    },
    {
      question: 'What Injurymap content can I embed?',
      answer:
        'Guided exercise demonstrations and the recovery programs that group them together.'
    },
    {
      question: 'What if an exercise cannot be embedded?',
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
