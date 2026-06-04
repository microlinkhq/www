import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'MySQLExplain',
  slug: 'mysqlexplain',
  color: '#00758F',
  exampleUrl: 'https://mysqlexplain.com',
  metaTitle:
    'MySQLExplain Embed Code Generator — Embed MySQL EXPLAIN Visualizations',
  metaDescription:
    'Free MySQLExplain embed code generator. Paste any MySQLExplain URL — get a ready-to-paste embed of your MySQL EXPLAIN query plan visualization. No signup.',
  keywords: [
    'embed mysqlexplain',
    'mysqlexplain embed code',
    'mysqlexplain embed code generator',
    'embed mysql explain',
    'mysql query plan embed',
    'mysqlexplain iframe code',
    'embed sql explain visualization'
  ],
  heroTitle: 'MySQLExplain Embed Code Generator',
  heroSubtitle:
    'Paste any MySQLExplain URL — get a ready-to-paste embed of your MySQL EXPLAIN query plan visualization.',
  howItWorksHeading: 'How to embed MySQLExplain content',
  howItWorksSteps: [
    {
      title: 'Paste a MySQLExplain link',
      description: 'Copy the URL of any shared MySQLExplain query plan.'
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
  explanationHeading: 'Why use our MySQLExplain embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any MySQLExplain link and get working embed HTML in one step.'
    },
    {
      title: 'Built for query plans',
      description:
        'Embed an easy-to-read MySQL EXPLAIN visualization so readers can study the plan in context.'
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
      title: 'EXPLAIN plan visualization',
      description:
        'Embed the visual breakdown of a MySQL EXPLAIN output to highlight slow joins and missing indexes.'
    },
    {
      title: 'Great for SQL tutorials',
      description:
        'Drop query-plan diagrams straight into engineering blogs, docs, and optimization write-ups.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/codesandbox', label: 'CodeSandbox' },
    { href: '/tools/embed-url/codepen', label: 'CodePen' },
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' }
  ],
  faq: [
    {
      question: 'How do I embed a MySQLExplain query plan on my website?',
      answer:
        'Paste the MySQLExplain URL into the tool and click Generate to get embeddable HTML.'
    },
    {
      question: 'What kind of MySQLExplain content can I embed?',
      answer:
        'MySQL EXPLAIN query plan visualizations that help you read and optimize SQL queries.'
    },
    {
      question: 'Will the embedded visualization stay interactive?',
      answer:
        'When the source supports it, the native embed keeps its interactivity; otherwise a preview card is shown.'
    },
    {
      question: 'What if the MySQLExplain plan is private?',
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
