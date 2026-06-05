import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Embases',
  slug: 'embases',
  color: '#000000',
  exampleUrl: 'https://www.embases.com',
  metaTitle:
    'Embases Embed Code Generator — Embed Charts & Data Visualizations',
  metaDescription:
    'Free Embases embed code generator. Paste an Embases chart URL — get a ready-to-paste responsive iframe or styled preview card. No signup.',
  keywords: [
    'embed embases',
    'embases embed code',
    'embases embed code generator',
    'embed embases chart',
    'embases iframe code',
    'embases chart embed',
    'embed embases dashboard'
  ],
  heroTitle: 'Embases Embed Code Generator',
  heroSubtitle:
    'Paste an Embases chart URL — get a ready-to-paste responsive iframe for your charts and data visualizations.',
  howItWorksHeading: 'How to embed an Embases chart',
  howItWorksSteps: [
    {
      title: 'Paste an Embases link',
      description:
        'Copy a chart or data visualization URL from embases.com and paste it in.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content and generates the right responsive iframe HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Embases embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual embed steps. Paste an Embases link and get working iframe HTML.'
    },
    {
      title: 'Responsive charts',
      description:
        'Embases charts are built to be responsive, so they fit neatly into any page width.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Embases embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive chart embeds',
      description:
        'Get an embed for Embases charts and data visualizations, with the live interactivity intact when available.'
    },
    {
      title: 'Fits any layout',
      description:
        'The responsive iframe adapts to your container, from narrow sidebars to full-width sections.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/twitter-or-x', label: 'Twitter / X' }
  ],
  faq: [
    {
      question: 'How do I embed an Embases chart on my website?',
      answer:
        'Paste your Embases chart URL into the tool and click Generate. You will get a ready-to-paste responsive iframe.'
    },
    {
      question: 'What kind of Embases content can I embed?',
      answer:
        'Embases charts and data visualizations, such as line, bar, area, and KPI charts.'
    },
    {
      question: 'Will the embedded chart stay responsive?',
      answer:
        'Yes. Embases charts are designed to be responsive, so the embed adjusts to the width of your page.'
    },
    {
      question: 'What if the Embases chart cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the available title and image.'
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
