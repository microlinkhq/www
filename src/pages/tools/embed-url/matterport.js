import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Matterport',
  slug: 'matterport',
  color: '#FF3158',
  exampleUrl: 'https://my.matterport.com/show/?m=JGPnGQ6hosj',
  metaTitle:
    'Matterport Embed Code Generator — Embed 3D Spaces & Virtual Tours',
  metaDescription:
    'Free Matterport embed code generator. Paste any Matterport URL — get a ready-to-paste iframe for 3D spaces and virtual tours. No signup.',
  keywords: [
    'embed matterport',
    'matterport embed code',
    'matterport embed code generator',
    'embed matterport 3d tour',
    'matterport iframe code',
    'matterport virtual tour embed',
    'embed matterport showcase'
  ],
  heroTitle: 'Matterport Embed Code Generator',
  heroSubtitle:
    'Paste any Matterport URL — get a ready-to-paste iframe for 3D spaces and virtual tours.',
  howItWorksHeading: 'How to embed a Matterport tour',
  howItWorksSteps: [
    {
      title: 'Paste a Matterport link',
      description:
        'Copy any my.matterport.com showcase URL — 3D spaces, dollhouse views, and virtual tours.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the showcase and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Matterport embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the iframe by hand. Paste any Matterport link and get working embed HTML.'
    },
    {
      title: 'Interactive 3D tours',
      description:
        'Visitors can walk through the space, switch to dollhouse and floor-plan views, and explore in 360°.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Matterport embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Matterport showcase',
      description:
        'Get the real interactive 3D Showcase player with walkthrough, dollhouse, and floor-plan modes.'
    },
    {
      title: 'Responsive embed',
      description:
        'The iframe scales to fit your layout so the tour looks right on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/sketchfab',
      label: 'Sketchfab'
    },
    {
      href: '/tools/embed-url/twinmotion',
      label: 'Twinmotion'
    },
    {
      href: '/tools/embed-url/briovr',
      label: 'BrioVR'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Matterport 3D tour on my website?',
      answer:
        'Paste your Matterport showcase URL into the tool and click Generate. You will get a ready-to-paste iframe for the interactive tour.'
    },
    {
      question: 'Can visitors walk through the space in the embed?',
      answer:
        'Yes. The native embed is the full 3D Showcase player, so visitors can walk through, switch to dollhouse view, and explore in 360°.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The iframe scales to its container so the tour displays correctly on desktop and mobile screens.'
    },
    {
      question: 'What if the Matterport space is private?',
      answer:
        'Private or restricted spaces cannot be embedded natively. The tool falls back to a styled preview card with the available metadata.'
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
