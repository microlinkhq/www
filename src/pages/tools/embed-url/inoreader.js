import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Inoreader',
  slug: 'inoreader',
  color: '#1875F3',
  exampleUrl: 'https://www.inoreader.com',
  metaTitle: 'Inoreader Embed Code Generator — Embed RSS Feeds & Articles',
  metaDescription:
    'Free Inoreader embed code generator. Paste any Inoreader URL — get a ready-to-paste embed for shared feeds, folders, and articles. No signup.',
  keywords: [
    'embed inoreader',
    'inoreader embed code',
    'inoreader embed code generator',
    'embed rss feed',
    'inoreader iframe code',
    'inoreader feed embed',
    'embed inoreader article'
  ],
  heroTitle: 'Inoreader Embed Code Generator',
  heroSubtitle:
    'Paste any Inoreader URL — get a ready-to-paste embed for shared RSS feeds, folders, and articles.',
  howItWorksHeading: 'How to embed Inoreader content',
  howItWorksSteps: [
    {
      title: 'Paste an Inoreader link',
      description:
        'Copy any inoreader.com URL — a shared feed, folder, or article.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Inoreader embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Inoreader link and get working embed HTML instantly.'
    },
    {
      title: 'Feeds & articles',
      description:
        'Works with shared RSS feeds, folders, and individual articles from Inoreader.'
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
      title: 'Live feed embed',
      description:
        'Embed a shared Inoreader feed so the latest articles keep updating on your page.'
    },
    {
      title: 'Feeds, folders & articles',
      description:
        'Shared feeds, grouped folders, and single articles from Inoreader all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/curated',
      label: 'Curated'
    },
    {
      href: '/tools/embed-url/raindrop',
      label: 'Raindrop'
    },
    {
      href: '/tools/embed-url/buttondown',
      label: 'Buttondown'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Inoreader feed on my website?',
      answer:
        'Paste any Inoreader URL into the tool and click Generate. You will get a ready-to-paste embed for the feed.'
    },
    {
      question: 'What is Inoreader?',
      answer:
        'Inoreader is an RSS reader and content aggregator for following feeds, newsletters, and websites in one place.'
    },
    {
      question: 'Will the embedded feed stay up to date?',
      answer:
        'When the shared feed supports live embedding, new articles appear in the embed automatically.'
    },
    {
      question: 'What if the content cannot be embedded?',
      answer:
        'Switch to Card mode to get a styled preview card with the title and image instead.'
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
