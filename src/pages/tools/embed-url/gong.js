import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Gong',
  slug: 'gong',
  color: '#8039DF',
  exampleUrl: 'https://www.gong.io',
  metaTitle: 'Gong Embed Code Generator — Embed Gong Call Links',
  metaDescription:
    'Free Gong embed code generator. Paste a gong.io call or page URL — get a styled preview card you can paste anywhere. No signup.',
  keywords: [
    'embed gong',
    'gong embed code',
    'gong embed code generator',
    'embed gong call',
    'gong call recording embed',
    'gong link preview',
    'embed gong.io url'
  ],
  heroTitle: 'Gong Embed Code Generator',
  heroSubtitle:
    'Paste a Gong call or page URL — get a styled preview card you can paste into any blog, doc, or CMS.',
  howItWorksHeading: 'How to embed a Gong link',
  howItWorksSteps: [
    {
      title: 'Paste a Gong link',
      description:
        'Copy any gong.io URL — a shared call link, a snippet, or a page from gong.io.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the link metadata and generates a styled preview card you can copy.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Gong embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the HTML by hand. Paste a Gong link and get a ready-to-paste preview card.'
    },
    {
      title: 'Honest preview cards',
      description:
        'Gong call recordings are private and require a signed-in Gong account, so the tool builds a clean preview card instead of a broken player.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Gong embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Works with any gong.io URL',
      description:
        'Shared call links, snippets, and pages on gong.io all produce a tidy preview card with title and image.'
    },
    {
      title: 'Clean, responsive layout',
      description:
        'The preview card scales to fit your content width and looks consistent across blogs, docs, and CMS pages.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/loom', label: 'Loom' },
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/mixpanel', label: 'Mixpanel' }
  ],
  faq: [
    {
      question: 'How do I embed a Gong link on my website?',
      answer:
        'Paste any gong.io URL into the tool and click Generate. You will get a styled preview card you can copy and paste into your page.'
    },
    {
      question: 'Can I embed a Gong call recording with a live player?',
      answer:
        'No. Gong call recordings are private — viewers must be Gong users signed in with permission to access the call, so there is no public player to embed. The tool generates a preview card that links to the call instead.'
    },
    {
      question: 'What does the preview card show?',
      answer:
        'A styled card with the title and image pulled from the link metadata. In Card mode you can customize colors, fonts, and layout before copying.'
    },
    {
      question: 'What if the Gong content is private?',
      answer:
        'Most Gong links are private. The tool falls back to a preview card built from whatever public metadata is available, so you always get something clean to paste.'
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
