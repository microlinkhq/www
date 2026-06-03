import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Homey',
  slug: 'homey',
  color: '#2CCCE5',
  exampleUrl: 'https://flow.homey.app/share/3a0c5e2f',
  metaTitle: 'Homey Embed Code Generator — Embed Smart Home Flows',
  metaDescription:
    'Free Homey embed code generator. Paste a shared Homey Flow link — get a ready-to-paste embed or preview card for your home automation. No signup.',
  keywords: [
    'embed homey',
    'homey embed code',
    'homey embed code generator',
    'embed homey flow',
    'homey flow embed',
    'share homey flow',
    'homey automation embed'
  ],
  heroTitle: 'Homey Embed Code Generator',
  heroSubtitle:
    'Paste a shared Homey Flow link and get a ready-to-paste embed or preview card for your smart home automation.',
  howItWorksHeading: 'How to embed a Homey Flow',
  howItWorksSteps: [
    {
      title: 'Paste a Homey link',
      description:
        'Copy a shared Flow link from flow.homey.app — open a Flow, choose Share, and copy the URL.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the link and generates the embed HTML, or a styled preview card as a fallback.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Homey embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Homey share dialog. Paste the link and get clean embed HTML in one step.'
    },
    {
      title: 'Built for shared Flows',
      description:
        'Designed around Homey Flow share links from flow.homey.app so you can showcase your home automation.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Homey embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Smart home automation',
      description:
        'Homey is a smart home hub from Athom, and Flows are the automations that connect your devices.'
    },
    {
      title: 'Shareable Flow links',
      description:
        'Works with the share links Homey generates for individual Flows, so readers can see how they are built.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/ifttt', label: 'IFTTT' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/twitter-or-x', label: 'X (Twitter)' }
  ],
  faq: [
    {
      question: 'How do I embed a Homey Flow on my website?',
      answer:
        'Open a Flow at flow.homey.app, choose Share to get a link, then paste that link into the tool and click Generate.'
    },
    {
      question: 'What is a Homey Flow?',
      answer:
        'A Flow is an automation in the Homey smart home app that links devices and conditions together to control your home.'
    },
    {
      question: 'Can I embed a private Flow?',
      answer:
        'Homey share links are magic links, so anyone with the link can view the Flow. Links you have not shared cannot be embedded.'
    },
    {
      question: 'What if the Flow cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the available title and image so you always get something to paste.'
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
