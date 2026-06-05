import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Parta',
  slug: 'parta',
  color: '#666666',
  exampleUrl: 'https://parta.io',
  metaTitle: 'Parta Embed Code Generator — Embed Parta Pages & Shared Content',
  metaDescription:
    'Free Parta embed code generator. Paste any Parta URL — get a ready-to-paste embed for pages and shared content, or a styled preview card. No signup.',
  keywords: [
    'embed parta',
    'parta embed code',
    'parta embed code generator',
    'embed parta page',
    'parta iframe code',
    'parta link embed',
    'embed parta content'
  ],
  heroTitle: 'Parta Embed Code Generator',
  heroSubtitle:
    'Paste any Parta URL — get a ready-to-paste embed for pages and shared content, or a styled preview card.',
  howItWorksHeading: 'How to embed Parta content',
  howItWorksSteps: [
    {
      title: 'Paste a Parta link',
      description:
        'Copy any Parta page or shared content URL and drop it into the field.'
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
  explanationHeading: 'Why use our Parta embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Parta link and get working embed HTML — no need to dig through page settings or sharing menus.'
    },
    {
      title: 'Pages and shared content',
      description:
        'Embed Parta pages and shared content with a single link, in the layout your site expects.'
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
      title: 'Responsive embed',
      description:
        'Generated embeds scale to fit your container so Parta content looks right on desktop and mobile.'
    },
    {
      title: 'Works in any editor',
      description:
        'Plain HTML output that pastes into WordPress, Ghost, Notion exports, or any CMS that accepts embeds.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' },
    { href: '/tools/embed-url/curated', label: 'Curated' },
    { href: '/tools/embed-url/pastery', label: 'Pastery' }
  ],
  faq: [
    {
      question: 'How do I embed Parta content on my website?',
      answer:
        'Paste any Parta URL into the tool and click Generate. Copy the resulting HTML and paste it wherever you want the embed to appear.'
    },
    {
      question: 'What kind of Parta links can I embed?',
      answer:
        'You can embed Parta pages and shared content links. The tool reads the URL and picks the right embed format automatically.'
    },
    {
      question: 'What if the Parta content is private?',
      answer:
        'If the content cannot be embedded directly, the tool falls back to a styled preview card built from the available metadata.'
    },
    {
      question: 'Will the embed stay responsive?',
      answer:
        'Yes. The generated markup is responsive and adapts to the width of the container it sits in.'
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
