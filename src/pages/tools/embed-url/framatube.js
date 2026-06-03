import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Framatube',
  slug: 'framatube',
  color: '#dd6418',
  exampleUrl: 'https://framatube.org/w/c6k7T4uP7b59nvEojjwKw4',
  metaTitle: 'Framatube Embed Code Generator — Embed PeerTube Videos',
  metaDescription:
    'Free Framatube embed code generator. Paste any framatube.org video URL — get a ready-to-paste iframe player for this decentralized PeerTube instance. No signup.',
  keywords: [
    'embed framatube',
    'framatube embed code',
    'framatube embed code generator',
    'embed framatube video',
    'framatube iframe code',
    'peertube embed code',
    'embed peertube video',
    'framatube player embed'
  ],
  heroTitle: 'Framatube Embed Code Generator',
  heroSubtitle:
    'Paste any Framatube video URL — get a ready-to-paste iframe player for this open-source, decentralized PeerTube instance.',
  howItWorksHeading: 'How to embed a Framatube video',
  howItWorksSteps: [
    {
      title: 'Paste a Framatube link',
      description:
        'Copy any framatube.org video link — including watch URLs like framatube.org/w/ shared from the PeerTube player.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Framatube video and generates the right PeerTube iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Framatube embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the PeerTube share menu. Paste any Framatube link and get working embed HTML.'
    },
    {
      title: 'Decentralized, open source',
      description:
        'Framatube runs on PeerTube, so videos stay on a free, federated platform with no ads or tracking.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Framatube embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native PeerTube player',
      description:
        'Get the real Framatube video player with playback controls, quality options, and a clean, ad-free interface.'
    },
    {
      title: 'Responsive video embed',
      description:
        'The iframe player scales to fit your layout, from inline placement to full-width feature spots.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/peertube-tv',
      label: 'PeerTube'
    },
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/dtube',
      label: 'DTube'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Framatube video on my website?',
      answer:
        'Paste any framatube.org video URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'What is Framatube?',
      answer:
        "Framatube is Framasoft's PeerTube instance — a free, open-source, decentralized video platform that hosts videos without ads or tracking."
    },
    {
      question: 'Can I embed unlisted or private Framatube videos?',
      answer:
        'Publicly shared videos embed reliably. Unlisted or private videos may not render if the instance restricts embedding for them.'
    },
    {
      question: 'What if the video cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the video title and thumbnail that you can customize before copying.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const FramatubePage = () => <ProviderSubtool {...data} />

export default FramatubePage
