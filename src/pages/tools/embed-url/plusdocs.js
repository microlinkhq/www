import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Plus',
  slug: 'plusdocs',
  color: '#6366F1',
  exampleUrl: 'https://plusdocs.com',
  metaTitle: 'Plus Embed Code Generator — Embed Live Snapshots',
  metaDescription:
    'Free Plus embed code generator. Paste any Plus URL — get a ready-to-paste embed for live Snapshots of web pages and dashboards. No signup.',
  keywords: [
    'embed plus',
    'plus embed code',
    'plus embed code generator',
    'embed plus snapshot',
    'plusdocs embed code',
    'plus dashboard embed',
    'plus live snapshot embed'
  ],
  heroTitle: 'Plus Embed Code Generator',
  heroSubtitle:
    'Paste any Plus URL — get a ready-to-paste embed for live Snapshots of web pages and dashboards.',
  howItWorksHeading: 'How to embed Plus Snapshots',
  howItWorksSteps: [
    {
      title: 'Paste a Plus link',
      description: 'Copy the URL of your Plus Snapshot and paste it in.'
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
  explanationHeading: 'Why use our Plus embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Turn any Plus Snapshot link into a working embed without screenshots or manual exports.'
    },
    {
      title: 'Snapshots stay up to date',
      description:
        'Embed a live Snapshot so the dashboard or page refreshes wherever it is shared.'
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
      title: 'Live Snapshot embed',
      description:
        'Get the real Plus Snapshot so the latest view of a page or dashboard appears in place.'
    },
    {
      title: 'Web pages and dashboards',
      description:
        'Works across Plus Snapshots, from single web pages to live app dashboards.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/canva', label: 'Canva' },
    { href: '/tools/embed-url/beautiful', label: 'Beautiful.ai' },
    { href: '/tools/embed-url/speakerdeck', label: 'SpeakerDeck' }
  ],
  faq: [
    {
      question: 'How do I embed a Plus Snapshot on my website?',
      answer:
        'Paste the Plus URL into the tool, click Generate, then copy the HTML and paste it where you want the Snapshot to appear.'
    },
    {
      question: 'Does the embedded Snapshot stay up to date?',
      answer:
        'Yes. A live Snapshot keeps refreshing, so the embedded page or dashboard shows the latest view.'
    },
    {
      question: 'Can I embed a dashboard with Plus?',
      answer:
        'You can. Plus captures Snapshots of web pages and app dashboards, and the tool generates an embed for each.'
    },
    {
      question: 'What if the Snapshot cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the title and image and a link to the original Snapshot.'
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
