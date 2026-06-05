import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Kubit',
  slug: 'kubit',
  color: '#5B4DF0',
  exampleUrl: 'https://kubit.ai',
  metaTitle: 'Kubit Embed Code Generator — Embed Analytics Dashboards',
  metaDescription:
    'Free Kubit embed code generator. Paste any Kubit URL — get a ready-to-paste embed for analytics dashboards and reports. No signup.',
  keywords: [
    'embed kubit',
    'kubit embed code',
    'kubit embed code generator',
    'embed kubit dashboard',
    'kubit iframe code',
    'kubit report embed',
    'embed analytics dashboard'
  ],
  heroTitle: 'Kubit Embed Code Generator',
  heroSubtitle:
    'Paste any Kubit URL — get a ready-to-paste embed for analytics dashboards and reports.',
  howItWorksHeading: 'How to embed Kubit content',
  howItWorksSteps: [
    {
      title: 'Paste a Kubit link',
      description: 'Copy any kubit.ai URL — a dashboard or report.'
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
  explanationHeading: 'Why use our Kubit embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Kubit link and get working embed HTML instantly.'
    },
    {
      title: 'Dashboards & reports',
      description:
        'Works with the product analytics dashboards and reports built in Kubit.'
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
      title: 'Interactive dashboard',
      description:
        'Embed the live Kubit dashboard so readers can explore the analytics in place.'
    },
    {
      title: 'Reports & charts',
      description:
        'Product analytics reports and charts from Kubit all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/datawrapper',
      label: 'Datawrapper'
    },
    {
      href: '/tools/embed-url/chartblocks',
      label: 'ChartBlocks'
    },
    {
      href: '/tools/embed-url/infoveave',
      label: 'Infoveave'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Kubit dashboard on my website?',
      answer:
        'Paste any Kubit URL into the tool and click Generate. You will get a ready-to-paste embed for the dashboard.'
    },
    {
      question: 'What is Kubit?',
      answer:
        'Kubit is a product analytics platform for building dashboards and reports on your data.'
    },
    {
      question: 'Can readers interact with the embedded dashboard?',
      answer:
        'When the dashboard supports live embedding, readers can explore the analytics directly in the page.'
    },
    {
      question: 'What if the dashboard cannot be embedded?',
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
