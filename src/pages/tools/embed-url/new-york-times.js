import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'New York Times',
  slug: 'new-york-times',
  color: '#000000',
  exampleUrl: 'https://www.nytimes.com/2024/01/01/world/example.html',
  metaTitle: 'New York Times Embed Code Generator — Embed NYT Articles',
  metaDescription:
    'Free New York Times embed code generator. Paste any NYT URL — get a preview card with headline, image, and summary. No signup.',
  keywords: [
    'embed new york times',
    'nyt embed code',
    'new york times embed generator',
    'embed nyt article',
    'nytimes preview card',
    'new york times embed html'
  ],
  heroTitle: 'New York Times Embed Code Generator',
  heroSubtitle:
    'Free New York Times embed code generator. Paste any NYT URL — get a preview card with headline, image, and summary.',
  howItWorksHeading: 'How to embed New York Times content',
  howItWorksSteps: [
    {
      title: 'Paste a New York Times link',
      description:
        'Copy any New York Times URL — news articles and opinion pieces.'
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
  explanationHeading: 'Why use our New York Times embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any New York Times link and get working embed HTML.'
    },
    {
      title: 'All New York Times content',
      description:
        'Works with news articles and opinion pieces — the tool handles all New York Times URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 New York Times embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Rich article previews',
      description:
        'Get a preview card with headline, image, and article summary from the New York Times.'
    },
    {
      title: 'News, opinion & multimedia',
      description:
        'News articles, op-eds, and multimedia stories — all NYT content types work.'
    },
    {
      title: 'Clean metadata',
      description:
        'Title, author, and featured image are extracted from the article.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/cnn',
      label: 'CNN'
    },
    {
      href: '/tools/embed-url/bbc',
      label: 'BBC'
    },
    {
      href: '/tools/embed-url/usa-today',
      label: 'USA TODAY'
    }
  ],
  faq: [
    {
      question: 'How do I embed a New York Times article?',
      answer: 'Paste any nytimes.com URL into the tool and click Generate.'
    },
    {
      question: 'Does the embed show the full article?',
      answer:
        'The embed shows a preview card. Readers click through for the full article.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const NewyorktimesPage = () => <ProviderSubtool {...data} />

export default NewyorktimesPage
