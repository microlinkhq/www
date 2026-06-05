import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Raindrop.io',
  slug: 'raindrop',
  color: '#0B7FED',
  exampleUrl: 'https://raindrop.io',
  metaTitle: 'Raindrop.io Embed Code Generator — Embed Bookmarks & Collections',
  metaDescription:
    'Free Raindrop.io embed code generator. Paste any Raindrop.io URL — get a ready-to-paste embed for bookmarks and collections. No signup.',
  keywords: [
    'embed raindrop',
    'raindrop embed code',
    'raindrop embed code generator',
    'embed raindrop collection',
    'raindrop iframe code',
    'embed bookmark list',
    'raindrop bookmark embed'
  ],
  heroTitle: 'Raindrop.io Embed Code Generator',
  heroSubtitle:
    'Paste any Raindrop.io URL — get a ready-to-paste embed for bookmarks and collections.',
  howItWorksHeading: 'How to embed Raindrop.io content',
  howItWorksSteps: [
    {
      title: 'Paste a Raindrop.io link',
      description:
        'Copy the URL of any Raindrop.io bookmark or collection and drop it in.'
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
  explanationHeading: 'Why use our Raindrop.io embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Raindrop.io link and get working embed HTML in seconds.'
    },
    {
      title: 'Built for bookmarks and collections',
      description:
        'Handles Raindrop.io bookmarks and shared collections so readers can browse your saved links.'
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
      title: 'Collection embeds',
      description:
        'Embed a full Raindrop.io collection so visitors can explore every saved link in one place.'
    },
    {
      title: 'Single bookmark embeds',
      description:
        'Turn an individual Raindrop.io bookmark into a clean, ready-to-paste embed.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/curated', label: 'Curated' },
    { href: '/tools/embed-url/pastery', label: 'Pastery' },
    { href: '/tools/embed-url/behance', label: 'Behance' }
  ],
  faq: [
    {
      question: 'How do I embed a Raindrop.io collection on my website?',
      answer:
        'Paste the collection URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Can I embed a single Raindrop.io bookmark?',
      answer:
        'Yes. Paste the bookmark URL and the generator produces an embed you can drop into any page.'
    },
    {
      question: 'Does the collection need to be public?',
      answer:
        'Public collections embed natively. For private links the tool shows a preview card instead.'
    },
    {
      question: 'What if the Raindrop.io content is private?',
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
