import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'The New York Times',
  slug: 'new-york-times',
  color: '#000000',
  exampleUrl:
    'https://www.nytimes.com/interactive/2019/08/14/magazine/1619-america-slavery.html',
  metaTitle: 'New York Times Embed Code Generator — Embed NYT Article Cards',
  metaDescription:
    'Free New York Times embed code generator. Paste any NYT article URL — get a styled preview card with the headline, image, and summary. No signup.',
  keywords: [
    'embed new york times',
    'nyt embed code',
    'new york times embed code generator',
    'embed nyt article',
    'new york times article card',
    'nytimes link preview',
    'embed new york times article',
    'nyt preview card generator'
  ],
  heroTitle: 'New York Times Embed Code Generator',
  heroSubtitle:
    'Paste any New York Times article URL — get a styled preview card with the headline, image, and summary, ready to paste anywhere.',
  howItWorksHeading: 'How to embed a New York Times article',
  howItWorksSteps: [
    {
      title: 'Paste a New York Times link',
      description:
        'Copy any nytimes.com article URL — news, opinion, or interactive features.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the article metadata and builds a preview card you can paste as HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our New York Times embed code generator',
  reasons: [
    {
      title: 'No iframe needed',
      description:
        'The New York Times does not offer public iframe embeds, so the tool builds a clean preview card from the article instead.'
    },
    {
      title: 'Pulls real article metadata',
      description:
        'Headline, lead image, and summary are read straight from the nytimes.com page you paste.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 The New York Times embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Styled article cards',
      description:
        'A polished link card with the NYT headline, featured image, and summary that links back to the original story.'
    },
    {
      title: 'News, opinion & interactives',
      description:
        'Works with nytimes.com news articles, op-eds, and interactive features — anywhere a public URL exists.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/deseretnews',
      label: 'Deseret News'
    },
    {
      href: '/tools/embed-url/reddit',
      label: 'Reddit'
    },
    {
      href: '/tools/embed-url/microsoft',
      label: 'Microsoft'
    }
  ],
  faq: [
    {
      question: 'How do I embed a New York Times article on my website?',
      answer:
        'Paste any nytimes.com article URL into the tool and click Generate. You get a styled preview card you can paste as HTML.'
    },
    {
      question: 'Can I embed the full New York Times article with an iframe?',
      answer:
        'No. The New York Times does not provide a public iframe embed, so the tool generates a preview card with the headline, image, and summary that links to the original article.'
    },
    {
      question: 'What does the preview card include?',
      answer:
        'The card shows the article headline, lead image, and summary, and links back to the full story on nytimes.com.'
    },
    {
      question: 'Does it work with paywalled articles?',
      answer:
        'It uses the public metadata The New York Times exposes for each URL, so the card renders even when the full article is behind the paywall.'
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
