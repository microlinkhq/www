import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Hopvue',
  slug: 'hopvue',
  color: '#111111',
  exampleUrl: 'https://www.hopvue.com',
  metaTitle: 'Hopvue Embed Code Generator — Embed Hopvue Content',
  metaDescription:
    'Free Hopvue embed code generator. Paste a Hopvue URL to get ready-to-paste embed HTML, or a styled preview card when native embedding is unavailable. No signup.',
  keywords: [
    'embed hopvue',
    'hopvue embed code',
    'hopvue embed code generator',
    'hopvue iframe code',
    'hopvue embed html',
    'embed hopvue link',
    'hopvue preview card'
  ],
  heroTitle: 'Hopvue Embed Code Generator',
  heroSubtitle:
    'Paste a Hopvue URL — get ready-to-paste embed HTML, or a styled preview card as a fallback.',
  howItWorksHeading: 'How to embed Hopvue content',
  howItWorksSteps: [
    {
      title: 'Paste a Hopvue link',
      description:
        'Copy any hopvue.com URL from your browser and drop it into the tool.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the link and generates the right embed HTML, or a preview card when no native embed is offered.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Hopvue embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing embed markup by hand. Paste any Hopvue link and get working HTML back.'
    },
    {
      title: 'Works with any Hopvue URL',
      description:
        'Paste a link from any hopvue.com page and the tool figures out how to embed it.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Hopvue embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native embed when available',
      description:
        'When Hopvue offers a native embed for the link, you get the real embed with its full interactivity.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated embed adapts to your page width so it sits cleanly in any layout.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' }
  ],
  faq: [
    {
      question: 'How do I embed Hopvue content on my website?',
      answer:
        'Paste any hopvue.com URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Which Hopvue links work?',
      answer:
        'Any public hopvue.com link works. The tool reads the link and generates the right embed HTML for it.'
    },
    {
      question: 'What if the Hopvue link cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card built from the available title and image metadata.'
    },
    {
      question: 'What if the Hopvue content is private?',
      answer:
        'Private or restricted content cannot be embedded. The tool shows a preview card with whatever public metadata is available.'
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
