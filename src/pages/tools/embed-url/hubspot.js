import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'HubSpot',
  slug: 'hubspot',
  color: '#FF7A59',
  exampleUrl: 'https://meetings.hubspot.com/marpipe/book-a-demo',
  metaTitle: 'HubSpot Embed Code Generator — Embed Meeting Scheduler & Pages',
  metaDescription:
    'Free HubSpot embed code generator. Paste a HubSpot meetings, blog, or landing page URL — get a ready-to-paste embed or styled preview card. No signup.',
  keywords: [
    'embed hubspot',
    'hubspot embed code',
    'hubspot embed code generator',
    'embed hubspot meeting scheduler',
    'hubspot meetings iframe code',
    'embed hubspot landing page',
    'hubspot blog embed',
    'hubspot preview card'
  ],
  heroTitle: 'HubSpot Embed Code Generator',
  heroSubtitle:
    'Paste a HubSpot meetings, blog, or landing page URL and get ready-to-paste embed HTML or a styled preview card.',
  howItWorksHeading: 'How to embed HubSpot content',
  howItWorksSteps: [
    {
      title: 'Paste a HubSpot link',
      description:
        'Copy any HubSpot URL — a meetings.hubspot.com scheduling page, a blog post, or a landing page.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the page and generates an embed for scheduling pages or a styled preview card for blogs and landing pages.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our HubSpot embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through HubSpot settings for embed snippets. Paste a link and get working HTML.'
    },
    {
      title: 'Honest about embeds',
      description:
        'HubSpot meetings pages offer a native scheduling widget. Blog posts and landing pages have no public iframe embed, so you get a clean preview card instead.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 HubSpot embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Meeting scheduler embed',
      description:
        'For meetings.hubspot.com scheduling pages, get the native booking widget so visitors can pick a time inline.'
    },
    {
      title: 'Blog & landing page previews',
      description:
        'For HubSpot blog posts and landing pages, generate a rich preview card with the title, description, and thumbnail.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/wordpress-com',
      label: 'WordPress.com'
    },
    {
      href: '/tools/embed-url/buttondown',
      label: 'Buttondown'
    },
    {
      href: '/tools/embed-url/totango',
      label: 'Totango'
    }
  ],
  faq: [
    {
      question: 'How do I embed a HubSpot meeting scheduler?',
      answer:
        'Paste your meetings.hubspot.com scheduling page URL into the tool and click Generate. You will get ready-to-paste HTML that shows the native booking widget inline.'
    },
    {
      question: 'Can I embed a HubSpot blog post or landing page?',
      answer:
        'HubSpot does not offer a public iframe embed for blog posts or landing pages. For those URLs the tool generates a styled preview card with the title, description, and thumbnail that links to the page.'
    },
    {
      question: 'Why do I get a preview card instead of a live embed?',
      answer:
        'Native embedding only works for content HubSpot exposes publicly, like meetings pages. When a live embed is not available, the tool falls back to a customizable preview card so you always get something to paste.'
    },
    {
      question: 'Does the embed work on any website?',
      answer:
        'Yes. The generated HTML is standard markup you can paste into a blog, CMS, docs, or any HTML editor — no HubSpot account required to display it.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const HubSpotPage = () => <ProviderSubtool {...data} />

export default HubSpotPage
