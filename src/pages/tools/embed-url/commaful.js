import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Commaful',
  slug: 'commaful',
  color: '#00c6c6',
  exampleUrl: 'https://commaful.com/play/aknier/the-mountain/',
  metaTitle:
    'Commaful Embed Code Generator — Embed Short Stories & Visual Poetry',
  metaDescription:
    'Free Commaful embed code generator. Paste a Commaful story or poetry URL to get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed commaful',
    'commaful embed code',
    'embed commaful story',
    'embed commaful poetry',
    'commaful embed generator',
    'commaful story embed',
    'embed visual story commaful',
    'commaful flash fiction embed'
  ],
  heroTitle: 'Commaful Embed Code Generator',
  heroSubtitle:
    'Paste a Commaful story or poem URL to get a ready-to-paste embed or a customizable preview card.',
  howItWorksHeading: 'How to embed Commaful stories',
  howItWorksSteps: [
    {
      title: 'Paste a Commaful link',
      description:
        'Copy any commaful.com URL — a visual story, poem, or fanfiction from a /play/ page.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the story title, cover image, and author, then generates the embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Commaful embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste a Commaful link and get working embed HTML in one step.'
    },
    {
      title: 'Built for visual stories',
      description:
        'Surfaces the cover art, title, and author behind each Commaful short story or poem.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Commaful embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Story-aware preview',
      description:
        'Pulls the page-by-page visual story metadata, including its image and headline.'
    },
    {
      title: 'Works across content',
      description:
        'Handles Commaful short stories, visual poetry, and fanfiction URLs alike.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/tumblr', label: 'Tumblr' },
    { href: '/tools/embed-url/wordpress-com', label: 'WordPress.com' },
    { href: '/tools/embed-url/sutori', label: 'Sutori' }
  ],
  faq: [
    {
      question: 'How do I embed a Commaful story on my website?',
      answer:
        'Paste any commaful.com story or poem URL into the tool and click Generate to get embed HTML you can paste anywhere.'
    },
    {
      question: 'What kind of Commaful content can I embed?',
      answer:
        'Commaful short stories, visual poetry, and fanfiction from /play/ pages all work, including the story cover image and title.'
    },
    {
      question: 'What if the Commaful story is private or unavailable?',
      answer:
        'The tool falls back to a styled preview card built from whatever public metadata is available.'
    },
    {
      question: 'Can I change how the Commaful embed looks?',
      answer:
        'Yes — switch to Card mode to customize the colors, fonts, and layout before you copy the code.'
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
