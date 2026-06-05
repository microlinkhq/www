import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Ludus',
  slug: 'ludus',
  color: '#000000',
  exampleUrl: 'https://ludus.one',
  metaTitle: 'Ludus Embed Code Generator — Embed Presentations & Slide Decks',
  metaDescription:
    'Free Ludus embed code generator. Paste any Ludus URL — get a ready-to-paste embed for presentations and slide decks. No signup.',
  keywords: [
    'embed ludus',
    'ludus embed code',
    'ludus embed code generator',
    'embed ludus presentation',
    'ludus iframe code',
    'ludus slide deck embed',
    'ludus presentation embed'
  ],
  heroTitle: 'Ludus Embed Code Generator',
  heroSubtitle:
    'Paste any Ludus URL — get a ready-to-paste embed for presentations and slide decks.',
  howItWorksHeading: 'How to embed Ludus presentations',
  howItWorksSteps: [
    {
      title: 'Paste a Ludus link',
      description: 'Copy the URL of any Ludus presentation or slide deck.'
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
  explanationHeading: 'Why use our Ludus embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Ludus share menus. Paste any link and get working embed HTML instantly.'
    },
    {
      title: 'Built for slide decks',
      description:
        'Ludus presentations embed as a navigable player so readers can flip through every slide in place.'
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
      title: 'Interactive deck player',
      description:
        'Embed the live Ludus presentation so visitors can step through slides without leaving your page.'
    },
    {
      title: 'Responsive sizing',
      description:
        'The embed keeps the deck aspect ratio and scales cleanly on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/speakerdeck', label: 'Speaker Deck' },
    { href: '/tools/embed-url/beautiful', label: 'Beautiful.ai' },
    { href: '/tools/embed-url/canva', label: 'Canva' }
  ],
  faq: [
    {
      question: 'How do I embed a Ludus presentation on my website?',
      answer:
        'Paste the Ludus presentation URL into the tool and click Generate, then copy the embed HTML into your site.'
    },
    {
      question: 'Can visitors navigate the slides in the embed?',
      answer:
        'Yes. The native embed renders the interactive Ludus player, so readers can move through the deck in place.'
    },
    {
      question: 'Do I need a Ludus account to embed a deck?',
      answer:
        'No account is needed. A public Ludus presentation URL is enough to generate the embed code.'
    },
    {
      question: 'What if the Ludus presentation is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
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
