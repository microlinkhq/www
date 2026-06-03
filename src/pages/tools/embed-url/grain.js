import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Grain',
  slug: 'grain',
  color: '#00B96C',
  exampleUrl: 'https://grain.com/share/highlight/example',
  metaTitle: 'Grain Embed Code Generator — Embed Meeting Clips & Highlights',
  metaDescription:
    'Free Grain embed code generator. Paste a Grain clip, highlight, or recording link — get ready-to-paste embed HTML for your blog, docs, or CMS. No signup.',
  keywords: [
    'embed grain',
    'grain embed code',
    'grain embed code generator',
    'embed grain clip',
    'embed grain highlight',
    'grain meeting recording embed',
    'grain video embed'
  ],
  heroTitle: 'Grain Embed Code Generator',
  heroSubtitle:
    'Paste a Grain clip, highlight, or recording link — get ready-to-paste embed HTML for any page.',
  howItWorksHeading: 'How to embed a Grain clip',
  howItWorksSteps: [
    {
      title: 'Paste a Grain link',
      description:
        'Copy any grain.com share link — meeting clips, highlights, stories, or full recordings.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Grain share link and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Grain embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through share menus. Paste any Grain link and get working embed HTML.'
    },
    {
      title: 'Clips, highlights & recordings',
      description:
        'Works with Grain meeting clips, highlights, stories, and full call recordings.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Grain embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Grain player',
      description:
        'Get the real Grain video player with playback controls for your shared clip or recording.'
    },
    {
      title: 'Meeting moments & highlights',
      description:
        'Embed the exact timestamped clip or highlight you marked from a call — not just the full recording.'
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
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    },
    {
      href: '/tools/embed-url/gong',
      label: 'Gong'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Grain clip on my website?',
      answer:
        'Paste a Grain share link into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Can I embed Grain highlights and full recordings?',
      answer:
        'Yes. Clips, highlights, stories, and full meeting recordings all work as long as the link is public.'
    },
    {
      question: 'What if the Grain link is private?',
      answer:
        'The clip must be shared with public link access. Private or workspace-only recordings cannot be embedded for outside viewers.'
    },
    {
      question: 'What if Grain blocks embedding?',
      answer:
        'When native embedding is restricted, switch to Card mode to get a styled preview card with the title and thumbnail.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const GrainPage = () => <ProviderSubtool {...data} />

export default GrainPage
