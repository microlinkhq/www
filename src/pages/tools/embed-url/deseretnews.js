import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Deseret News',
  slug: 'deseretnews',
  color: '#1E1E1E',
  exampleUrl:
    'https://www.deseret.com/lifestyle/2026/06/01/magnolia-bakery-makes-home-in-utah/',
  metaTitle: 'Deseret News Embed Code Generator — Embed Article Preview Cards',
  metaDescription:
    'Free Deseret News embed code generator. Paste any deseret.com article URL — get a ready-to-paste preview card with the headline, image, and summary. No signup.',
  keywords: [
    'embed deseret news',
    'deseret news embed code',
    'deseret news embed code generator',
    'embed deseret news article',
    'deseret news article preview card',
    'deseret news link preview',
    'embed deseret.com article'
  ],
  heroTitle: 'Deseret News Embed Code Generator',
  heroSubtitle:
    'Paste any Deseret News article URL — get a ready-to-paste preview card with the headline, image, and summary.',
  howItWorksHeading: 'How to embed a Deseret News article',
  howItWorksSteps: [
    {
      title: 'Paste a Deseret News link',
      description:
        'Copy any deseret.com article URL — news, opinion, faith, sports, or lifestyle stories.'
    },
    {
      title: 'Get the preview card',
      description:
        'The tool reads the article headline, lead image, and summary and builds a clean preview card.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Deseret News embed code generator',
  reasons: [
    {
      title: 'No native embed needed',
      description:
        'Deseret News articles have no public iframe embed. This tool builds a link preview card from the page metadata instead.'
    },
    {
      title: 'Headline, image & summary',
      description:
        'The card pulls the article title, lead image, and description so readers know what they are clicking.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Deseret News embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Article link card',
      description:
        'A clean card with the Deseret News headline, lead image, and summary that links back to the original story.'
    },
    {
      title: 'Works across sections',
      description:
        'Handles deseret.com URLs from news, opinion, faith, sports, and lifestyle sections.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/new-york-times', label: 'New York Times' },
    { href: '/tools/embed-url/microsoft', label: 'Microsoft' },
    { href: '/tools/embed-url/reddit', label: 'Reddit' }
  ],
  faq: [
    {
      question: 'How do I embed a Deseret News article on my website?',
      answer:
        'Paste any deseret.com article URL into the tool and click Generate. You will get a ready-to-paste preview card linking to the story.'
    },
    {
      question: 'Does Deseret News offer a native iframe embed?',
      answer:
        'No. Deseret News articles have no public iframe embed, so the tool generates a link preview card from the article metadata instead.'
    },
    {
      question: 'What does the preview card include?',
      answer:
        'The card shows the article headline, lead image, and a short summary, and links back to the original Deseret News page.'
    },
    {
      question: 'Can I customize how the card looks?',
      answer:
        'Yes. Switch to Card mode to adjust the colors, fonts, and layout before copying the HTML.'
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
