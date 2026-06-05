import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Everwall',
  slug: 'everwall',
  color: '#137EBC',
  exampleUrl: 'https://demo.everwall.com/',
  metaTitle: 'Everwall Embed Code Generator — Embed Social Walls',
  metaDescription:
    'Free Everwall embed code generator. Paste any Everwall social wall URL — get ready-to-paste HTML to display aggregated posts from Instagram, X, Facebook, and more. No signup.',
  keywords: [
    'embed everwall',
    'everwall embed code',
    'everwall embed code generator',
    'embed everwall social wall',
    'everwall iframe code',
    'social media wall embed',
    'embed social wall website'
  ],
  heroTitle: 'Everwall Embed Code Generator',
  heroSubtitle:
    'Paste an Everwall social wall URL — get ready-to-paste HTML to display your aggregated social media posts on any page.',
  howItWorksHeading: 'How to embed an Everwall social wall',
  howItWorksSteps: [
    {
      title: 'Paste an Everwall link',
      description:
        'Copy your Everwall social wall URL — the public address on everwall.com that displays your aggregated posts.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the social wall and generates the right embed HTML for your page.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Everwall embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through dashboards. Paste any Everwall link and get working embed HTML.'
    },
    {
      title: 'Show every network at once',
      description:
        'Everwall aggregates posts from Instagram, X, Facebook, Bluesky, and more into a single live wall.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Everwall embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Live social wall',
      description:
        'Embed the real Everwall wall that streams curated, moderated posts as they are published.'
    },
    {
      title: 'Multi-network aggregation',
      description:
        'Display a single feed built from many social networks in grid, column, or waterfall layouts.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/twitter-or-x',
      label: 'Twitter / X'
    },
    {
      href: '/tools/embed-url/instagram',
      label: 'Instagram'
    },
    {
      href: '/tools/embed-url/pinpoll',
      label: 'Pinpoll'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Everwall social wall on my website?',
      answer:
        'Paste your Everwall social wall URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Which social networks does an Everwall wall show?',
      answer:
        'Everwall aggregates posts from networks such as Instagram, X, Facebook, and Bluesky into one combined wall.'
    },
    {
      question: 'Does the wall update with new posts?',
      answer:
        'Yes. The embedded wall is live and shows new curated posts as they are aggregated and approved.'
    },
    {
      question: 'What if the social wall cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the wall title and image so you always have something to paste.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const EverwallPage = () => <ProviderSubtool {...data} />

export default EverwallPage
